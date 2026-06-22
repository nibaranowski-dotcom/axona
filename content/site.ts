// content/site.ts — single source of truth for all app-shell copy and destinations
// (nav + footer). CMS-ready: a CMS (Sanity/Contentful/Notion) can own these values later
// without touching components. No shell copy is hardcoded in JSX — components consume this
// module or take its values as props. See .claude/rules/content.md.
//
// Content integrity (inherited from ../CLAUDE.md): nothing is fabricated. Items awaiting
// Nicolas's sign-off carry the SIGN_OFF sentinel and render disabled — never as a live link
// or an invented value.
//
// Destinations: every link points to a real, in-flight backlog story or this PRD. The
// homepage section anchors (`/#…`) become live as their HOME stories land; until then they
// resolve to the homepage, never a dead `#`.

/** Sentinel for any value that needs Nicolas's sign-off before it can ship live. */
export const SIGN_OFF = "TODO[sign-off]" as const;

/** True when a content value is still a placeholder awaiting sign-off. */
export function isPending(value: string): boolean {
  return value === SIGN_OFF || value.startsWith("TODO[");
}

export interface NavLink {
  label: string;
  /** Real destination, or SIGN_OFF when the URL doesn't exist yet (renders disabled). */
  href: string;
  /** External destination — opens in a new tab with rel="noopener noreferrer". */
  external?: boolean;
  /** Awaiting sign-off (e.g. real Privacy URL). Rendered disabled until `href` is real. */
  pending?: boolean;
}

export interface FooterGroup {
  heading: string;
  links: NavLink[];
}

export const site = {
  name: "Axona",
  tagline: "The operating system for robotics companies.",
  // Legal entity + registered address — required in the footer once incorporated.
  // Kept as SIGN_OFF so we never print a fabricated company name or address.
  legalEntity: SIGN_OFF, // e.g. "Axona, Inc."
  registeredAddress: SIGN_OFF, // e.g. "2261 Market St, San Francisco, CA"
  // Public accessibility contact — published on /accessibility and in the footer.
  accessibilityEmail: SIGN_OFF, // e.g. "accessibility@axona.com"
} as const;

/** Header primary nav. Anchors go live as their HOME stories land. */
export const primaryNav: NavLink[] = [
  { label: "Product", href: "/#product" }, // HOME.3
  { label: "How it works", href: "/#how-it-works" }, // HOME.4
  { label: "Company", href: "/#company" }, // HOME.8
];

/** The single header CTA — the one teal signal in the bar. */
export const primaryCta: NavLink = { label: "Request access", href: "/#request-access" }; // CONV.1

export const footerNav: FooterGroup[] = [
  {
    heading: "Product",
    links: [
      { label: "Product", href: "/#product" }, // HOME.3
      { label: "How it works", href: "/#how-it-works" }, // HOME.4
      { label: "Request access", href: "/#request-access" }, // CONV.1
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Company", href: "/#company" }, // HOME.8
    ],
  },
  {
    heading: "Legal",
    links: [
      // Disabled until the real policy pages exist and are signed off.
      { label: "Privacy Policy", href: SIGN_OFF, pending: true },
      { label: "Terms of Service", href: SIGN_OFF, pending: true },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Accessibility", href: "/accessibility" }, // this PRD (SETUP.4)
    ],
  },
];

/** Social links — none confirmed yet. Stays empty (nothing rendered) until sign-off. */
export const socialLinks: NavLink[] = [];
