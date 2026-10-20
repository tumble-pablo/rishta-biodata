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
const navItems = [
  { label: "Home", href: "/#hero-title" },
  { label: "Steps", href: "/#how-it-works" },
  { label: "Reviews", href: "/#testimonials" },
  { label: "Features", href: "/#features" },
  { label: "FAQs", href: "/#faq" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/95">
      <div className="mx-auto flex min-h-20 max-w-[1440px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
        <div className="flex min-w-0 items-center gap-7 xl:gap-11">
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- see file header comment */}
          <a
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
          </a>

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
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- see file header comment */}
          <a
            href="/#biodata-builder"
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
  );
}
