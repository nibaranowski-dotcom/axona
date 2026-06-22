import type { Metadata } from "next";

import { accessibility } from "@/content/accessibility";
import { site, isPending } from "@/content/site";

// Full per-page metadata (OG image generation is owned by SEO.1; title/description/canonical/
// social tags are set here so the route is complete and crawlable on its own).
export const metadata: Metadata = {
  title: "Accessibility — Axona",
  description:
    "Axona's accessibility statement: our WCAG 2.2 AA conformance target, the measures we take, known limitations, and how to report a barrier.",
  alternates: { canonical: "/accessibility" },
  openGraph: {
    title: "Accessibility — Axona",
    description:
      "Axona's accessibility statement: WCAG 2.2 AA conformance target, measures, known limitations, and contact.",
    url: "/accessibility",
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "Accessibility — Axona",
    description:
      "Axona's accessibility statement: WCAG 2.2 AA conformance target, measures, and contact.",
  },
};

export default function AccessibilityPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24">
      <article className="flex flex-col gap-10">
        <header className="flex flex-col gap-4">
          <h1 className="text-3xl font-[590] tracking-[-0.02em] text-foreground sm:text-4xl">
            {accessibility.title}
          </h1>
          <p className="text-base text-muted-foreground">{accessibility.intro}</p>
          <p className="text-sm text-muted-foreground">
            Target conformance:{" "}
            <span className="font-[510] text-foreground">
              {accessibility.conformanceTarget}
            </span>
          </p>
        </header>

        {accessibility.sections.map((section) => (
          <section key={section.heading} className="flex flex-col gap-3">
            <h2 className="text-lg font-[590] tracking-[-0.01em] text-foreground">
              {section.heading}
            </h2>
            {section.body.map((paragraph, i) => (
              <p key={i} className="text-sm leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
            {/* The contact section carries the real address — or an honest placeholder until
                it's signed off. Never a fabricated email. */}
            {section.heading === "Feedback and contact" && (
              <p className="text-sm leading-relaxed text-muted-foreground">
                {isPending(site.accessibilityEmail) ? (
                  <span>
                    A public accessibility contact address will be published here shortly.
                    In the meantime, please use the “Request access” form to reach the
                    founding team.
                  </span>
                ) : (
                  <>
                    Email{" "}
                    <a
                      href={`mailto:${site.accessibilityEmail}`}
                      className="rounded-sm font-[510] text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      {site.accessibilityEmail}
                    </a>
                    .
                  </>
                )}
              </p>
            )}
          </section>
        ))}
      </article>
    </div>
  );
}
