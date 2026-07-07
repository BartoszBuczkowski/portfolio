"use client";

import { useEffect } from "react";
import { LINKEDIN_SCRIPT_SRC } from "./constants";

function loadLinkedInBadgeScript() {
  if (document.querySelector(`script[src="${LINKEDIN_SCRIPT_SRC}"]`)) return;

  const script = document.createElement("script");
  script.src = LINKEDIN_SCRIPT_SRC;
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);
}

function reloadLinkedInBadgeScript() {
  document.querySelector(`script[src="${LINKEDIN_SCRIPT_SRC}"]`)?.remove();
  loadLinkedInBadgeScript();
}

export function useLinkedInBadgeScript(badgeKey: string) {
  useEffect(() => {
    reloadLinkedInBadgeScript();
  }, [badgeKey]);
}
