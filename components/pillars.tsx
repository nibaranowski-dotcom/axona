import { ArrowRight } from "lucide-react";

import { pillars } from "@/content/home";
import { cn } from "@/lib/utils";

// components/pillars.tsx — the three pillars section (#pillars). SERVER COMPONENT: heading, framing
// line, three bordered panels of chips, and a monochrome compose connective render as static
// HTML/CSS, readable with JavaScript disabled. No "use client", no state. Copy is verbatim from
// content/home.ts (sourced from specs/content/content.md §5). Below the fold — not the LCP element —
// ships zero client JS. Intrinsic-height panels, so no CLS on load.
//
// v2 redesign (HOME.4B): v1 shipped as three bare text columns — a list dump. This version SHOWS the
// product model: build the Primitives once → compose into Domain workflows → package per Vertical.
// Each pillar is a surface card (bg-card + 1px hairline, never a shadow); items are chips, not a
// vertical text list; a monochrome arrow between/through the panels expresses the composition.
//
// One accent (design.md): teal marks ONLY the two lead chips — "Procurement (the wedge)" and
// "Humanoids (first)" — driven by the `lead` flag in content (≤ 2 teal marks/viewport). The leads are
// outlined in the teal primary token, not filled, so two of them never make the section read "teal".
// Every other token is semantic; no inline hex, no raw color utilities. Nothing animates, so
// prefers-reduced-motion needs no special-casing. The compose arrows are decorative (aria-hidden).

const chipBase =
  "inline-flex items-center rounded-md border px-2.5 py-1 font-mono text-xs leading-none";

export function Pillars() {
  return (
    <section
      id="pillars"
      aria-labelledby="pillars-title"
      className="scroll-mt-24 border-t border-border"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-24 sm:py-28">
        <h2
          id="pillars-title"
          className="max-w-3xl text-balance text-2xl font-[680] tracking-[-0.01em] text-foreground sm:text-3xl lg:text-4xl"
        >
          {pillars.heading}
        </h2>
        {/* Framing line — the section's thesis, given lead-paragraph presence. The → glyphs are the
            literal arrows from content.md §5. */}
        <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          {pillars.framing}
        </p>

        {/* Three panels, three-up on lg and stacked on mobile. Each non-first panel carries the
            compose connective in the gap before it: a rightward arrow on lg, a downward one on
            mobile — monochrome and decorative (aria-hidden). */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:mt-14 lg:grid-cols-3 lg:gap-6">
          {pillars.columns.map((col, i) => (
            <div key={col.id} className="relative flex h-full flex-col">
              {i > 0 && (
                <>
                  {/* mobile: downward chevron in the vertical gap above this panel */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 text-muted-foreground lg:hidden"
                  >
                    <ArrowRight className="size-5 rotate-90" />
                  </span>
                  {/* desktop: rightward arrow in the horizontal gap to the left of this panel */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1/2 -left-[1.375rem] hidden -translate-y-1/2 text-muted-foreground lg:block"
                  >
                    <ArrowRight className="size-5" />
                  </span>
                </>
              )}

              <article className="flex h-full flex-col rounded-xl border border-border bg-card p-6">
                <h3 className="flex flex-wrap items-baseline gap-x-2">
                  <span className="text-sm font-[590] tracking-[-0.01em] text-foreground">
                    {col.label}
                  </span>
                  <span className="text-sm font-[400] text-muted-foreground">
                    ({col.parenthetical})
                  </span>
                </h3>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {col.items.map((item) => (
                    <li key={item.label}>
                      <span
                        className={cn(
                          chipBase,
                          item.lead
                            ? "border-primary font-[510] text-primary"
                            : "border-border bg-muted/40 text-foreground",
                        )}
                      >
                        {item.label}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Primitives-only gloss, set apart from the chips as a quiet footnote. */}
                {col.note && (
                  <p className="mt-auto pt-6 text-xs leading-relaxed text-muted-foreground">
                    {col.note}
                  </p>
                )}
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
