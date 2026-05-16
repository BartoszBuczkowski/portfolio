export const THEME_COOKIE_NAME = "theme";
export const THEME_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;
export const DEFAULT_THEME_PREFERENCE = "system" as const;

export type ThemePreference = "light" | "dark" | "system";

const THEME_COOKIE_PATTERN = /(?:^|;\s*)theme=(dark|light|system)(?:;|$)/;

export function parseThemePreference(value: string | undefined | null): ThemePreference | null {
  if (value === "dark" || value === "light" || value === "system") return value;
  return null;
}

export function readThemePreferenceFromCookie(cookie: string): ThemePreference {
  const match = cookie.match(THEME_COOKIE_PATTERN);
  return parseThemePreference(match?.[1]) ?? DEFAULT_THEME_PREFERENCE;
}

export function resolveIsDark(preference: ThemePreference, systemIsDark: boolean): boolean {
  if (preference === "dark") return true;
  if (preference === "light") return false;
  return systemIsDark;
}

export function applyThemeToDocument(isDark: boolean): void {
  document.documentElement.classList.toggle("dark", isDark);
}

export function setThemeCookie(preference: ThemePreference): void {
  document.cookie = `${THEME_COOKIE_NAME}=${preference}; path=/; max-age=${THEME_COOKIE_MAX_AGE_SECONDS}; SameSite=Lax`;
}

/** Inline script for layout — must stay in sync with resolveIsDark / readThemePreferenceFromCookie */
export const themeInitScript = `(function(){try{var m=document.cookie.match(/(?:^|;\\s*)theme=(dark|light|system)(?:;|$)/);var p=m&&m[1]?m[1]:"system";var d=p==="dark"||(p==="system"&&window.matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",d)}catch(e){}})();`;
