import { platform, systems, type FeatureCard as FC } from "@/content/site-v2";
import { cn } from "@/lib/utils";

function FeatureCard({ card, size = "lg" }: { card: FC; size?: "lg" | "sm" }) {
  const lg = size === "lg";
  return (
    <div
      className={cn(
        "flex flex-col rounded-[14px] bg-panel",
        lg ? "min-h-[330px] p-[26px] pb-0" : "min-h-[280px] p-6 pb-0",
      )}
    >
      <h3 className={cn("font-semibold tracking-[-0.02em] text-ink", lg ? "text-[20px]" : "text-[17px]")}>
        {card.title}
      </h3>
      <p className={cn("mt-2 leading-[1.45] text-[--body]", lg ? "max-w-[42ch] text-[14.5px]" : "text-[13.5px]")}>
        {card.body}
      </p>
      <div
        className={cn(
          "mt-auto overflow-hidden rounded-t-[10px] border border-b-0 border-line2 bg-white",
          lg ? "h-[150px] p-4" : "h-[120px] p-[14px]",
        )}
      >
        <div className="font-mono text-[9.5px] tracking-[0.06em] text-cap">{card.cap}</div>
        <div className="mt-[14px] flex flex-col gap-[9px]">
          {(lg ? ["100%", "78%", "88%", "64%"] : ["100%", "72%"]).map((w, i) => (
            <div key={i} className="h-[8px] rounded-[4px] bg-skel" style={{ width: w }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function Platform() {
  return (
    <section id="platform" className="mx-auto max-w-[1180px] px-7 pb-[30px] pt-[72px]">
      <h2 className="max-w-[18ch] text-[clamp(30px,4vw,52px)] font-semibold leading-[1.02] tracking-[-0.035em] text-ink">
        {platform.h2}
      </h2>
      <p className="mt-1.5 text-[clamp(18px,2vw,24px)] font-medium text-dim">{platform.sub}</p>

      <div className="mt-7 flex flex-wrap gap-2">
        {platform.tabs.map((t) => (
          <span
            key={t.label}
            className={cn(
              "rounded-full border px-[15px] py-2 text-[13.5px] font-medium",
              t.active ? "border-ink bg-ink text-white" : "border-line2 bg-white text-[--body]",
            )}
          >
            {t.label}
          </span>
        ))}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {platform.cards.map((c) => (
          <FeatureCard key={c.title} card={c} size="lg" />
        ))}
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {platform.small.map((c) => (
          <FeatureCard key={c.title} card={c} size="sm" />
        ))}
      </div>
    </section>
  );
}

export function Systems() {
  return (
    <section className="mx-auto max-w-[1180px] px-7 py-[88px] text-center">
      <h2 className="text-[clamp(30px,4vw,52px)] font-semibold leading-[1.02] tracking-[-0.035em] text-ink">
        {systems.h2}
      </h2>
      <p className="mx-auto mt-3 max-w-[48ch] text-[16px] text-dim">{systems.sub}</p>
      <div className="mt-12 flex flex-wrap items-center justify-center gap-[18px]">
        {systems.legacy.map((l) => (
          <div
            key={l}
            className="flex h-[150px] w-[200px] items-center justify-center rounded-[10px] border border-line bg-panel font-mono text-[11px] text-cap"
          >
            {l}
          </div>
        ))}
      </div>
    </section>
  );
}
