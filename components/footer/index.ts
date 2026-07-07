import { FooterCopyright } from "./copyright";
import { FooterCtaColumn } from "./cta-column";
import { FooterProfileColumn } from "./profile-column";
import { FooterRoot } from "./root";

export const Footer = Object.assign(FooterRoot, {
  ProfileColumn: FooterProfileColumn,
  CtaColumn: FooterCtaColumn,
  Copyright: FooterCopyright,
});
