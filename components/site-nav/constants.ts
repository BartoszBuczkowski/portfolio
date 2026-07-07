export const siteNavItems = [
  { href: "#experience", key: "experience" as const },
  { href: "#faq", key: "faq" as const },
  { href: "#contact", key: "contact" as const },
] as const;

export const siteNavLinkClassName =
  "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm";
