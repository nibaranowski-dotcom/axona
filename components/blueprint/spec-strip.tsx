import { stats, logoWall } from "@/content/blueprint";

// Spec strip (#customers) — four stat cells separated by hairlines, then a placeholder logo row.
// PROTOTYPE: the stats are illustrative and the logo tiles are striped placeholders (no real company
// named) — both tracked in docs/pre-launch-swap.md, to be replaced/permissioned before launch.
export function SpecStrip() {
  return (
    <section id="customers" className="border-b border-line">
      <div className="mx-auto max-w-[1320px] px-8">
        <dl className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.k}
              className={
                "border-line px-7 py-7 " +
                (i % 2 !== 0 ? "border-l " : "") +
                (i >= 2 ? "border-t md:border-t-0 " : "") +
                "md:border-l md:first:border-l-0"
              }
            >
              <dt className="mono-label text-[11px] text-muted-foreground">{s.k}</dt>
              <dd className="display mt-2 text-[30px] text-ink">{s.v}</dd>
            </div>
          ))}
        </dl>

        {/* Placeholder logo wall — swap for permissioned/real logos before launch. */}
        <div className="border-t border-line py-8">
          <p className="kicker mb-5">{logoWall.kicker}</p>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {Array.from({ length: logoWall.tiles }).map((_, i) => (
              <li key={i} className="ph h-16">
                <span>{logoWall.caption}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
