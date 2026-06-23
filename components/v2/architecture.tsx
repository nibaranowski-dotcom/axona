import { architecture, verticals } from "@/content/site-v2";

// Architecture — the spine thesis: four layers (L1–L4) on one spine, the agent/intelligence layer
// flagged THE MOAT, and the primitives every workflow is built from. Then the verticals (humanoids
// first → carried to every robot company).
export function Architecture() {
  return (
    <section id="platform-architecture" className="mx-auto max-w-[1180px] px-7 py-[88px]">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <span className="font-mono text-[11px] tracking-[0.08em] text-faint">{architecture.eyebrow}</span>
          <h2 className="mt-[14px] max-w-[20ch] text-[clamp(30px,4vw,52px)] font-semibold leading-[1.02] tracking-[-0.035em] text-ink">
            {architecture.h2}
          </h2>
        </div>
        <p className="max-w-[36ch] text-[15px] leading-[1.5] text-[--body]">{architecture.intro}</p>
      </div>

      <div className="mt-11 flex flex-col gap-2.5">
        {architecture.layers.map((l) => (
          <div
            key={l.tag}
            className="flex flex-wrap items-center gap-7 rounded-[14px] border border-line bg-panel px-7 py-[26px]"
          >
            <div className="min-w-[230px] font-mono text-[11px] tracking-[0.06em] text-[--body]">{l.tag}</div>
            <div className="min-w-[240px] flex-1">
              <div className="flex items-center gap-2.5">
                <h3 className="text-[19px] font-semibold tracking-[-0.02em] text-ink">{l.title}</h3>
                {l.moat && (
                  <span className="rounded-full bg-lime px-2 py-[3px] text-[10.5px] font-semibold tracking-[0.04em] text-ink">
                    THE MOAT
                  </span>
                )}
              </div>
              <p className="mt-1.5 max-w-[74ch] text-[14px] leading-[1.45] text-[--body]">{l.body}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 border-t border-line pt-8">
        <div className="mb-[18px] font-mono text-[11px] tracking-[0.06em] text-faint">{architecture.primitivesLabel}</div>
        <div className="flex flex-wrap gap-2.5">
          {architecture.primitives.map((p) => (
            <span
              key={p}
              className="rounded-full border border-line2 bg-white px-[18px] py-2.5 text-[14px] font-medium text-ink transition-colors hover:border-ink"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Verticals() {
  return (
    <section id="verticals" className="mx-auto max-w-[1180px] px-7 pb-10 pt-5">
      <div className="dotgrid rounded-[16px] bg-panel px-10 py-14">
        <span className="font-mono text-[11px] tracking-[0.08em] text-faint">{verticals.eyebrow}</span>
        <h2 className="mt-[14px] max-w-[22ch] text-[clamp(28px,3.6vw,46px)] font-semibold leading-[1.04] tracking-[-0.03em] text-ink">
          {verticals.h2}
        </h2>
        <div className="mt-9 grid grid-cols-2 gap-3 md:grid-cols-4">
          {verticals.items.map((v) => (
            <div
              key={v.idx}
              className="relative flex min-h-[96px] flex-col justify-between rounded-[12px] border border-line2 bg-white px-5 py-[22px] transition-colors hover:border-ink"
            >
              {v.tag && (
                <span className="absolute right-[14px] top-[14px] rounded-full bg-lime px-2 py-[3px] text-[10px] font-semibold tracking-[0.04em] text-ink">
                  {v.tag}
                </span>
              )}
              <span className="font-mono text-[11px] text-logo">{v.idx}</span>
              <span className="text-[18px] font-semibold tracking-[-0.02em] text-ink">{v.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
