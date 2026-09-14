import type { BlogBlock } from "@/lib/blog/posts";

// Renders each post's typed content blocks as real semantic HTML — no
// markdown/MDX pipeline needed for a handful of posts with a simple,
// consistent shape (see lib/blog/posts.ts).
export function BlogBody({ body }: { body: BlogBlock[] }) {
  return (
    <div className="space-y-5">
      {body.map((block, index) => {
        switch (block.type) {
          case "heading":
            return (
              <h2
                key={index}
                className="font-heading pt-2 text-xl font-semibold tracking-[-0.02em] text-balance sm:text-2xl"
              >
                {block.text}
              </h2>
            );
          case "list":
            return (
              <ul key={index} className="list-disc space-y-2 pl-5 marker:text-primary/50">
                {block.items.map((item) => (
                  <li key={item} className="text-[15px] leading-7 text-muted-foreground sm:text-base">
                    {item}
                  </li>
                ))}
              </ul>
            );
          case "paragraph":
          default:
            return (
              <p key={index} className="text-[15px] leading-7 text-muted-foreground sm:text-base">
                {block.text}
              </p>
            );
        }
      })}
    </div>
  );
}
