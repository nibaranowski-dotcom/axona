import { wedge } from "@/content/site-v2";

// What it is — the agentic manufacturing co-pilot + per-unit build genealogy; the propose → approve →
// audit loop (human approves every step); one sample product screen (an agent-drafted PO, labeled).
export function Wedge() {
  const s = wedge.screen;
  return (
    <section id="wedge" className="mx-auto max-w-[1180px] px-7 pb-[88px]">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-faint">
            {wedge.eyebrow}
          </span>
          <h2 className="mt-[14px] max-w-[16ch] text-[clamp(30px,4vw,52px)] font-semibold leading-[1.02] tracking-[-0.035em] text-ink">
            {wedge.h2}
          </h2>
          <p className="mt-5 max-w-[46ch] text-[16px] leading-[1.6] text-body">
            {wedge.body}
          </p>
          <p className="mt-[18px] max-w-[46ch] text-[16px] font-medium leading-[1.6] text-ink">
            {wedge.bodyEmphasis}
          </p>
          <div className="mt-[26px] flex flex-wrap items-center gap-2.5">
            {wedge.steps.map((step, i) => (
              <span key={step.idx} className="flex items-center gap-2.5">
                <span
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-[9px] text-[13.5px] ${
                    step.active
                      ? "border-ink bg-lime font-semibold text-ink"
                      : "border-line2 bg-paper font-medium text-ink"
                  }`}
                >
                  <span
                    className={`font-mono text-[10px] ${step.active ? "text-ink/60" : "text-faint"}`}
                  >
                    {step.idx}
                  </span>
                  {step.label}
                </span>
                {i < wedge.steps.length - 1 && (
                  <span className="text-[13px] text-cap">→</span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* sample product screen — an agent-drafted PO awaiting approval */}
        <div className="overflow-hidden rounded-[16px] border border-line2 bg-paper shadow-[0_18px_40px_rgba(0,0,0,0.07)]">
          <div className="flex items-center justify-between border-b border-line bg-panel px-5 py-3.5">
            <span className="font-mono text-[11px] tracking-[0.06em] text-body">
              {s.cap}
            </span>
            <span className="font-mono text-[10px] tracking-[0.06em] text-cap">
              {s.sample}
            </span>
          </div>
          <div className="px-[22px] pb-2 pt-[22px]">
            <div className="mb-1.5 flex items-center gap-2.5">
              <span className="inline-flex size-[26px] items-center justify-center rounded-lg bg-ink font-mono text-[10px] text-white">
                AI
              </span>
              <span className="text-[14px] font-semibold text-ink">
                {s.agentLine}
              </span>
            </div>
            <p className="mb-[18px] ml-9 text-[13.5px] leading-[1.55] text-body">
              {s.desc}
            </p>
            <div className="overflow-hidden rounded-[10px] border border-line">
              {s.rows.map((r, i) => (
                <div
                  key={r.k}
                  className={`flex justify-between px-4 py-[11px] text-[13px] ${i < s.rows.length - 1 ? "border-b border-line" : ""}`}
                >
                  <span className="text-body">{r.k}</span>
                  <span className="font-mono text-ink">{r.v}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3 px-[22px] pb-[22px] pt-4">
            <span className="inline-flex items-center justify-center rounded-lg bg-lime px-[18px] py-2.5 text-[13.5px] font-semibold text-ink">
              {s.approve}
            </span>
            <span className="inline-flex items-center justify-center rounded-lg border border-line2 bg-paper px-[18px] py-2.5 text-[13.5px] font-semibold text-ink">
              {s.edit}
            </span>
            <span className="ml-auto text-[12px] text-dim">{s.note}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
