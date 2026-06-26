import Link from "next/link";

import { announce, brand, nav, footer } from "@/content/site-v2";
import { LimeButton } from "@/components/v2/ui";

// The asymmetric square brand mark.
function Mark({ className, size = 15 }: { className?: string; size?: number }) {
  return (
    <span
      aria-hidden="true"
      className={className}
      style={{
        width: size,
        height: size,
        borderRadius: "0 7.5px 0 7.5px",
        display: "inline-block",
      }}
    />
  );
}

// Muted "coming soon" pill for dead nav/footer items (honest — not a link to nothing).
function SoonPill({
  label,
  onDark = false,
}: {
  label: string;
  onDark?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 ${onDark ? "text-white/35" : "text-dim"}`}
    >
      {label}
      <span
        className={`rounded-full border px-1.5 py-px font-mono text-[9px] tracking-[0.08em] ${
          onDark ? "border-white/20 text-white/40" : "border-line2 text-cap"
        }`}
      >
        SOON
      </span>
    </span>
  );
}

export function AnnounceBar() {
  return (
    <div className="flex min-h-10 flex-wrap items-center justify-center gap-x-2.5 gap-y-1 bg-ink px-6 py-[9px] text-center text-[13px] leading-[1.3] text-white">
      <span
        aria-hidden="true"
        className="size-1.5 shrink-0 rounded-full bg-lime"
      />
      <span className="text-white/90">{announce.text}</span>
      <a
        href={announce.href}
        className="whitespace-nowrap border-b border-white/40 pb-px text-white hover:opacity-80"
      >
        {announce.cta}&nbsp;→
      </a>
    </div>
  );
}

export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-[1180px] items-center justify-between px-7">
        <div className="flex items-center gap-10">
          <Link
            href="/"
            className="flex items-center gap-[9px]"
            aria-label={brand.lower}
          >
            <span className="text-[26px] font-bold leading-none tracking-[-0.04em] text-ink">
              {brand.lower}
            </span>
            <Mark className="bg-ink" />
          </Link>
          <div className="hidden items-center gap-6 text-[14.5px] md:flex">
            {nav.links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-ink hover:opacity-60"
              >
                {l.label}
              </a>
            ))}
            <SoonPill label={nav.soon} />
          </div>
        </div>
        <div className="flex items-center gap-[18px]">
          <a
            href="#partner"
            className="hidden text-[14.5px] text-ink hover:opacity-60 sm:inline"
          >
            {nav.contact}
          </a>
          <LimeButton href="#partner" label={nav.cta} />
        </div>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-[1180px] px-7 pb-7 pt-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div className="col-span-2 md:col-span-1">
            <div className="mb-[18px] flex items-center gap-2">
              <span className="text-[23px] font-bold leading-none tracking-[-0.04em]">
                {brand.lower}
              </span>
              <Mark className="bg-white" size={13} />
            </div>
            <p className="max-w-[28ch] text-[13.5px] leading-relaxed text-white/55">
              {footer.tagline}
            </p>
          </div>
          {footer.cols.map((col) => (
            <div key={col.head}>
              <h2 className="mb-4 text-[12px] font-semibold tracking-[0.04em] text-white/50">
                {col.head}
              </h2>
              <ul className="flex flex-col gap-[11px] text-[13.5px]">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.soon ? (
                      <SoonPill label={l.label} onDark />
                    ) : (
                      <a
                        href={l.href}
                        className="text-white/70 hover:text-white"
                      >
                        {l.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h2 className="mb-4 text-[12px] font-semibold tracking-[0.04em] text-white/50">
              {footer.getAccess.head}
            </h2>
            <p className="mb-4 max-w-[24ch] text-[13.5px] leading-relaxed text-white/55">
              {footer.getAccess.text}
            </p>
            <LimeButton href="#partner" label={footer.getAccess.cta} />
          </div>
        </div>
        <div className="mt-[52px] flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
          <span className="text-[12.5px] text-white/45">{footer.legal}</span>
        </div>
      </div>
    </footer>
  );
}
