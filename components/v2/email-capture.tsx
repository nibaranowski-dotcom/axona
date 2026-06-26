"use client";

import { useActionState, useEffect, useId, useRef } from "react";

import { requestAccess } from "@/app/actions/request-access";
import { initialRequestAccessState } from "@/lib/validation/request-access";
import { form } from "@/content/site-v2";

// Request-access email capture (pre-launch). Email-only, low-friction; wired to the requestAccess
// server action (Zod validate → honeypot → Resend, graceful when the key is unset). Progressive
// enhancement: works as a native POST without JS. States: idle → submitting → success (inline
// confirmation) → error (inline, retryable). `source` distinguishes where the lead came from.
export function EmailCapture({
  source,
  cta = form.submit,
  className,
}: {
  source: string;
  cta?: string;
  className?: string;
}) {
  const [state, formAction, pending] = useActionState(
    requestAccess,
    initialRequestAccessState,
  );
  const uid = useId();
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.ok && state.message) successRef.current?.focus();
  }, [state.ok, state.message]);

  if (state.ok && state.message) {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className={`flex max-w-[430px] items-center gap-3 rounded-[9px] border border-ok bg-okbg px-[18px] py-[14px] text-[14px] leading-[1.45] text-ink outline-none ${className ?? ""}`}
      >
        <span className="size-2 shrink-0 rounded-full bg-ok" />
        {state.message}
      </div>
    );
  }

  const emailError = state.errors?.email;

  return (
    <form
      action={formAction}
      noValidate
      className={`max-w-[430px] ${className ?? ""}`}
    >
      <input type="hidden" name="source" value={source} />
      {/* Honeypot — off-screen + aria-hidden, not display:none; bots fill it, humans don't. */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-9999px",
          width: 1,
          height: 1,
          overflow: "hidden",
        }}
      >
        <label htmlFor={`${uid}-company_url`}>Company URL</label>
        <input
          id={`${uid}-company_url`}
          name="company_url"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <label htmlFor={`${uid}-email`} className="sr-only">
        {form.emailLabel}
      </label>
      <div className="flex items-stretch overflow-hidden rounded-[9px] border border-line2 bg-paper">
        <input
          id={`${uid}-email`}
          name="email"
          type="email"
          required
          placeholder={form.emailPlaceholder}
          aria-invalid={emailError ? true : undefined}
          aria-describedby={emailError ? `${uid}-email-error` : undefined}
          className="min-w-0 flex-1 border-0 bg-transparent px-[18px] py-[14px] text-[15px] text-ink outline-none placeholder:text-dim"
        />
        <button
          type="submit"
          disabled={pending}
          className="flex items-center whitespace-nowrap bg-lime px-[22px] py-[14px] text-[14.5px] font-semibold text-ink transition-colors hover:bg-lime-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink disabled:opacity-60"
        >
          {pending ? "Sending…" : cta}
        </button>
      </div>

      {emailError && (
        <p
          id={`${uid}-email-error`}
          role="alert"
          className="mt-2 text-[13px] text-destructive"
        >
          {emailError}
        </p>
      )}
      {!state.ok && state.message && !state.errors && (
        <p role="alert" className="mt-2 text-[13px] text-destructive">
          {state.message}
        </p>
      )}
      <p className="mt-2.5 text-[12.5px] leading-[1.45] text-dim">
        {form.note}
      </p>
    </form>
  );
}
