import { Hero } from "@/components/Hero";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { HeroHeader } from "@/components/HeroHeader";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";
import { TechStackMarquee } from "@/components/tech-stack-marquee";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <main>
        <HeroHeader />
        <Hero headline="Crafting User-Centric Experiences." email="ampitanb@yahoo.com" avatarSrc="/avatar.jfif" />
        <TechStackMarquee />
        <ExperienceTimeline />
        <FAQSection />
        <Footer />
      </main>
    </div>
  );
}
