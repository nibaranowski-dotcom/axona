"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

// Accessible theme toggle: keyboard-operable (it's a real <button>), visible teal focus ring
// (inherited from Button's focus-visible:ring-ring), and a meaningful aria-label.
// Both icons are always rendered and shown/hidden via the `.dark` class so the visual never
// depends on JS state — no hydration mismatch, no flash. The aria-label upgrades to a
// directional message only after mount (resolvedTheme is undefined on the server).
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";
  const label = !mounted
    ? "Toggle theme"
    : isDark
      ? "Switch to light theme"
      : "Switch to dark theme";

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={label}
      className="relative"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <Sun
        aria-hidden="true"
        className="size-5 rotate-0 scale-100 transition-transform duration-[180ms] ease-[cubic-bezier(.2,0,0,1)] dark:-rotate-90 dark:scale-0"
      />
      <Moon
        aria-hidden="true"
        className="absolute size-5 rotate-90 scale-0 transition-transform duration-[180ms] ease-[cubic-bezier(.2,0,0,1)] dark:rotate-0 dark:scale-100"
      />
    </Button>
  );
}
