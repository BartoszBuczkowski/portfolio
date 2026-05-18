import { getAbsoluteUrl, getLocalePath, getSocialProfiles, siteConfig } from "@/lib/site-config";

type StructuredDataInput = {
  locale: string;
  title: string;
  description: string;
};

export function buildStructuredData({ locale, title, description }: StructuredDataInput) {
  const pageUrl = getAbsoluteUrl(getLocalePath(locale));
  const personId = pageUrl ? `${pageUrl}#person` : "#person";
  const websiteId = pageUrl ? `${pageUrl}#website` : "#website";
  const socialProfiles = getSocialProfiles();

  const person = {
    "@type": "Person",
    "@id": personId,
    name: siteConfig.name,
    jobTitle: siteConfig.jobTitle,
    email: siteConfig.email,
    description,
    image: getAbsoluteUrl(siteConfig.profileImage.path),
    url: pageUrl,
    ...(socialProfiles.length > 0 ? { sameAs: socialProfiles } : {}),
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
    name: `${siteConfig.name} — ${siteConfig.jobTitle}`,
    description,
    url: pageUrl,
    image: getAbsoluteUrl(siteConfig.profileImage.path),
    email: siteConfig.email,
    areaServed: siteConfig.location.countryCode,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.location.city,
      addressCountry: siteConfig.location.countryCode,
    },
    provider: { "@id": personId },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [person, website, profilePage, professionalService],
  };
}
