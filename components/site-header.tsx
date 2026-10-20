import { ArrowRight, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";

// Shared across every page (home + blog) so navigation and the primary CTA
// stay consistent. Links use `/#section` rather than a bare `#section`: a
// bare hash only works when you're already on `/` — from `/blog`, it would
// try (and fail) to scroll to a section that doesn't exist on that page.
//
// Plain `<a>` tags, not `next/link`'s `<Link>`, are deliberate here: this
// vinext version's client-side navigation throws an uncaught error on click
// ("[vinext] RSC prefetch setup error" / "e is not a function" — reproduced
// on this exact setup, including the plain `href="/"` logo link that
// existed before this file did), which silently cancels the navigation.
// Plain anchors trigger a full browser navigation instead, sidestepping
// that broken client router entirely — a fine trade-off for a mostly
// static, server-rendered marketing site with only a few pages.
//
// The Steps/Features dropdowns are CSS-only (hover + focus-within) so the
// header can stay a server component. The top-level label is itself a link
// to the section, so the menu is a shortcut, never the only way there.
const navItems = [
  {
    label: "Steps",
    href: "/#how-it-works",
    children: ["Add your details", "Choose your design", "Download your biodata"],
  },
  {
    label: "Features",
    href: "/#features",
    children: [
      "No login required",
      "Multiple templates",
      "WhatsApp-ready PDF",
      "Astrology details",
      "Multiple languages",
      "Made for mobile",
    ],
  },
  { label: "Reviews", href: "/#testimonials" },
  { label: "FAQs", href: "/#faq" },
] as const;

const navLinkClass =
  "font-heading flex min-h-11 items-center gap-1 rounded-[6px] px-3 text-[13px] font-medium text-muted-foreground transition-colors duration-200 hover:bg-secondary/70 hover:text-foreground focus-visible:bg-secondary/70 focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function SiteHeader() {
  return (
    <>
      <div className="bg-primary px-5 py-2.5 text-center text-[12px] text-primary-foreground sm:text-[13px]">
        Free to use. No sign-up needed to start your biodata.{" "}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- see file header comment */}
        <a
          href="/#biodata-builder"
          className="ml-1 inline-flex items-center gap-1 whitespace-nowrap font-semibold text-accent underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none"
        >
          Get started
          <ArrowRight aria-hidden="true" className="size-3.5" strokeWidth={2.25} />
        </a>
      </div>

      <header className="sticky top-0 z-50 border-b border-border/70 bg-card/95 backdrop-blur">
        <div className="mx-auto flex min-h-[72px] max-w-[1180px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-0">
          <div className="flex min-w-0 items-center gap-7 xl:gap-9">
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- see file header comment */}
            <a
              href="/"
              className="group flex min-h-11 shrink-0 items-center gap-3 rounded-[8px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label="Rishta Biodata home"
            >
              <span
                aria-hidden="true"
                className="font-heading grid size-9 place-items-center rounded-[8px] bg-primary text-[13px] font-semibold text-primary-foreground"
              >
                RB
              </span>
              <span className="font-heading hidden text-[15px] font-semibold tracking-[-0.02em] min-[380px]:inline sm:text-base">
                Rishta Biodata
              </span>
            </a>

            <nav aria-label="Primary navigation" className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {navItems.map((item) => (
                  <li key={item.label} className="group relative">
                    <a href={item.href} className={navLinkClass}>
                      {item.label}
                      {"children" in item && (
                        <ChevronDown
                          aria-hidden="true"
                          className="size-3.5 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
                        />
                      )}
                    </a>
                    {"children" in item && (
                      <ul className="invisible absolute left-0 top-full z-50 min-w-[220px] translate-y-1 rounded-[10px] border border-border bg-card p-1.5 opacity-0 shadow-[0_18px_40px_rgba(62,21,50,0.12)] transition duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                        {item.children.map((child) => (
                          <li key={child}>
                            <a
                              href={item.href}
                              className="block rounded-[6px] px-3 py-2 text-[13px] text-foreground transition-colors hover:bg-secondary/70 focus-visible:bg-secondary/70 focus-visible:outline-none"
                            >
                              {child}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-4">
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- see file header comment */}
            <a
              href="/#biodata-builder"
              className="font-heading hidden min-h-11 items-center rounded-[6px] px-2 text-[13px] font-medium text-foreground hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:flex"
            >
              See a sample
            </a>
            <Button
              asChild
              className="h-10 rounded-[8px] bg-accent-foreground px-4 text-[13px] font-semibold text-primary-foreground hover:bg-accent-foreground/90 sm:px-5"
            >
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- see file header comment */}
              <a
                href="/#biodata-builder"
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-accent-foreground"
              >
                Create biodata
              </a>
            </Button>
          </div>
        </div>

        <nav
          aria-label="Primary navigation on mobile"
          className="border-t border-border/70 bg-card lg:hidden"
        >
          <ul className="mx-auto grid max-w-[1440px] grid-cols-4 px-2 sm:px-6">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="font-heading flex min-h-11 items-center justify-center rounded-[6px] px-1 text-[12px] font-medium text-muted-foreground transition-colors duration-200 hover:bg-secondary/70 hover:text-foreground focus-visible:bg-secondary/70 focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  );
}
