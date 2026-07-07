import { FooterCopyright } from "./copyright";
import { FooterCtaColumn } from "./cta-column";
import { FooterProfileColumn } from "./profile-column";

export async function FooterRoot() {
  return (
    <footer className="relative isolate overflow-hidden bg-muted/50 dark:bg-black/5 py-16">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-16 px-6">
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between lg:gap-16">
          <FooterProfileColumn />
          <FooterCtaColumn />
        </div>
        <FooterCopyright />
      </div>
    </footer>
  );
}
