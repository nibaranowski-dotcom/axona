"use server";

import { Resend } from "resend";

import {
  requestAccessSchema,
  SUCCESS_MESSAGE,
  type RequestAccessState,
} from "@/lib/validation/request-access";
import { FounderNotification } from "@/emails/founder-notification";
import { SubmitterConfirmation } from "@/emails/submitter-confirmation";

// A "use server" module may export only async functions — SUCCESS_MESSAGE / RequestAccessState /
// initialRequestAccessState live in lib/validation/request-access.ts and are imported here.
const ERROR_MESSAGE = "We couldn't submit that just now. Please try again.";
const FIELD_ERROR_MESSAGE = "Please fix the highlighted fields.";

// One server action for both captures (hero quick-capture + closing full form). Validate (Zod) →
// honeypot → send via Resend → typed result. Re-validates server-side regardless of the client.
export async function requestAccess(
  _prev: RequestAccessState,
  formData: FormData,
): Promise<RequestAccessState> {
  const raw = {
    source: String(formData.get("source") ?? "hero"),
    email: String(formData.get("email") ?? ""),
    name: String(formData.get("name") ?? ""),
    company: String(formData.get("company") ?? ""),
    role: String(formData.get("role") ?? ""),
    building: String(formData.get("building") ?? ""),
    consent:
      formData.get("consent") === "on" || formData.get("consent") === "true",
    company_url: String(formData.get("company_url") ?? ""), // honeypot
  };

  // Honeypot: a filled hidden field means a bot — return silent success, send nothing.
  if (raw.company_url.trim().length > 0) {
    return { ok: true, message: SUCCESS_MESSAGE };
  }

  const parsed = requestAccessSchema.safeParse(raw);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!errors[key]) errors[key] = issue.message;
    }
    return { ok: false, errors, message: FIELD_ERROR_MESSAGE };
  }
  const data = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.REQUEST_ACCESS_TO;
  // Resend requires a verified sender; until axonahq.com DNS is verified, the sandbox sender works.
  const from = process.env.REQUEST_ACCESS_FROM || "onboarding@resend.dev";

  // Graceful degrade (R9): with no key/inbox configured, log the lead and report success — never 500.
  if (!apiKey || !to) {
    console.info(
      "[request-access] lead received (email NOT sent — RESEND_API_KEY/REQUEST_ACCESS_TO unset):",
      {
        source: data.source,
        email: data.email,
        name: data.name,
        company: data.company,
        role: data.role,
        building: data.building,
      },
    );
    return { ok: true, message: SUCCESS_MESSAGE };
  }

  try {
    const resend = new Resend(apiKey);

    const notify = await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject: `Axona — request access (${data.source})${data.company ? ` · ${data.company}` : ""}`,
      react: FounderNotification({ data }),
    });
    if (notify.error) throw new Error(notify.error.message);

    // Submitter confirmation — best-effort; a bounce here must not fail the whole request.
    await resend.emails
      .send({
        from,
        to: data.email,
        subject: "Thanks for your interest in Axona",
        react: SubmitterConfirmation({ name: data.name }),
      })
      .catch((e) =>
        console.error("[request-access] confirmation send failed:", e),
      );

    return { ok: true, message: SUCCESS_MESSAGE };
  } catch (e) {
    console.error("[request-access] send failed:", e);
    return { ok: false, message: ERROR_MESSAGE };
  }
}
