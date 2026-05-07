import { FAQSection } from "@/components/faq-section";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { HeroHeader } from "@/components/hero-header";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { TechStackMarquee } from "@/components/tech-stack-marquee";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <main>
        <HeroHeader />
        <Hero />
        <TechStackMarquee />
        <ExperienceTimeline />
        <FAQSection />
        <Footer />
      </main>
    </div>
  );
}
