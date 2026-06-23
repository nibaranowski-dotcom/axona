import { hero, agentStats } from "@/content/site-v2";
import { EmailCapture, MonoChip, Skel } from "@/components/v2/ui";

// Hero — eyebrow + (fictional) parts counter, the page's single <h1>, subhead, visual email capture,
// and the dotgrid hero panel with a floating mock stack centered on the per-unit build-genealogy
// card (the thesis spine: humans + machines + agents, per-unit traceability).
export function Hero() {
  return (
    <section className="mx-auto max-w-[1180px] px-7 pt-16">
      <div className="mb-[26px] flex flex-wrap items-center gap-2.5">
        <span className="font-mono text-[11px] tracking-[0.06em] text-faint">{hero.eyebrow}</span>
        <MonoChip>{hero.counter}</MonoChip>
      </div>

      <h1 className="max-w-[13ch] text-[clamp(48px,8.2vw,108px)] font-semibold leading-[0.92] tracking-[-0.045em] text-ink">
        {hero.h1}
      </h1>
      <p className="mt-[22px] max-w-[52ch] text-[clamp(17px,1.8vw,21px)] text-[--body]">{hero.sub}</p>

      <EmailCapture placeholder={hero.emailPlaceholder} cta={hero.cta} href="#demo" className="mt-[34px]" />

      {/* Hero panel with floating mock stack */}
      <div className="dotgrid relative mt-12 flex min-h-[540px] items-center justify-center overflow-hidden rounded-[14px] bg-panel">
        <div className="relative h-[340px] w-[min(560px,80%)]">
          {/* top-left: BOM / work order */}
          <div className="absolute left-0 top-12 w-[230px] rounded-[10px] border border-line2 bg-white p-4 shadow-[0_18px_40px_rgba(0,0,0,0.07)]">
            <div className="font-mono text-[9.5px] tracking-[0.08em] text-cap">BOM · WORK ORDER</div>
            <Skel widths={["100%", "70%", "84%"]} />
          </div>

          {/* bottom-right: routed for approval */}
          <div className="absolute bottom-0 right-0 w-[250px] rounded-[10px] border border-line2 bg-white p-4 shadow-[0_18px_40px_rgba(0,0,0,0.07)]">
            <div className="flex items-center gap-2 text-[11px] font-semibold text-ok">
              <span className="size-[7px] rounded-full bg-ok" />
              ROUTED FOR APPROVAL
            </div>
            <Skel widths={["100%", "60%"]} />
          </div>

          {/* center: per-unit build genealogy (the centerpiece) */}
          <div
            className="absolute left-1/2 top-1/2 flex h-[138px] w-[212px] -translate-x-1/2 -translate-y-1/2 -rotate-[8deg] flex-col justify-between rounded-[13px] p-[18px] text-white shadow-[0_26px_50px_rgba(0,0,0,0.28)]"
            style={{ backgroundImage: "linear-gradient(135deg, #1a1a1a, #000)" }}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] tracking-[0.06em] text-white/55">UNIT · SN-2208</span>
              <span className="flex items-center gap-[5px] text-[10px] font-semibold text-lime">
                <span className="size-[6px] rounded-full bg-lime" />
                IN BUILD
              </span>
            </div>
            <div className="flex items-end gap-[5px]">
              {[14, 22, 30].map((h) => (
                <span key={h} className="w-[7px] rounded-[2px] bg-lime" style={{ height: h }} />
              ))}
              {[24, 16].map((h) => (
                <span key={h} className="w-[7px] rounded-[2px] bg-white/25" style={{ height: h }} />
              ))}
              <span className="ml-auto font-mono text-[11px] font-semibold">84%</span>
            </div>
            <div className="text-[12px] font-semibold tracking-[-0.01em] text-white/85">
              Build genealogy · 142 parts traced
            </div>
          </div>
        </div>
      </div>

      <AgentsStrip />
    </section>
  );
}

function AgentsStrip() {
  return (
    <div className="mt-7 flex flex-wrap items-center gap-y-3 border-y border-line py-[14px]">
      <div className="mr-[22px] flex items-center gap-2 border-r border-line pr-[22px]">
        <span className="grid grid-cols-3 gap-[2px]" aria-hidden="true">
          {[1, 1, 0, 1, 0, 1].map((on, i) => (
            <span key={i} className={`size-[3px] ${on ? "bg-ink" : "bg-line2"}`} />
          ))}
        </span>
        <span className="font-mono text-[10.5px] tracking-[0.06em] text-[--body]">{agentStats.label}</span>
      </div>
      <div className="flex flex-1 flex-wrap items-center gap-x-[26px] gap-y-2">
        {agentStats.stats.map((a) => (
          <div key={a.label} className="flex items-center gap-2">
            <span className="font-mono text-[10px] tracking-[0.04em] text-dim">{a.label}:</span>
            <MonoChip>{a.value}</MonoChip>
          </div>
        ))}
      </div>
    </div>
  );
}
