import { about } from "@/content/blueprint";
import { PillLink } from "@/components/blueprint/pill-link";

// About / thesis band (#about) — ink-ruled top/bottom over the engineering grid. Left: kicker + the
// thesis headline (humans + machines + agents). Right: the moat thesis + CTAs. This is the spine.
export function AboutBand() {
  return (
    <section id="about" className="blue-grid border-y border-ink">
      <div className="mx-auto grid max-w-[1320px] px-8 lg:grid-cols-2">
        <div className="border-line py-[90px] lg:border-r lg:pr-[60px]">
          <p className="kicker mb-[18px]">{about.kicker}</p>
          <h2 className="display text-[clamp(32px,4.2vw,52px)] text-ink">{about.heading}</h2>
        </div>
        <div className="flex flex-col gap-6 py-[90px] lg:pl-[60px]">
          <p className="text-[18px] font-[500] text-muted-foreground">{about.body}</p>
          <div className="flex flex-wrap gap-3.5">
            <PillLink href={about.ctaPrimary.href} label={about.ctaPrimary.label} variant="orange" />
            <PillLink
              href={about.ctaSecondary.href}
              label={about.ctaSecondary.label}
              variant="outline"
              chevron={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
