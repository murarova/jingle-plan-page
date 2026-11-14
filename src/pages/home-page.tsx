import { Benefits } from "@/sections/benefits";
import { Download } from "@/sections/download";
import { Footer } from "@/sections/footer";
import { Hero } from "@/sections/hero";
import { HowItWorks } from "@/sections/how-it-works";
import { LifePromo } from "@/sections/life-promo";
import { Outcome } from "@/sections/outcome";
import { StickyCta } from "@/sections/sticky-cta";

export function HomePage() {
  return (
    <>
      <Hero />
      <main>
        <HowItWorks />
        <Benefits />
        <Outcome />
        <LifePromo />
        <Download />
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
