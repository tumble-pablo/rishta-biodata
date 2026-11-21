import {
  ArrowRight,
  ArrowUpRight,
  Check,
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
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BiodataBuilder } from "@/components/biodata-builder/biodata-builder";
import { HeroBuilderMockup } from "@/components/hero-builder-mockup";
import {
  DesignIllustration,
  DetailsIllustration,
  DownloadIllustration,
} from "@/components/how-it-works-illustrations";
import { TemplateShowcase } from "@/components/home/template-showcase";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BLOG_POSTS } from "@/lib/blog/posts";

export const metadata: Metadata = {
  title: "Free Marriage Biodata Maker – 8 Designs, PDF Download | Rishta Biodata",
  description:
    "Make your marriage biodata online in 5 minutes. Fill in your details, pick a design, download a PDF and share it on WhatsApp. Free, no sign-up.",
  alternates: { canonical: "/" },
};

// One source for the visible FAQ and its FAQPage structured data, so the
// two can never drift apart. Answers must stay true to what the product
// does today (no photo upload, English only, ₹51 watermark removal).
const FAQ_ITEMS = [
  {
    question: "Is Rishta Biodata really free?",
    answer:
      "Yes. Making your biodata and downloading the PDF is free. The free PDF has a small watermark. If you want it without the watermark, you pay ₹51 once. There is no subscription.",
  },
  {
    question: "How do I make a marriage biodata on my phone?",
    answer:
      "Open this page on your phone and tap “Make my biodata”. Fill in your details step by step, pick a design, and download the PDF. There is no app to install.",
  },
  {
    question: "What should I write in a marriage biodata?",
    answer:
      "Write your personal details, religion and stars, education and job, family details, a few lines about yourself, and a contact number. Keep it honest and short enough to fit on one page.",
  },
  {
    question: "Can I send my biodata on WhatsApp?",
    answer:
      "Yes. Download it as a JPG and it shows up as a picture in the chat, so the family sees it straight away. You can also send the PDF, or print it if the family prefers paper.",
  },
  {
    question: "I don't know my rashi or nakshatra. Can you find them?",
    answer:
      "Yes. Enter your date and time of birth, then tap “Fill from my birth details” in the religion step. We use the Lahiri method that most Indian panchangs use, for births in India. You can still change them, and it is a good idea to check with your family pandit.",
  },
  {
    question: "Can I add my photo?",
    answer:
      "Yes. Add a photo in the personal details step and it is fitted into your biodata automatically. Your photo stays on your phone or computer and only appears in your biodata.",
  },
  {
    question: "Do I need to create an account?",
    answer: "No. There is no sign-up, password or OTP. Just open the page and start.",
  },
  {
    question: "Can I change my biodata after downloading it?",
    answer:
      "Yes. Your details stay saved in the browser you used. Come back, change what you need, and download again. If you paid to remove the watermark, it stays removed on that phone or computer for one year.",
  },
  {
    question: "Is my information safe?",
    answer:
      "Your biodata is not put online or shown to anyone. Your details are saved only in your own browser. If you pay, we email one copy of your PDF to the email address you paid with.",
  },
  {
    question: "What does the ₹51 pay for?",
    answer:
      "It removes the watermark from your biodata PDF, and we email you a copy. It is a one-time payment, made safely through Razorpay.",
  },
  {
    question: "Which language can I make my biodata in?",
    answer:
      "Your biodata can be printed in English, Hindi or Marathi. Pick the language when you choose your design. The form itself is in English, and you can type your details in any script.",
  },
  {
    question: "Which design is best for a marriage biodata?",
    answer:
      "There is no single best design. Modern Minimal suits a clean, simple look. Double Border or Ornate Corners suit a more traditional family. You can switch designs any time and see the change straight away.",
  },
  {
    question: "How is a biodata different from a résumé?",
    answer:
      "A résumé is for jobs and talks about your work and skills. A marriage biodata is for families and also covers your family, religion, stars and values.",
  },
  {
    question: "शादी के लिए बायोडाटा कैसे बनाएं?",
    answer:
      "इस पेज पर “Make my biodata” दबाएं। अपनी जानकारी भरें, जैसे नाम, जन्म तिथि, परिवार, पढ़ाई और नौकरी। फिर एक design चुनें और PDF डाउनलोड करें। यह मुफ़्त है और sign-up की ज़रूरत नहीं।",
  },
] as const;

const STRUCTURED_DATA = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Rishta Biodata",
    url: "https://rishtabiodata.com/",
    applicationCategory: "LifestyleApplication",
    operatingSystem: "Any",
    description: "Free online marriage biodata maker. Fill in your details, pick a design and download a PDF.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  },
];

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
        className="hero-grid relative"
      >
        <div className="relative mx-auto grid max-w-[1180px] items-center gap-14 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(420px,1fr)] lg:gap-12 lg:px-0 lg:py-24">
          <div className="max-w-[560px]">
            <span className="inline-flex items-center gap-1.5 rounded-[4px] bg-secondary px-2.5 py-1 text-[11px] font-semibold tracking-[0.08em] text-accent-foreground">
              <Check aria-hidden="true" className="size-3" strokeWidth={3} />
              FREE MARRIAGE BIODATA MAKER
            </span>

            <h1
              id="hero-title"
              className="font-heading mt-5 scroll-mt-28 text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-[1.06] tracking-[-0.05em] text-balance"
            >
              Make your <span className="text-accent-foreground">marriage biodata</span> in 5 minutes
            </h1>

            <p className="mt-6 max-w-[460px] text-base leading-[1.7] text-muted-foreground sm:text-[17px]">
              Fill in your details, pick a design you like, and download a PDF you can send on WhatsApp. No sign-up needed.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                asChild
                size="lg"
                className="h-13 rounded-[8px] bg-accent-foreground px-6 text-[14px] font-semibold text-primary-foreground shadow-[0_16px_34px_rgba(143,47,60,0.28)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-accent-foreground/90"
              >
                <a href="#biodata-builder">
                  Make my biodata
                  <ArrowRight aria-hidden="true" className="size-4" strokeWidth={2} />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-13 rounded-[8px] border-primary! bg-card px-6 text-[14px] font-semibold"
              >
                <a href="#templates">See designs</a>
              </Button>
            </div>

            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-muted-foreground">
              {["Free to make", "No sign-up", "Ready for WhatsApp"].map((point) => (
                <li key={point} className="flex items-center gap-1.5">
                  <Check aria-hidden="true" className="size-3.5 text-accent-foreground" strokeWidth={2.5} />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <HeroBuilderMockup />
        </div>
      </section>

      <section
        id="templates"
        aria-labelledby="templates-title"
        className="scroll-mt-20 border-t border-border bg-card"
      >
        <div className="mx-auto max-w-[1180px] px-5 py-20 sm:px-8 sm:py-24 lg:px-0">
          <div className="max-w-[640px]">
            <h2
              id="templates-title"
              className="font-heading text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.045em] text-balance"
            >
              Marriage biodata templates
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-[17px]">
              8 designs, from simple to traditional. Tap one to start. You can change the design any time, even after filling in your details.
            </p>
          </div>

          <div className="mt-10 lg:mt-12">
            <TemplateShowcase />
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        aria-labelledby="how-it-works-title"
        className="relative border-y border-border bg-[linear-gradient(180deg,var(--card),var(--background))]"
      >
        <div className="mx-auto max-w-[1180px] px-5 py-20 sm:px-8 sm:py-24 lg:px-0 lg:py-28">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-[640px]">
              <span className="inline-block rounded-[4px] bg-secondary px-2.5 py-1 text-[11px] font-semibold tracking-[0.1em] text-accent-foreground">
                HOW IT WORKS
              </span>
              <h2
                id="how-it-works-title"
                className="font-heading mt-4 text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.045em] text-balance"
              >
                Three simple steps to a{" "}
                <span className="text-accent-foreground">beautiful biodata</span>.
              </h2>
            </div>
            <Button
              asChild
              variant="outline"
              className="h-11 shrink-0 rounded-[8px] border-primary! px-5 text-[13px] font-semibold"
            >
              <a href="#biodata-builder">
                Start now
                <ArrowRight aria-hidden="true" className="size-4" strokeWidth={2} />
              </a>
            </Button>
          </div>

          <ol className="mt-10 grid overflow-hidden rounded-[16px] border border-border bg-card shadow-[0_24px_60px_rgba(62,21,50,0.06)] md:grid-cols-3 lg:mt-12">
            {[
              {
                step: "01",
                title: "Add your details",
                description:
                  "Share your personal, family, education, career and contact details in one clear flow.",
                illustration: <DetailsIllustration />,
              },
              {
                step: "02",
                title: "Choose your design",
                description:
                  "Pick a thoughtful biodata style and see your information come together as you go.",
                illustration: <DesignIllustration />,
              },
              {
                step: "03",
                title: "Download your biodata",
                description:
                  "Review everything carefully, then download your polished biodata when it is ready to share.",
                illustration: <DownloadIllustration />,
              },
            ].map((item) => (
              <li
                key={item.step}
                className="flex flex-col border-border [&:not(:first-child)]:border-t md:[&:not(:first-child)]:border-l md:[&:not(:first-child)]:border-t-0"
              >
                <div className="flex h-[200px] items-center justify-center border-b border-border bg-secondary/40 px-6">
                  {item.illustration}
                </div>
                <div className="p-6">
                  <h3 className="font-heading flex items-center gap-2.5 text-lg font-semibold tracking-[-0.025em]">
                    <span className="grid size-6 place-items-center rounded-[5px] bg-primary text-[10px] font-semibold tabular-nums text-primary-foreground">
                      {item.step}
                    </span>
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-[38ch] text-[15px] leading-7 text-muted-foreground">
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
              Make your biodata
            </h2>
            <p className="mx-auto mt-4 max-w-[52ch] text-base leading-7 text-muted-foreground sm:text-[17px]">
              Fill in your details step by step. Your biodata shows up next to the form as you type.
            </p>
          </div>

          <div className="mt-12 lg:mt-14">
            <BiodataBuilder />
          </div>
        </div>
      </section>

      <section
        id="biodata-format"
        aria-labelledby="biodata-format-title"
        className="scroll-mt-20 border-b border-border bg-card"
      >
        <div className="mx-auto max-w-[1180px] px-5 py-20 sm:px-8 sm:py-24 lg:px-0 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
            <div>
              <h2
                id="biodata-format-title"
                className="font-heading text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.045em] text-balance"
              >
                What is a marriage biodata?
              </h2>
              {/* Kept to a short, self-contained answer so search engines can
                  quote it directly for "what is biodata" style queries. */}
              <p className="mt-5 text-[17px] leading-8 text-foreground">
                A marriage biodata is a one-page introduction that families share when they look for a match. It has your personal details, religion and stars, education and job, family details and a contact number. Think of it as a résumé, but for marriage.
              </p>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                It is usually the first thing the other family sees, so it should be neat, honest and easy to read.
              </p>
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- see site-header.tsx */}
              <a
                href="/blog/what-to-include-in-a-marriage-biodata"
                className="font-heading mt-6 inline-flex min-h-11 items-center gap-1.5 text-[14px] font-semibold text-accent-foreground hover:underline focus-visible:underline focus-visible:outline-none"
              >
                Read the full biodata format guide
                <ArrowRight aria-hidden="true" className="size-4" />
              </a>
            </div>

            <div>
              <h3 className="font-heading text-xl font-semibold tracking-[-0.025em]">
                What to write in your biodata
              </h3>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  {
                    title: "About you",
                    detail: "Name, date of birth, time and place of birth, height.",
                  },
                  {
                    title: "Religion and stars",
                    detail: "Religion, caste, gotra, rashi, nakshatra, manglik.",
                  },
                  {
                    title: "Studies and work",
                    detail: "Your education, your job and where you work.",
                  },
                  {
                    title: "Family",
                    detail: "Parents, brothers and sisters, and what they do.",
                  },
                  {
                    title: "About me",
                    detail: "Two or three lines about you, in your own words.",
                  },
                  {
                    title: "Contact",
                    detail: "A phone number and the city you live in.",
                  },
                ].map((item) => (
                  <li key={item.title} className="rounded-[12px] border border-border bg-background p-5">
                    <p className="font-heading flex items-center gap-2 text-[15px] font-semibold">
                      <Check aria-hidden="true" className="size-4 text-accent-foreground" strokeWidth={2.5} />
                      {item.title}
                    </p>
                    <p className="mt-2 text-[14px] leading-6 text-muted-foreground">{item.detail}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[14px] leading-6 text-muted-foreground">
                Only a few basics are needed, like your name, date of birth, religion and a phone number. Everything else is optional, so leave out anything your family is not comfortable sharing.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="features"
        aria-labelledby="features-title"
        className="border-b border-border bg-background"
      >
        <div className="mx-auto max-w-[1180px] px-5 py-20 sm:px-8 sm:py-24 lg:px-0 lg:py-28">
          <div className="max-w-[720px]">
            <h2
              id="features-title"
              className="font-heading text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.045em] text-balance"
            >
              Why families make their biodata here
            </h2>
          </div>

          <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-12">
            {[
              {
                icon: KeyRound,
                title: "No sign-up",
                description: "Open the page and start. No account, no password, no OTP.",
              },
              {
                icon: LayoutTemplate,
                title: "8 designs to choose from",
                description: "Simple or traditional. Change the design any time, even after filling your details.",
              },
              {
                icon: MessageCircle,
                title: "Ready for WhatsApp",
                description: "Download a JPG that shows up as a picture in the chat, or a PDF to send or print.",
              },
              {
                icon: Sparkles,
                title: "Rashi and nakshatra worked out",
                description: "Don't know them? We work them out from your birth date and time, the way a panchang does.",
              },
              {
                icon: Smartphone,
                title: "Easy on your phone",
                description: "Fill everything from your phone. No app to install.",
              },
              {
                icon: Languages,
                title: "English, Hindi or Marathi",
                description: "Print your biodata in the language your family reads. Add your photo too.",
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

          <div className="mt-16 lg:mt-20">
            <h3 className="font-heading text-xl font-semibold tracking-[-0.025em]">
              Rishta Biodata vs Word, Canva and other sites
            </h3>
            <div className="mt-6 overflow-x-auto rounded-[12px] border border-border bg-card">
              <table className="w-full min-w-[640px] text-left text-[14px]">
                <thead>
                  <tr className="border-b border-border bg-secondary/50">
                    <th scope="col" className="p-4 font-semibold"><span className="sr-only">Compare</span></th>
                    <th scope="col" className="font-heading p-4 font-semibold text-accent-foreground">Rishta Biodata</th>
                    <th scope="col" className="font-heading p-4 font-semibold">Word or Canva</th>
                    <th scope="col" className="font-heading p-4 font-semibold">Other biodata sites</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Sign-up needed", "No", "Canva needs an account", "Many ask for a login or OTP"],
                    ["Layout", "Done for you", "You fix it yourself", "Done for you"],
                    ["Stars, gotra and family fields", "Ready to fill", "You type them in yourself", "Usually ready"],
                    ["Price", "Free with a small watermark. ₹51 once to remove it", "Free", "Usually ₹21 to ₹59 to download clean"],
                    ["Easy on a phone", "Yes", "Hard to edit on a phone", "Varies"],
                  ].map(([label, ours, word, others]) => (
                    <tr key={label} className="border-b border-border last:border-b-0">
                      <th scope="row" className="p-4 font-medium text-muted-foreground">{label}</th>
                      <td className="p-4 font-semibold">{ours}</td>
                      <td className="p-4">{word}</td>
                      <td className="p-4">{others}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
            {/* Only the 3 most broadly-appealing posts feature here — the
                rest (including narrower, search-intent-specific guides)
                live on /blog via "Read more blog" below, so this section
                stays a clean 3-column grid instead of growing crowded as
                the blog does. */}
            {BLOG_POSTS.slice(0, 3).map((post) => {
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
              Questions families ask
            </h2>
          </div>

          <Accordion
            type="single"
            collapsible
            className="mt-12 border-y border-border lg:mt-14"
          >
            {FAQ_ITEMS.map((item, index) => (
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

      <section aria-labelledby="final-cta-title" className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-[1180px] flex-col items-start gap-6 px-5 py-16 sm:px-8 sm:py-20 lg:flex-row lg:items-center lg:justify-between lg:px-0">
          <div className="max-w-[620px]">
            <h2
              id="final-cta-title"
              className="font-heading text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.04em] text-balance"
            >
              Your biodata is the first thing the other family sees.
            </h2>
            <p className="mt-3 text-base leading-7 text-primary-foreground/80 sm:text-[17px]">
              Make it neat and easy to read. It takes about 5 minutes.
            </p>
          </div>
          <Button
            asChild
            size="lg"
            className="h-13 shrink-0 rounded-[8px] bg-accent-foreground px-6 text-[14px] font-semibold text-primary-foreground hover:bg-accent-foreground/90"
          >
            <a href="#biodata-builder">
              Make my biodata
              <ArrowRight aria-hidden="true" className="size-4" strokeWidth={2} />
            </a>
          </Button>
        </div>
      </section>

      <script
        type="application/ld+json"
        // JSON.stringify output is safe here: all values are static strings
        // defined in this file, none come from user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
      />

      <SiteFooter />
    </main>
  );
}
