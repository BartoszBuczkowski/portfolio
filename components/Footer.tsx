import { Logo } from "@/components/Logo";
import { Instagram, Linkedin, Twitter, Facebook } from "lucide-react";

const primaryLinks = [
  { label: "About", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Careers", href: "#" },
  { label: "Referral Program", href: "#" },
  { label: "Press", href: "#" },
];

const legalLinks = [
  { label: "Terms of Service", href: "#" },
  { label: "Privacy Policy", href: "#" },
];

const socialLinks = [
  { label: "Facebook", href: "#", Icon: Facebook },
  { label: "Twitter", href: "#", Icon: Twitter },
  { label: "Instagram", href: "#", Icon: Instagram },
  { label: "LinkedIn", href: "#", Icon: Linkedin },
];

export function Footer() {
  return (
    <footer className="bg-muted/35 px-6 py-16 md:px-12 lg:px-24">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16">
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
              <button
                type="button"
                className="h-11 rounded-lg bg-accent-violet px-4 text-sm font-medium text-primary-foreground shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-colors hover:bg-accent-blue"
              >
                Subscribe
              </button>
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

          <nav aria-label="Footer legal links" className="flex flex-wrap gap-8">
            {legalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
