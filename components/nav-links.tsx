"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import type { NavLink } from "@/content/site";

// NavLinks — the only reason the nav is a client component: it reads the current pathname to set
// `aria-current="page"` on the link for the page you're on. Labels/hrefs come in as props from
// content/site.ts (no hardcoded copy). Used in both the header bar and the mobile sheet.
//
// Anchor links (e.g. "/#product") share the "/" route, so we only mark real page routes as
// current — section highlighting (scroll-spy) is out of scope here and would over-claim.
export function NavLinks({
  links,
  onNavigate,
  linkClassName,
}: {
  links: NavLink[];
  /** Called after a link is activated — e.g. to close the mobile sheet. */
  onNavigate?: () => void;
  linkClassName?: string;
}) {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const isPageRoute = !link.href.includes("#");
        const isCurrent = isPageRoute && pathname === link.href;

        return (
          <Link
            key={link.href + link.label}
            href={link.href}
            aria-current={isCurrent ? "page" : undefined}
            onClick={onNavigate}
            className={cn(
              "rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors duration-[180ms] ease-[cubic-bezier(.2,0,0,1)] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background aria-[current=page]:text-foreground",
              linkClassName,
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </>
  );
}
