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

export const metadata: Metadata = {
  title: "Axona — The operating system for robotics companies",
  description:
    "The AI-native operating system for robotics companies — humans, machines, and agents on one spine. Procurement and per-unit build genealogy first, expanding to run the whole operation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivo.variable} ${jetbrains.variable} antialiased`}>
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
