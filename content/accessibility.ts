// content/accessibility.ts — copy for the /accessibility statement, kept as structured
// content (not inline JSX) so a CMS or MDX pipeline can own it later without code changes.
// Matches the content-as-data approach in content/site.ts. See .claude/rules/content.md.
//
// Integrity: this states our *target* conformance and the honest current state of a
// pre-launch site. The public contact address is gated on sign-off (see content/site.ts).

export interface AccessibilitySection {
  heading: string;
  /** Each entry is one paragraph. */
  body: string[];
}

export const accessibility = {
  title: "Accessibility",
  // Sets honest expectations: this is the standard we hold the site to, not a third-party audit.
  intro:
    "Axona is committed to making this website usable for everyone, including people who rely on assistive technologies. This statement describes the standard we hold the site to and how to reach us if something gets in your way.",
  // Conformance target — matches CLAUDE.md and .claude/rules/accessibility.md.
  conformanceTarget: "WCAG 2.2 Level AA",
  sections: [
    {
      heading: "Conformance status",
      body: [
        "We design and build this site to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at Level AA. We treat AA as a baseline, not a ceiling.",
        "The site is pre-launch and under active development. New pages are reviewed against WCAG 2.2 AA before they ship, and we re-check existing pages as they change.",
      ],
    },
    {
      heading: "Measures we take",
      body: [
        "Full keyboard operability with a visible focus indicator and a skip-to-content link, semantic HTML with ARIA only where it adds meaning, colour contrast that meets AA in both light and dark themes, and support for reduced-motion preferences.",
        "Accessibility is part of our definition of done: every page passes an accessibility review before it is considered complete.",
      ],
    },
    {
      heading: "Known limitations",
      body: [
        "As a site in active development, some pages and components are still being built and reviewed. Where we know of a gap, we prioritise fixing it. If you find a barrier that is not listed here, please tell us — your report helps us fix it faster.",
      ],
    },
    {
      heading: "Feedback and contact",
      body: [
        "If you encounter an accessibility barrier on this site, contact us and we will work to resolve it. Please include the page address and a short description of the problem.",
      ],
    },
  ] satisfies AccessibilitySection[],
} as const;
