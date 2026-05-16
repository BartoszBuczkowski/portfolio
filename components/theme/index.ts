import { ThemeProvider } from "./theme-provider";
import { ThemeToggle } from "./theme-toggle";

export const Theme = {
  Provider: ThemeProvider,
  Toggle: ThemeToggle,
};

export { useTheme } from "./theme-context";
