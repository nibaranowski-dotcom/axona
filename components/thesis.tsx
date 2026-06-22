import { thesis } from "@/content/home";

// components/thesis.tsx — the thesis / "our secret" section (#thesis). SERVER COMPONENT: an
// editorial heading and a single body column render as static HTML/CSS, fully readable with
// JavaScript disabled. Copy is verbatim from content/home.ts (sourced from specs/content/content.md
// §7). Below the fold — not the LCP element — and ships zero client JS.
//
// This section is pure argument: no product UI to hide behind, so type and space ARE the design.
// Hierarchy comes from Geist weight/size + tight heading tracking (−0.02em) and a constrained
// reading measure (~65ch), with generous vertical rhythm so the claim breathes. Near-monochrome:
// the only accent is one thin teal hairline (R7), decorative and aria-hidden. No card, no border
// box around the argument, no background fill — elevation is type and whitespace.
//
// Moat emphasis (R4): the closing payoff clause carries slightly more weight (text-foreground over
// the muted lead) using ONLY the verbatim text — the body is split on the existing clause, never
// rewritten or added to.
//
// Anchor contract: id="thesis" is the stable address for this section, a forward contract for
// future deep-links / scrollspy. Page order (R8): renders after the wedge today; later HOME
// sections (4/4B/5) insert above it to reach the final top-down IA.

export function Thesis() {
  const payoff = "a moat no horizontal incumbent can copy.";
  const idx = thesis.body.lastIndexOf(payoff);
  const lead = idx >= 0 ? thesis.body.slice(0, idx) : thesis.body;
  const moat = idx >= 0 ? thesis.body.slice(idx) : "";

  return (
    <section
      id="thesis"
      aria-labelledby="thesis-title"
      className="scroll-mt-24 border-t border-border"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-28 sm:py-36">
        <div className="max-w-3xl">
          {/* R7: the section's single quiet signal — one thin teal hairline. Decorative. */}
          <div aria-hidden="true" className="mb-8 h-px w-12 bg-primary" />
          <h2
            id="thesis-title"
            className="text-balance text-3xl font-[680] tracking-[-0.02em] text-foreground sm:text-4xl"
          >
            {thesis.heading}
          </h2>
          <p className="mt-8 max-w-[65ch] text-pretty text-lg leading-relaxed text-muted-foreground">
            {lead}
            {moat && <span className="font-[510] text-foreground">{moat}</span>}
          </p>
        </div>
      </div>
    </section>
  );
}
