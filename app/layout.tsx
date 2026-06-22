import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "@/components/theme-provider";
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
      <body className="min-h-full">
        {/* Dark is the default; enableSystem honors prefers-color-scheme when no choice is stored;
            disableTransitionOnChange prevents a color flash when switching themes. */}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
