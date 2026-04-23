import { SiteHeader } from "@/components/brand/site-header";
import { SiteFooter } from "@/components/brand/site-footer";
import { Hero } from "@/components/landing/hero";
import { StepsSection } from "@/components/landing/steps-section";
import { AlgorithmsGrid } from "@/components/landing/algorithms-grid";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <StepsSection />
        <AlgorithmsGrid />
      </main>
      <SiteFooter />
    </>
  );
}
