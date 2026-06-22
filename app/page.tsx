import { Hero } from "@/components/hero";
import { Problem } from "@/components/problem";
import { Wedge } from "@/components/wedge";
import { Thesis } from "@/components/thesis";

// Homepage. The app shell (header, footer, theme toggle, skip link) wraps this from
// app/layout.tsx (SETUP.4); this file owns the page body and the single <h1> (in <Hero />).
// Order tells the story top-down: category (hero) → pain (problem) → proof (wedge) → thesis (why
// we win). Sections land in HOME.* stories below the hero: HOME.2 = <Problem /> (#problem),
// HOME.3 = <Wedge /> (#product), HOME.6 = <Thesis /> (#thesis). Per HOME.6 R8 the thesis sits
// after the last currently-rendered section today; HOME.4/4B/5 insert above it to reach final IA.
export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <Wedge />
      <Thesis />
    </>
  );
}
