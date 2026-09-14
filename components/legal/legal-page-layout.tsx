import type { ReactNode } from "react";

import type { BlogBlock } from "@/lib/blog/posts";
import { BlogBody } from "@/components/blog/blog-body";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

// Shared shell for the policy pages (Terms, Privacy, Cancellation & Refund,
// Shipping & Exchange, Contact) — reuses the blog's block-based body
// renderer (heading/paragraph/list) since these pages need exactly the same
// shape of content with none of the blog's dating/reading-time chrome.
interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  intro?: string;
  body: BlogBlock[];
  /** Extra content after the body — e.g. Contact's mailto button. */
  children?: ReactNode;
}

export function LegalPageLayout({ title, lastUpdated, intro, body, children }: LegalPageLayoutProps) {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-dvh bg-background text-foreground focus:outline-none">
      <a
        href="#main-content"
        className="sr-only z-50 rounded-md bg-primary px-4 py-3 text-primary-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to main content
      </a>

      <SiteHeader />

      <article className="mx-auto max-w-[680px] px-5 py-16 sm:px-8 sm:py-20">
        <header>
          <h1 className="font-heading text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.04em] text-balance">
            {title}
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
          {intro && <p className="mt-4 text-base leading-7 text-muted-foreground">{intro}</p>}
        </header>

        <div className="mt-10">
          <BlogBody body={body} />
        </div>

        {children && <div className="mt-8">{children}</div>}
      </article>

      <SiteFooter />
    </main>
  );
}
