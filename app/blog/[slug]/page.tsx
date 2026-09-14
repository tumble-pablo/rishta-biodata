import { format, parseISO } from "date-fns";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BlogBody } from "@/components/blog/blog-body";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { BLOG_POSTS, estimateReadingTime, getBlogPost } from "@/lib/blog/posts";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return {
    title: `${post.title} — Rishta Biodata`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const readingTime = estimateReadingTime(post.body);

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
        {/* Plain <a>, not next/link's <Link> — see site-header.tsx's file comment. */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a
          href="/blog"
          className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back to blog
        </a>

        <header className="mt-6">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
            <Badge variant="outline" className="text-[11px] font-medium text-accent-foreground">
              {post.category}
            </Badge>
            <time dateTime={post.publishedAt}>{format(parseISO(post.publishedAt), "d MMMM yyyy")}</time>
            <span aria-hidden="true">·</span>
            <span>{readingTime} min read</span>
          </div>
          <h1 className="font-heading mt-3 text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.04em] text-balance">
            {post.title}
          </h1>
          <p className="mt-3 text-base leading-7 text-muted-foreground sm:text-lg">{post.excerpt}</p>
        </header>

        <div className="mt-10">
          <BlogBody body={post.body} />
        </div>

        <div className="mt-14 rounded-[14px] border border-border bg-card p-6 sm:p-7">
          <p className="font-heading text-lg font-semibold tracking-[-0.02em]">
            Ready to put this into practice?
          </p>
          <p className="mt-2 text-[15px] leading-7 text-muted-foreground">
            Start your biodata and see it come together section by section.
          </p>
          <Button asChild className="mt-4 h-11 rounded-[6px] px-5 text-[13px] font-semibold">
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- see site-header.tsx */}
            <a href="/#biodata-builder">
              Create your biodata
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </a>
          </Button>
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}
