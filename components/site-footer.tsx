import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  site,
  footerNav,
  socialLinks,
  isPending,
  type NavLink,
} from "@/content/site";

// SiteFooter — global footer with the nav groups, legal links, and the accessibility statement.
// A Server Component (no interactivity). All copy/destinations come from content/site.ts.
//
// Integrity: links awaiting sign-off (e.g. Privacy Policy) render as disabled, muted, non-link
// text — never a dead placeholder anchor and never an invented URL. The copyright shows the brand name
// only; the legal entity + registered address stay out until Nicolas signs them off.
export function SiteFooter() {
  const year = 2026; // pre-launch; SEO/build can make this dynamic when the site goes live.

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          {/* Brand + tagline */}
          <div className="max-w-xs">
            <Link
              href="/"
              className="rounded-md text-base font-[590] tracking-[-0.02em] text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {site.name}
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">{site.tagline}</p>
          </div>

          {/* Nav groups */}
          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-8 sm:grid-cols-4 md:gap-12"
          >
            {footerNav.map((group) => (
              <div key={group.heading} className="flex flex-col gap-3">
                <h2 className="text-xs font-[510] tracking-[-0.01em] text-foreground">
                  {group.heading}
                </h2>
                <ul className="flex flex-col gap-2.5">
                  {group.links.map((link) => (
                    <li key={link.href + link.label}>
                      <FooterLink link={link} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © {year} {site.name}.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
            {/* Accessibility contact — published once the address is signed off. */}
            {isPending(site.accessibilityEmail) ? (
              <span className="text-muted-foreground/70">
                Accessibility contact: coming soon
              </span>
            ) : (
              <a
                href={`mailto:${site.accessibilityEmail}`}
                className="rounded-sm text-muted-foreground transition-colors duration-[180ms] ease-[cubic-bezier(.2,0,0,1)] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Accessibility contact
              </a>
            )}

            {socialLinks.map((link) => (
              <FooterLink key={link.href + link.label} link={link} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// One footer destination. Real links are crawlable <a>/<Link>; pending (sign-off) links render
// as disabled, muted text with an accessible "coming soon" note — never a dead anchor.
function FooterLink({ link }: { link: NavLink }) {
  const linkClass =
    "rounded-sm text-sm text-muted-foreground transition-colors duration-[180ms] ease-[cubic-bezier(.2,0,0,1)] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  if (link.pending || isPending(link.href)) {
    return (
      <span
        aria-disabled="true"
        className="text-sm text-muted-foreground/60"
      >
        {link.label}
        <span className="sr-only"> (coming soon)</span>
      </span>
    );
  }

  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(linkClass)}
      >
        {link.label}
      </a>
    );
  }

  return (
    <Link href={link.href} className={cn(linkClass)}>
      {link.label}
    </Link>
  );
}
