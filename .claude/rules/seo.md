# Rule: SEO & semantics (applies to app/**, content/**)

- Every route exports Next.js `metadata` (or `generateMetadata`) with: `title`, `description`,
  `openGraph` (title, description, image, url, type), `twitter`, and `alternates.canonical`.
- One `<h1>` per page; logical heading order (no skipping levels). Use semantic landmarks
  (`header`, `nav`, `main`, `section`, `footer`), not `div` soup.
- Structured data (JSON-LD) where it earns rich results: `Organization` (sitewide), `BreadcrumbList`,
  `FAQPage` on any FAQ. Validate with Google Rich Results Test before merge.
- Ship `app/sitemap.ts` and `app/robots.ts`. Canonical, non-trailing-slash URLs; 301 the rest.
- Image `alt` is descriptive and meaningful (or empty for decorative). Links have real, crawlable text.
- OG images are 1200×630, generated or static; never a broken/placeholder image in production.
