"use client";

import { useCallback } from "react";

type SiteNavLinkProps = {
  href: string;
  label: string;
  className?: string;
  onNavigate?: () => void;
};

export function SiteNavLink({ href, label, className, onNavigate }: SiteNavLinkProps) {
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      const targetId = href.slice(1);
      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
      onNavigate?.();
    },
    [href, onNavigate],
  );

  return (
    <a href={href} onClick={handleClick} className={className}>
      {label}
    </a>
  );
}
