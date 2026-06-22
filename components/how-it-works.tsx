import { howItWorks } from "@/content/home";
import { cn } from "@/lib/utils";

// components/how-it-works.tsx — the "How it works" 4-layer architecture section (#how-it-works).
// SERVER COMPONENT: heading + the four-layer stacked diagram render as static HTML/CSS (+ token-
// colored inline-CSS motif), fully readable with JavaScript disabled. No "use client", no state.
// Copy is verbatim from content/home.ts (sourced from specs/content/content.md §4). Below the fold —
// not the LCP element — ships zero client JS. The diagram height is intrinsic (text bands), so no CLS.
//
// Anchor contract (R7): id="how-it-works" is the destination of the SETUP.4 header "How it works"
// nav link. This story provides that target — never a dead link. Keep the id stable.
//
// Stack orientation (R4/R9): the visual diagram stacks BOTTOM-UP — Foundation is the base, Vertical
// editions is the top — mirroring how data flows up into the Intelligence spine and packaged product
// flows back down. `howItWorks.layers` is stored bottom-up (Foundation → … → Vertical editions); we
// reverse it so DOM / screen-reader reading order is top→base (Vertical editions first, Foundation
// last) and the visual top is the DOM top. Each layer is an <li> with its name as an <h3>, so AT
// reads the architecture as an ordered, labeled list in stack order — not an image, not div soup.
//
// Token-driven (R11, the named constraint): every color/border/radius is a semantic token / theme
// var from design.md — no inline hex, no raw Tailwind color utilities. The one teal signal (R5) is
// the axon motif: a thin var(--primary) line marking the signal path, plus the Intelligence spine's
// left accent. Near-monochrome otherwise; ≤ 2 teal marks per viewport. The motif is decorative and
// aria-hidden; it renders static (no animation) so prefers-reduced-motion needs no special-casing.

export function HowItWorks() {
  // Render top-of-stack first (Vertical editions) down to the base (Foundation).
  const topDown = [...howItWorks.layers].reverse();

  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-title"
      className="scroll-mt-24 border-t border-border"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-24 sm:py-28">
        <h2
          id="how-it-works-title"
          className="max-w-3xl text-balance text-2xl font-[680] tracking-[-0.01em] text-foreground sm:text-3xl lg:text-4xl"
        >
          {howItWorks.heading}
        </h2>

        {/* The stacked diagram. A left "axon" rail (decorative, sm+) carries the single teal signal
            up into the Intelligence spine and product back down; the bands sit flush in one bordered,
            hairline-divided container — the "one system" reading. */}
        <div className="mt-12 flex max-w-3xl gap-4 sm:gap-5">
          {/* R5: the one signal motif — a thin teal axon line, decorative. Hidden on narrow mobile so
              bands take the full width (the spine's left accent still marks the heart there). */}
          <div
            aria-hidden="true"
            className="relative hidden w-3 shrink-0 sm:block"
          >
            <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-primary" />
          </div>

          {/* Bottom-up visual stack; DOM order is top→base (Vertical editions → Foundation). */}
          <ol className="flex-1 divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
            {topDown.map((layer) => {
              const isSpine = layer.id === "intelligence";
              return (
                <li
                  key={layer.id}
                  className={cn(
                    "p-5 sm:p-6",
                    // The Intelligence spine is the structural heart — the single teal accent.
                    isSpine && "border-l-2 border-l-primary",
                  )}
                >
                  <h3
                    className={cn(
                      "text-base font-[590] tracking-[-0.01em] text-foreground sm:text-lg",
                      isSpine && "font-[680]",
                    )}
                  >
                    {layer.name}
                  </h3>
                  <p className="mt-1.5 max-w-[60ch] text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {layer.description}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
