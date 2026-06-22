"use client";

import * as React from "react";

// HeaderScroll — the Linear-style "hairline appears once you scroll" behaviour, built to be
// CLS- and INP-safe:
//
// • A zero-layout 1px sentinel is pinned to the very top of the page (absolute, so it adds no
//   height). An IntersectionObserver watches it; the moment it leaves the viewport we know the
//   page has scrolled past the top.
// • The observer callback writes a `data-scrolled` attribute directly onto the sticky header's
//   DOM node — it does NOT call setState. IO callbacks fire off the scroll path (not per frame),
//   and skipping a React re-render keeps scrolling off the main-thread work that hurts INP.
// • The header's bottom border animates transparent → --border via that attribute. The border is
//   always 1px (only its colour changes), so the header never changes height → zero CLS.
//
// The header must carry id="site-header"; the sentinel renders here as the first body element.
export function HeaderScroll() {
  const sentinelRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const sentinel = sentinelRef.current;
    const header = document.getElementById("site-header");
    if (!sentinel || !header) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Past the top → sentinel no longer intersects → show the hairline.
        header.toggleAttribute("data-scrolled", !entry.isIntersecting);
      },
      { threshold: 0 },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sentinelRef}
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 h-px w-px"
    />
  );
}
