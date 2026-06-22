import { Hero } from "@/components/hero";

// Homepage. The app shell (header, footer, theme toggle, skip link) wraps this from
// app/layout.tsx (SETUP.4); this file owns the page body and the single <h1> (in <Hero />).
// Sections land in later HOME.* stories below the hero.
export default function Home() {
  return <Hero />;
}
