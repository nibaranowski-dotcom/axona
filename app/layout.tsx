import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
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
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
