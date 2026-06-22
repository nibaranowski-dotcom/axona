import { Hero } from "@/components/hero";
import { Problem } from "@/components/problem";
import { Wedge } from "@/components/wedge";
import { HowItWorks } from "@/components/how-it-works";
import { Thesis } from "@/components/thesis";

// Homepage. The app shell (header, footer, theme toggle, skip link) wraps this from
// app/layout.tsx (SETUP.4); this file owns the page body and the single <h1> (in <Hero />).
// Order tells the story top-down: category (hero) → pain (problem) → proof (wedge) → thesis (why
// we win). Sections land in HOME.* stories below the hero: HOME.2 = <Problem /> (#problem),
// HOME.3 = <Wedge /> (#product), HOME.4 = <HowItWorks /> (#how-it-works), HOME.6 = <Thesis />
// (#thesis). IA order: hero → problem → wedge → how-it-works → thesis. HOME.4B/5 insert into this
// run later; the thesis stays last among currently-rendered sections.
export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <Wedge />
      <HowItWorks />
      <Thesis />
    </>
  );
}
