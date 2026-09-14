/* eslint-disable @next/next/no-html-link-for-pages -- plain <a> tags are
   deliberate throughout this file, not next/link's <Link> — see
   site-header.tsx's file comment for why (a reproducible vinext
   client-navigation bug). */

// Shared across every page (home + blog).
export function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
        <div className="grid gap-12 border-b border-primary-foreground/15 pb-14 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.6fr)_repeat(3,minmax(120px,0.5fr))] lg:gap-8 lg:pb-16">
          <div className="max-w-sm">
            <a
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
            </a>
            <p className="mt-5 text-[15px] leading-7 text-primary-foreground/68">
              Thoughtful marriage biodata, made simple for families across South Asia.
            </p>
          </div>

          <nav aria-label="Product">
            <h3 className="font-heading text-sm font-semibold">Product</h3>
            <ul className="mt-5 space-y-3 text-sm text-primary-foreground/68">
              <li>
                <a className="transition-colors hover:text-primary-foreground" href="/#biodata-builder">
                  Start creating
                </a>
              </li>
              <li>
                <a className="transition-colors hover:text-primary-foreground" href="/#how-it-works">
                  How it works
                </a>
              </li>
              <li>
                <a className="transition-colors hover:text-primary-foreground" href="/#testimonials">
                  Reviews
                </a>
              </li>
              <li>
                <a className="transition-colors hover:text-primary-foreground" href="/#features">
                  Features
                </a>
              </li>
              <li>
                <a className="transition-colors hover:text-primary-foreground" href="/blog">
                  Blog
                </a>
              </li>
            </ul>
          </nav>

          <nav aria-label="Company">
            <h3 className="font-heading text-sm font-semibold">Company</h3>
            <ul className="mt-5 space-y-3 text-sm text-primary-foreground/68">
              <li>
                <a className="transition-colors hover:text-primary-foreground" href="/#hero-title">
                  About
                </a>
              </li>
              <li>
                <a className="transition-colors hover:text-primary-foreground" href="/#faq">
                  FAQs
                </a>
              </li>
              <li>
                <a className="transition-colors hover:text-primary-foreground" href="/#testimonials">
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
  );
}
