import { cn } from "@/lib/utils";

type Corner = "top-left" | "top-right" | "bottom-left" | "bottom-right";

const POSITION_CLASS: Record<Corner, string> = {
  "top-left": "top-3 left-3",
  "top-right": "top-3 right-3 -scale-x-100",
  "bottom-left": "bottom-3 left-3 -scale-y-100",
  "bottom-right": "bottom-3 right-3 -scale-x-100 -scale-y-100",
};

// A small ornamental bracket-and-flourish, drawn once (oriented for the
// top-left corner) and mirrored with CSS transforms for the other three —
// the formal-document motif the reference design uses, replacing the old
// soft gradient-blob corner decoration.
export function CornerOrnament({ corner, className }: { corner: Corner; className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={cn("absolute size-6 text-primary/70 sm:size-7", POSITION_CLASS[corner], className)}
    >
      <path d="M2 14V4a2 2 0 0 1 2-2h10" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M7 7c3 0 5.5 2 6 5"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <circle cx="6.5" cy="6.5" r="1.3" fill="currentColor" />
    </svg>
  );
}
