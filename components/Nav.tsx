import Link from "next/link";
import { cn } from "@/lib/utils";

export function Nav({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      className={cn(
        "sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-md",
        className,
      )}
      {...props}
    >
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-center gap-8 px-6">
        <Link
          href="#experience"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-accent-violet"
        >
          Experience
        </Link>
        <Link
          href="#contact"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-accent-violet"
        >
          Contact
        </Link>
      </div>
    </nav>
  );
}
