import Link from "next/link";

import { cn } from "@/lib/utils";

// Shared Axona v2 primitives. All Server Components. The email form is visual-only for this
// look-eval prototype (no submit wiring — see docs/pre-launch-swap.md).

export function LimeButton({ href, label, className }: { href: string; label: string; className?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center rounded-md bg-lime px-[18px] py-[9px] text-[14px] font-semibold text-ink transition-colors hover:bg-lime-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2",
        className,
      )}
    >
      {label}
    </Link>
  );
}

export function MonoChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-[5px] border border-line2 bg-chip px-2 py-[3px] font-mono text-[11.5px] font-medium text-ink">
      {children}
    </span>
  );
}

export function ArrowLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-[7px] text-[14.5px] font-medium text-ink transition-opacity hover:opacity-60"
    >
      {label}
      <span aria-hidden="true">→</span>
    </Link>
  );
}

// Visual email-capture form (prototype, non-functional). aria-label on the input; lime submit.
export function EmailCapture({
  placeholder,
  cta,
  href,
  className,
}: {
  placeholder: string;
  cta: string;
  href: string;
  className?: string;
}) {
  return (
    <form
      action={href}
      className={cn(
        "flex max-w-[430px] items-stretch overflow-hidden rounded-[9px] border border-line2 bg-white",
        className,
      )}
    >
      <input
        type="email"
        aria-label="Work email"
        placeholder={placeholder}
        className="min-w-0 flex-1 border-0 bg-transparent px-[18px] py-[13px] text-[15px] text-ink outline-none placeholder:text-dim"
      />
      <button
        type="submit"
        className="flex items-center whitespace-nowrap bg-lime px-[22px] py-[13px] text-[14.5px] font-semibold text-ink transition-colors hover:bg-lime-hover"
      >
        {cta}
      </button>
    </form>
  );
}

// Skeleton bars used inside the placeholder mock cards.
export function Skel({ widths }: { widths: string[] }) {
  return (
    <div className="mt-[14px] flex flex-col gap-[9px]">
      {widths.map((w, i) => (
        <div key={i} className="h-[8px] rounded-[4px] bg-skel" style={{ width: w }} />
      ))}
    </div>
  );
}
