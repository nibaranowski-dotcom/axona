// content/home.ts — single source of truth for homepage section copy. CMS-ready: a CMS
// (Sanity/Contentful/Notion) can own these values later without touching components. No copy
// is hardcoded in JSX — components consume this module. See .claude/rules/content.md.
//
// Copy is verbatim from specs/content/messaging.md (Hero block). Content integrity (inherited
// from ../CLAUDE.md): nothing fabricated; the micro-trust line is design-partner *access*, not
// signed customers. Zero banned words.
//
// Anchor contract: the CTAs target homepage section ids that later stories own —
// `#request-access` (CONV.1) and `#how-it-works` (HOME.4). Until those land they resolve as
// in-page anchors (no-op, never a 404). Mirrors the destinations in content/site.ts.

export interface Cta {
  label: string;
  /** In-page anchor. Forward contract — see the note above. */
  href: string;
}

export interface Hero {
  h1: string;
  subhead: string;
  primaryCta: Cta;
  secondaryCta: Cta;
  microTrust: string;
}

export const hero: Hero = {
  h1: "The operating system for robotics companies.",
  subhead:
    "Robotics companies run on humans, machines, and agents. Axona is the AI-native system that unifies all three — starting with an agentic procurement & build co-pilot that gets your line the parts it needs, on time, with a record of every unit you ship.",
  primaryCta: { label: "Request access", href: "#request-access" }, // CONV.1
  secondaryCta: { label: "See how it works", href: "#how-it-works" }, // HOME.4
  microTrust:
    "Working with a first cohort of design partners in humanoid and defense robotics.",
};
