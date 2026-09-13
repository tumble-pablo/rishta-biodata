import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main id="main-content" className="min-h-dvh overflow-hidden bg-background text-foreground">
      <a
        href="#hero-title"
        className="sr-only z-50 rounded-md bg-primary px-4 py-3 text-primary-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to main content
      </a>

      <header className="relative z-10 border-b border-border/70">
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <a href="/" className="group flex min-h-11 items-center gap-3" aria-label="Rishta Biodata home">
            <span
              aria-hidden="true"
              className="font-heading grid size-10 place-items-center rounded-[14px] bg-primary text-sm font-semibold text-primary-foreground shadow-[0_8px_20px_rgba(62,21,50,0.16)] transition-transform duration-200 group-hover:-rotate-2"
            >
              RB
            </span>
            <span className="font-heading text-[15px] font-semibold tracking-[-0.02em] sm:text-base">
              Rishta Biodata
            </span>
          </a>

          <p className="rounded-full border border-border bg-white/65 px-4 py-2 text-[12px] font-medium tracking-[0.02em] text-muted-foreground backdrop-blur-sm sm:text-[13px]">
            Download from ₹9
          </p>
        </div>
      </header>

      <section
        aria-labelledby="hero-title"
        className="relative mx-auto grid min-h-[calc(100dvh-5rem)] max-w-[1440px] items-center gap-12 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,0.94fr)_minmax(480px,0.76fr)] lg:gap-16 lg:px-12 lg:py-16"
      >
        <div aria-hidden="true" className="hero-glow" />

        <div className="relative z-10 max-w-[680px]">
          <p className="font-heading mb-6 text-[12px] font-semibold uppercase tracking-[0.12em] text-accent-foreground sm:text-[13px]">
            Made for meaningful introductions
          </p>

          <h1
            id="hero-title"
            className="font-heading max-w-[650px] text-[clamp(3.2rem,7vw,6.8rem)] font-semibold leading-[0.94] tracking-[-0.065em] text-balance"
          >
            Your story, thoughtfully presented.
          </h1>

          <p className="mt-7 max-w-[590px] text-[17px] leading-[1.65] text-muted-foreground sm:text-lg">
            Create a clear, beautiful marriage biodata in minutes. Add your details for free and pay only when you are ready to download.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button
              asChild
              size="lg"
              className="h-13 rounded-[6px] px-6 text-sm font-semibold shadow-[0_14px_34px_rgba(62,21,50,0.22)] transition-transform duration-200 hover:-translate-y-0.5"
            >
              <a href="#biodata-preview">
                Start with a blank biodata
                <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={2} />
              </a>
            </Button>
            <span className="text-[13px] text-muted-foreground">No sign-up to begin</span>
          </div>
        </div>

        <div id="biodata-preview" className="relative z-10 mx-auto w-full max-w-[560px] scroll-mt-8">
          <div className="absolute -left-5 top-14 hidden h-[72%] w-full -rotate-3 rounded-[30px] border border-primary/10 bg-primary/[0.035] lg:block" />

          <div className="document-sheet relative aspect-[4/5] overflow-hidden rounded-[28px] border border-border bg-card p-6 shadow-[0_32px_80px_rgba(62,21,50,0.14)] sm:p-9">
            <div aria-hidden="true" className="document-corner document-corner-left" />
            <div aria-hidden="true" className="document-corner document-corner-right" />

            <div className="relative flex h-full flex-col rounded-[18px] border border-primary/10 px-6 py-7 sm:px-9 sm:py-9">
              <div className="flex items-start justify-between gap-6">
                <div className="space-y-3">
                  <div className="h-2.5 w-20 rounded-full bg-accent" />
                  <div className="h-7 w-44 rounded-md bg-primary/12 sm:w-56" />
                </div>
                <div className="size-16 rounded-full border border-dashed border-primary/20 bg-accent/45 sm:size-20" />
              </div>

              <div className="mt-9 grid grid-cols-[84px_1fr] gap-x-5 gap-y-4 sm:grid-cols-[104px_1fr]">
                {[72, 92, 58, 82, 68].map((width) => (
                  <div key={width} className="contents">
                    <span className="h-2 rounded-full bg-accent" style={{ width: `${Math.max(48, width - 14)}%` }} />
                    <span className="h-2 rounded-full bg-primary/[0.09]" style={{ width: `${width}%` }} />
                  </div>
                ))}
              </div>

              <div className="mt-auto border-t border-primary/10 pt-6">
                <div className="mb-4 h-2.5 w-28 rounded-full bg-accent" />
                <div className="space-y-3">
                  <div className="h-2 w-full rounded-full bg-primary/[0.07]" />
                  <div className="h-2 w-[88%] rounded-full bg-primary/[0.07]" />
                  <div className="h-2 w-[64%] rounded-full bg-primary/[0.07]" />
                </div>
              </div>
            </div>
          </div>

          <p className="mt-5 text-center text-[12px] font-medium tracking-[0.02em] text-muted-foreground">
            A clean canvas for the details that matter
          </p>
        </div>
      </section>
    </main>
  );
}
