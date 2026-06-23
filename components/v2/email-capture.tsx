"use client";

import { useActionState, useEffect, useRef } from "react";

import { requestAccess } from "@/app/actions/request-access";
import { initialRequestAccessState } from "@/lib/validation/request-access";
import { form } from "@/content/site-v2";

// Hero quick-capture — email-only, low-friction. Calls the same requestAccess server action with
// source="hero". Progressive enhancement: works as a native POST without JS. States: idle →
// submitting → success (replaces the form) → error (inline, retryable).
export function HeroEmailCapture() {
  const [state, formAction, pending] = useActionState(
    requestAccess,
    initialRequestAccessState,
  );
  const successRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (state.ok && state.message) successRef.current?.focus();
  }, [state.ok, state.message]);

  if (state.ok && state.message) {
    return (
      <p
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="mt-[34px] max-w-[430px] rounded-[9px] border border-line2 bg-panel px-[18px] py-[14px] text-[15px] text-ink outline-none"
      >
        {state.message}
      </p>
    );
  }

  const emailError = state.errors?.email;

  return (
    <form action={formAction} className="mt-[34px] max-w-[430px]" noValidate>
      <input type="hidden" name="source" value="hero" />
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
        <label htmlFor="company_url_hero">Company URL</label>
        <input
          id="company_url_hero"
          name="company_url"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <label htmlFor="hero-email" className="sr-only">
        {form.labels.email}
      </label>
      <div className="flex items-stretch overflow-hidden rounded-[9px] border border-line2 bg-white">
        <input
          id="hero-email"
          name="email"
          type="email"
          required
          placeholder={form.emailPlaceholder}
          aria-invalid={emailError ? true : undefined}
          aria-describedby={emailError ? "hero-email-error" : undefined}
          className="min-w-0 flex-1 border-0 bg-transparent px-[18px] py-[13px] text-[15px] text-ink outline-none placeholder:text-dim"
        />
        <button
          type="submit"
          disabled={pending}
          className="flex items-center whitespace-nowrap bg-lime px-[22px] py-[13px] text-[14.5px] font-semibold text-ink transition-colors hover:bg-lime-hover disabled:opacity-60"
        >
          {pending ? "Sending…" : "Book a demo"}
        </button>
      </div>

      {emailError && (
        <p
          id="hero-email-error"
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
      <p className="mt-2 text-[12.5px] text-dim">
        {form.heroNote}{" "}
        <a
          href={form.privacyHref}
          className="underline underline-offset-2 hover:text-ink"
        >
          {form.privacyLabel}
        </a>
        .
      </p>
    </form>
  );
}
