import Link from "next/link";

import { Button } from "@/components/ui/button";
import { AxonSignal } from "@/components/axon-signal";
import { hero } from "@/content/home";

// components/hero.tsx — the homepage hero. Server Component (no "use client"): the headline,
// subhead, CTAs, and micro-trust line are static server-rendered HTML/CSS so the headline is the
// LCP element and the hero ships zero render-blocking JS. The motif (<AxonSignal />) is a
// pure-CSS Server Component too — the whole hero is interactive with JS disabled.
//
// Copy comes from content/home.ts (verbatim from messaging.md). The page's single top-level
// heading lives here — the shell (SETUP.4) intentionally owns none.
//
// Anchor contract: the CTAs point at homepage section ids owned by later stories —
// `#request-access` (CONV.1) and `#how-it-works` (HOME.4). Until those land they resolve as
// in-page anchors (no-op, never a 404).
export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden"
    >
      {/* Motif — reserved, constrained, and positioned behind/beside the text so it never
          becomes the LCP candidate and never causes overflow or CLS. Hidden on the narrowest
          screens where the message stands alone; fades in beside the copy from md up. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[55%] items-center justify-end opacity-70 [mask-image:linear-gradient(to_right,transparent,black_40%)] md:flex"
      >
        <AxonSignal className="h-auto w-full max-w-[640px]" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 py-24 sm:py-28 lg:py-36">
        <div className="flex max-w-2xl flex-col items-start gap-6">
          <h1
            id="hero-title"
            className="text-pretty text-4xl font-[680] tracking-[-0.02em] text-foreground sm:text-5xl lg:text-6xl"
          >
            {hero.h1}
          </h1>

          <p className="max-w-[60ch] text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            {hero.subhead}
          </p>

          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild size="lg">
              <Link href={hero.primaryCta.href}>{hero.primaryCta.label}</Link>
            </Button>
            <Button asChild size="lg" variant="ghost">
              <Link href={hero.secondaryCta.href}>{hero.secondaryCta.label}</Link>
            </Button>
          </div>

          {/* Micro-trust — design-partner access, not signed customers (content integrity). */}
          <p className="mt-2 text-sm text-muted-foreground">{hero.microTrust}</p>
        </div>
      </div>
    </section>
  );
}
