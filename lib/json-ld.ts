import type { TimelineItem } from "@/components/experience-timeline/types";
import { buildExperienceGraph } from "@/lib/experience-schema";
import { getAbsoluteUrl, getLocalePath, getSocialProfiles, siteConfig } from "@/lib/site-config";

type StructuredDataInput = {
  locale: string;
  title: string;
  description: string;
  jobTitle: string;
  experience: TimelineItem[];
};

export function buildStructuredData({ locale, title, description, jobTitle, experience }: StructuredDataInput) {
  const pageUrl = getAbsoluteUrl(getLocalePath(locale));
  const personId = pageUrl ? `${pageUrl}#person` : "#person";
  const websiteId = pageUrl ? `${pageUrl}#website` : "#website";
  const socialProfiles = getSocialProfiles();
  const currentRole = experience.find((item) => item.yearTo === null);

  const person = {
    "@type": "Person",
    "@id": personId,
    name: siteConfig.name,
    jobTitle,
    description,
    image: getAbsoluteUrl(siteConfig.profileImage.path),
    url: pageUrl,
    ...(socialProfiles.length > 0 ? { sameAs: socialProfiles } : {}),
    ...(currentRole
      ? {
          worksFor: {
            "@type": "Organization",
            name: currentRole.companyName,
          },
        }
      : {}),
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.location.city,
      addressCountry: siteConfig.location.countryCode,
    },
  };

  const website = {
    "@type": "WebSite",
    "@id": websiteId,
    name: siteConfig.name,
    description,
    url: getAbsoluteUrl("/"),
    inLanguage: locale,
    publisher: { "@id": personId },
  };

  const profilePage = {
    "@type": "ProfilePage",
    "@id": pageUrl ? `${pageUrl}#webpage` : "#webpage",
    url: pageUrl,
    name: title,
    description,
    inLanguage: locale,
    isPartOf: { "@id": websiteId },
    about: { "@id": personId },
    mainEntity: { "@id": personId },
  };

  const professionalService = {
    "@type": "ProfessionalService",
    name: `${siteConfig.name} - ${jobTitle}`,
    description,
    url: pageUrl,
    image: getAbsoluteUrl(siteConfig.profileImage.path),
    areaServed: siteConfig.location.countryCode,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.location.city,
      addressCountry: siteConfig.location.countryCode,
    },
    provider: { "@id": personId },
  };

  const experienceGraph = buildExperienceGraph(personId, experience);

  return {
    "@context": "https://schema.org",
    "@graph": [person, website, profilePage, professionalService, ...experienceGraph],
  };
}
