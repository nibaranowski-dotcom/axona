import { platform } from "@/content/blueprint";

// Platform (#platform) — numbered spec rows (M.01…), the "spec sheet" read. Ink top rule, hairline
// row dividers, mono codes in orange-ink, hover lifts the row to paper + turns the cue orange.
export function Platform() {
  return (
    <section id="platform" className="mx-auto max-w-[1320px] px-8 py-[100px]">
      <div className="max-w-[60ch]">
        <p className="kicker mb-[18px]">{platform.kicker}</p>
        <h2 className="display text-[clamp(34px,4.6vw,58px)] text-ink">{platform.heading}</h2>
      </div>

      <ol className="mt-14 border-t border-ink">
        {platform.modules.map((m) => (
          <li
            key={m.n}
            className="group grid grid-cols-[50px_1fr] items-baseline gap-6 border-b border-line py-7 transition-colors hover:bg-paper lg:grid-cols-[80px_1fr_1.3fr_60px]"
          >
            <span className="font-mono text-[13px] text-orange-ink">{m.n}</span>
            <h3 className="text-[26px] font-[700] text-ink">{m.title}</h3>
            <p className="hidden text-[16px] text-muted-foreground lg:block">{m.body}</p>
            <span className="hidden text-right font-mono text-[12px] text-muted-foreground transition-colors group-hover:text-orange lg:block">
              VIEW →
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
