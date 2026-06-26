import { problem } from "@/content/site-v2";

// The problem — eyebrow + headline + three concrete points (no unsourced stat), on a hairline grid.
export function Problem() {
  return (
    <section className="mx-auto max-w-[1180px] px-7 py-[88px]">
      <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-faint">
        {problem.eyebrow}
      </span>
      <h2 className="mt-[14px] max-w-[18ch] text-[clamp(30px,4vw,52px)] font-semibold leading-[1.02] tracking-[-0.035em] text-ink">
        {problem.h2}
      </h2>
      <div className="mt-12 grid gap-px overflow-hidden rounded-[14px] border border-line bg-line md:grid-cols-3">
        {problem.items.map((item) => (
          <div key={item.idx} className="bg-paper p-8">
            <div className="mb-[18px] font-mono text-[11px] tracking-[0.06em] text-faint">
              {item.idx}
            </div>
            <h3 className="mb-2 text-[19px] font-semibold tracking-[-0.02em] text-ink">
              {item.title}
            </h3>
            <p className="text-[14.5px] leading-[1.55] text-body">
              {item.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
