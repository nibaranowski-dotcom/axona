import Link from "next/link";

import { announce, brand, nav, footer } from "@/content/site-v2";
import { LimeButton } from "@/components/v2/ui";

// The little square brand mark (asymmetric rounded corners), per the v2 design.
function Mark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={className}
      style={{ width: 13, height: 13, borderRadius: "0 7px 0 7px", display: "inline-block" }}
    />
  );
}

export function AnnounceBar() {
  return (
    <div className="flex min-h-9 items-center justify-center gap-2.5 bg-ink px-10 py-[7px] text-center text-[13px] text-white">
      <span>{announce.text}</span>
      <a href="#demo" className="underline underline-offset-2 hover:opacity-80">
        {announce.cta}
      </a>
    </div>
  );
}

export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur-md">
      <nav className="mx-auto flex h-[62px] max-w-[1180px] items-center justify-between px-7">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-[23px] font-bold tracking-[-0.04em] text-ink">{brand.lower}</span>
            <Mark className="bg-ink" />
          </Link>
          <div className="hidden items-center gap-6 text-[14.5px] text-ink md:flex">
            {nav.items.map((n) => (
              <a key={n.label} href="#" className="flex items-center gap-1 hover:opacity-60">
                {n.label}
                {n.caret && <span className="text-[9px] text-dim">▾</span>}
              </a>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-[18px]">
          <a href="#" className="hidden text-[14.5px] text-ink hover:opacity-60 sm:inline">
            {nav.signIn}
          </a>
          <LimeButton href="#demo" label={nav.cta} />
        </div>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-[1180px] px-7 pb-7 pt-[72px]">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div className="col-span-2 md:col-span-1">
            <div className="mb-[18px] flex items-center gap-2">
              <span className="text-[23px] font-bold tracking-[-0.04em]">{brand.lower}</span>
              <Mark className="bg-white" />
            </div>
            <p className="max-w-[26ch] text-[13.5px] leading-relaxed text-white/55">{footer.tagline}</p>
          </div>
          {footer.cols.map((col) => (
            <div key={col.head}>
              <h2 className="mb-4 text-[12px] font-semibold tracking-[0.04em] text-white/50">{col.head}</h2>
              <ul className="flex flex-col gap-[11px] text-[13.5px] text-white/70">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="hover:text-white">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-[52px] flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
          <span className="text-[12.5px] text-white/45">
            © {2026} {brand.name}, Inc. · {footer.legal}
          </span>
          <LimeButton href="#demo" label={footer.cta} />
        </div>
      </div>
    </footer>
  );
}
