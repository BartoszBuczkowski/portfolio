import { FAQSection } from "@/components/faq-section";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { HeroHeader } from "@/components/hero-header";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { StructuredData } from "@/components/structured-data";
import { TechStackMarquee } from "@/components/tech-stack-marquee";
import { Theme } from "@/components/theme";

export default function Home() {
  return (
    <Theme.Provider>
    <div className="min-h-screen bg-background font-sans text-foreground">
      <StructuredData />
      <main>
        <HeroHeader />
        <Hero />
        <TechStackMarquee />
        <ExperienceTimeline />
        <FAQSection />
        <Footer />
      </main>
    </div>
    </Theme.Provider>
  );
}
