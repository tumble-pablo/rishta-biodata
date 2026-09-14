import { FileText, PenLine, Share2, type LucideIcon } from "lucide-react";

// Simple, file-based blog content — no CMS, no database. Each post's body is
// a small list of typed blocks (heading/paragraph/list) rather than a single
// markdown string, so the reading page can render real semantic HTML
// (`<h2>`, `<ul>`, ...) without pulling in an MDX pipeline for three posts.
//
// `icon`/`panelClass`/`accentClass` style the homepage teaser card for this
// post (see the "articles" section in app/page.tsx) — kept here rather than
// duplicated in two places, so the teaser and the real post can never drift
// out of sync on title/description text.

export type BlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] };

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string; // ISO date, "2026-09-14"
  icon: LucideIcon;
  panelClass: string;
  accentClass: string;
  body: BlogBlock[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "what-to-include-in-a-marriage-biodata",
    title: "What should you include in a marriage biodata?",
    excerpt: "A simple checklist for personal, family, education, career and contact details.",
    category: "Guide",
    publishedAt: "2026-09-14",
    icon: FileText,
    panelClass: "bg-secondary",
    accentClass: "bg-primary/10 text-primary",
    body: [
      {
        type: "paragraph",
        text: "A biodata is usually the first thing a family reads before they ever speak with you, so it helps to know what belongs on the page before you start writing. Here's a straightforward checklist, section by section.",
      },
      { type: "heading", text: "Personal details" },
      {
        type: "list",
        items: [
          "Full name, date of birth and place of birth",
          "Height, and complexion if your family typically includes it",
          "Marital status and mother tongue",
          "Religion, and any optional astrology details your family looks at",
        ],
      },
      { type: "heading", text: "Family details" },
      {
        type: "list",
        items: [
          "Father's and mother's names and occupations",
          "Number of siblings, and whether they're married",
          "Family type (nuclear or joint) and native place",
        ],
      },
      { type: "heading", text: "Education and career" },
      {
        type: "list",
        items: [
          "Highest qualification and field of study",
          "Current occupation and company",
          "Annual income, if your family shares this — it's genuinely optional",
        ],
      },
      { type: "heading", text: "Contact details" },
      {
        type: "paragraph",
        text: "A phone number and city are usually enough. A biodata tends to get forwarded around by relatives and matchmakers, so it's worth thinking of it the same way you'd think of a business card — not a full home address.",
      },
      { type: "heading", text: "Optional: religious and astrological details" },
      {
        type: "paragraph",
        text: "Caste, gotra, rashi, nakshatra and manglik status only matter if your family matches on them. There's no harm in leaving these blank if they don't — a biodata reads perfectly well without them.",
      },
      {
        type: "paragraph",
        text: "Once you know what belongs on the page, the biodata builder above walks you through each of these sections in order, and shows you exactly how it will look as you go.",
      },
    ],
  },
  {
    slug: "how-to-write-a-biodata-that-feels-personal",
    title: "How to write a biodata that feels personal",
    excerpt: "Practical ways to sound clear, warm and genuine without writing too much.",
    category: "Guide",
    publishedAt: "2026-09-14",
    icon: PenLine,
    panelClass: "bg-accent/50",
    accentClass: "bg-primary text-primary-foreground",
    body: [
      {
        type: "paragraph",
        text: "A biodata can read like a form, or it can read like an introduction to an actual person. A few small choices decide which one you end up with.",
      },
      { type: "heading", text: "Say what you mean, simply" },
      {
        type: "paragraph",
        text: "It's tempting to reach for grand words — \"extremely hardworking\", \"very family-oriented\" — but plain, specific language almost always reads as more genuine. Say what's true, in the fewest words that say it clearly.",
      },
      { type: "heading", text: "Be specific, not generic" },
      {
        type: "list",
        items: [
          "Instead of \"likes reading\", try \"reads a book most weekends\"",
          "Instead of \"enjoys travelling\", name a place you'd actually go back to",
          "Instead of \"family-oriented\", mention what that looks like day to day",
        ],
      },
      { type: "heading", text: "Let hobbies do some of the talking" },
      {
        type: "paragraph",
        text: "A short, honest hobbies line often tells a reader more about you than a paragraph of adjectives does. Two or three real interests are worth more than a long list of things you only do occasionally.",
      },
      { type: "heading", text: "Read it out loud before you share it" },
      {
        type: "paragraph",
        text: "Reading a draft aloud is the fastest way to catch anything that sounds stiff, repeated, or borrowed from a template. If a sentence feels awkward to say, it'll usually feel a little awkward to read too — trim it or say it plainer.",
      },
      {
        type: "paragraph",
        text: "None of this needs to take long. A biodata that sounds like a clear, warm version of you will always read better than one that sounds like everyone else's.",
      },
    ],
  },
  {
    slug: "tips-for-sharing-your-biodata-with-family",
    title: "Simple tips for sharing your biodata with family",
    excerpt: "Keep your biodata easy to read and ready to share across phones and WhatsApp.",
    category: "Guide",
    publishedAt: "2026-09-14",
    icon: Share2,
    panelClass: "bg-muted",
    accentClass: "bg-card text-primary",
    body: [
      {
        type: "paragraph",
        text: "Once your biodata is ready, how you share it matters almost as much as what's on it. A few small habits make it easier for family to actually read and forward.",
      },
      { type: "heading", text: "Keep the file light" },
      {
        type: "paragraph",
        text: "A heavy PDF is slow to open on mobile data and often gets compressed badly when it's forwarded a few times over WhatsApp. A clean, mostly-text PDF stays sharp and opens instantly, however many times it gets passed along.",
      },
      { type: "heading", text: "Name the file clearly" },
      {
        type: "paragraph",
        text: "\"Priya_Sharma_Biodata.pdf\" is far more useful than \"Untitled.pdf\" or \"Scan001.pdf\" once it's sitting in someone's downloads folder alongside a dozen others.",
      },
      { type: "heading", text: "Add one line when you send it" },
      {
        type: "paragraph",
        text: "A short message alongside the file — who it's for, and why you're sharing it — gives the recipient context before they even open it, especially if it's going to someone outside close family.",
      },
      { type: "heading", text: "Keep a single, up-to-date copy" },
      {
        type: "paragraph",
        text: "Details change — a new job, a new city. It's easier to keep one draft updated than to track down every version you've ever sent out, so update the same one and re-download it when something changes.",
      },
      { type: "heading", text: "Be thoughtful about what goes to strangers" },
      {
        type: "paragraph",
        text: "A close relative forwarding your biodata to a family friend is different from it reaching a matchmaker you've never spoken to. It's reasonable to keep a full home address off a document that might travel further than you expect.",
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

const WORDS_PER_MINUTE = 200;

export function estimateReadingTime(body: BlogBlock[]): number {
  const wordCount = body.reduce((total, block) => {
    const text = block.type === "list" ? block.items.join(" ") : block.text;
    return total + text.trim().split(/\s+/).filter(Boolean).length;
  }, 0);
  return Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE));
}
