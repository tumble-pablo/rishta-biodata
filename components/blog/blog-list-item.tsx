import { format, parseISO } from "date-fns";

import { Badge } from "@/components/ui/badge";
import { estimateReadingTime, type BlogPost } from "@/lib/blog/posts";

// One row in the /blog listing — a plain linked title, date, category tag
// and one-line excerpt, deliberately without a thumbnail image or card
// treatment (see the plan: this follows 21st.dev's own blog, which keeps
// its listing to a simple text list rather than a visual grid).
//
// Plain `<a>`, not `next/link`'s `<Link>` — see site-header.tsx's file
// comment for why (a reproducible vinext client-navigation bug).
export function BlogListItem({ post }: { post: BlogPost }) {
  const readingTime = estimateReadingTime(post.body);

  return (
    <article className="border-b border-border py-6 first:pt-0 last:border-b-0">
      <a href={`/blog/${post.slug}`} className="group block">
        <h2 className="font-heading text-lg font-semibold tracking-[-0.02em] text-balance group-hover:text-primary sm:text-xl">
          {post.title}
        </h2>
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <Badge variant="outline" className="text-[11px] font-medium text-accent-foreground">
            {post.category}
          </Badge>
          <time dateTime={post.publishedAt}>{format(parseISO(post.publishedAt), "d MMMM yyyy")}</time>
          <span aria-hidden="true">·</span>
          <span>{readingTime} min read</span>
        </div>
        <p className="mt-3 max-w-[65ch] text-[15px] leading-7 text-muted-foreground">{post.excerpt}</p>
      </a>
    </article>
  );
}
