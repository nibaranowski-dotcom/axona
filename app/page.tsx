import { Hero } from "@/components/hero";
import { Problem } from "@/components/problem";
import { Wedge } from "@/components/wedge";
import { HowItWorks } from "@/components/how-it-works";
import { Pillars } from "@/components/pillars";
import { WhyNow } from "@/components/why-now";
import { Thesis } from "@/components/thesis";
import { WhoItsFor } from "@/components/who-its-for";

// Homepage. The app shell (header, footer, theme toggle, skip link) wraps this from
// app/layout.tsx (SETUP.4); this file owns the page body and the single <h1> (in <Hero />).
// Order tells the story top-down: category (hero) → pain (problem) → proof (wedge) → thesis (why
// we win). Sections land in HOME.* stories below the hero: HOME.2 = <Problem /> (#problem),
// HOME.3 = <Wedge /> (#product), HOME.4 = <HowItWorks /> (#how-it-works), HOME.4B = <Pillars />
// (#pillars), HOME.5 = <WhyNow /> (#why-now), HOME.6 = <Thesis /> (#thesis). IA order: hero →
// problem → wedge → how-it-works → pillars → why-now → thesis. The pillars (the Primitives ×
// Domains × Verticals model) render after the four implementation layers; why-now (the timing
// thesis) sits between the pillars and the thesis (content.md orders §6 between §5 and §7); the
// thesis stays last among the argument sections; who-it's-for (HOME.7) follows it (the audience
// map — verticals sequence + buyer/champion), per content.md's §7 → §8 order. HOME.8 (company) and
// HOME.9 (final CTA) insert after <WhoItsFor /> later.
export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <Wedge />
      <HowItWorks />
      <Pillars />
      <WhyNow />
      <Thesis />
      <WhoItsFor />
    </>
  );
}
