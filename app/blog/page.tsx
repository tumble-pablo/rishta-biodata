import type { Metadata } from "next";

import { BlogListItem } from "@/components/blog/blog-list-item";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { BLOG_POSTS } from "@/lib/blog/posts";

export const metadata: Metadata = {
  title: "Blog — Rishta Biodata",
  description: "Guides for writing, formatting and sharing a marriage biodata.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  const posts = [...BLOG_POSTS].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

  return (
    <main id="main-content" tabIndex={-1} className="min-h-dvh bg-background text-foreground focus:outline-none">
      <a
        href="#main-content"
        className="sr-only z-50 rounded-md bg-primary px-4 py-3 text-primary-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to main content
      </a>

      <SiteHeader />

      <section className="mx-auto max-w-[720px] px-5 py-16 sm:px-8 sm:py-20">
        <h1 className="font-heading text-[clamp(2rem,4vw,3rem)] font-semibold tracking-[-0.045em] text-balance">
          Blog
        </h1>
        <p className="mt-3 text-base leading-7 text-muted-foreground">
          Short, practical guides for writing, formatting and sharing a marriage biodata.
        </p>

        <div className="mt-10">
          {posts.map((post) => (
            <BlogListItem key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
