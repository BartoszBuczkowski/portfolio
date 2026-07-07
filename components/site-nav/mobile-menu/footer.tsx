import { cn } from "@/lib/utils";

type SiteNavMobileMenuFooterProps = {
  children: React.ReactNode;
  className?: string;
};

export function SiteNavMobileMenuFooter({ children, className }: SiteNavMobileMenuFooterProps) {
  return <div className={cn("border-t px-6 py-4", className)}>{children}</div>;
}
