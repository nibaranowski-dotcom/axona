import { z } from "zod";

// Shared Zod schema for the request-access captures (hero quick-capture + closing full form).
// The server action re-validates with this (authoritative); the client mirrors it for UX.
// `company_url` is the honeypot — real users never see/fill it.
export const requestAccessSchema = z
  .object({
    source: z.enum(["hero", "closing"]).default("hero"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Enter a valid email address"),
    name: z
      .string()
      .trim()
      .max(120, "Keep this under 120 characters")
      .optional()
      .default(""),
    company: z
      .string()
      .trim()
      .max(120, "Keep this under 120 characters")
      .optional()
      .default(""),
    role: z
      .string()
      .trim()
      .max(120, "Keep this under 120 characters")
      .optional()
      .default(""),
    building: z
      .string()
      .trim()
      .max(2000, "Keep this under 2000 characters")
      .optional()
      .default(""),
    consent: z.boolean().optional().default(false),
    company_url: z.string().optional().default(""), // honeypot
  })
  .superRefine((v, ctx) => {
    // The full (closing) form requires a name and explicit contact consent.
    if (v.source === "closing") {
      if (!v.name || v.name.trim().length < 1) {
        ctx.addIssue({
          path: ["name"],
          code: "custom",
          message: "Please tell us your name",
        });
      }
      if (!v.consent) {
        ctx.addIssue({
          path: ["consent"],
          code: "custom",
          message: "Please agree to be contacted",
        });
      }
    }
  });

export type RequestAccessInput = z.infer<typeof requestAccessSchema>;

// Shared action result type + initial state + success copy. These live here (not in the
// "use server" action module, which may only export async functions) so client components and the
// action both import them. Success copy is verbatim from content.md (request-access form section).
export type RequestAccessState = {
  ok: boolean;
  message?: string;
  errors?: Record<string, string>;
};

export const initialRequestAccessState: RequestAccessState = { ok: false };

export const SUCCESS_MESSAGE =
  "Thanks — request received. We'll be in touch within a few days. Founders read every request.";
