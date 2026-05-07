import { Logo } from "@/components/Logo";
import { Instagram, Linkedin, Twitter, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";

const primaryLinks = [
  { label: "About", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Careers", href: "#" },
  { label: "Referral Program", href: "#" },
  { label: "Press", href: "#" },
];

const socialLinks = [
  { label: "Facebook", href: "#", Icon: Facebook },
  { label: "Twitter", href: "#", Icon: Twitter },
  { label: "Instagram", href: "#", Icon: Instagram },
  { label: "LinkedIn", href: "#", Icon: Linkedin },
];

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-accent-violet/10 py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -left-24 top-8 h-56 w-56 rounded-full bg-accent-violet/20 blur-3xl motion-safe:animate-pulse dark:bg-accent-violet/30" />
        <div className="absolute -right-18 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-accent-blue/20 blur-3xl motion-safe:animate-[pulse_11s_ease-in-out_infinite] dark:bg-accent-blue/30" />
        <div className="absolute -bottom-28 left-1/3 h-72 w-72 rounded-full bg-accent-violet/15 blur-3xl motion-safe:animate-[pulse_14s_ease-in-out_infinite] dark:bg-accent-violet/25" />
      </div>

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-16 px-6">
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between lg:gap-16">
          <div className="flex min-w-0 flex-1 flex-col gap-8">
            <Logo />
            <nav
              aria-label="Footer primary links"
              className="flex flex-wrap items-center gap-x-6 gap-y-3"
            >
              {primaryLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
              <span className="rounded-full bg-accent-violet/10 px-2 py-1 text-sm font-medium leading-4 text-accent-violet">
                We&apos;re hiring!
              </span>
            </nav>
          </div>

          <div className="w-full max-w-[440px] space-y-6">
            <p className="text-sm leading-5 text-muted-foreground">
              Get the latest updates about Designership&apos;s new features and
              product updates.
            </p>
            <form className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                placeholder="Enter Email address"
                className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground shadow-[0_1px_2px_rgba(16,24,40,0.04)] placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-violet/30"
              />
              <Button type="button" variant="tertiary">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="flex flex-col gap-6 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            {socialLinks.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="text-muted-foreground transition-colors hover:text-accent-violet"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>

          <p className="text-sm text-muted-foreground">
            &copy; Bartosz Buczkowski
          </p>
        </div>
      </div>
    </footer>
  );
}
