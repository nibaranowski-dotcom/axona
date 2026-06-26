import { AnnounceBar, SiteNav, SiteFooter } from "@/components/v2/chrome";
import { Hero } from "@/components/v2/hero";
import { Problem } from "@/components/v2/problem";
import { Wedge } from "@/components/v2/wedge";
import { Platform, Verticals } from "@/components/v2/platform";
import { Partner } from "@/components/v2/partner";
import { FinalCta } from "@/components/v2/closing";

// Homepage — Axona PRE-LAUNCH (PRELAUNCH.1). Honest, manufacturing-led, ~6 sections: hero (status
// chip + sample SN-2208 widget) → problem → what it is (propose→approve→audit) → platform (4 layers)
// → verticals (coming soon) → founding design partner → final CTA. No fabricated traction.
export default function Home() {
  return (
    <>
      <AnnounceBar />
      <SiteNav />
      <main id="main">
        <Hero />
        <Problem />
        <Wedge />
        <Platform />
        <Verticals />
        <Partner />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
