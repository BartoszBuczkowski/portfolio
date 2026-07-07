import { HeroAvatar } from "./avatar";
import { HeroBackground } from "./background";
import { HeroContent } from "./content";
import { HeroDefaultLayout } from "./default-layout";
import { HeroMailCta } from "./mail-cta";
import { HeroRoot } from "./root";

export const Hero = Object.assign(HeroRoot, {
  Background: HeroBackground,
  Avatar: HeroAvatar,
  Content: HeroContent,
  MailCta: HeroMailCta,
  DefaultLayout: HeroDefaultLayout,
});
