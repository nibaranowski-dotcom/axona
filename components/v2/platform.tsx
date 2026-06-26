import { platform, verticals } from "@/content/site-v2";

// The platform — four layers on one spine (kept light: a hairline stack, no "moat" on marketing).
export function Platform() {
  return (
    <section id="platform" className="mx-auto max-w-[1180px] px-7 pb-10">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-faint">
            {platform.eyebrow}
          </span>
          <h2 className="mt-[14px] max-w-[20ch] text-[clamp(30px,4vw,52px)] font-semibold leading-[1.02] tracking-[-0.035em] text-ink">
            {platform.h2}
          </h2>
        </div>
        <p className="max-w-[36ch] text-[15px] leading-[1.55] text-body">
          {platform.intro}
        </p>
      </div>
      <div className="mt-10 flex flex-col gap-2.5">
        {platform.layers.map((l) => (
          <div
            key={l.tag}
            className="flex flex-wrap items-center gap-7 rounded-[14px] border border-line bg-panel px-7 py-6"
          >
            <div className="min-w-[210px] font-mono text-[11px] tracking-[0.06em] text-body">
              {l.tag}
            </div>
            <div className="min-w-[240px] flex-1">
              <h3 className="text-[19px] font-semibold tracking-[-0.02em] text-ink">
                {l.title}
              </h3>
              <p className="mt-1.5 max-w-[74ch] text-[14px] leading-[1.5] text-body">
                {l.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Verticals — humanoids first (honestly marked), the rest "coming soon".
export function Verticals() {
  return (
    <section className="mx-auto max-w-[1180px] px-7 pb-10 pt-5">
      <div className="dotgrid rounded-[16px] bg-panel px-10 py-[52px]">
        <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-faint">
          {verticals.eyebrow}
        </span>
        <h2 className="mt-[14px] max-w-[24ch] text-[clamp(26px,3.4vw,42px)] font-semibold leading-[1.06] tracking-[-0.03em] text-ink">
          {verticals.h2}
        </h2>
        <div className="mt-9 grid grid-cols-2 gap-3 md:grid-cols-4">
          {verticals.items.map((v) => {
            const first = v.tag === "First";
            return (
              <div
                key={v.idx}
                className="relative flex min-h-[96px] flex-col justify-between rounded-[12px] border border-line2 bg-paper px-5 py-[22px]"
              >
                {first ? (
                  <span className="absolute right-[14px] top-[14px] rounded-full bg-lime px-2 py-[3px] text-[10px] font-semibold tracking-[0.04em] text-ink">
                    First
                  </span>
                ) : (
                  <span className="absolute right-[14px] top-[14px] rounded-full border border-line2 px-2 py-[3px] font-mono text-[9px] tracking-[0.08em] text-cap">
                    SOON
                  </span>
                )}
                <span className="font-mono text-[11px] text-logo">{v.idx}</span>
                <span
                  className={`text-[18px] font-semibold tracking-[-0.02em] ${first ? "text-ink" : "text-dim"}`}
                >
                  {v.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
