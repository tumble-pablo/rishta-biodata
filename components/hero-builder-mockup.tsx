import { Check } from "lucide-react";

// Static product shot for the homepage hero: a browser window with the
// builder's form on the left and the biodata taking shape on the right. It's
// a hand-built mock-up (not the live builder) so it stays crisp at this size,
// and it's aria-hidden because the hero copy already says what it shows.
//
// Coloured borders carry `!` because the unlayered `* { border-color }` rule
// in globals.css otherwise wins over Tailwind's border-colour utilities.
export function HeroBuilderMockup() {
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-[500px] select-none">
      <span className="font-heading absolute -right-3 -top-4 z-20 rounded-[8px] bg-primary px-3.5 py-2.5 text-[10px] font-semibold tracking-[0.1em] text-primary-foreground shadow-[0_12px_28px_rgba(62,21,50,0.25)] sm:-right-5">
        HINDI + ENGLISH
      </span>

      <div className="overflow-hidden rounded-[14px] border border-border bg-card shadow-[0_30px_70px_rgba(62,21,50,0.14)]">
        <div className="flex items-center gap-3 border-b border-border bg-muted/60 px-4 py-2.5">
          <div className="flex gap-1.5">
            {[0, 1, 2].map((dot) => (
              <span key={dot} className="size-2 rounded-full bg-border" />
            ))}
          </div>
          <div className="mx-auto w-[60%] rounded-[6px] border border-border bg-card py-1 text-center text-[10px] text-muted-foreground">
            rishtabiodata.com
          </div>
        </div>

        <div className="grid grid-cols-[1fr_1.15fr]">
          <div className="p-4 sm:p-5">
            <p className="text-[9px] font-semibold tracking-[0.12em] text-accent-foreground">STEP 2 OF 6</p>
            <p className="font-heading mt-1 text-[13px] font-semibold">Personal details</p>
            <div className="mt-2 h-1 rounded-full bg-muted">
              <div className="h-full w-[33%] rounded-full bg-accent-foreground" />
            </div>

            <p className="mt-4 text-[9px] text-muted-foreground">Full name</p>
            <div className="mt-1 rounded-[6px] border border-border px-2.5 py-2 text-[10px]">Rahul Sharma</div>
            <p className="mt-3 text-[9px] text-muted-foreground">Date of birth</p>
            <div className="mt-1 rounded-[6px] border-[1.5px] border-accent-foreground! px-2.5 py-2 text-[10px] shadow-[0_0_0_3px_rgba(143,47,60,0.08)]">
              14 August 1997
            </div>

            <p className="mt-3 text-[9px] text-muted-foreground">Complexion</p>
            <div className="mt-1 flex gap-1.5">
              {["Fair", "Wheatish", "Dusky"].map((option) => (
                <span
                  key={option}
                  className={
                    option === "Wheatish"
                      ? "rounded-[5px] bg-primary px-2 py-1 text-[9px] font-semibold text-primary-foreground"
                      : "rounded-[5px] border border-border px-2 py-1 text-[9px]"
                  }
                >
                  {option}
                </span>
              ))}
            </div>

            <div className="mt-14 rounded-[6px] bg-primary py-2 text-center text-[10px] font-semibold text-primary-foreground">
              Continue
            </div>
          </div>

          <div className="flex items-start justify-center bg-secondary/60 p-4 sm:p-5">
            <div className="w-full rounded-[4px] bg-[#fdf8ec] p-1.5 shadow-[0_14px_30px_rgba(62,21,50,0.12)]">
              <div className="border border-[#c9a45c]! px-3 py-3">
                <p className="font-heading text-center text-[11px] tracking-[0.25em]">BIODATA</p>
                <div className="mx-auto mt-1 h-px w-10 bg-[#c9a45c]" />

                <div className="mt-3 flex items-start justify-between gap-2">
                  <div>
                    <p className="font-heading text-[13px] font-semibold text-accent-foreground">Rahul Sharma</p>
                    <p className="text-[7px] text-muted-foreground">29 Years | 5&apos;10&quot; | Jaipur</p>
                  </div>
                  <div className="h-8 w-7 shrink-0 rounded-t-full border border-[#c9a45c]! bg-[#f3e2c0]" />
                </div>

                <div className="mt-3 flex items-center gap-1.5">
                  <span className="text-[6px] font-semibold tracking-[0.12em] text-accent-foreground">PERSONAL DETAILS</span>
                  <span className="h-px flex-1 bg-[#e5d3b3]" />
                </div>
                <dl className="mt-1.5 grid grid-cols-2 gap-x-2 gap-y-1.5 text-[6.5px]">
                  {[
                    ["Date of Birth", "14 August 1997"],
                    ["Time of Birth", "6:45 AM"],
                    ["Place of Birth", "Jaipur, Rajasthan"],
                    ["Complexion", "Wheatish"],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <dt className="text-muted-foreground">{label}</dt>
                      <dd className="font-semibold">{value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-3 space-y-1">
                  {[100, 85, 70].map((width) => (
                    <div key={width} style={{ width: `${width}%` }} className="h-[3px] rounded-full bg-[#efe3cc]" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -left-3 bottom-12 z-20 flex items-center gap-2.5 rounded-[10px] border border-border bg-card px-3 py-2.5 shadow-[0_16px_36px_rgba(62,21,50,0.14)] sm:-left-8">
        <span className="grid size-7 place-items-center rounded-[6px] bg-secondary text-accent-foreground">
          <Check className="size-3.5" strokeWidth={2.5} />
        </span>
        <div>
          <p className="font-heading text-[11px] font-semibold">Biodata ready</p>
          <p className="text-[9px] text-muted-foreground">Easy to share with family</p>
        </div>
      </div>
    </div>
  );
}
