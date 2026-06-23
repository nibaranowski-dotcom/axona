"use client";

import { useActionState, useEffect, useId, useRef } from "react";

import { requestAccess } from "@/app/actions/request-access";
import { initialRequestAccessState } from "@/lib/validation/request-access";
import { form } from "@/content/site-v2";

// Full request-access form (closing CTA) — Name · Work email · Company · Your role · What are you
// building? + consent. Same requestAccess server action with source="closing". Validation mirrors
// the server (server is authoritative). States + a11y: labelled fields, errors via aria-describedby,
// focus moves to the first error or the success message. v2 tokens (lime submit, sharp inputs).
const FIELDS = [
  { name: "name", type: "text", label: form.labels.name, required: true },
  { name: "email", type: "email", label: form.labels.email, required: true },
  {
    name: "company",
    type: "text",
    label: form.labels.company,
    required: false,
  },
  { name: "role", type: "text", label: form.labels.role, required: false },
] as const;

export function RequestAccessForm() {
  const [state, formAction, pending] = useActionState(
    requestAccess,
    initialRequestAccessState,
  );
  const uid = useId();
  const successRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.ok && state.message) {
      successRef.current?.focus();
      return;
    }
    if (state.errors) {
      const first = Object.keys(state.errors)[0];
      const el = formRef.current?.querySelector<HTMLElement>(
        `[name="${first}"]`,
      );
      el?.focus();
    }
  }, [state]);

  if (state.ok && state.message) {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="mx-auto mt-9 max-w-[520px] rounded-[12px] border border-line2 bg-white px-7 py-8 text-[16px] text-ink outline-none"
      >
        {state.message}
      </div>
    );
  }

  const fieldId = (n: string) => `${uid}-${n}`;
  const errId = (n: string) => `${uid}-${n}-error`;
  const inputCls =
    "w-full rounded-[9px] border border-line2 bg-white px-[14px] py-[11px] text-[15px] text-ink outline-none placeholder:text-dim focus-visible:border-ink focus-visible:ring-2 focus-visible:ring-lime aria-[invalid=true]:border-destructive";

  return (
    <form
      ref={formRef}
      action={formAction}
      noValidate
      className="mx-auto mt-9 max-w-[520px] text-left"
    >
      <input type="hidden" name="source" value="closing" />
      {/* Honeypot — off-screen + aria-hidden, not display:none. */}
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
        <label htmlFor={fieldId("company_url")}>Company URL</label>
        <input
          id={fieldId("company_url")}
          name="company_url"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {FIELDS.map((f) => {
          const err = state.errors?.[f.name];
          return (
            <div
              key={f.name}
              className={
                f.name === "name" || f.name === "email"
                  ? "sm:col-span-1"
                  : "sm:col-span-1"
              }
            >
              <label
                htmlFor={fieldId(f.name)}
                className="mb-1.5 block text-[13px] font-medium text-ink"
              >
                {f.label}
                {f.required && <span className="text-destructive"> *</span>}
              </label>
              <input
                id={fieldId(f.name)}
                name={f.name}
                type={f.type}
                required={f.required}
                aria-invalid={err ? true : undefined}
                aria-describedby={err ? errId(f.name) : undefined}
                className={inputCls}
              />
              {err && (
                <p
                  id={errId(f.name)}
                  role="alert"
                  className="mt-1 text-[12.5px] text-destructive"
                >
                  {err}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4">
        <label
          htmlFor={fieldId("building")}
          className="mb-1.5 block text-[13px] font-medium text-ink"
        >
          {form.labels.building}
        </label>
        <textarea
          id={fieldId("building")}
          name="building"
          rows={3}
          aria-invalid={state.errors?.building ? true : undefined}
          aria-describedby={
            state.errors?.building ? errId("building") : undefined
          }
          className={`${inputCls} resize-y`}
        />
        {state.errors?.building && (
          <p
            id={errId("building")}
            role="alert"
            className="mt-1 text-[12.5px] text-destructive"
          >
            {state.errors.building}
          </p>
        )}
      </div>

      <div className="mt-4 flex items-start gap-2.5">
        <input
          id={fieldId("consent")}
          name="consent"
          type="checkbox"
          aria-invalid={state.errors?.consent ? true : undefined}
          aria-describedby={
            state.errors?.consent ? errId("consent") : undefined
          }
          className="mt-0.5 size-4 accent-lime"
        />
        <label
          htmlFor={fieldId("consent")}
          className="text-[13px] text-[--body]"
        >
          {form.consent}{" "}
          <a
            href={form.privacyHref}
            className="underline underline-offset-2 hover:text-ink"
          >
            {form.privacyLabel}
          </a>
        </label>
      </div>
      {state.errors?.consent && (
        <p
          id={errId("consent")}
          role="alert"
          className="mt-1 text-[12.5px] text-destructive"
        >
          {state.errors.consent}
        </p>
      )}

      {!state.ok && state.message && (
        <p role="alert" className="mt-4 text-[13px] text-destructive">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-lime px-[22px] py-[13px] text-[15px] font-semibold text-ink transition-colors hover:bg-lime-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 disabled:opacity-60 sm:w-auto"
      >
        {pending ? "Sending…" : form.submit}
      </button>
    </form>
  );
}
