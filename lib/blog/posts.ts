import { FileText, LayoutTemplate, PenLine, Share2, type LucideIcon } from "lucide-react";

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
  {
    slug: "marriage-biodata-word-format",
    title: "Marriage biodata Word format",
    excerpt: "The sections a Word-format biodata needs, in the right order, plus a faster way to build one.",
    category: "Guide",
    publishedAt: "2026-09-14",
    icon: LayoutTemplate,
    panelClass: "bg-primary/[0.06]",
    accentClass: "bg-accent text-accent-foreground",
    body: [
      {
        type: "paragraph",
        text: "Most people looking for a \"marriage biodata Word format\" just want to know what sections to include and what order to put them in, so they can open a blank document and start typing without guessing. Here's that structure, plus a few formatting habits that make a Word biodata look clean instead of cramped.",
      },
      { type: "heading", text: "The structure to copy" },
      {
        type: "list",
        items: [
          "Name and a photo placeholder at the top, centered",
          "Personal details — date of birth, height, marital status, mother tongue, religion",
          "Family details — parents' names and occupations, siblings, family type and native place",
          "Education and career — highest qualification, occupation, and company",
          "Contact details — phone number and city, kept near the bottom",
        ],
      },
      { type: "heading", text: "Formatting tips that make it look clean" },
      {
        type: "list",
        items: [
          "Keep it to one page — a biodata that runs long is harder to read on a phone and harder to forward",
          "Pick one simple font and stick to it; mixing two or three makes a document look unfinished",
          "Line up labels and values in a table or two-column layout so the page reads evenly, not staggered",
          "Leave a little breathing room between sections instead of packing everything edge to edge",
          "Save it as a PDF before sending — a Word file can shift its formatting depending on whose computer opens it",
        ],
      },
      { type: "heading", text: "A faster way to get the same result" },
      {
        type: "paragraph",
        text: "This is exactly the structure the biodata builder above already follows — you fill in each section once, and it lays everything out for you across eight different border designs, so there's no fiddling with tables, fonts, or margins by hand. It's free to build and download with a small watermark, and a one-time ₹51 payment removes it if you'd rather share a clean copy.",
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
