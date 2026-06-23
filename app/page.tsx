import { BlueprintNav } from "@/components/blueprint/nav";
import { BlueprintHero } from "@/components/blueprint/hero";
import { SpecStrip } from "@/components/blueprint/spec-strip";
import { Platform } from "@/components/blueprint/platform";
import { Industries } from "@/components/blueprint/industries";
import { AboutBand } from "@/components/blueprint/about";
import { BlueprintFooter } from "@/components/blueprint/footer";

// Homepage — Blueprint redesign prototype (redesign/blueprint, design.md Blueprint system).
// This file owns the full page chrome: sticky nav (header), the section spine in <main> (the page's
// single <h1> lives in <BlueprintHero />), and the orange footer. Order: hero → spec/customers →
// platform (modules) → industries → about/thesis → footer. The v1 HOME.* components are unused on
// this branch (kept for reference / diffing; not imported).
export default function Home() {
  return (
    <>
      <BlueprintNav />
      <main id="main">
        <BlueprintHero />
        <SpecStrip />
        <Platform />
        <Industries />
        <AboutBand />
      </main>
      <BlueprintFooter />
    </>
  );
}
