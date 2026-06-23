import Link from "next/link";

import { brand, nav } from "@/content/blueprint";
import { PillLink } from "@/components/blueprint/pill-link";

// Sticky Blueprint nav — 76px, paper bg, bottom hairline. Wordmark = orange square "A" mark +
// "Axona". Server Component; pure CSS sticky, no scroll JS.
export function BlueprintNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper">
      <div className="mx-auto flex h-[76px] max-w-[1320px] items-center gap-10 px-8">
        <Link href="/" className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="grid size-[34px] place-items-center bg-orange font-[900] text-[20px] text-white"
          >
            {brand.mark}
          </span>
          <span className="text-[22px] font-[800] tracking-[-0.01em] text-ink">
            {brand.name}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden gap-7 text-[16px] font-[600] md:flex">
          {nav.links.map((l) => (
            <a key={l.href} href={l.href} className="text-ink transition-colors hover:text-orange">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-5 text-[16px] font-[600]">
          <a href={nav.login.href} className="hidden text-ink transition-colors hover:text-orange sm:inline">
            {nav.login.label}
          </a>
          <PillLink href={nav.cta.href} label={nav.cta.label} variant="ink" />
        </div>
      </div>
    </header>
  );
}
