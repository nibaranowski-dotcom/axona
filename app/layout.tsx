import type { Metadata } from "next";
import { Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

// Blueprint type system: Hanken Grotesk (display/body) + JetBrains Mono (labels/kickers/codes),
// self-hosted by next/font at build time (no Google CDN at runtime), display: swap → no FOUT/CLS.
// Exposes --font-hanken / --font-jetbrains, bound to the Tailwind --font-sans / --font-mono tokens
// in globals.css. (Replaces the v1 Geist system per design.md Blueprint.)
const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-hanken",
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  // Placeholder metadata — full per-page metadata/OG/canonical land in SEO.1.
  title: "Axona — The operating system for robotics companies",
  description:
    "The AI-native operating system for robotics companies — humans, machines, and agents on one specification. Starts with an agentic procurement & build co-pilot.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${hanken.variable} ${jetbrains.variable} antialiased`}
    >
      <body className="min-h-dvh bg-background text-foreground">
        {/* Blueprint is light-canonical; dark is deferred (design.md). Keep next-themes infra but
            default + force light so we never auto-invert into an undesigned dark. No toggle yet. */}
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {/* Skip link — first focusable, reveals on focus, jumps to the page's <main id="main">. */}
          <a
            href="#main"
            className="sr-only rounded-none focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:border focus:border-ink focus:bg-paper focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-[0.12em] focus:text-ink focus:outline-none"
          >
            Skip to content
          </a>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
