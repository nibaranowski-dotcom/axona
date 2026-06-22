import { pillars } from "@/content/home";
import { cn } from "@/lib/utils";

// components/pillars.tsx — the three pillars section (#pillars). SERVER COMPONENT: a level-2
// heading, a framing line, and three token-styled columns render as static HTML/CSS, readable with
// JavaScript disabled. No "use client", no state. Copy is verbatim from content/home.ts (sourced
// from specs/content/content.md §5). Below the fold — not the LCP element — ships zero client JS.
// The columns are intrinsic-height text lists, so there is no CLS on load.
//
// What this section argues (for a model-research CTO like Julia): build the Primitives once →
// compose them into Domain workflows → package per Vertical. The combinatorial leverage that turns
// one wedge into a platform across an industry. This is the MODEL — it is NOT the four
// implementation layers (that is <HowItWorks /> / content.md §4, a separate shipped section).
//
// Column order (R5/R9): Primitives → Domains → Verticals, left→right on desktop, and the same DOM
// order when stacked on mobile — so AT reads them build → compose → package. The outer <ol> is a
// list of three labeled regions (each <li> headed by its pillar name as an <h3>); each column's
// items are a nested semantic list. Rendered as live text, never a rasterized graphic; not div soup.
//
// Token-driven (R11, the named constraint): every color/border/radius is a semantic token / theme
// var from design.md — no inline hex, no raw Tailwind color utilities. The single teal signal (R6)
// marks the live wedge only — "Procurement (the wedge)" and "Humanoids (first)" in text-primary.
// The component detects those by the verbatim parentheticals in the copy, so the words carry the
// meaning and teal only reinforces it (passes "don't rely on color alone"). Near-monochrome
// otherwise; ≤ 2 teal marks per viewport. Elevation is hairline borders + surface steps, never a
// drop shadow. Nothing animates, so prefers-reduced-motion needs no special-casing.

// The wedge markers carry the single accent. Detected from the verbatim parentheticals (R6) rather
// than a separate flag, so copy and signal can never drift apart.
function isWedgeMarker(item: string): boolean {
  return item.includes("(the wedge)") || item.includes("(first)");
}

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
        <p className="mt-5 max-w-[60ch] text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          {pillars.framing}
        </p>

        {/* Three labeled regions. On mobile they stack (border-t hairline between); at md+ they sit
            side by side, separated by thin vertical hairlines (border-l) — not boxed gradient cards. */}
        <ol
          role="list"
          className="mt-14 grid grid-cols-1 gap-y-10 md:grid-cols-3 md:gap-y-0"
        >
          {pillars.columns.map((col, i) => (
            <li
              key={col.id}
              className={cn(
                // Even internal spacing; flush outer edges so the columns align to the heading.
                "min-w-0 md:px-8 md:first:pl-0 md:last:pr-0",
                // Hairline separators: a top rule between stacked columns on mobile, a vertical
                // left rule between columns at md+ (surface steps + hairlines, never a card/shadow).
                i > 0 &&
                  "border-t border-border pt-10 md:border-t-0 md:border-l md:pt-0",
              )}
            >
              {/* Pillar header: the name as a quiet eyebrow + the `kind` parenthetical, muted. */}
              <h3 className="flex flex-wrap items-baseline gap-x-2">
                <span className="text-xs font-[680] uppercase tracking-[0.1em] text-foreground">
                  {col.name}
                </span>
                <span className="text-xs font-[400] text-muted-foreground">
                  ({col.kind})
                </span>
              </h3>

              <ul role="list" className="mt-5 space-y-2.5">
                {col.items.map((item) => {
                  const wedge = isWedgeMarker(item);
                  return (
                    <li
                      key={item}
                      className={cn(
                        "text-sm leading-snug",
                        wedge
                          ? "font-[510] text-primary"
                          : "text-muted-foreground",
                      )}
                    >
                      {item}
                    </li>
                  );
                })}
              </ul>

              {/* Primitives-only trailing note, modeled distinctly from the list items. */}
              {col.note && (
                <p className="mt-6 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
                  {col.note}
                </p>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
