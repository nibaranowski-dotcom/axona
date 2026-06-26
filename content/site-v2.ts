// content/site-v2.ts — copy + data for the Axona PRE-LAUNCH homepage.
// Source of truth: the "Pre-launch Homepage.dc.html" design (Axona v2 components, light-canonical),
// implemented per specs/PRELAUNCH.1.md. HONESTY RULES (non-negotiable, from CLAUDE.md + the handoff):
// no customer logos / usage metrics / testimonials / named-quoted people / "$·hrs·× saved" anywhere.
// Sample data lives ONLY inside a product mock and is visibly labeled "sample data — illustrative".
// Team = only Nicolas Baranowski, "Founder at Axona". Manufacturing + per-unit build genealogy lead;
// procurement is an expansion, not the headline.

export const brand = { name: "Axona", lower: "axona", upper: "AXONA" } as const;
export const year = 2026;
export const contactEmail = "hello@axonahq.com";

export const announce = {
  text: "Pre-launch — we're onboarding our first founding design partners.",
  cta: "Apply",
  href: "#partner",
};

export interface NavLink {
  label: string;
  href: string;
}
export const nav = {
  links: [
    { label: "Platform", href: "#platform" },
    { label: "How it works", href: "#wedge" },
    { label: "Design partners", href: "#partner" },
  ] as NavLink[],
  soon: "Docs",
  contact: "Contact",
  cta: "Request access",
};

// Hero. One product visual: the SN-2208 build-genealogy widget, explicitly labeled sample.
export interface GenealogyRow {
  label: string;
  state: "ok" | "progress";
  value: string;
}
export const hero = {
  statusChip: "Onboarding our first founding design partners",
  h1: "Build robots. Not spreadsheets.",
  sub: "The operating system for robotics makers — manufacturing and per-unit build genealogy first, then your whole operation. Humans, machines, and agents on one system.",
  cta: "Request access",
  secondaryCta: "See how it works",
  sampleLabel: "Sample data — illustrative",
  widget: {
    unit: "UNIT · SN-2208",
    status: "IN BUILD",
    genealogyLabel: "Build genealogy",
    pct: "84%",
    rows: [
      { label: "Chassis · weld & torque", state: "ok", value: "PASS" },
      { label: "PCB · rev C · serial trace", state: "ok", value: "PASS" },
      {
        label: "Actuator pack · in progress",
        state: "progress",
        value: "14 / 18",
      },
    ] as GenealogyRow[],
    footer: "142 PARTS TRACED · 3 SUPPLIERS · BOM REV 12",
    workOrderCap: "WORK ORDER · WO-2208",
    workOrderStatus: "ROUTED FOR APPROVAL",
    agentCap: "AGENT · DRAFT",
  },
};

export interface NumberedItem {
  idx: string;
  title: string;
  body: string;
}
export const problem = {
  eyebrow: "The problem",
  h2: "The line changes weekly. The records don't keep up.",
  items: [
    {
      idx: "01",
      title: "BOMs in constant flux",
      body: "A revision lands, a part goes long-lead, an engineer swaps a connector. The bill of materials moves faster than the spreadsheet tracking it.",
    },
    {
      idx: "02",
      title: "No reliable per-unit record",
      body: "When a robot ships, which rev of which part actually went into it? The answer lives in someone's memory, a photo, and three different tabs.",
    },
    {
      idx: "03",
      title: "Tools that never spoke",
      body: "PLM, MES, procurement, and the shop floor each hold a piece of the truth. Nothing reconciles them, so people do — by hand.",
    },
  ] as NumberedItem[],
};

export interface FlowStep {
  idx: string;
  label: string;
  active?: boolean;
}
export const wedge = {
  eyebrow: "What it is",
  h2: "An agentic manufacturing co-pilot, with a record of every build.",
  body: "Agents draft work orders, chase long-lead parts, and keep per-unit build genealogy current. You stay in the loop on every step: propose → approve → audit. A human approves before anything happens.",
  bodyEmphasis:
    "An operating system, not another point tool — one spine, your whole operation.",
  steps: [
    { idx: "01", label: "Propose" },
    { idx: "02", label: "Approve · human", active: true },
    { idx: "03", label: "Audit" },
  ] as FlowStep[],
  // Sample product screen — visibly labeled.
  screen: {
    cap: "PO-10482 · DRAFT",
    sample: "SAMPLE DATA",
    agentLine: "Agent drafted a purchase order",
    desc: "Harmonic drive · long-lead · flagged short against WO-2208. Sourced from approved supplier, RFQ compared.",
    rows: [
      { k: "Part", v: "HD-17-CSF" },
      { k: "Quantity", v: "24" },
      { k: "ETA", v: "4 days" },
    ],
    approve: "Approve",
    edit: "Edit",
    note: "Routed to you · awaiting sign-off",
  },
};

export interface Layer {
  tag: string;
  title: string;
  body: string;
}
export const platform = {
  eyebrow: "The platform",
  h2: "Four layers on one spine.",
  intro:
    "Start with manufacturing and build genealogy. The same spine carries the rest of your operation when you're ready.",
  layers: [
    {
      tag: "L4 · VERTICAL EDITIONS",
      title: "Vertical editions",
      body: "Axona pre-configured for an industry — the workflows, terminology, and screens a given robotics team needs on day one. Humanoids first.",
    },
    {
      tag: "L3 · DOMAIN APPS",
      title: "Domain apps",
      body: "Composable workflows from shared primitives — manufacturing and build genealogy lead; procurement, quality, logistics, and field service follow.",
    },
    {
      tag: "L2 · INTELLIGENCE & AGENTS",
      title: "Intelligence & agent spine",
      body: "Specialized models and long-term memory that learn how your factory runs — orchestrating humans, machines, and agents, with a human approving every step.",
    },
    {
      tag: "L1 · DATA & CONTEXT",
      title: "Data & context",
      body: "Connectors to ERP, PLM, MES, telemetry, and docs — plus an ontology of how your company actually works. VPC, on-prem, or edge.",
    },
  ] as Layer[],
};

export interface Vertical {
  idx: string;
  name: string;
  tag: "First" | "SOON";
}
export const verticals = {
  eyebrow: "The verticals",
  h2: "Proving it on humanoids first — then carrying the engine to every kind of robot company.",
  items: [
    { idx: "01", name: "Humanoids", tag: "First" },
    { idx: "02", name: "Defense", tag: "SOON" },
    { idx: "03", name: "Logistics", tag: "SOON" },
    { idx: "04", name: "Manufacturing", tag: "SOON" },
  ] as Vertical[],
};

export const partner = {
  eyebrow: "Founding design partners",
  h2: "We're building this with a handful of robotics makers.",
  body: "No customer wall, because we're pre-launch and honest about it. We're taking on a small group of founding design partners to build Axona on their real operation.",
  founder: {
    initials: "NB",
    name: "Founder-led — Nicolas Baranowski",
    bio: "Founder at Axona.",
  },
  benefits: [
    {
      idx: "01",
      title: "Forward-deployed build",
      body: "We build on your data and your floor, not a generic demo.",
    },
    {
      idx: "02",
      title: "One workflow, fast",
      body: "Pick one painful workflow; we take it to production quickly.",
    },
    {
      idx: "03",
      title: "Founding-partner terms",
      body: "Early pricing and commitment that reflect building together.",
    },
    {
      idx: "04",
      title: "A line to the roadmap",
      body: "Direct input on what we build, in what order.",
    },
  ] as NumberedItem[],
};

export const finalCta = {
  h2: "Hit every build date.",
  sub: "Tell us what you're building. We'll show you Axona on your own operation.",
};

export interface FooterCol {
  head: string;
  links: { label: string; href?: string; soon?: boolean }[];
}
export const footer = {
  tagline: "The operating system for robotics makers.",
  cols: [
    {
      head: "PRODUCT",
      links: [
        { label: "Platform", href: "#platform" },
        { label: "How it works", href: "#wedge" },
        { label: "Docs", soon: true },
        { label: "Pricing", soon: true },
      ],
    },
    {
      head: "COMPANY",
      links: [
        { label: "Design partners", href: "#partner" },
        { label: "Contact", href: `mailto:${contactEmail}` },
        { label: "Careers", soon: true },
        { label: "Blog", soon: true },
      ],
    },
  ] as FooterCol[],
  getAccess: {
    head: "GET ACCESS",
    text: "Onboarding founding design partners now.",
    cta: "Request access",
  },
  legal:
    "© 2026 Axona, Inc. · Pre-launch · Placeholder wordmark — swap with your logo",
};

// Request-access form copy (wired to the requestAccess server action).
export const form = {
  emailPlaceholder: "What's your work email?",
  submit: "Request access",
  emailLabel: "Work email",
  note: "We'll only use this to reach out about a founding design-partner fit.",
  // Honest success copy — must match SUCCESS_MESSAGE in app/actions/request-access.ts.
  success:
    "Thanks — request received. We'll be in touch within a few days. Founders read every request.",
  errorGeneric: "We couldn't submit that just now. Please try again.",
};
