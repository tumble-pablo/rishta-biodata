import {
  ArrowUpRight,
  KeyRound,
  Languages,
  LayoutTemplate,
  MessageCircle,
  Sparkles,
  Smartphone,
} from "lucide-react";
import type { Metadata } from "next";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BiodataBuilder } from "@/components/biodata-builder/biodata-builder";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BLOG_POSTS } from "@/lib/blog/posts";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

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

      <SiteHeader />

      <section
        aria-labelledby="hero-title"
        className="relative mx-auto grid min-h-[calc(100dvh-7.75rem)] max-w-[1440px] items-center gap-10 px-5 py-10 sm:px-8 sm:py-12 lg:min-h-[calc(100dvh-5rem)] lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.72fr)] lg:gap-12 lg:px-12 lg:py-10 xl:gap-14"
      >
        <div aria-hidden="true" className="hero-glow" />

        <div className="relative z-10 max-w-[640px]">
          <h1
            id="hero-title"
            className="font-heading max-w-[620px] scroll-mt-28 text-[clamp(2.5rem,4.4vw,4rem)] font-semibold leading-[1] tracking-[-0.05em] text-balance"
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

        <div id="biodata-preview" className="relative z-10 mx-auto w-full max-w-[410px] scroll-mt-8">
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
          <div className="mx-auto max-w-[760px] text-center">
            <h2
              id="how-it-works-title"
              className="font-heading text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.045em] text-balance"
            >
              Three simple steps to a beautiful biodata.
            </h2>
          </div>

          <ol className="relative mx-auto mt-12 grid max-w-[1180px] gap-9 md:grid-cols-3 md:gap-8 lg:mt-14 lg:gap-12">
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
                className="relative grid grid-cols-[40px_1fr] items-start gap-5 after:absolute after:bottom-[-2.25rem] after:left-[19.5px] after:top-10 after:w-px after:bg-border after:content-[''] last:after:hidden md:block md:text-center md:after:bottom-auto md:after:left-1/2 md:after:top-5 md:after:h-px md:after:w-[calc(100%+2rem)] lg:after:w-[calc(100%+3rem)]"
              >
                <span className="font-heading relative z-10 grid size-10 place-items-center rounded-full bg-primary text-[12px] font-semibold tabular-nums text-primary-foreground ring-8 ring-card md:mx-auto">
                  {item.step}
                </span>
                <div className="pt-1 md:pt-0">
                  <h3 className="font-heading text-lg font-semibold tracking-[-0.025em] md:mt-8 md:text-xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-[38ch] text-[15px] leading-7 text-muted-foreground md:mx-auto sm:text-base">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        id="biodata-builder"
        aria-labelledby="biodata-builder-title"
        className="scroll-mt-20 border-b border-border bg-background"
      >
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-[760px] text-center">
            <h2
              id="biodata-builder-title"
              className="font-heading text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.045em] text-balance"
            >
              Build your biodata.
            </h2>
            <p className="mx-auto mt-4 max-w-[52ch] text-base leading-7 text-muted-foreground sm:text-[17px]">
              Fill in your details on the left and watch your biodata come together on the right.
            </p>
          </div>

          <div className="mt-12 lg:mt-14">
            <BiodataBuilder />
          </div>
        </div>
      </section>

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

          <div className="mt-12 grid divide-y divide-border md:grid-cols-3 md:divide-x md:divide-y-0 lg:mt-14">
            {[
              {
                quote:
                  "The whole process was so much easier. My parents were impressed with how thoughtful it looked.",
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
                className="flex flex-col py-8 first:pt-0 last:pb-0 md:min-h-[250px] md:px-8 md:py-0 md:first:pl-0 md:last:pr-0 lg:min-h-[270px] lg:px-12"
              >
                <blockquote className="relative pl-5 text-[16px] leading-7 text-foreground before:absolute before:inset-y-1 before:left-0 before:w-[3px] before:rounded-full before:bg-accent before:content-[''] sm:text-[17px]">
                  <p>“{testimonial.quote}”</p>
                </blockquote>

                <figcaption className="mt-auto flex items-center gap-3 pt-8">
                  <Avatar className="size-11 ring-1 ring-primary/10">
                    <AvatarFallback className="font-heading bg-primary text-[11px] font-semibold tracking-[0.04em] text-primary-foreground">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
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
        id="articles"
        aria-labelledby="articles-title"
        className="border-b border-border bg-background"
      >
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
          <div className="max-w-[820px]">
            <h2
              id="articles-title"
              className="font-heading text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.045em] text-balance"
            >
              Helpful reads for creating your biodata.
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3 lg:mt-14 lg:gap-6">
            {BLOG_POSTS.map((post) => {
              const Icon = post.icon;

              return (
                <article key={post.slug}>
                  {/* Plain <a>, not next/link's <Link> — see site-header.tsx's file comment. */}
                  <a href={`/blog/${post.slug}`} className="group block h-full">
                    <Card className="h-full gap-0 overflow-hidden rounded-[14px] border-border bg-card py-0 shadow-none transition-shadow duration-200 group-hover:shadow-[0_18px_36px_rgba(62,21,50,0.1)]">
                      <AspectRatio ratio={16 / 10} className={post.panelClass}>
                        <div
                          aria-hidden="true"
                          className="absolute -right-8 -top-10 size-32 rounded-full border border-primary/10"
                        />
                        <div
                          aria-hidden="true"
                          className="absolute -bottom-12 -left-8 size-36 rounded-full bg-background/55"
                        />
                        <span
                          className={`absolute left-6 top-6 grid size-12 place-items-center rounded-[8px] ${post.accentClass}`}
                        >
                          <Icon aria-hidden="true" className="size-5" strokeWidth={1.8} />
                        </span>
                        <div
                          aria-hidden="true"
                          className="absolute bottom-7 left-6 right-6 space-y-2"
                        >
                          <span className="block h-2 w-2/3 rounded-full bg-primary/15" />
                          <span className="block h-2 w-1/2 rounded-full bg-primary/10" />
                        </div>
                      </AspectRatio>

                      <CardContent className="flex min-h-[220px] flex-col p-6 sm:p-7">
                        <h3 className="font-heading text-xl font-semibold leading-snug tracking-[-0.025em] text-balance">
                          {post.title}
                        </h3>
                        <p className="mt-3 text-[15px] leading-7 text-muted-foreground sm:text-base">
                          {post.excerpt}
                        </p>
                        <span className="font-heading mt-auto flex items-center gap-1.5 pt-7 text-[13px] font-medium text-primary">
                          Read post
                          <ArrowUpRight
                            aria-hidden="true"
                            className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          />
                        </span>
                      </CardContent>
                    </Card>
                  </a>
                </article>
              );
            })}
          </div>

          <div className="mt-8 flex justify-end lg:mt-10">
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- see site-header.tsx */}
            <a
              href="/blog"
              className="font-heading inline-flex min-h-11 items-center gap-1.5 rounded-[6px] px-2 text-[13px] font-semibold text-primary transition-colors hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Read more blog
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </a>
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

      <SiteFooter />
    </main>
  );
}
