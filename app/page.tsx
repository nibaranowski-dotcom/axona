import { Hero } from "@/components/hero";
import { Wedge } from "@/components/wedge";

// Homepage. The app shell (header, footer, theme toggle, skip link) wraps this from
// app/layout.tsx (SETUP.4); this file owns the page body and the single <h1> (in <Hero />).
// Sections land in HOME.* stories below the hero: HOME.3 = <Wedge /> (#product).
export default function Home() {
  return (
    <>
      <Hero />
      <Wedge />
    </>
  );
}
