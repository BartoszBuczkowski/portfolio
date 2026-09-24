import { LinkedInProfileBadgeAvatar } from "./avatar";
import { LinkedInProfileBadgeCta } from "./cta";
import { LinkedInProfileBadgeIdentity } from "./identity";
import { LinkedInProfileBadgeRoot } from "./root";
import { LinkedInProfileBadgeSkills } from "./skills";

export const LinkedInProfileBadge = Object.assign(LinkedInProfileBadgeRoot, {
  Avatar: LinkedInProfileBadgeAvatar,
  Identity: LinkedInProfileBadgeIdentity,
  Skills: LinkedInProfileBadgeSkills,
  Cta: LinkedInProfileBadgeCta,
});
