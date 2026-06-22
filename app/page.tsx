import { Hero } from "@/components/hero";
import { Problem } from "@/components/problem";
import { Wedge } from "@/components/wedge";

// Homepage. The app shell (header, footer, theme toggle, skip link) wraps this from
// app/layout.tsx (SETUP.4); this file owns the page body and the single <h1> (in <Hero />).
// Order tells the story top-down: category (hero) → pain (problem) → proof (wedge).
// Sections land in HOME.* stories below the hero: HOME.2 = <Problem /> (#problem),
// HOME.3 = <Wedge /> (#product).
export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <Wedge />
    </>
  );
}
