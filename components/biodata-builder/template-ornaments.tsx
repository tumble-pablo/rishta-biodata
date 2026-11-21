import { cn } from "@/lib/utils";

// Decorative artwork for the biodata templates, drawn as inline SVG in
// `currentColor` so each template tints it with its own theme colour (see
// template-frame.tsx). Inline SVG rather than image files keeps it crisp at
// any size and is captured faithfully by html2canvas for the PDF/JPG.
// Each corner piece is drawn once for the top-left and mirrored with CSS.

type Corner = "top-left" | "top-right" | "bottom-left" | "bottom-right";

const MIRROR: Record<Corner, string> = {
  "top-left": "",
  "top-right": "-scale-x-100",
  "bottom-left": "-scale-y-100",
  "bottom-right": "-scale-x-100 -scale-y-100",
};

const POSITION: Record<Corner, string> = {
  "top-left": "top-0 left-0",
  "top-right": "top-0 right-0",
  "bottom-left": "bottom-0 left-0",
  "bottom-right": "bottom-0 right-0",
};

function CornerSvg({ corner, className, children }: { corner: Corner; className: string; children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className={cn("absolute", POSITION[corner], MIRROR[corner], className)}
    >
      {children}
    </svg>
  );
}

const ALL_CORNERS: Corner[] = ["top-left", "top-right", "bottom-left", "bottom-right"];

/** A bracket-and-curl flourish in each corner. */
export function FlourishCorners({ className }: { className: string }) {
  return (
    <>
      {ALL_CORNERS.map((corner) => (
        <CornerSvg key={corner} corner={corner} className={className}>
          <path d="M10 34V14a4 4 0 0 1 4-4h20" stroke="currentColor" strokeWidth="1.6" />
          <path d="M16 16c8 0 14 5 15 13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          <path d="M16 16c0 8 5 14 13 15" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          <circle cx="16" cy="16" r="2.4" fill="currentColor" />
          <circle cx="38" cy="10" r="1.4" fill="currentColor" />
          <circle cx="10" cy="38" r="1.4" fill="currentColor" />
        </CornerSvg>
      ))}
    </>
  );
}

/** A quarter-mandala of petals and rings radiating from each corner. */
export function MandalaCorners({ className }: { className: string }) {
  const petals = [8, 23, 38, 53, 68, 82];
  return (
    <>
      {ALL_CORNERS.map((corner) => (
        <CornerSvg key={corner} corner={corner} className={className}>
          <path d="M0 22A22 22 0 0 0 22 0" stroke="currentColor" strokeWidth="1.2" />
          <path d="M0 34A34 34 0 0 0 34 0" stroke="currentColor" strokeWidth="0.9" strokeDasharray="2 2.5" />
          <path d="M0 50A50 50 0 0 0 50 0" stroke="currentColor" strokeWidth="1.2" />
          {/* Petals on the 28-unit ring, each rotated about the corner. */}
          {petals.map((angle) => (
            <g key={angle} transform={`rotate(${angle})`}>
              <ellipse cx="28" cy="0" rx="8" ry="3.4" fill="currentColor" opacity="0.85" />
            </g>
          ))}
          <circle cx="0" cy="0" r="10" fill="currentColor" />
        </CornerSvg>
      ))}
    </>
  );
}

/** Leafy sprigs in the top-left and bottom-right corners. */
export function FloralCorners({ className }: { className: string }) {
  const sprig = (
    <>
      <path d="M8 56C14 34 26 18 54 8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      {[
        [18, 36, -40],
        [26, 26, -30],
        [36, 18, -20],
        [46, 12, -10],
      ].map(([x, y, rotate]) => (
        <g key={`${x}-${y}`} transform={`translate(${x} ${y}) rotate(${rotate})`}>
          <ellipse cx="0" cy="-6" rx="3" ry="6.5" fill="currentColor" opacity="0.8" />
          <ellipse cx="6" cy="2" rx="3" ry="6.5" fill="currentColor" opacity="0.55" transform="rotate(80 6 2)" />
        </g>
      ))}
      <circle cx="54" cy="8" r="3" fill="currentColor" />
      <circle cx="12" cy="47" r="2.2" fill="currentColor" opacity="0.7" />
    </>
  );
  return (
    <>
      <CornerSvg corner="top-left" className={className}>
        {sprig}
      </CornerSvg>
      <CornerSvg corner="bottom-right" className={className}>
        {sprig}
      </CornerSvg>
    </>
  );
}

/** A pointed temple arch across the top of the page, with lotus finial. */
export function ArchTop({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 210 40"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
      className={cn("absolute inset-x-0 top-0", className)}
    >
      <path
        d="M0 40V22C40 22 70 16 92 8C98 5 102 2 105 0C108 2 112 5 118 8C140 16 170 22 210 22V40"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path d="M8 40V28C44 28 72 22 94 14C99 12 102 10 105 8C108 10 111 12 116 14C138 22 166 28 202 28V40" stroke="currentColor" strokeWidth="0.7" />
      <path d="M105 0c-3 4-3 8 0 11c3-3 3-7 0-11Z" fill="currentColor" />
      <path d="M105 11c-6-2-10 0-12 3c5 1 9 0 12-3Zm0 0c6-2 10 0 12 3c-5 1-9 0-12-3Z" fill="currentColor" opacity="0.8" />
    </svg>
  );
}
