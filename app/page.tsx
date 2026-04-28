import { Hero } from "@/components/Hero";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { ContactForm } from "@/components/ContactForm";
import { HeroHeader } from "@/components/HeroHeader";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <main>
        <HeroHeader />
        <Hero
          headline="Crafting User-Centric Experiences."
          email="ampitanb@yahoo.com"
          avatarSrc="/avatar.jfif"
        />
        <ExperienceTimeline />
        <ContactForm />
      </main>
    </div>
  );
}
