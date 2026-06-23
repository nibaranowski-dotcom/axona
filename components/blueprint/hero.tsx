import { hero } from "@/content/blueprint";
import { PillLink } from "@/components/blueprint/pill-link";

// Hero — two columns over the 96px engineering grid. Left: mono meta row, the page's single <h1>
// (with the orange highlighter on the signal word), subhead, dual pill CTAs. Right: striped
// placeholder standing in for a fleet-topology schematic. Server Component; LCP-safe (static text).
export function BlueprintHero() {
  return (
    <section className="blue-grid border-b border-line">
      <div className="mx-auto grid max-w-[1320px] px-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="border-line py-16 lg:border-r lg:py-24 lg:pr-[60px]">
          <div className="mono-label flex justify-between text-muted-foreground">
            <span>{hero.metaLeft}</span>
            <span>{hero.metaRight}</span>
          </div>

          <h1 className="display mt-7 text-[clamp(46px,6vw,90px)] leading-[1.12] text-ink">
            {hero.h1Lead}
            <br />
            <span className="hl hl-orange mt-[0.08em] inline-block">{hero.h1Highlight}</span>
          </h1>

          <p className="mt-8 max-w-[46ch] text-[20px] font-[500] text-ink">{hero.sub}</p>

          <div className="mt-9 flex flex-wrap gap-3.5">
            <PillLink href={hero.ctaPrimary.href} label={hero.ctaPrimary.label} variant="ink" />
            <PillLink
              href={hero.ctaSecondary.href}
              label={hero.ctaSecondary.label}
              variant="outline"
              chevron={false}
            />
          </div>
        </div>

        <div className="pb-16 lg:py-0">
          <div className="ph h-full min-h-[300px] lg:min-h-[460px]">
            <span>{hero.placeholder}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
