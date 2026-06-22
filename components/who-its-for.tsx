import { whoItsFor } from "@/content/home";
import { cn } from "@/lib/utils";

// components/who-its-for.tsx — the "Who it's for" section (#who-its-for). SERVER COMPONENT: a
// level-2 heading, a verticals strip, and a buyer/champion line render as static HTML/CSS, fully
// readable with JavaScript disabled. No "use client", no state. Copy is verbatim from
// content/home.ts (sourced from specs/content/content.md §8). Below the fold — not the LCP element
// — ships zero client JS. All items are intrinsic-height text, so there is no CLS on load.
//
// What this section does (for a diligence-trained reader — an a16z American Dynamism partner, or a
// VP of Operations at a humanoid maker scanning the page): it tells the reader whether the page is
// addressed to them. The verticals strip sequences the addressable market Now → Next → Then
// (humanoids → defense → logistics/industrial/space) so the go-to-market reads as a deliberate
// beachhead, not "we sell to everyone." The buyer/champion line names the economic buyer and the
// champion so each self-identifies. Pre-launch integrity (../CLAUDE.md): no customer/partner mark,
// named entity, count, or metric ships — only the verbatim verticals and roles. This is the §8
// go-to-market view, NOT the full eight-vertical Verticals pillar (that is <Pillars />, §5).
//
// Stage order contract: stages render in display order Now → Next → Then (their stored order),
// inside a semantic <ol> read top→bottom by assistive tech. The ordinal/sequence meaning is carried
// by the <ol> AND the verbatim "Now/Next/Then" words — never by color alone. The buyer/champion
// line is a labeled pair (<dl>), Buyer then Champion.
//
// Token-driven (R11, the named constraint): every color/border is a semantic token / theme var from
// design.md — no inline hex, no raw Tailwind color utilities. THE ONE SIGNAL (R6): the live "Now"
// stage label is the section's single teal accent (text-primary); Next/Then stay muted-monochrome.
// The word "Now" carries the meaning, so the accent is reinforcement, not the only signal — a
// colorblind/monochrome reader still gets the sequence. Elevation is hairline borders + surface
// steps, never a drop shadow. Nothing animates, so prefers-reduced-motion needs no special-casing.
//
// Order contract (R8): renders after <Thesis /> (#thesis); HOME.8 (company) and HOME.9 (final CTA)
// insert after it later, matching content.md's §7 → §8 → §9 → §10 order.

export function WhoItsFor() {
  return (
    <section
      id="who-its-for"
      aria-labelledby="who-its-for-title"
      className="scroll-mt-24 border-t border-border"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-24 sm:py-28">
        <h2
          id="who-its-for-title"
          className="max-w-3xl text-balance text-2xl font-[680] tracking-[-0.01em] text-foreground sm:text-3xl lg:text-4xl"
        >
          {whoItsFor.heading}
        </h2>

        {/* Verticals strip. The <ol> carries the sequence (read in order by AT); the verbatim
            Now/Next/Then words reinforce it. Stages stack to one column on mobile (hairline +
            rhythm between), and sit left→right with thin vertical hairlines on wide viewports.
            Not an emblem strip, not gradient persona cards — type and a 4px rhythm do the work. */}
        <ol
          role="list"
          className="mt-14 grid grid-cols-1 sm:grid-cols-3"
        >
          {whoItsFor.stages.map((stage, i) => {
            const isNow = stage.id === "now";
            return (
              <li
                key={stage.id}
                className={cn(
                  "flex flex-col gap-2",
                  // Surface steps + 1px hairlines, never a card/shadow: stacked items get a top
                  // rule on mobile; on wide viewports a left rule separates the columns instead.
                  i > 0 &&
                    "mt-8 border-t border-border pt-8 sm:mt-0 sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0",
                )}
              >
                {/* THE ONE SIGNAL: the live "Now" stage label is teal (text-primary); Next/Then
                    stay muted. The word itself carries the meaning — color only reinforces. */}
                <span
                  className={cn(
                    "text-xs font-[590] uppercase tracking-[0.12em]",
                    isNow ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  {stage.label}
                </span>
                <p className="text-pretty text-lg font-[510] leading-snug text-foreground">
                  {stage.items}
                </p>
              </li>
            );
          })}
        </ol>

        {/* Buyer / champion line — a labeled pair (<dl>), Buyer then Champion. Quiet two-part row:
            the role label muted, the roles in text-foreground. Wraps to two stacked rows on mobile;
            each keeps a readable measure. Reserved height (intrinsic text) → no CLS. */}
        <dl className="mt-16 grid grid-cols-1 gap-6 border-t border-border pt-8 sm:grid-cols-2 sm:gap-10">
          {[whoItsFor.buyer, whoItsFor.champion].map((entry) => (
            <div
              key={entry.role}
              className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3"
            >
              <dt className="shrink-0 text-xs font-[590] uppercase tracking-[0.12em] text-muted-foreground">
                {entry.role}
              </dt>
              <dd className="min-w-0 text-pretty text-base leading-relaxed text-foreground">
                {entry.text}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
