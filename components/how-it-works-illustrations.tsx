import { Check, Download } from "lucide-react";

// Small, decorative product vignettes for the "How it works" cards. They're
// static mock-ups (not the live builder) so they stay light and legible at
// card size; every one is aria-hidden since the step text carries the meaning.

export function DetailsIllustration() {
  return (
    <div aria-hidden="true" className="w-full max-w-[270px] rounded-[12px] border border-border bg-card p-3.5 shadow-[0_14px_30px_rgba(62,21,50,0.08)]">
      <div className="flex items-center justify-between">
        <span className="font-heading text-[11px] font-semibold">Personal details</span>
        <span className="text-[9px] font-semibold tracking-[0.08em] text-accent-foreground">2 OF 6</span>
      </div>
      <div className="mt-2 h-1 rounded-full bg-muted">
        <div className="h-full w-[33%] rounded-full bg-accent-foreground" />
      </div>
      <p className="mt-3 text-[9px] text-muted-foreground">Full name</p>
      <div className="mt-1 rounded-[6px] border border-border px-2.5 py-1.5 text-[10px]">Rahul Sharma</div>
      <p className="mt-2.5 text-[9px] text-muted-foreground">Date of birth</p>
      <div className="mt-1 rounded-[6px] border-[1.5px] border-accent-foreground! px-2.5 py-1.5 text-[10px]">14 August 1997</div>
    </div>
  );
}

function DesignThumb({ variant }: { variant: "plain" | "selected" | "dark" }) {
  const dark = variant === "dark";
  const selected = variant === "selected";
  return (
    <div
      className={
        selected
          ? "relative h-[108px] w-[78px] rounded-[6px] border-2 border-accent-foreground! bg-[#fdf8ec] p-2 shadow-[0_14px_26px_rgba(143,47,60,0.22)]"
          : dark
            ? "h-[84px] w-[62px] rounded-[5px] bg-[#521c2c] p-2 shadow-[0_10px_20px_rgba(62,21,50,0.18)]"
            : "h-[84px] w-[62px] rounded-[5px] border border-border bg-card p-2 shadow-[0_10px_20px_rgba(62,21,50,0.08)]"
      }
    >
      <div className={`mx-auto h-[3px] w-1/2 rounded-full ${dark ? "bg-[#d8b25d]" : "bg-primary"}`} />
      {selected && (
        <>
          <div className="mx-auto mt-2 h-6 w-5 rounded-t-full border border-[#d8b25d]! bg-[#f3e2c0]" />
          <span className="absolute -right-2 -top-2 grid size-4 place-items-center rounded-full bg-accent-foreground text-primary-foreground">
            <Check className="size-2.5" strokeWidth={3} />
          </span>
        </>
      )}
      <div className={`mt-2 space-y-1 ${selected ? "mt-2.5" : ""}`}>
        {[100, 80, 90].map((w) => (
          <div
            key={w}
            style={{ width: `${w}%` }}
            className={`h-[2px] rounded-full ${dark ? "bg-[#d8b25d]/50" : "bg-border"}`}
          />
        ))}
      </div>
    </div>
  );
}

export function DesignIllustration() {
  return (
    <div aria-hidden="true" className="flex items-center gap-2.5">
      <DesignThumb variant="plain" />
      <DesignThumb variant="selected" />
      <DesignThumb variant="dark" />
    </div>
  );
}

export function DownloadIllustration() {
  return (
    <div aria-hidden="true" className="w-full max-w-[270px] rounded-[12px] border border-border bg-card p-3.5 shadow-[0_14px_30px_rgba(62,21,50,0.08)]">
      <div className="flex items-center gap-3">
        <div className="h-11 w-9 rounded-[3px] border border-[#d8b25d]! bg-[#fdf8ec]" />
        <div className="min-w-0 flex-1">
          <p className="font-heading text-[11px] font-semibold">Rahul Sharma</p>
          <p className="text-[9px] text-muted-foreground">Reviewed and ready</p>
        </div>
        <span className="grid size-5 place-items-center rounded-full bg-secondary text-accent-foreground">
          <Check className="size-3" strokeWidth={2.5} />
        </span>
      </div>
      <div className="mt-3 flex items-center justify-center gap-1.5 rounded-[6px] bg-accent-foreground py-2 text-[10px] font-semibold text-primary-foreground">
        <Download className="size-3" strokeWidth={2.5} />
        Download biodata
      </div>
    </div>
  );
}
