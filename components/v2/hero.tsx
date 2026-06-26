import { hero } from "@/content/site-v2";
import { LimeButton, ArrowLink } from "@/components/v2/ui";

// Hero — honest status chip, the single <h1>, manufacturing-led subhead, one CTA + a "how it works"
// link, and ONE real product visual: the SN-2208 build-genealogy widget, visibly labeled as sample.
export function Hero() {
  const w = hero.widget;
  return (
    <section className="mx-auto max-w-[1180px] px-7 pt-[72px]">
      <div className="mb-7 inline-flex items-center gap-[9px] rounded-full border border-line2 bg-panel py-[7px] pl-3 pr-3.5">
        <span className="size-[7px] rounded-full bg-ok" />
        <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-body">
          {hero.statusChip}
        </span>
      </div>

      <h1 className="max-w-[13ch] text-[clamp(48px,8.2vw,104px)] font-semibold leading-[0.92] tracking-[-0.045em] text-ink">
        {hero.h1}
      </h1>
      <p className="mt-6 max-w-[54ch] text-[clamp(17px,1.8vw,21px)] leading-[1.55] text-body">
        {hero.sub}
      </p>

      <div className="mt-[34px] flex flex-wrap items-center gap-[18px]">
        <LimeButton
          href="#partner"
          label={hero.cta}
          className="px-[22px] py-3 text-[15px]"
        />
        <ArrowLink href="#wedge" label={hero.secondaryCta} />
      </div>

      {/* One real product visual — SN-2208 build genealogy (sample, labeled). */}
      <div className="dotgrid relative mt-[52px] flex min-h-[480px] items-center justify-center overflow-hidden rounded-[16px] bg-panel">
        <span className="absolute left-6 top-[22px] font-mono text-[10px] uppercase tracking-[0.08em] text-cap">
          {hero.sampleLabel}
        </span>
        <div className="flex w-[min(720px,86%)] flex-wrap items-stretch justify-center gap-5 py-6">
          {/* build-genealogy card */}
          <div className="min-w-[300px] flex-1 overflow-hidden rounded-[14px] border border-line2 bg-paper shadow-[0_18px_40px_rgba(0,0,0,0.07)]">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <span className="font-mono text-[11px] tracking-[0.06em] text-body">
                {w.unit}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-lime px-[9px] py-1 text-[11px] font-semibold text-ink">
                <span className="size-1.5 rounded-full bg-ink" />
                {w.status}
              </span>
            </div>
            <div className="px-5 py-[18px]">
              <div className="mb-2 flex items-end justify-between">
                <span className="text-[13px] text-body">
                  {w.genealogyLabel}
                </span>
                <span className="font-mono text-[13px] font-medium text-ink">
                  {w.pct}
                </span>
              </div>
              <div className="mb-[18px] h-2 overflow-hidden rounded-full bg-skel">
                <span
                  className="block h-full bg-lime"
                  style={{ width: w.pct }}
                />
              </div>
              <div className="flex flex-col">
                {w.rows.map((r, i) => (
                  <div
                    key={r.label}
                    className={`flex items-center justify-between py-[9px] ${i < w.rows.length - 1 ? "border-b border-line" : ""}`}
                  >
                    <span className="flex items-center gap-[9px]">
                      <span
                        className={`size-[7px] rounded-full ${r.state === "ok" ? "bg-ok" : "bg-logo"}`}
                      />
                      <span className="text-[13.5px] text-ink">{r.label}</span>
                    </span>
                    <span
                      className={`font-mono text-[11px] ${r.state === "ok" ? "text-dim" : "text-cap"}`}
                    >
                      {r.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t border-line px-5 py-[13px] font-mono text-[11px] tracking-[0.04em] text-faint">
              {w.footer}
            </div>
          </div>

          {/* approval + agent-draft cards */}
          <div className="flex w-[230px] flex-none flex-col gap-3.5">
            <div className="rounded-[14px] border border-line2 bg-paper p-4 shadow-[0_18px_40px_rgba(0,0,0,0.07)]">
              <div className="mb-2.5 font-mono text-[9.5px] tracking-[0.08em] text-cap">
                {w.workOrderCap}
              </div>
              <div className="mb-3 flex items-center gap-2 text-[12px] font-semibold text-ok">
                <span className="size-[7px] rounded-full bg-ok" />
                {w.workOrderStatus}
              </div>
              <div className="flex flex-col gap-[7px]">
                <span className="h-[7px] w-full rounded-full bg-skel" />
                <span className="h-[7px] w-[64%] rounded-full bg-skel" />
              </div>
            </div>
            <div className="rounded-[14px] border border-line2 bg-paper p-4 shadow-[0_18px_40px_rgba(0,0,0,0.07)]">
              <div className="mb-2.5 font-mono text-[9.5px] tracking-[0.08em] text-cap">
                {w.agentCap}
              </div>
              <div className="flex flex-col gap-[7px]">
                <span className="h-[7px] w-full rounded-full bg-skel" />
                <span className="h-[7px] w-[80%] rounded-full bg-skel" />
                <span className="h-[7px] w-[54%] rounded-full bg-skel" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
