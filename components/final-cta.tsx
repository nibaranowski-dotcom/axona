import Link from "next/link";

import { Button } from "@/components/ui/button";
import { finalCta } from "@/content/home";

// components/final-cta.tsx — the closing CTA band (#request-access). SERVER COMPONENT: a level-2
// heading, a sub paragraph, and two link-buttons render as static HTML/CSS, fully readable and
// clickable with JavaScript disabled. No "use client", no state. Copy is verbatim from
// content/home.ts (sourced from specs/content/content.md §10). Below the fold — not the LCP element
// — ships zero client JS. All content is intrinsic-height text, so there is no CLS on load.
//
// Heading level (the named constraint, the prior failure): this band's heading is an h2, NEVER a
// level-1 heading. The page's single top-level heading lives in the hero (HOME.1); a second one
// breaks the document outline.
//
// Anchor contract (R4/R6/R7): the <section> IS `#request-access` — the destination the hero (HOME.1)
// and nav (SETUP.4) "Request access" links already point at; HOME.9 makes that target real (no 404).
// The primary CTA self-anchors here (#request-access) until CONV.1 wires the real request-access
// form into this band. The secondary "Build it with us" points at `#company` (HOME.8's talent
// section); until HOME.8 ships it resolves as an in-page anchor (no-op), never a 404.
//
// Token-driven (R10): every color/border is a semantic token / theme var from design.md — no inline
// hex, no raw Tailwind color utilities. ONE ACCENT: teal appears only on the primary Button (the
// default variant's bg-primary) and the focus ring; the secondary is an outline button, the band
// itself near-monochrome. A calm, confident close — not a loud banner. Elevation is a single hairline
// top border + a surface step (bg-muted/30), never a drop shadow. Nothing animates beyond the Button's
// own hover/focus transition, so prefers-reduced-motion needs no special-casing.
//
// Placement (R5): renders as the LAST child of <main>, immediately after <WhoItsFor /> in
// app/page.tsx — the closing band, matching content.md's §8 → §10 order.

export function FinalCta() {
  return (
    <section
      id="request-access"
      aria-labelledby="final-cta-title"
      className="scroll-mt-24 border-t border-border bg-muted/30"
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col items-start gap-6 px-6 py-24 sm:items-center sm:py-32 sm:text-center">
        <h2
          id="final-cta-title"
          className="text-balance text-3xl font-[680] tracking-[-0.02em] text-foreground sm:text-4xl lg:text-5xl"
        >
          {finalCta.heading}
        </h2>

        <p className="max-w-[52ch] text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          {finalCta.sub}
        </p>

        <div className="mt-2 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
          <Button asChild size="lg">
            <Link href={finalCta.primaryCta.href}>
              {finalCta.primaryCta.label}
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href={finalCta.secondaryCta.href}>
              {finalCta.secondaryCta.label}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
