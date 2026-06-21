"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// Client wrapper around next-themes. Config (attribute/defaultTheme/enableSystem) is passed
// from app/layout.tsx so the no-flash pre-hydration script + class toggling live in one place.
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
