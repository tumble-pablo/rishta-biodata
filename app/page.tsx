import {
  ArrowUpRight,
  KeyRound,
  Languages,
  LayoutTemplate,
  MessageCircle,
  Sparkles,
  Smartphone,
} from "lucide-react";
import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Home", href: "#hero-title" },
  { label: "Steps", href: "#how-it-works" },
  { label: "Reviews", href: "#testimonials" },
  { label: "Features", href: "#features" },
  { label: "FAQs", href: "#faq" },
] as const;

export default function Home() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="min-h-dvh overflow-hidden bg-background text-foreground focus:outline-none"
    >
      <a
        href="#main-content"
        className="sr-only z-50 rounded-md bg-primary px-4 py-3 text-primary-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/95">
        <div className="mx-auto flex min-h-20 max-w-[1440px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
          <div className="flex min-w-0 items-center gap-7 xl:gap-11">
            <Link
              href="/"
              className="group flex min-h-11 shrink-0 items-center gap-3 rounded-[8px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label="Rishta Biodata home"
            >
              <span
                aria-hidden="true"
                className="font-heading grid size-10 place-items-center rounded-[8px] bg-primary text-sm font-semibold text-primary-foreground shadow-[0_8px_20px_rgba(62,21,50,0.16)]"
              >
                RB
              </span>
              <span className="font-heading hidden text-[15px] font-semibold tracking-[-0.02em] min-[380px]:inline sm:text-base">
                Rishta Biodata
              </span>
            </Link>

            <nav aria-label="Primary navigation" className="hidden lg:block">
              <ul className="flex items-center gap-1 xl:gap-2">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="font-heading flex min-h-11 items-center rounded-[6px] px-3 text-[13px] font-medium text-muted-foreground transition-colors duration-200 hover:bg-secondary/70 hover:text-foreground focus-visible:bg-secondary/70 focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring xl:px-3.5"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <Button
            asChild
            className="h-11 shrink-0 rounded-[6px] px-4 text-[12px] font-semibold shadow-[0_10px_24px_rgba(62,21,50,0.16)] transition-transform duration-200 hover:-translate-y-0.5 sm:px-5 sm:text-[13px]"
          >
            <a
              href="#biodata-builder"
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
            >
              Create your biodata
            </a>
          </Button>
        </div>

        <nav
          aria-label="Primary navigation on mobile"
          className="border-t border-border/70 bg-background lg:hidden"
        >
          <ul className="mx-auto grid max-w-[1440px] grid-cols-5 px-2 sm:px-6">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="font-heading flex min-h-11 items-center justify-center rounded-[6px] px-1 text-[11px] font-medium text-muted-foreground transition-colors duration-200 hover:bg-secondary/70 hover:text-foreground focus-visible:bg-secondary/70 focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:text-[12px]"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <section
        aria-labelledby="hero-title"
        className="relative mx-auto grid min-h-[calc(100dvh-7.75rem)] max-w-[1440px] items-center gap-10 px-5 py-10 sm:px-8 sm:py-12 lg:min-h-[calc(100dvh-5rem)] lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.72fr)] lg:gap-12 lg:px-12 lg:py-10 xl:gap-14"
      >
        <div aria-hidden="true" className="hero-glow" />

        <div className="relative z-10 max-w-[640px]">
          <h1
            id="hero-title"
            className="font-heading max-w-[620px] scroll-mt-28 text-[clamp(2.75rem,5vw,4.65rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-balance"
          >
            आपकी कहानी deserves a better biodata.
          </h1>

          <p className="mt-5 max-w-[560px] text-base leading-[1.6] text-muted-foreground sm:text-[17px]">
            जो बात ज़रूरी है, वो सब एक ही जगह। अपनी personal, family और career details को एक clear और beautiful biodata में सजाइए, जिसे share करना आसान हो।
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-4">
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

        <div id="biodata-preview" className="relative z-10 mx-auto w-full max-w-[460px] scroll-mt-8">
          <div className="absolute -left-4 top-12 hidden h-[72%] w-full -rotate-3 rounded-[26px] border border-primary/10 bg-primary/[0.035] lg:block" />

          <div className="document-sheet relative aspect-[4/5] overflow-hidden rounded-[24px] border border-border bg-card p-5 shadow-[0_28px_64px_rgba(62,21,50,0.13)] sm:p-7">
            <div aria-hidden="true" className="document-corner document-corner-left" />
            <div aria-hidden="true" className="document-corner document-corner-right" />

            <div className="relative flex h-full flex-col rounded-[16px] border border-primary/10 px-5 py-6 sm:px-7 sm:py-7">
              <div className="flex items-start justify-between gap-6">
                <div className="space-y-3">
                  <div className="h-2.5 w-20 rounded-full bg-accent" />
                  <div className="h-7 w-44 rounded-md bg-primary/12 sm:w-56" />
                </div>
                <div className="size-16 rounded-full border border-dashed border-primary/20 bg-accent/45 sm:size-[4.5rem]" />
              </div>

              <div className="mt-7 grid grid-cols-[84px_1fr] gap-x-5 gap-y-3.5 sm:grid-cols-[96px_1fr]">
                {[72, 92, 58, 82, 68].map((width) => (
                  <div key={width} className="contents">
                    <span className="h-2 rounded-full bg-accent" style={{ width: `${Math.max(48, width - 14)}%` }} />
                    <span className="h-2 rounded-full bg-primary/[0.09]" style={{ width: `${width}%` }} />
                  </div>
                ))}
              </div>

              <div className="mt-auto border-t border-primary/10 pt-5">
                <div className="mb-3.5 h-2.5 w-28 rounded-full bg-accent" />
                <div className="space-y-2.5">
                  <div className="h-2 w-full rounded-full bg-primary/[0.07]" />
                  <div className="h-2 w-[88%] rounded-full bg-primary/[0.07]" />
                  <div className="h-2 w-[64%] rounded-full bg-primary/[0.07]" />
                </div>
              </div>
            </div>
          </div>

          <p className="mt-3.5 text-center text-[12px] font-medium tracking-[0.02em] text-muted-foreground">
            A clean canvas for the details that matter
          </p>
        </div>
      </section>

      <section
        id="how-it-works"
        aria-labelledby="how-it-works-title"
        className="relative border-y border-border bg-card"
      >
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
          <div className="max-w-[720px]">
            <h2
              id="how-it-works-title"
              className="font-heading text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.045em] text-balance"
            >
              Three simple steps to a beautiful biodata.
            </h2>
          </div>

          <ol className="mt-12 grid gap-5 md:grid-cols-3 lg:mt-14 lg:gap-6">
            {[
              {
                step: "01",
                title: "Add your details",
                description:
                  "Share your personal, family, education, career and contact details in one clear flow.",
              },
              {
                step: "02",
                title: "Choose your design",
                description:
                  "Pick a thoughtful biodata style and see your information come together as you go.",
              },
              {
                step: "03",
                title: "Download your biodata",
                description:
                  "Review everything carefully, then download your polished biodata when it is ready to share.",
              },
            ].map((item) => (
              <li
                key={item.step}
                className="relative min-h-[260px] overflow-hidden rounded-[14px] border border-border bg-background p-7 shadow-[0_14px_36px_rgba(62,21,50,0.06)] sm:p-8"
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-accent-foreground to-accent"
                />
                <span className="font-heading grid size-10 place-items-center rounded-[6px] bg-primary text-[12px] font-semibold tabular-nums text-primary-foreground shadow-[0_8px_20px_rgba(62,21,50,0.14)]">
                  {item.step}
                </span>
                <h3 className="font-heading mt-8 text-xl font-semibold tracking-[-0.03em]">
                  {item.title}
                </h3>
                <p className="mt-4 max-w-[34ch] text-[15px] leading-7 text-muted-foreground sm:text-base">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        id="biodata-builder"
        aria-hidden="true"
        className="min-h-[32rem] border-b border-border bg-background sm:min-h-[40rem] lg:min-h-[46rem]"
      />

      <section
        id="testimonials"
        aria-labelledby="testimonials-title"
        className="border-b border-border bg-card"
      >
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
          <div className="max-w-[720px]">
            <h2
              id="testimonials-title"
              className="font-heading text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.045em] text-balance"
            >
              What families are saying.
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3 lg:mt-14 lg:gap-6">
            {[
              {
                quote:
                  "The whole process was so much easier—my parents were impressed with how thoughtful it looked.",
                name: "Priya S.",
                city: "Bengaluru",
                initials: "PS",
              },
              {
                quote:
                  "I created my brother’s biodata in 15 minutes on my phone. No login, no hassle.",
                name: "Arjun M.",
                city: "Delhi",
                initials: "AM",
              },
              {
                quote:
                  "Finally, a biodata that doesn’t look like it was made in Word. Clean and modern.",
                name: "Fatima K.",
                city: "Dhaka",
                initials: "FK",
              },
            ].map((testimonial) => (
              <figure
                key={testimonial.name}
                className="flex min-h-[280px] flex-col rounded-[14px] border border-border bg-background p-7 shadow-[0_14px_36px_rgba(62,21,50,0.06)] sm:p-8"
              >
                <blockquote className="border-l-2 border-accent-foreground pl-5 text-[16px] leading-7 text-foreground sm:text-[17px]">
                  <p>“{testimonial.quote}”</p>
                </blockquote>

                <figcaption className="mt-auto flex items-center gap-3 pt-8">
                  <span
                    aria-hidden="true"
                    className="font-heading grid size-11 shrink-0 place-items-center rounded-full bg-primary text-[11px] font-semibold tracking-[0.04em] text-primary-foreground shadow-[0_8px_20px_rgba(62,21,50,0.14)]"
                  >
                    {testimonial.initials}
                  </span>
                  <span>
                    <span className="font-heading block text-sm font-semibold tracking-[-0.02em]">
                      {testimonial.name}
                    </span>
                    <span className="mt-1 block text-[13px] text-muted-foreground">
                      {testimonial.city}
                    </span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section
        id="features"
        aria-labelledby="features-title"
        className="border-b border-border bg-card"
      >
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
          <div className="max-w-[820px]">
            <h2
              id="features-title"
              className="font-heading text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.045em] text-balance"
            >
              Built for how South Asian families share biodata.
            </h2>
          </div>

          <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-14">
            {[
              {
                icon: KeyRound,
                title: "No login required",
                description:
                  "Start right away and preview your biodata without creating an account.",
              },
              {
                icon: LayoutTemplate,
                title: "Multiple templates",
                description:
                  "Choose from thoughtful traditional and modern layouts for print and sharing.",
              },
              {
                icon: MessageCircle,
                title: "WhatsApp-ready PDF",
                description:
                  "Download a lightweight PDF that stays clear when sent to family and friends.",
              },
              {
                icon: Sparkles,
                title: "Astrology details",
                description:
                  "Add optional gotra, rashi, nakshatra, manglik and birth details when needed.",
              },
              {
                icon: Languages,
                title: "Multiple languages",
                description:
                  "Begin in English, with Hindi and more Indian languages coming as we grow.",
              },
              {
                icon: Smartphone,
                title: "Made for mobile",
                description:
                  "Fill every detail comfortably from your phone, tablet or computer.",
              },
            ].map((feature) => {
              const Icon = feature.icon;

              return (
                <article key={feature.title} className="group border-t border-border pt-6">
                  <span className="grid size-12 place-items-center rounded-[8px] bg-primary text-primary-foreground shadow-[0_10px_24px_rgba(62,21,50,0.13)] transition-transform duration-200 group-hover:-translate-y-0.5">
                    <Icon aria-hidden="true" className="size-5" strokeWidth={1.8} />
                  </span>
                  <h3 className="font-heading mt-6 text-lg font-semibold tracking-[-0.025em]">
                    {feature.title}
                  </h3>
                  <p className="mt-3 max-w-[40ch] text-[15px] leading-7 text-muted-foreground sm:text-base">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="faq"
        aria-labelledby="faq-title"
        className="border-b border-border bg-background"
      >
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
          <div className="max-w-[760px]">
            <h2
              id="faq-title"
              className="font-heading text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.045em] text-balance"
            >
              A few things worth knowing.
            </h2>
          </div>

          <Accordion
            type="single"
            collapsible
            className="mt-12 border-y border-border lg:mt-14"
          >
            {[
              {
                question: "Is my data kept private?",
                answer:
                  "Yes. Your biodata is never listed publicly. You decide when to download it and who you share it with.",
              },
              {
                question: "Can I edit my biodata after downloading?",
                answer:
                  "You can review and edit every detail before downloading. If something changes later, return to the builder and create an updated copy.",
              },
              {
                question: "What languages are supported?",
                answer:
                  "We are starting with English, with Hindi and more Indian languages planned as the builder grows.",
              },
              {
                question: "Do I need to create an account?",
                answer:
                  "No. You can start filling in your details and preview your biodata without creating an account.",
              },
            ].map((item, index) => (
              <AccordionItem
                key={item.question}
                value={`item-${index + 1}`}
                className="border-border"
              >
                <AccordionTrigger className="font-heading min-h-20 cursor-pointer py-5 text-left text-base font-semibold tracking-[-0.02em] hover:no-underline sm:min-h-24 sm:text-lg [&>svg]:size-10 [&>svg]:shrink-0 [&>svg]:rounded-full [&>svg]:border [&>svg]:border-border [&>svg]:bg-card [&>svg]:p-2.5 [&>svg]:text-primary [&>svg]:transition-colors [&>svg]:duration-200">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="max-w-[760px] pb-7 pr-14 text-[15px] leading-7 text-muted-foreground sm:text-base">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <footer className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <div className="grid gap-12 border-b border-primary-foreground/15 pb-14 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.6fr)_repeat(3,minmax(120px,0.5fr))] lg:gap-8 lg:pb-16">
            <div className="max-w-sm">
              <Link
                href="/"
                className="group inline-flex min-h-11 items-center gap-3"
                aria-label="Rishta Biodata home"
              >
                <span
                  aria-hidden="true"
                  className="font-heading grid size-10 place-items-center rounded-[6px] bg-primary-foreground text-sm font-semibold text-primary transition-transform duration-200 group-hover:-rotate-2"
                >
                  RB
                </span>
                <span className="font-heading text-base font-semibold tracking-[-0.02em]">
                  Rishta Biodata
                </span>
              </Link>
              <p className="mt-5 text-[15px] leading-7 text-primary-foreground/68">
                Thoughtful marriage biodata, made simple for families across South Asia.
              </p>
            </div>

            <nav aria-label="Product">
              <h3 className="font-heading text-sm font-semibold">Product</h3>
              <ul className="mt-5 space-y-3 text-sm text-primary-foreground/68">
                <li>
                  <a className="transition-colors hover:text-primary-foreground" href="#biodata-builder">
                    Start creating
                  </a>
                </li>
                <li>
                  <a className="transition-colors hover:text-primary-foreground" href="#how-it-works">
                    How it works
                  </a>
                </li>
                <li>
                  <a className="transition-colors hover:text-primary-foreground" href="#testimonials">
                    Reviews
                  </a>
                </li>
                <li>
                  <a className="transition-colors hover:text-primary-foreground" href="#features">
                    Features
                  </a>
                </li>
              </ul>
            </nav>

            <nav aria-label="Company">
              <h3 className="font-heading text-sm font-semibold">Company</h3>
              <ul className="mt-5 space-y-3 text-sm text-primary-foreground/68">
                <li>
                  <a className="transition-colors hover:text-primary-foreground" href="#hero-title">
                    About
                  </a>
                </li>
                <li>
                  <a className="transition-colors hover:text-primary-foreground" href="#faq">
                    FAQs
                  </a>
                </li>
                <li>
                  <a className="transition-colors hover:text-primary-foreground" href="#testimonials">
                    Families
                  </a>
                </li>
              </ul>
            </nav>

            <div>
              <h3 className="font-heading text-sm font-semibold">Legal</h3>
              <ul className="mt-5 space-y-3 text-sm text-primary-foreground/68">
                <li>Privacy</li>
                <li>Terms</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-7 text-[12px] text-primary-foreground/55 sm:flex-row sm:items-center sm:justify-between sm:text-[13px]">
            <p>© 2026 Rishta Biodata. All rights reserved.</p>
            <p>Made for meaningful introductions.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
