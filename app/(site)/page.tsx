import { Hero } from "@/components/sections/Hero";
import { Metrics } from "@/components/sections/Metrics";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Approach } from "@/components/sections/Approach";
import { HowIThink } from "@/components/sections/HowIThink";
import { SystemDesign } from "@/components/sections/SystemDesign";
import { Timeline } from "@/components/sections/Timeline";
// import { Pricing } from "@/components/sections/Pricing";
import { About } from "@/components/sections/About";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { SectionDivider } from "@/components/layout/SectionDivider";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Metrics />
      <SectionDivider id="portfolio" label="Latest Projects" />
      <Projects />
      <Skills />
      <Approach />
      <HowIThink />
      <SystemDesign />
      <Timeline />
      {/* <Pricing /> */}
      <About />
      <FAQ />
      <Contact />
    </>
  );
}
