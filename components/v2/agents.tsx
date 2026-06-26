import {
  introAgents,
  keepFocused,
  aiLearns,
  scale,
  receipts,
  brand,
} from "@/content/site-v2";
import { ArrowLink } from "@/components/v2/ui";

// Introducing Agents — split: product statement + (fictional) testimonial / brand lockup placeholder.
export function IntroAgents() {
  return (
    <section className="mx-auto max-w-[1180px] px-7 pt-5">
      <div className="grid items-stretch gap-5 md:grid-cols-2">
        <div className="py-10">
          <h2 className="max-w-[16ch] text-[clamp(26px,3vw,38px)] font-semibold leading-[1.08] tracking-[-0.03em] text-ink">
            {introAgents.h2}
          </h2>
          <p className="mt-6 max-w-[40ch] text-[15px] leading-[1.5] text-[--body]">
            {introAgents.quote}
          </p>
          <div className="mt-[18px] text-[14px] text-dim">
            {introAgents.attribution}
          </div>
          <div className="mt-6">
            <ArrowLink href="#" label={introAgents.link} />
          </div>
        </div>
        <div className="relative flex min-h-[340px] items-center justify-center rounded-[14px] bg-panel">
          <span className="text-[clamp(40px,5vw,70px)] font-bold tracking-[-0.04em] text-ink">
            {brand.name}
          </span>
          <span className="absolute left-4 top-[14px] font-mono text-[10px] text-cap">
            {introAgents.lockupTag}
          </span>
        </div>
      </div>
    </section>
  );
}

// Keep your ops team focused — testimonial split with a (fictional) customer portrait placeholder.
export function KeepFocused() {
  return (
    <section className="mx-auto max-w-[1180px] px-7 py-12">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div
          className="relative aspect-[1/1.05] overflow-hidden rounded-[14px]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, #e6e5df 0, #e6e5df 1px, #f1f0ea 1px, #f1f0ea 12px)",
          }}
        >
          <div className="absolute bottom-[22px] left-[22px] text-ink">
            <div className="text-[38px] font-bold tracking-[-0.02em]">
              {keepFocused.portrait.name}
            </div>
            <div className="text-[13.5px] text-[--body]">
              {keepFocused.portrait.role}
            </div>
          </div>
          <span className="absolute left-4 top-[14px] font-mono text-[10px] text-cap">
            {keepFocused.portrait.tag}
          </span>
        </div>
        <div>
          <h2 className="max-w-[16ch] text-[clamp(26px,3.2vw,42px)] font-semibold leading-[1.06] tracking-[-0.03em] text-ink">
            {keepFocused.h2}
          </h2>
          <p className="mt-[22px] max-w-[42ch] text-[15px] leading-[1.5] text-[--body]">
            {keepFocused.body}
          </p>
          <div className="mt-[22px]">
            <ArrowLink href="#demo" label={keepFocused.link} />
          </div>
        </div>
      </div>
    </section>
  );
}

// AI that learns — split with the procurement-policy card (capability, not fabricated traction).
export function AILearns() {
  return (
    <section className="mx-auto max-w-[1180px] px-7 py-12">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div>
          <span className="font-mono text-[11px] tracking-[0.08em] text-faint">
            {aiLearns.eyebrow}
          </span>
          <h2 className="mt-[14px] max-w-[14ch] text-[clamp(26px,3.2vw,42px)] font-semibold leading-[1.06] tracking-[-0.03em] text-ink">
            {aiLearns.h2}
          </h2>
          <p className="mt-2.5 max-w-[40ch] text-[13px] leading-[1.45] text-dim">
            {aiLearns.subline}
          </p>
          <p className="mt-[22px] max-w-[42ch] text-[15px] leading-[1.5] text-[--body]">
            {aiLearns.body}
          </p>
        </div>
        <div className="min-h-[300px] rounded-[14px] bg-panel p-[30px]">
          <div className="rounded-[12px] border border-line2 bg-white p-[22px]">
            <div className="mb-[18px] flex items-center justify-between">
              <span className="text-[15px] font-semibold text-ink">
                {aiLearns.policyTitle}
              </span>
              <span className="rounded-full bg-okbg px-[9px] py-1 text-[11px] font-semibold text-ok">
                {aiLearns.policyBadge}
              </span>
            </div>
            {aiLearns.policyRows.map((p) => (
              <div
                key={p.k}
                className="flex items-center justify-between border-t border-line py-[11px] text-[13.5px]"
              >
                <span className="text-[--body]">{p.k}</span>
                <span className="font-mono text-[12px] text-ink">{p.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Scale the line — centered headline + two capability cards with mock panes.
export function Scale() {
  return (
    <section className="mx-auto max-w-[1180px] px-7 py-[72px] text-center">
      <h2 className="text-[clamp(30px,4.4vw,58px)] font-semibold leading-none tracking-[-0.035em] text-ink">
        {scale.h2Lead}
        <br />
        <span className="text-dim">{scale.h2Tail}</span>
      </h2>
      <div className="mt-12 grid gap-4 text-left md:grid-cols-2">
        {scale.cards.map((c) => (
          <div
            key={c.title}
            className="flex min-h-[260px] flex-col rounded-[14px] bg-panel p-7"
          >
            <div className="mb-auto h-[120px] rounded-[10px] border border-line2 bg-white p-[14px]">
              <div className="font-mono text-[9.5px] text-cap">{c.cap}</div>
              <div className="mt-3 flex flex-col gap-2">
                <div className="h-[8px] rounded-[4px] bg-skel" />
                <div className="h-[8px] w-[70%] rounded-[4px] bg-skel" />
              </div>
            </div>
            <h3 className="mt-[22px] text-[18px] font-semibold tracking-[-0.02em] text-ink">
              {c.title}
            </h3>
            <p className="mt-1.5 text-[14px] leading-[1.45] text-[--body]">
              {c.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

// Receipts — 4-up (fictional) testimonials. See docs/pre-launch-swap.md.
export function Receipts() {
  return (
    <section
      id="customers"
      className="mx-auto max-w-[1180px] px-7 pb-20 pt-10 text-center"
    >
      <h2 className="text-[clamp(30px,4vw,52px)] font-semibold leading-[1.02] tracking-[-0.035em] text-ink">
        {receipts.h2}
      </h2>
      <div className="mt-12 grid gap-3.5 text-left sm:grid-cols-2 lg:grid-cols-4">
        {receipts.items.map((t) => (
          <div
            key={t.logo}
            className="flex min-h-[200px] flex-col rounded-[12px] border border-line p-[22px]"
          >
            <span className="text-[13px] font-bold tracking-[-0.01em] text-logo">
              {t.logo}
            </span>
            <p className="mt-4 text-[13.5px] leading-[1.45] text-ink">
              “{t.quote}”
            </p>
            <div className="mt-auto pt-4 text-[12px] text-dim">{t.who}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
