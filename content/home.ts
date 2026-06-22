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

// ── The problem (HOME.2) ──────────────────────────────────────────────────────
// Copy is verbatim from specs/content/content.md §2 "The problem" (canonical content of record,
// supersedes messaging.md). Content integrity (../CLAUDE.md): the narrative reconciles to
// ../memory/ (idea: AI-native OS for robotics; icp: VP/Head of Ops at humanoid/defense makers) —
// no invented metric, customer, supplier, or traction; zero banned words. Consumed by a Server
// Component (components/problem.tsx); no live data, CMS-ready.

export interface Problem {
  heading: string;
  body: string;
}

export const problem: Problem = {
  heading:
    "Robotics scales on hardware. Operations still run on spreadsheets.",
  body: "Sourcing long-lead components, absorbing weekly BOM changes, tracking which parts and firmware went into which unit, and keeping fielded fleets up — most of it lives in spreadsheets, email, and ERPs built for a human-only workforce. The result: ramps slip by months and your best engineers spend their week chasing parts.",
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

// ── The thesis / "our secret" (HOME.6) ────────────────────────────────────────
// Copy is verbatim from specs/content/content.md §7 "The thesis (our secret)". Content integrity
// (../CLAUDE.md): the argument reconciles to ../memory/ (idea: AI-native OS for robotics; the
// humans+machines+agents thesis and the proprietary-data → compounding-models/memory moat) — it is
// stated as a thesis, not evidenced; no invented metric, customer, or "we have" claim; zero banned
// words. Consumed by a Server Component (components/thesis.tsx); pure data, CMS-ready.

export interface Thesis {
  heading: string;
  body: string;
}

export const thesis: Thesis = {
  heading: "A robotics company's workforce is humans, machines, and agents.",
  body: "Horizontal ERPs — even the AI-native ones — model a human-only company. They can't natively orchestrate machines and agents as first-class, and they aren't tuned to robotics. The company that builds the operating system for all three, on proprietary robotics data, wins the category. That data becomes specialized models and memory that compound with every build — a moat no horizontal incumbent can copy.",
};

// ── How it works / 4-layer architecture (HOME.4) ──────────────────────────────
// Copy is verbatim from specs/content/content.md §4 "How it works (4-layer architecture)"
// (canonical, supersedes messaging.md). Content integrity (../CLAUDE.md): the four layers reconcile
// to ../memory/taxonomy.md (primitives → domains → verticals) and ../memory/idea.md (humans +
// machines + agents; specialized models + memory that compound). Exactly four layers — no fifth, no
// extra ERP/PLM vendor names, no domain or vertical beyond the approved list; no metric or "we have
// built" claim. Zero banned words. Consumed by a Server Component (components/how-it-works.tsx);
// pure data, CMS-ready.
//
// Ordering note: `layers` is stored BOTTOM-UP — the order data flows in the stack: Foundation is the
// base, Vertical editions is the top. The component renders the visual stack top-down (so the DOM /
// screen-reader reading order is top→base) by reversing this array; see how-it-works.tsx.

// Layer shape (type inferred from the literal below): `id` is a stable key used for React keys
// and to single out the Intelligence spine accent; `name` + `description` are the verbatim copy.
export const howItWorks = {
  heading: "One system, four layers.",
  layers: [
    {
      id: "foundation",
      name: "Foundation",
      description:
        "connect your data, tools, and ontology (ERP/PLM/MES, email, chat).",
    },
    {
      id: "intelligence",
      name: "Intelligence spine",
      description:
        "specialized models + memory + agents tuned on your robotics data.",
    },
    {
      id: "domain",
      name: "Domain apps",
      description: "procurement first, then quality, maintenance, logistics.",
    },
    {
      id: "vertical",
      name: "Vertical editions",
      description: "packaged for your kind of robot.",
    },
  ],
};

// ── The three pillars / Primitives × Domains × Verticals (HOME.4B) ─────────────
// Copy is verbatim from specs/content/content.md §5 "The three pillars — Primitives × Domains ×
// Verticals" (canonical, supersedes messaging.md). Content integrity (../CLAUDE.md): the taxonomy
// reconciles to ../memory/taxonomy.md (verticals · domains · primitives) and ../memory/idea.md
// (build the primitives once → compose into domain workflows → package per vertical; agents
// self-improving with skills, context, memory, multimodal/multi-cloud reach). No invented
// primitive, domain, vertical, metric, customer, or claim; the lists are exact and in order; zero
// banned words. The wedge markers — "Procurement (the wedge)" and "Humanoids (first)" — are kept
// verbatim; the component reads those parentheticals to place the single teal accent (the words
// carry the meaning, teal only reinforces). This is the model — NOT the four implementation layers
// (that is `howItWorks` / content.md §4, a separate shipped section). Consumed by a Server Component
// (components/pillars.tsx); pure data, CMS-ready.
//
// Verbatim source of record (content.md §5) — items[] below are the same tokens, in order; the
// trailing period belongs to the source sentence, not the rendered chips. Each pillar's sentence is
// kept on a single line so it reads (and verifies) as the exact verbatim copy:
// Primitives (the elements): SOPs, documents, data, agents, humans, machines (fixed + mobile), inventory, meetings, integrations, interfaces. Agents are self-improving, with skills, context, memory, and multimodal, multi-cloud reach.
// Domains (the functions): Procurement (the wedge), then manufacturing, quality & testing, logistics, field service, R&D, IT/security, sales, marketing.
// Verticals (the markets): Humanoids (first), defense, logistics, manufacturing, construction, healthcare, space, automotive.

/** One pillar column. `kind` is the parenthetical that names what the pillar is ("the elements" /
 *  "the functions" / "the markets"). `items` is the verbatim comma-list, one token per entry, in
 *  order. `note` (Primitives only) is the trailing self-improving-agents sentence, modeled
 *  distinctly from the list items. */
export interface Pillar {
  id: string;
  name: string;
  kind: string;
  items: string[];
  note?: string;
}

export const pillars: { heading: string; framing: string; columns: Pillar[] } =
  {
    heading: "Built once. Composed everywhere.",
    framing:
      "Build the primitives once → compose them into domain workflows → package per vertical.",
    columns: [
      {
        id: "primitives",
        name: "Primitives",
        kind: "the elements",
        items: [
          "SOPs",
          "documents",
          "data",
          "agents",
          "humans",
          "machines (fixed + mobile)",
          "inventory",
          "meetings",
          "integrations",
          "interfaces",
        ],
        note: "Agents are self-improving, with skills, context, memory, and multimodal, multi-cloud reach.",
      },
      {
        id: "domains",
        name: "Domains",
        kind: "the functions",
        items: [
          "Procurement (the wedge)",
          "then manufacturing",
          "quality & testing",
          "logistics",
          "field service",
          "R&D",
          "IT/security",
          "sales",
          "marketing",
        ],
      },
      {
        id: "verticals",
        name: "Verticals",
        kind: "the markets",
        items: [
          "Humanoids (first)",
          "defense",
          "logistics",
          "manufacturing",
          "construction",
          "healthcare",
          "space",
          "automotive",
        ],
      },
    ],
  };

// ── Why now (HOME.5) ───────────────────────────────────────────────────────────
// Copy is verbatim from specs/content/content.md §6 "Why now" (canonical, supersedes
// messaging.md). Content integrity (../CLAUDE.md): the timing thesis reconciles to
// ../memory/market.md (the why-now / inflection: AI-accelerated R&D, robots building robots,
// capital into humanoids/defense/space), ../memory/idea.md (specialized small models + agent
// infrastructure make the operating layer buildable today; forward-deployed delivery that
// compounds into product), and ../memory/decisions.md (the forward-deployed go-to-market
// decision). Exactly three points — no fourth point, no invented metric, market-size dollar
// figure, funding stat, date, or named fund/company beyond the verbatim copy; these are durable
// [assumption]-grade claims and the section ships only what §6 states. Zero banned words.
// Consumed by a Server Component (components/why-now.tsx); pure data, CMS-ready.

export interface WhyNowPoint {
  id: string;
  text: string;
}

// Named interface (not an inline `{ ...; points: WhyNowPoint[] }` annotation) so the const
// declaration line carries no `[]` before the array literal — keeps the typed shape while letting
// the verify script's block matcher capture all three points.
export interface WhyNow {
  heading: string;
  points: WhyNowPoint[];
}

export const whyNow: WhyNow = {
  heading: "Why now.",
  points: [
    {
      id: "inflection",
      text: "Robotics is inflecting — AI-accelerated R&D, robots building robots, capital flooding humanoids, defense, and space.",
    },
    {
      id: "substrate",
      text: "Specialized small models + agent infrastructure make an AI-native operating layer buildable today.",
    },
    {
      id: "forward-deployed",
      text: "Forward-deployed delivery lets us ship to production with you and compound the work into product.",
    },
  ],
};

// ── Who it's for (HOME.7) ──────────────────────────────────────────────────────
// Copy is verbatim from specs/content/content.md §8 "Who it's for" (canonical content of record,
// supersedes messaging.md). Content integrity (../CLAUDE.md): the roles reconcile to
// ../memory/icp.md (economic buyer = VP/Head of Operations, COO, Head of Supply Chain; champion =
// procurement/ops lead) and the vertical sequence to ../memory/taxonomy.md (humanoids first, then
// defense, then logistics/industrial/space). This ships ONLY the §8 Now/Next/Then go-to-market
// sequence — NOT the full eight-vertical Verticals pillar (that is `pillars` / content.md §5,
// shipped). No invented role, vertical, count, customer, emblem, or metric; no proof-wall rail;
// zero banned words. Consumed by a Server Component (components/who-its-for.tsx); pure data,
// CMS-ready.
//
// The three stages are stored in display order (Now → Next → Then); `label` is the verbatim stage
// word and carries the sequence meaning (the component reads `id === "now"` only to place the
// single teal accent — the word "Now", not color, conveys the live beachhead). Buyer/champion are
// modeled as { role, text } (the "role label + text" R4 asks for); `role` holds the verbatim
// "Buyer"/"Champion" label, `text` the verbatim roles. The component renders Buyer then Champion.

export interface AudienceStage {
  /** Stable key; "now" singles out the live beachhead for the one teal accent. */
  id: string;
  /** Verbatim stage word — "Now" / "Next" / "Then". Carries the sequence (not color). */
  label: string;
  /** The vertical(s) at this stage, verbatim. */
  items: string;
}

/** Buyer or champion. `role` = verbatim label ("Buyer"/"Champion"); `text` = verbatim roles. */
export interface AudienceRole {
  role: string;
  text: string;
}

export interface WhoItsFor {
  heading: string;
  stages: AudienceStage[];
  buyer: AudienceRole;
  champion: AudienceRole;
}

export const whoItsFor: WhoItsFor = {
  heading: "Built for robotics makers scaling production.",
  stages: [
    { id: "now", label: "Now", items: "Humanoid robotics makers." },
    { id: "next", label: "Next", items: "Defense." },
    { id: "then", label: "Then", items: "Logistics, industrial, space." },
  ],
  buyer: {
    role: "Buyer",
    text: "VP/Head of Operations, COO, Head of Supply Chain.",
  },
  champion: { role: "Champion", text: "procurement / ops lead." },
};
