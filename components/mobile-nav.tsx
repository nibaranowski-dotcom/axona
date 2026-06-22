"use client";

import * as React from "react";
import Link from "next/link";
import { Dialog } from "radix-ui";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { NavLinks } from "@/components/nav-links";
import type { NavLink } from "@/content/site";

// MobileNav — the small-screen disclosure for the primary nav. Built on Radix Dialog (from the
// unified `radix-ui` package) so we inherit focus trapping, Escape-to-close, scroll lock, and
// correct ARIA for free, rather than hand-rolling them. Hidden ≥ md, where the inline bar shows.
// Copy comes in as props (content/site.ts); the sheet animates with tw-animate-css and honours
// prefers-reduced-motion via the global rule in globals.css.
export function MobileNav({ links, cta }: { links: NavLink[]; cta: NavLink }) {
  const [open, setOpen] = React.useState(false);
  const close = React.useCallback(() => setOpen(false), []);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Open menu"
          className="md:hidden"
        >
          <Menu aria-hidden="true" className="size-5" />
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed inset-y-0 right-0 z-50 flex w-full max-w-xs flex-col gap-6 border-l border-border bg-background p-6 shadow-none duration-[180ms] ease-[cubic-bezier(.2,0,0,1)] data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right"
        >
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-sm font-[590] tracking-[-0.01em] text-foreground">
              Menu
            </Dialog.Title>
            <Dialog.Close asChild>
              <Button type="button" variant="ghost" size="icon" aria-label="Close menu">
                <X aria-hidden="true" className="size-5" />
              </Button>
            </Dialog.Close>
          </div>

          <nav aria-label="Primary" className="flex flex-col gap-1">
            <NavLinks links={links} onNavigate={close} linkClassName="px-0" />
          </nav>

          <Button asChild className="w-full" onClick={close}>
            <Link href={cta.href}>{cta.label}</Link>
          </Button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
