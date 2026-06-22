import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "@/components/theme-provider";
import { HeaderScroll } from "@/components/header-scroll";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

// Self-hosted Geist via the `geist` package (not the Google-fonts loader): exposes the
// --font-geist-sans / --font-geist-mono CSS variables with display: swap, so there is no
// FOUT/CLS. Binding the Tailwind theme to these variables is owned by SETUP.3.
export const metadata: Metadata = {
  // Placeholder only — full per-page metadata, OG, and canonical land in SEO.1.
  title: "Axona",
  description: "The operating system for robotics companies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning: next-themes writes the theme class to <html> before hydration,
    // which would otherwise trip a server/client mismatch warning. This is the only attribute
    // it silences — it does not mask other mismatches.
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
    >
      {/* relative: anchors HeaderScroll's absolutely-positioned top sentinel. flex column +
          flex-1 main keeps the footer at the bottom on short pages. */}
      <body className="relative flex min-h-dvh flex-col">
        {/* Dark is the default; enableSystem honors prefers-color-scheme when no choice is stored;
            disableTransitionOnChange prevents a color flash when switching themes. */}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* Skip link — first focusable element; reveals on focus and jumps to <main>. */}
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:border focus:border-border focus:bg-popover focus:px-4 focus:py-2 focus:text-sm focus:font-[510] focus:text-popover-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            Skip to content
          </a>

          {/* Zero-layout scroll sentinel that drives the header hairline (CLS/INP-safe). */}
          <HeaderScroll />

          <SiteHeader />

          {/* tabIndex=-1 so the skip link can move focus here; flex-1 pushes the footer down. */}
          <main id="main" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>

          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
