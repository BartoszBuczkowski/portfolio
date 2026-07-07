import { FaqSection } from "@/components/faq-section";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { HeroHeader } from "@/components/hero-header";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { StructuredData } from "@/components/structured-data";
import { TechStackSection } from "@/components/tech-stack-section";
import { Theme } from "@/components/theme";
import { getTranslations } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations("Nav");

  return (
    <Theme.Provider>
    <div className="min-h-screen bg-background font-sans text-foreground">
      <StructuredData />
      <StructuredData.Faq />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-foreground focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring"
      >
        {t("skipToContent")}
      </a>
      <HeroHeader />
      <main id="main-content">
        <Hero />
        <TechStackSection />
        <ExperienceTimeline />
        <FaqSection />
      </main>
      <Footer />
    </div>
    </Theme.Provider>
  );
}
