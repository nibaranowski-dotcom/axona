// content/site-v2.ts — copy + data for the Axona v2 homepage prototype (redesign/axona-v2).
// Ported from the "Axona v2" design project (Homepage.dc.html renderVals), with two reconciliations
// the handoff PRD requires: (1) positioning — "operating system", never "ERP", as the primary
// descriptor; thesis spine kept (procurement + per-unit build genealogy wedge; humans + machines +
// agents; primitives → domains → verticals; the moat). (2) it's a directional LOOK prototype.
//
// PROTOTYPE TRACTION: the counter, logo wall, agent stats, "40hrs", testimonials, and named
// portraits are FICTIONAL sample data (no real company or real person) — approved for this look
// evaluation. Every fabricated item is logged in docs/pre-launch-swap.md, flagged "replace or get
// permission before launch."

export const brand = { name: "Axona", lower: "axona", upper: "AXONA" } as const;
export const year = 2026;

export const announce = {
  text: "Introducing Agents by Axona — the AI operating system for robotics ops.",
  cta: "Learn more",
};

export interface NavItem { label: string; caret?: boolean }
export const nav = {
  items: [
    { label: "Platform", caret: true },
    { label: "Modules", caret: true },
    { label: "Solutions", caret: true },
    { label: "Customers" },
    { label: "Pricing" },
  ] as NavItem[],
  signIn: "Sign in",
  cta: "See a demo",
};

export const hero = {
  eyebrow: "PARTS UNDER MANAGEMENT BY AXONA:",
  counter: "7,491,284 parts", // FICTIONAL illustrative counter (static) — see pre-launch-swap.md
  h1: "Build robots. Not spreadsheets.",
  sub: "Procurement, production, supply chain, and field service — humans, machines, and agents on one AI-native operating system for robotics companies.",
  emailPlaceholder: "What's your work email?",
  cta: "Book a demo",
};

export interface AgentStat { label: string; value: string }
export const agentStats = {
  label: "AGENTS AT WORK TODAY",
  stats: [
    { label: "BOMS SYNCED", value: "175.5K" },
    { label: "AGENT ACTIONS", value: "514" },
    { label: "POS DRAFTED", value: "13,422" },
    { label: "SHORTAGES CAUGHT", value: "2,288" },
    { label: "UNITS TRACED", value: "3,280" },
  ] as AgentStat[],
};

export const join = {
  headlineLead: "Join 1,200 of the world's most ambitious hardware teams",
  headlineTail: "shipping 3.2× faster than the industry average.",
  link: "Read the report",
  // FICTIONAL placeholder logos (no real company) — see pre-launch-swap.md
  logos: ["NORTHWIND", "EIGHT", "FORGE", "MERIDIAN", "ATLAS", "VANTA", "AXIOM", "HELIX", "ORBIT", "NOVA", "PILOT"],
  photoStat: { value: "40hrs", caption: "Saved every month, per ops lead", tag: "[ CUSTOMER PHOTO ]" },
};

export interface Tab { label: string; active?: boolean }
export interface FeatureCard { title: string; body: string; cap: string }
export const platform = {
  h2: "One operating system. Every function on the floor.",
  sub: "Domains that share one spine — and infinite agents that work 24/7.",
  tabs: [
    { label: "Procurement", active: true },
    { label: "Manufacturing" },
    { label: "Quality & Test" },
    { label: "Logistics" },
    { label: "Field Service" },
    { label: "R&D" },
    { label: "IT & Security" },
  ] as Tab[],
  cards: [
    { title: "Procurement", body: "The wedge. Agents source long-lead components, run RFQs, and draft purchase orders from live BOM demand — your buyers approve in one click.", cap: "PO-10482 · DRAFT" },
    { title: "Manufacturing", body: "Plan builds, route work orders, and keep per-unit build genealogy from the first PCB to the packaged robot.", cap: "WORK ORDER · UNIT #2208" },
  ] as FeatureCard[],
  small: [
    { title: "Quality & Test", body: "Capture test results against every serial. Catch the defect pattern before it ships.", cap: "QA · SERIAL TRACE" },
    { title: "Logistics", body: "Multi-site stock, transfers, and inbound tracking on one connected graph.", cap: "INBOUND · SITE-3" },
    { title: "Field Service", body: "Warranty, parts, firmware, and uptime for every robot in the field.", cap: "FLEET · UPTIME" },
  ] as FeatureCard[],
};

export const systems = {
  h2: "Systems that never spoke.",
  sub: "Spreadsheets, your PLM, the shop floor, accounting — finally on one connected graph.",
  legacy: ["[ SPREADSHEETS ]", "[ PLM / CAD ]", "[ ACCOUNTING ]"],
};

export interface Layer { tag: string; title: string; body: string; moat?: boolean }
export const architecture = {
  eyebrow: "THE ARCHITECTURE",
  h2: "One system that adapts to how your factory runs.",
  intro: "Four layers stacked on one spine. Forward-deployed work recycles into reusable primitives — a platform, never one-off code.",
  layers: [
    { tag: "L4 · VERTICAL EDITIONS", title: "Vertical Editions", body: "A version of Axona pre-configured for your industry — the workflows, terminology, and screens a humanoid, defense, or space team actually needs on day one." },
    { tag: "L3 · DOMAIN APPS", title: "Domain Apps", body: "Composable workflows built from shared primitives — procurement, manufacturing, quality, logistics, field service." },
    { tag: "L2 · INTELLIGENCE & AGENT SPINE", title: "Intelligence & Agent Spine", body: "Specialized models, long-term memory, and per-unit build genealogy — orchestrating humans, machines, and agents.", moat: true },
    { tag: "L1 · DATA & CONTEXT", title: "Data & Context", body: "Connectors to ERP, PLM, MES, telemetry, and docs — plus an ontology of how your company actually works. VPC / on-prem / edge." },
  ] as Layer[],
  primitivesLabel: "THE PRIMITIVES — THE ELEMENTS EVERY WORKFLOW IS BUILT FROM",
  primitives: ["SOPs", "Documents", "Data", "Agents", "Humans", "Machines", "Inventory", "Meetings", "Integrations", "Interfaces"],
};

export interface Vertical { name: string; idx: string; tag?: string }
export const verticals = {
  eyebrow: "THE VERTICALS",
  h2: "One engine, proven on humanoids — then carried to every kind of robot company.",
  items: [
    { name: "Humanoids", idx: "01", tag: "MVP" },
    { name: "Defense", idx: "02", tag: "Coming soon" },
    { name: "Logistics", idx: "03", tag: "Coming soon" },
    { name: "Manufacturing", idx: "04" },
    { name: "Construction", idx: "05" },
    { name: "Healthcare", idx: "06" },
    { name: "Space", idx: "07" },
    { name: "Automotive", idx: "08" },
  ] as Vertical[],
};

export const introAgents = {
  h2: "Introducing Agents by Axona. The AI operating system for hardware ops.",
  quote: "“We turned off three legacy tools in our first month. Axona caught a servo shortage before it ever reached the line.”",
  attribution: "— VP Operations, mobility robotics", // FICTIONAL testimonial — see pre-launch-swap.md
  link: "Read the story",
  lockupTag: "[ BRAND LOCKUP / LOGO ]",
};

export const keepFocused = {
  // FICTIONAL portrait — see pre-launch-swap.md
  portrait: { name: "Lauren", role: "Head of Ops, drone manufacturer", tag: "[ CUSTOMER PORTRAIT ]" },
  h2: "Keep your ops team focused on shipping. Let agents handle the busywork.",
  body: "Agents watch stock, draft purchase orders, reconcile receipts, and surface exceptions — around the clock. Your team approves and moves on.",
  link: "See how it works",
};

export interface PolicyRow { k: string; v: string }
export const aiLearns = {
  h2: "AI that learns from your operation. Powered by 1,200 teams that came before you.",
  body: "Axona flags the part that always slips, the vendor that always runs late, and the cost leak hiding in your BOM — before they cost you a build.",
  policyTitle: "Procurement Policy",
  policyBadge: "Auto-applied",
  policyRows: [
    { k: "Reorder point breach", v: "AUTO-PO" },
    { k: "Vendor lead-time risk", v: "FLAGGED" },
    { k: "Cost variance > 8%", v: "ESCALATE" },
  ] as PolicyRow[],
};

export interface ScaleCard { title: string; body: string; cap: string }
export const scale = {
  h2Lead: "Scale the line.",
  h2Tail: "Shrink the paperwork.",
  cards: [
    { title: "Role-based access & approvals", body: "Give buyers, line leads, and finance exactly the access they need — nothing more.", cap: "ACCESS · ROLES" },
    { title: "One platform for every site", body: "Multi-site stock, transfers, and global spend in a single view.", cap: "SITES · GLOBAL" },
  ] as ScaleCard[],
};

export interface Receipt { logo: string; quote: string; who: string }
export const receipts = {
  h2: "We've got the receipts.",
  // FICTIONAL testimonials + logos (no real company / person) — see pre-launch-swap.md
  items: [
    { logo: "NORTHWIND", quote: "Cycle counts went from days to minutes. The line hasn't stopped for a missing part since.", who: "Director of Ops" },
    { logo: "FORGE", quote: "Agents draft our POs before a shortage ever hits the floor. It pays for itself.", who: "VP Manufacturing" },
    { logo: "MERIDIAN", quote: "One graph for every screw and every deployed unit. Books finally close on time.", who: "Founder" },
    { logo: "ATLAS", quote: "We replaced four tools and a pile of spreadsheets in our first month.", who: "Head of Supply Chain" },
    { logo: "HELIX", quote: "Per-unit margin visibility changed how we price every contract.", who: "CFO" },
    { logo: "ORBIT", quote: "Onboarded across two sites in under 30 days. No rip-and-replace.", who: "COO" },
    { logo: "NOVA", quote: "The firmware and warranty traceability alone was worth the switch.", who: "Head of Service" },
    { logo: "PILOT", quote: "Our ops team finally builds robots instead of reconciling sheets.", who: "Eng Lead" },
  ] as Receipt[],
};

export const closing = {
  h2: "Hit every build date.",
  emailPlaceholder: "What's your work email?",
  cta: "Book a demo",
};

export interface FooterCol { head: string; links: string[] }
export const footer = {
  tagline: "The AI-native operating system for companies building robots.",
  cols: [
    { head: "PRODUCT", links: ["Platform", "Modules", "AI agents", "Integrations", "Security", "Pricing"] },
    { head: "SOLUTIONS", links: ["Drones", "Mobility", "Warehouse", "Industrial", "Contract mfg"] },
    { head: "COMPANY", links: ["About", "Customers", "Careers", "Blog", "Contact"] },
    { head: "RESOURCES", links: ["Docs", "Guides", "ROI calculator", "Status", "FAQs"] },
  ] as FooterCol[],
  legal: "Placeholder wordmark — swap with your logo",
  cta: "See a demo",
};
