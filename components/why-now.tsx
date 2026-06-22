import { whyNow } from "@/content/home";
import { cn } from "@/lib/utils";

// components/why-now.tsx — the "Why now" timing section (#why-now). SERVER COMPONENT: a level-2
// heading and three ordered points render as static HTML/CSS, fully readable with JavaScript
// disabled. No "use client", no state. Copy is verbatim from content/home.ts (sourced from
// specs/content/content.md §6). Below the fold — not the LCP element — ships zero client JS. The
// points are intrinsic-height text items, so there is no CLS on load.
//
// What this section argues (for a diligence-trained reader — a16z American Dynamism, or a
// model-frontier CTO like Julia): the timing thesis in three points — (1) robotics is inflecting,
// (2) the AI substrate to build an operating layer now exists, (3) forward-deployed delivery is the
// right go-to-market for this moment. Qualitative by design: no fabricated metric, market-size
// figure, funding stat, or date ships here (pre-launch integrity, ../CLAUDE.md).
//
// Order contract (R7/R8): renders between <Pillars /> (#pillars) and <Thesis /> (#thesis), per
// content.md §6 sitting between §5 pillars and §7 thesis. The three points are a semantic <ol> read
// top→bottom; the ordinal meaning is carried by the <ol>, so the visual index markers are
// decorative (aria-hidden) and order never depends on color alone.
//
// Token-driven (R10, the named constraint): every color/border/radius is a semantic token / theme
// var from design.md — no inline hex, no raw Tailwind color utilities. The single teal signal (R5)
// is one thin hairline above the heading (bg-primary), decorative and aria-hidden — structural, not
// a number (no statistic exists to color). The ordinals stay muted; the section reads
// near-monochrome (one accent per viewport). Elevation is hairline borders + surface steps, never a
// drop shadow. Nothing animates, so prefers-reduced-motion needs no special-casing.

export function WhyNow() {
  return (
    <section
      id="why-now"
      aria-labelledby="why-now-title"
      className="scroll-mt-24 border-t border-border"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-24 sm:py-28">
        <div className="max-w-3xl">
          {/* R5: the section's single quiet signal — one thin teal hairline. Decorative. */}
          <div aria-hidden="true" className="mb-8 h-px w-12 bg-primary" />
          <h2
            id="why-now-title"
            className="text-balance text-2xl font-[680] tracking-[-0.01em] text-foreground sm:text-3xl lg:text-4xl"
          >
            {whyNow.heading}
          </h2>
        </div>

        {/* Three ordered points. The <ol> carries the ordinal meaning; the visual "1·2·3" is
            decorative (aria-hidden). On mobile they stack (border-t hairline between); the same DOM
            order is read by AT. Each point keeps a readable measure — not boxed gradient cards. */}
        <ol role="list" className="mt-14 max-w-3xl">
          {whyNow.points.map((point, i) => (
            <li
              key={point.id}
              className={cn(
                "flex items-baseline gap-5 sm:gap-6",
                // Hairline separators + rhythm between points (surface steps + hairlines, never a
                // card/shadow). First item has no top rule.
                i > 0 && "mt-8 border-t border-border pt-8",
              )}
            >
              {/* Decorative ordinal — order comes from the <ol>, so this is aria-hidden and quiet
                  (muted, mono). Fixed width reserves space and aligns the point text. */}
              <span
                aria-hidden="true"
                className="shrink-0 select-none font-mono text-sm font-[400] tabular-nums text-muted-foreground"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="min-w-0 text-pretty text-base leading-relaxed text-foreground sm:text-lg">
                {point.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
