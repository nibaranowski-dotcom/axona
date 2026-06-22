import { problem } from "@/content/home";

// components/problem.tsx — the problem section (#problem). SERVER COMPONENT: a heading and one
// body paragraph render as static HTML/CSS, fully readable with JavaScript disabled. Copy is
// verbatim from content/home.ts (sourced from specs/content/content.md §2). Below the fold — not
// the LCP element — and ships zero client JS.
//
// The "pain" beat between the hero (category) and the wedge (proof): type does the work, near-
// monochrome, no icon row / boxed callout / teal fill. Elevation is a single 1px hairline, never
// a shadow.
//
// Anchor contract: id="problem" is the stable address for this section. The header nav does not
// link here today; the id is a forward contract for future deep-links / scrollspy — never a dead
// link if later referenced.

export function Problem() {
  return (
    <section
      id="problem"
      aria-labelledby="problem-title"
      className="scroll-mt-24 border-t border-border"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-24 sm:py-28">
        <h2
          id="problem-title"
          className="max-w-3xl text-balance text-2xl font-[680] tracking-[-0.01em] text-foreground sm:text-3xl"
        >
          {problem.heading}
        </h2>
        <p className="mt-6 max-w-[65ch] text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          {problem.body}
        </p>
      </div>
    </section>
  );
}
