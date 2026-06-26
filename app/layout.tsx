import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Axona v2 type system: Archivo (display/body) + JetBrains Mono (labels/codes), self-hosted by
// next/font at build (no runtime CDN), display: swap → no FOUT/CLS. Bound to --font-sans / --font-mono
// in globals.css. Light-canonical prototype; no theme toggle.
const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-archivo",
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

// Canonical site origin — Railway serves axonahq.com (auto-deploys from main). Set
// NEXT_PUBLIC_SITE_URL in the deploy env; falls back to the production domain.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://axonahq.com";
const title = "Axona — The operating system for robotics makers";
const description =
  "An agentic manufacturing co-pilot with a record of every build — per-unit build genealogy and work orders first, then your whole operation. Humans, machines, and agents on one system. Onboarding founding design partners.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Axona",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${jetbrains.variable} antialiased`}
    >
      <body className="bg-background text-foreground">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:border focus:border-line2 focus:bg-white focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:text-ink focus:outline-none focus:ring-2 focus:ring-lime"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
