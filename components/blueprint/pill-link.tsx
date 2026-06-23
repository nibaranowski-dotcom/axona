import Link from "next/link";

import { cn } from "@/lib/utils";

// Blueprint pill button (link). The only rounded element in the system. Variants map to the .btn-*
// classes in globals.css (ink / orange / outline / ghost). Chevron is the Blueprint affordance.
type Variant = "ink" | "orange" | "outline" | "ghost";

const VARIANT: Record<Variant, string> = {
  ink: "btn-ink",
  orange: "btn-orange",
  outline: "btn-outline",
  ghost: "btn-ghost",
};

export function PillLink({
  href,
  label,
  variant = "ink",
  chevron = true,
}: {
  href: string;
  label: string;
  variant?: Variant;
  chevron?: boolean;
}) {
  return (
    <Link href={href} className={cn("btn", VARIANT[variant])}>
      {label}
      {chevron && <span aria-hidden="true">›</span>}
    </Link>
  );
}
