// content/blueprint.ts — copy for the Blueprint redesign prototype (redesign/blueprint).
// HYBRID content: Axona's thesis is the spine — the AI-native operating system for robotics
// companies (humans + machines + agents on one specification), the agentic procurement wedge, and
// the compounding data/memory moat — expressed through the handoff's concrete module/industry
// spec-sheet structure. Sourced from specs/content/content.md + the Blueprint handoff.
//
// PROTOTYPE MODE (design.md principle 7): the stats strip and placeholder logo tiles are
// illustrative, built to evaluate the look. They are tracked in docs/pre-launch-swap.md and must be
// replaced/permissioned before launch. No real customer is named here (placeholders only) — content
// integrity (../CLAUDE.md): never imply traction or endorsement we don't have.

export interface NavLink {
  label: string;
  href: string;
}
export interface SpecStat {
  k: string;
  v: string;
  /** Illustrative prototype figure — listed in docs/pre-launch-swap.md, replace before launch. */
  illustrative?: boolean;
}
export interface Module {
  n: string;
  title: string;
  body: string;
}
export interface Industry {
  code: string;
  title: string;
  body: string;
}
export interface FooterCol {
  heading: string;
  links: string[];
}

export const brand = { name: "Axona", mark: "A" } as const;

export const nav = {
  links: [
    { label: "Industries", href: "#industries" },
    { label: "Platform", href: "#platform" },
    { label: "Customers", href: "#customers" },
    { label: "About", href: "#about" },
  ] as NavLink[],
  login: { label: "Log in", href: "#" } as NavLink,
  cta: { label: "Get a demo", href: "#about" } as NavLink,
};

export const hero = {
  metaLeft: "// AI-NATIVE OS · ROBOTICS",
  metaRight: "REV 0.1",
  // Rendered across lines; `hlWord` carries the orange highlighter.
  h1Lead: "The operating system for",
  h1Highlight: "robotics.",
  sub: "Humans, machines, and agents on one specification — starting with an agentic procurement & build co-pilot, expanding to run the whole operation.",
  ctaPrimary: { label: "Get a demo", href: "#about" } as NavLink,
  ctaSecondary: { label: "Read the thesis", href: "#about" } as NavLink,
  placeholder: "schematic — humans · machines · agents",
};

// Illustrative prototype stats (see docs/pre-launch-swap.md). Axona is pre-launch — these stand in
// for the Blueprint "spec strip" look and must be replaced with real figures or removed before launch.
export const stats: SpecStat[] = [
  { k: "Design partners", v: "3", illustrative: true },
  { k: "Procurement cycle", v: "−60%", illustrative: true },
  { k: "Robotics domains", v: "9" },
  { k: "Agent actions audited", v: "100%" },
];

// Placeholder logo tiles (no real company named). Swap for permissioned/real logos before launch.
export const logoWall = { kicker: "Customers", tiles: 5, caption: "LOGO" };

export const platform = {
  kicker: "Platform · modules",
  heading: "Six modules. One specification for humans, machines, and agents.",
  modules: [
    { n: "M.01", title: "Procurement", body: "Agentic sourcing, RFQs, and POs — the AI proposes, a human approves, every action audited. The wedge." },
    { n: "M.02", title: "Bill of Materials", body: "Multi-level BOMs, revisions, and sourcing tied to every part and serial number." },
    { n: "M.03", title: "Inventory & Parts", body: "Components, spares, and consumables across factories and field depots." },
    { n: "M.04", title: "Build & Manufacturing", body: "Work orders, quality, and testing from the line to acceptance." },
    { n: "M.05", title: "Fleet & Field Service", body: "Live status, missions, dispatch, and RMA flows for every unit you ship." },
    { n: "M.06", title: "Memory & Audit", body: "Every agent action — inputs, output, model, confidence, approver — on one compounding record." },
  ] as Module[],
};

export const industries = {
  kicker: "Industries",
  heading: "Built for the machines you make.",
  cards: [
    { code: "IND.01", title: "Humanoids", body: "General-purpose platforms entering the workforce. Where we start." },
    { code: "IND.02", title: "Defense", body: "Autonomous systems for contested, high-assurance environments." },
    { code: "IND.03", title: "Logistics", body: "AMRs, sortation, and pick fleets across distribution networks." },
    { code: "IND.04", title: "Manufacturing", body: "Arms, cells, and AGVs on the production line." },
    { code: "IND.05", title: "Construction", body: "Field robots and autonomous equipment on the job site." },
    { code: "IND.06", title: "Space", body: "Hardware programs where every part and procedure is traced." },
  ] as Industry[],
};

export const about = {
  kicker: "About Axona",
  heading: "A robotics company's workforce is humans, machines, and agents.",
  body: "Horizontal ERPs model a human-only company. Axona is the AI-native operating system for all three — running the operation on proprietary robotics data and specialized models that compound with every build. A moat no horizontal incumbent can copy.",
  ctaPrimary: { label: "Talk to our team", href: "#" } as NavLink,
  ctaSecondary: { label: "Our thesis", href: "#" } as NavLink,
};

export const footer = {
  columns: [
    { heading: "Platform", links: ["Procurement", "Bill of Materials", "Inventory", "Fleet & Field", "Memory & Audit"] },
    { heading: "Industries", links: ["Humanoids", "Defense", "Logistics", "Manufacturing", "Space"] },
    { heading: "Developers", links: ["Docs", "API", "Integrations", "Status", "Changelog"] },
    { heading: "Company", links: ["About", "Customers", "Careers", "Security", "Contact"] },
  ] as FooterCol[],
  bar: { left: "Axona, Inc. — 2026", right: "Get a demo ›" },
};
