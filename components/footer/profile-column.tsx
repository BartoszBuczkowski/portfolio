import { LinkedInProfileBadge } from "@/components/linkedin-profile-badge";

export function FooterProfileColumn() {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-8 items-start">
      <LinkedInProfileBadge />
    </div>
  );
}
