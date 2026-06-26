import {
  platform,
  systems,
  type Module,
  type ExpandStep,
} from "@/content/site-v2";
import { cn } from "@/lib/utils";

// The asymmetric square mark used on each module card.
function ModuleMark() {
  return (
    <span
      aria-hidden="true"
      className="mt-[3px] shrink-0 bg-ink"
      style={{ width: 9, height: 9, borderRadius: "0 5px 0 5px" }}
    />
  );
}

function ModuleCard({ m }: { m: Module }) {
  return (
    <div className="flex min-h-[112px] flex-col justify-between rounded-[12px] border border-line2 bg-white p-4 transition-colors hover:border-ink">
      <div className="flex items-start justify-between gap-2">
        <ModuleMark />
        {m.agents && (
          <span className="inline-flex items-center gap-[5px] whitespace-nowrap rounded-full bg-lime px-[7px] py-[2px] font-mono text-[9px] font-medium text-ink">
            <span className="size-[5px] rounded-full bg-ink" />
            {m.agents}
          </span>
        )}
      </div>
      <div>
        <div className="text-[14.5px] font-semibold tracking-[-0.02em] text-ink">
          {m.name}
        </div>
        <div className="mt-[3px] text-[11.5px] leading-[1.35] text-faint">
          {m.desc}
        </div>
      </div>
    </div>
  );
}

function ExpandPill({ s }: { s: ExpandStep }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-[9px] rounded-full border px-[14px] py-[9px] text-[13px] font-medium",
        s.active
          ? "border-ink bg-ink text-white"
          : "border-line2 bg-white text-[--body]",
      )}
    >
      <span className="font-mono text-[10px] opacity-70">{s.idx}</span>
      {s.label}
    </span>
  );
}

export function Platform() {
  return (
    <section
      id="platform"
      className="mx-auto max-w-[1180px] px-7 pb-[30px] pt-[72px]"
    >
      <h2 className="max-w-[18ch] text-[clamp(30px,4vw,52px)] font-semibold leading-[1.02] tracking-[-0.035em] text-ink">
        {platform.h2}
      </h2>
      <p className="mt-1.5 max-w-[46ch] text-[clamp(18px,2vw,24px)] font-medium text-dim">
        {platform.sub}
      </p>

      {/* Module map / launcher */}
      <div className="mt-10 flex flex-col gap-[26px]">
        {platform.groups.map((g) => (
          <div key={g.label}>
            <div className="mb-[14px] flex items-center gap-3">
              <span className="font-mono text-[11px] tracking-[0.08em] text-faint">
                {g.label}
              </span>
              <span className="h-px flex-1 bg-line" />
            </div>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
              {g.modules.map((m) => (
                <ModuleCard key={m.name} m={m} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Land & expand band */}
      <div className="mt-9 flex flex-wrap items-center gap-7 rounded-[14px] border border-line px-7 py-[30px]">
        <div className="min-w-[280px] flex-1">
          <span className="font-mono text-[11px] tracking-[0.08em] text-faint">
            {platform.expand.eyebrow}
          </span>
          <h3 className="mt-3 max-w-[24ch] text-[clamp(20px,2.2vw,28px)] font-semibold leading-[1.1] tracking-[-0.025em] text-ink">
            {platform.expand.h3}
          </h3>
          <p className="mt-2.5 max-w-[46ch] text-[14px] leading-[1.5] text-[--body]">
            {platform.expand.body}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          {platform.expand.steps.map((s) => (
            <span key={s.idx} className="flex items-center gap-2.5">
              <ExpandPill s={s} />
              {s.arrow && (
                <span className="text-logo" aria-hidden="true">
                  →
                </span>
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Systems() {
  return (
    <section className="mx-auto max-w-[1180px] px-7 py-[88px] text-center">
      <h2 className="text-[clamp(30px,4vw,52px)] font-semibold leading-[1.02] tracking-[-0.035em] text-ink">
        {systems.h2}
      </h2>
      <p className="mx-auto mt-3 max-w-[48ch] text-[16px] text-dim">
        {systems.sub}
      </p>
      <div className="mt-12 flex flex-wrap items-center justify-center gap-[18px]">
        {systems.legacy.map((l) => (
          <div
            key={l}
            className="flex h-[150px] w-[200px] items-center justify-center rounded-[10px] border border-line bg-panel font-mono text-[11px] text-cap"
          >
            {l}
          </div>
        ))}
      </div>
    </section>
  );
}
