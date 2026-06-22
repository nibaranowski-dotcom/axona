import { Button } from "@/components/ui/button";

// SETUP.3 token proof — NOT the homepage. A deliberately plain board that exercises the
// design.md token system (surface steps, text tiers, the single teal signal) so design-critique
// and the a11y pass have something real to judge. The app shell (nav + footer, with the theme
// toggle) now wraps this from app/layout.tsx (SETUP.4). HOME.1 replaces this body entirely.
export default function Home() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-10 px-6 py-16">
      <div className="flex flex-col gap-1">
        <p className="font-mono text-xs tracking-tight text-muted-foreground">
          SETUP.3 · design tokens + theming
        </p>
        <h1 className="text-2xl font-[590] tracking-[-0.02em] text-foreground">
          Token &amp; theme proof
        </h1>
      </div>

      {/* Surface steps — elevation via surface + 1px hairline border, not shadow. */}
      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-[510] text-muted-foreground">Surfaces</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-border bg-background p-4">
            <p className="font-mono text-xs text-muted-foreground">--background</p>
            <p className="mt-1 text-sm text-foreground">Canvas</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="font-mono text-xs text-muted-foreground">--card</p>
            <p className="mt-1 text-sm text-foreground">Surface</p>
          </div>
          <div className="rounded-lg border border-border bg-popover p-4">
            <p className="font-mono text-xs text-muted-foreground">--popover</p>
            <p className="mt-1 text-sm text-foreground">Elevated</p>
          </div>
        </div>
      </section>

      {/* Text tiers — hierarchy from weight + size, not color. */}
      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-[510] text-muted-foreground">Type</h2>
        <div className="rounded-lg border border-border bg-card p-5">
          <p className="text-base font-[510] text-foreground">
            Primary text reads at full contrast on the canvas.
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Muted text recedes for secondary detail and metadata.
          </p>
          <p className="mt-3 font-mono text-xs text-muted-foreground">
            Geist Mono — part numbers, field-keys, code.
          </p>
        </div>
      </section>

      {/* The one signal color: teal as the primary action and the focus ring. */}
      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-[510] text-muted-foreground">Signal</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button>Request access</Button>
          <Button variant="outline">Secondary</Button>
          <span className="text-sm text-muted-foreground">
            Teal is the only accent — primary action and focus ring.
          </span>
        </div>
      </section>
    </div>
  );
}
