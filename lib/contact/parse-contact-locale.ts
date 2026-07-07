import { siteConfig } from "@/lib/site-config";
import type { ContactLocale } from "./types";

export function parseContactLocale(raw: string | undefined): ContactLocale {
  return raw === "pl" ? "pl" : siteConfig.defaultLocale;
}
