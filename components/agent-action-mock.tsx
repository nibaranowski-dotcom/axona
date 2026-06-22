import { AlertTriangle, ArrowRight, Cpu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { wedge } from "@/content/home";

// components/agent-action-mock.tsx — the propose → approve → audit panel. SERVER COMPONENT (no
// "use client"): the full paper trail renders as static HTML/CSS, so the trust story — and all
// five auditable fields — are readable with JavaScript disabled. No live model call; the data is
// a typed const from content/home.ts.
//
// Content integrity (../CLAUDE.md): this is SAMPLE / ILLUSTRATIVE data. A persistent
// "Sample data — illustrative" badge is always visible and announced to assistive tech (not
// color-only); every identifier is deliberately generic. Nothing here implies a real customer,
// supplier, person, or metric.
//
// Design: Hebbia/Legora density — compact rows, Geist Mono for field-keys / part numbers / model
// id, elevation via surface steps + 1px hairline borders (no shadow stacks). Teal is reserved for
// the one signal: the Approve action. The risk flag is monochrome — meaning lives in the text.
//
// The audit trail exposes all five auditable fields, in order: inputs · output · model ·
// confidence · approver (rendered from mock.audit.fields below).

const { mock } = wedge;

export function AgentActionMock() {
  return (
    <figure
      // role/figure + label so screen readers announce this as one illustrative unit.
      aria-label="Sample agent action — propose, approve, and audit trail"
      className="not-prose mt-10 overflow-hidden rounded-xl border border-border bg-card text-card-foreground"
    >
      {/* Panel header — what this is, plus the persistent sample marker (text, never color-only). */}
      <div className="flex items-center justify-between gap-3 border-b border-border bg-muted/40 px-4 py-2.5">
        <span className="flex items-center gap-2 font-mono text-xs tracking-tight text-muted-foreground">
          <Cpu aria-hidden="true" className="size-3.5" />
          Agent action
        </span>
        <span className="inline-flex items-center rounded-full border border-border bg-background px-2 py-0.5 font-mono text-[0.6875rem] leading-none text-muted-foreground">
          {mock.sampleLabel}
        </span>
      </div>

      {/* Stage rail — propose · approve · audit, rendered in full so no-JS users see the whole
          paper trail. Each stage is numbered with Geist Mono for the Hebbia-style density. */}
      <ol className="divide-y divide-border">
        {/* 1 — PROPOSE */}
        <li className="grid grid-cols-1 gap-3 px-4 py-4 sm:grid-cols-[6rem_1fr] sm:gap-4">
          <StageLabel index={1} label={mock.steps[0].label} />
          <div className="flex flex-col gap-2">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              {mock.proposal.kind}
            </p>
            <p className="text-sm font-[510] text-foreground">{mock.proposal.title}</p>
            <p className="font-mono text-xs text-muted-foreground">{mock.proposal.detail}</p>
            <span className="mt-0.5 inline-flex w-fit items-center gap-1.5 rounded-md border border-border bg-muted px-2 py-1 text-xs text-foreground">
              <AlertTriangle aria-hidden="true" className="size-3.5 text-muted-foreground" />
              {mock.proposal.flag}
            </span>
          </div>
        </li>

        {/* 2 — APPROVE (the human gate; teal lives only on the primary affordance) */}
        <li className="grid grid-cols-1 gap-3 px-4 py-4 sm:grid-cols-[6rem_1fr] sm:gap-4">
          <StageLabel index={2} label={mock.steps[1].label} />
          <div className="flex flex-col gap-2">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              {mock.approve.caption}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <Button type="button" size="sm">
                {mock.approve.primary}
              </Button>
              <Button type="button" size="sm" variant="outline">
                {mock.approve.secondary}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">{mock.approve.note}</p>
          </div>
        </li>

        {/* 3 — AUDIT (all five fields, as a semantic definition list; stacks below sm) */}
        <li className="grid grid-cols-1 gap-3 px-4 py-4 sm:grid-cols-[6rem_1fr] sm:gap-4">
          <StageLabel index={3} label={mock.steps[2].label} />
          <div className="flex flex-col gap-2">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              {mock.audit.caption}
            </p>
            <dl className="overflow-hidden rounded-lg border border-border">
              {mock.audit.fields.map((field, i) => (
                <div
                  key={field.key}
                  className={`grid grid-cols-1 gap-0.5 px-3 py-2 sm:grid-cols-[7.5rem_1fr] sm:gap-3 ${
                    i > 0 ? "border-t border-border" : ""
                  }`}
                >
                  <dt className="font-mono text-xs text-muted-foreground">{field.key}</dt>
                  <dd
                    className={`text-xs text-foreground ${field.mono ? "font-mono" : ""}`}
                  >
                    {field.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </li>
      </ol>
    </figure>
  );
}

// A small numbered stage marker — Geist Mono index + label. Decorative arrow is aria-hidden; the
// reading order (Propose → Approve → Audit) carries the meaning.
function StageLabel({ index, label }: { index: number; label: string }) {
  return (
    <div className="flex items-center gap-2 sm:flex-col sm:items-start sm:gap-1">
      <span className="flex size-5 items-center justify-center rounded-full border border-border bg-background font-mono text-[0.6875rem] text-muted-foreground">
        {index}
      </span>
      <span className="flex items-center gap-1 text-sm font-[510] text-foreground">
        {label}
        {index < 3 && (
          <ArrowRight aria-hidden="true" className="size-3 text-muted-foreground sm:hidden" />
        )}
      </span>
    </div>
  );
}
