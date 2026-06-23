import { industries } from "@/content/blueprint";

// Industries (#industries) — a hairline 3×2 card grid with mono corner codes (IND.01…). Borders via
// wrapper top/left + per-cell bottom/right, so the grid is clean with no doubled lines.
export function Industries() {
  return (
    <section id="industries" className="mx-auto max-w-[1320px] px-8 pb-[100px]">
      <div className="mb-10 max-w-[60ch]">
        <p className="kicker mb-[18px]">{industries.kicker}</p>
        <h2 className="display text-[clamp(34px,4.6vw,58px)] text-ink">{industries.heading}</h2>
      </div>

      <ul className="grid grid-cols-1 border-l border-t border-line md:grid-cols-3">
        {industries.cards.map((c) => (
          <li
            key={c.code}
            className="relative border-b border-r border-line px-[26px] pb-[34px] pt-[30px]"
          >
            <span className="absolute right-4 top-3.5 font-mono text-[11px] text-muted-foreground">
              {c.code}
            </span>
            <h3 className="mt-10 text-[21px] font-[700] text-ink">{c.title}</h3>
            <p className="mt-2 text-[15px] text-muted-foreground">{c.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
