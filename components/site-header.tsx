import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { NavLinks } from "@/components/nav-links";
import { MobileNav } from "@/components/mobile-nav";
import { site, primaryNav, primaryCta } from "@/content/site";

// SiteHeader — the sticky global nav. A Server Component: only the interactive leaves
// (NavLinks for aria-current, MobileNav, ThemeToggle) opt into the client. No blocking JS
// reaches the future hero.
//
// The hairline-on-scroll is pure CSS driven by a `data-scrolled` attribute that HeaderScroll
// (rendered in layout.tsx) toggles. The border is always 1px and only changes colour
// (transparent → --border), so the bar never changes height — CLS-safe. id="site-header" is the
// hook HeaderScroll targets.
export function SiteHeader() {
  return (
    <header
      id="site-header"
      className="sticky top-0 z-40 border-b border-transparent bg-background/80 backdrop-blur-sm transition-colors duration-[180ms] ease-[cubic-bezier(.2,0,0,1)] data-[scrolled]:border-border"
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="rounded-md text-base font-[590] tracking-[-0.02em] text-foreground transition-colors duration-[180ms] ease-[cubic-bezier(.2,0,0,1)] hover:text-foreground/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {site.name}
          <span className="sr-only"> — {site.tagline}</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          <NavLinks links={primaryNav} />
        </nav>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <Button asChild size="lg" className="hidden sm:inline-flex">
            <Link href={primaryCta.href}>{primaryCta.label}</Link>
          </Button>
          <MobileNav links={primaryNav} cta={primaryCta} />
        </div>
      </div>
    </header>
  );
}
