import { join } from "@/content/site-v2";
import { ArrowLink } from "@/components/v2/ui";

// Join / proof — lime-underlined headline, arrow link, and a bordered logo grid with a 2×2 photo
// stat cell. Logos + the "40hrs" stat are FICTIONAL sample data (see docs/pre-launch-swap.md).
export function Join() {
  return (
    <section className="mx-auto max-w-[1180px] px-7 pb-[30px] pt-[68px]">
      <h2 className="max-w-[24ch] text-[clamp(26px,3.4vw,40px)] font-medium leading-[1.12] tracking-[-0.02em]">
        <span className="font-bold text-ink [border-bottom:3px_solid_var(--lime)]">{join.headlineLead}</span>{" "}
        <span className="text-dim">{join.headlineTail}</span>
      </h2>
      <div className="mt-6">
        <ArrowLink href="#" label={join.link} />
      </div>

      <div className="mt-9 grid grid-cols-2 overflow-hidden rounded-[12px] border border-line [grid-auto-rows:128px] sm:grid-cols-3 md:grid-cols-6">
        {join.logos.map((g) => (
          <div
            key={g}
            className="flex items-center justify-center border-b border-r border-line bg-white transition-colors hover:bg-paper"
          >
            <span className="text-[17px] font-bold tracking-[-0.02em] text-logo">{g}</span>
          </div>
        ))}
        <div
          className="relative col-span-2 flex items-end p-[22px] text-white md:[grid-column:5/span_2] md:[grid-row:1/span_2]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, #2a2a2a 0, #2a2a2a 1px, #1a1a1a 1px, #1a1a1a 12px)",
          }}
        >
          <div>
            <div className="text-[46px] font-bold leading-none tracking-[-0.03em]">{join.photoStat.value}</div>
            <div className="mt-1 text-[13.5px] text-white/70">{join.photoStat.caption}</div>
          </div>
          <span className="absolute left-[18px] top-4 font-mono text-[10px] text-white/40">{join.photoStat.tag}</span>
        </div>
      </div>
    </section>
  );
}
