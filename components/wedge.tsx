import { LineChart, PackageSearch, ScanLine } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { AgentActionMock } from "@/components/agent-action-mock";
import { wedge, type WedgeCardIcon } from "@/content/home";

// components/wedge.tsx — the product / wedge section (#product). SERVER COMPONENT: heading, the
// three value cards, the trust line, and the propose→approve→audit mock all render as static
// HTML/CSS, fully readable with JavaScript disabled. Copy is verbatim from content/home.ts
// (sourced from specs/content/content.md). Below the fold — not the LCP element — but it ships no
// render-blocking JS regardless.
//
// Anchor contract: id="product" is the target of the header "Product" nav link (SETUP.4).
//
// Icons are quiet support only (one per card, aria-hidden); meaning lives in the text. The icon
// key→component map lives here so content/home.ts stays pure data (CMS-ready).

const CARD_ICONS: Record<WedgeCardIcon, LucideIcon> = {
  source: PackageSearch,
  unit: ScanLine,
  compound: LineChart,
};

export function Wedge() {
  return (
    <section
      id="product"
      aria-labelledby="wedge-title"
      className="scroll-mt-24 border-t border-border"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-24 sm:py-28">
        <h2
          id="wedge-title"
          className="max-w-3xl text-pretty text-2xl font-[680] tracking-[-0.01em] text-foreground sm:text-3xl lg:text-4xl"
        >
          {wedge.heading}
        </h2>

        {/* Three value cards — restrained surface + 1px hairline, one quiet icon each. */}
        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {wedge.cards.map((card) => {
            const Icon = CARD_ICONS[card.icon];
            return (
              <li
                key={card.title}
                className="flex flex-col gap-3 rounded-xl border border-border bg-card p-6 text-card-foreground"
              >
                <Icon aria-hidden="true" className="size-5 text-muted-foreground" />
                <h3 className="text-base font-[590] text-foreground">{card.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{card.body}</p>
              </li>
            );
          })}
        </ul>

        {/* Trust line — anchors the mock conceptually. */}
        <p className="mt-14 max-w-3xl text-pretty text-base leading-relaxed text-foreground sm:text-lg">
          {wedge.trustLine}
        </p>

        <AgentActionMock />
      </div>
    </section>
  );
}
