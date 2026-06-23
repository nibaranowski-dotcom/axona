import { AnnounceBar, SiteNav, SiteFooter } from "@/components/v2/chrome";
import { Hero } from "@/components/v2/hero";
import { Join } from "@/components/v2/join";
import { Platform, Systems } from "@/components/v2/platform";
import { Architecture, Verticals } from "@/components/v2/architecture";
import { IntroAgents, KeepFocused, AILearns, Scale, Receipts } from "@/components/v2/agents";
import { Closing } from "@/components/v2/closing";

// Homepage — Axona v2 redesign prototype (redesign/axona-v2). Rebuilt from the "Axona v2" design
// project's Homepage.dc.html in our Next/Tailwind/tokens (the .dc.html is a reference only). The page
// owns the chrome: announce bar + sticky nav (header), the section spine in <main> (the single <h1>
// is in <Hero />), and the dark footer. The v1 HOME.* components are unused on this branch.
export default function Home() {
  return (
    <>
      <AnnounceBar />
      <SiteNav />
      <main id="main">
        <Hero />
        <Join />
        <Platform />
        <Systems />
        <Architecture />
        <Verticals />
        <IntroAgents />
        <KeepFocused />
        <AILearns />
        <Scale />
        <Receipts />
        <Closing />
      </main>
      <SiteFooter />
    </>
  );
}
