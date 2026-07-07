import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { MailIcon } from "lucide-react";

const mailToLink = `mailto:${siteConfig.email}`.replace("@", "+collab@");

export function HeroMailCta() {
  return (
    <Button
      asChild
      className="bg-primary text-base font-medium text-primary-foreground shadow-md hover:bg-primary/90 self-center px-4 py-2"
    >
      <a href={mailToLink} className="inline-flex items-center gap-2">
        <MailIcon className="size-4" />
        {siteConfig.email}
      </a>
    </Button>
  );
}
