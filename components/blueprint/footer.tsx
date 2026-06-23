import { brand, footer } from "@/content/blueprint";

// Orange footer — the one full-orange block. Giant "A" wordmark, mono column headings, link columns,
// and a mono base bar. White on orange (AA); links dim on hover.
export function BlueprintFooter() {
  return (
    <footer className="bg-orange text-white">
      <div className="mx-auto max-w-[1320px] px-8">
        <div className="grid grid-cols-2 gap-7 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div className="col-span-2 md:col-span-1">
            <span
              aria-hidden="true"
              className="block font-[900] leading-[0.8] tracking-[-0.04em] text-[clamp(80px,14vw,200px)]"
            >
              {brand.mark}
            </span>
          </div>
          {footer.columns.map((col) => (
            <div key={col.heading}>
              <h2 className="mb-[18px] font-mono text-[11px] font-[700] uppercase tracking-[0.14em] opacity-70">
                {col.heading}
              </h2>
              <ul className="grid gap-2.5 font-[700]">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="transition-opacity hover:opacity-70">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between border-t border-white/35 py-7 font-mono text-[12px] uppercase tracking-[0.1em]">
          <span>{footer.bar.left}</span>
          <a href="#about" className="transition-opacity hover:opacity-70">
            {footer.bar.right}
          </a>
        </div>
      </div>
    </footer>
  );
}
