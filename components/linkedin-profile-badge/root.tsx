import { Card, CardContent } from "@/components/ui/card";
import { LinkedInProfileBadgeAvatar } from "./avatar";
import { LinkedInProfileBadgeCta } from "./cta";
import { LinkedInProfileBadgeIdentity } from "./identity";
import { LinkedInProfileBadgeSkills } from "./skills";

export async function LinkedInProfileBadgeRoot() {
  return (
    <Card className="w-full max-w-xs gap-0 overflow-hidden py-0 shadow-sm rounded-md">
      <CardContent className="flex flex-col items-start gap-4 p-4">
        <LinkedInProfileBadgeAvatar />
        <LinkedInProfileBadgeIdentity />
        <LinkedInProfileBadgeSkills />
        <LinkedInProfileBadgeCta />
      </CardContent>
    </Card>
  );
}
