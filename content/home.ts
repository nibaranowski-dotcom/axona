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

// ── Product / wedge (HOME.3) ──────────────────────────────────────────────────
// Copy is verbatim from specs/content/content.md §"The product / wedge". The mock below is
// SAMPLE / ILLUSTRATIVE data only — content integrity (../CLAUDE.md): no real or plausible-as-real
// customer, supplier, person, or metric. Identifiers are deliberately generic ("Supplier A",
// "Actuator HD-17") and the model id is marked "(sample)". No live model call: this is a typed
// const consumed by a Server Component, never fetched. Icons are lucide keys mapped in the
// component so this module stays pure data (CMS-ready).

/** lucide icon keys for the three cards — mapped to components in components/wedge.tsx. */
export type WedgeCardIcon = "source" | "unit" | "compound";

export interface WedgeCard {
  title: string;
  body: string;
  icon: WedgeCardIcon;
}

/** One row of the audit trail. `mono` renders the value in Geist Mono (part numbers, model id). */
export interface WedgeAuditField {
  /** Field label — one of the five auditable fields. */
  key: string;
  value: string;
  mono?: boolean;
}

export interface WedgeMock {
  /** Persistent, always-visible marker. Mandatory — the mock must never read as real. */
  sampleLabel: string;
  /** The propose → approve → audit stages, in order; the audit stage is rendered in full. */
  steps: { id: "propose" | "approve" | "audit"; label: string }[];
  proposal: {
    /** Stage caption, e.g. "Proposed action". */
    kind: string;
    title: string;
    detail: string;
    /** Risk flag carried in text (monochrome), never color-only. */
    flag: string;
  };
  approve: {
    caption: string;
    primary: string;
    secondary: string;
    /** Honest framing of the human gate. */
    note: string;
  };
  audit: {
    caption: string;
    /** inputs · output · model · confidence · approver — all five, in this order. */
    fields: WedgeAuditField[];
  };
}

export interface Wedge {
  heading: string;
  cards: WedgeCard[];
  trustLine: string;
  mock: WedgeMock;
}

export const wedge: Wedge = {
  heading: "An agentic procurement & build co-pilot. You approve; it remembers.",
  cards: [
    {
      title: "Source without the grind",
      body: "Axona drafts POs and RFQs, watches lead times, and flags supply risk before it stops the line.",
      icon: "source",
    },
    {
      title: "Know every unit",
      body: "Per-unit build genealogy: which parts, serials, and firmware went into which robot — captured as you build, not reconstructed after.",
      icon: "unit",
    },
    {
      title: "It compounds",
      body: "Every approval, exception, and build teaches the system. Operational memory that gets sharper with each unit — the opposite of a static ERP.",
      icon: "compound",
    },
  ],
  trustLine:
    "The AI proposes; a human approves; every action is auditable — inputs, output, model, confidence, approver.",
  mock: {
    sampleLabel: "Sample data — illustrative",
    steps: [
      { id: "propose", label: "Propose" },
      { id: "approve", label: "Approve" },
      { id: "audit", label: "Audit" },
    ],
    proposal: {
      kind: "Proposed action",
      title: "Draft PO — 24× Actuator HD-17",
      detail: "Supplier A · lead time 14 wks",
      flag: "Lead-time risk flagged",
    },
    approve: {
      caption: "Human gate",
      primary: "Approve",
      secondary: "Decline",
      note: "Nothing is sent or ordered until a person approves.",
    },
    audit: {
      caption: "Audit trail",
      fields: [
        { key: "Inputs", value: "BOM v2.4 · open demand 24 · on-hand 0" },
        { key: "Output", value: "Draft PO · 24× Actuator HD-17 · Supplier A", mono: true },
        { key: "Model", value: "axona-procure (sample)", mono: true },
        { key: "Confidence", value: "High" },
        { key: "Approver", value: "Pending your approval" },
      ],
    },
  },
};
