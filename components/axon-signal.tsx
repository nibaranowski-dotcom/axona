// components/axon-signal.tsx — the "axon signal" motif (design.md): one teal pulse traveling a
// near-monochrome node graph. Axona = *axon*, the nerve fiber that carries signal.
//
// Server Component, zero client JS. Decorative → aria-hidden + focusable="false" so it is skipped
// by assistive tech and the keyboard. Colors are token-driven only (currentColor inherits from
// `text-border` / `text-muted-foreground` / `text-primary`); no inline hex, no raw color utilities.
//
// Animation lives in app/globals.css (@keyframes axon-pulse) and is a pure-CSS traveling dash on
// the teal trunk. The existing prefers-reduced-motion block kills it, leaving the pulse at its
// declared resting position (the "signal at rest"). The motif is NOT the LCP element: it is
// constrained in size and sits behind/beside the headline so the <h1> wins largest paint.
//
// No-CLS: the SVG has an intrinsic viewBox aspect-ratio and its wrapper reserves space, so it
// never pops in and shoves the headline.

export function AxonSignal({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 600 360"
      fill="none"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Graph — the near-monochrome circuit. Hairline lines (--border) + nodes
          (--muted-foreground). currentColor inherits from the wrapping text-* classes. */}
      <g
        className="text-border"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Trunk the pulse travels. */}
        <path d="M20 250 L150 250 L210 150 L340 150 L410 240 L520 240 L580 110" />
        {/* Branches off the trunk — give it the read of a node graph, not a single wire. */}
        <path d="M150 250 L150 330" />
        <path d="M210 150 L210 50" />
        <path d="M340 150 L430 70" />
        <path d="M410 240 L410 320" />
        <path d="M520 240 L560 300" />
      </g>

      <g className="text-muted-foreground" fill="currentColor">
        {/* Nodes at the junctions. Small, restrained. */}
        <circle cx="150" cy="250" r="3.5" />
        <circle cx="210" cy="150" r="3.5" />
        <circle cx="340" cy="150" r="3.5" />
        <circle cx="410" cy="240" r="3.5" />
        <circle cx="520" cy="240" r="3.5" />
        {/* Branch terminals — fainter. */}
        <circle cx="150" cy="330" r="2.5" opacity={0.6} />
        <circle cx="210" cy="50" r="2.5" opacity={0.6} />
        <circle cx="430" cy="70" r="2.5" opacity={0.6} />
        <circle cx="410" cy="320" r="2.5" opacity={0.6} />
        <circle cx="560" cy="300" r="2.5" opacity={0.6} />
      </g>

      {/* The one teal signal: a single lit segment traveling the trunk. pathLength normalizes the
          path to 100 units so the dash math is round. The lit dash (6) on a long gap (94) is the
          pulse; globals.css animates stroke-dashoffset to move it. At rest (reduced-motion) it
          holds at the declared offset below — a still pulse mid-path. */}
      <path
        className="axon-pulse text-primary"
        d="M20 250 L150 250 L210 150 L340 150 L410 240 L520 240 L580 110"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        pathLength={100}
        strokeDasharray="6 94"
        strokeDashoffset={64}
      />
    </svg>
  );
}
