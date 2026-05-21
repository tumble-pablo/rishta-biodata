# Rishta Biodata — Design Language

A small set of choices, applied with religious consistency, with **one place to break the rules**.

---

## 1. Philosophy

**Confident minimalism.**

- White space is a premium material, not empty real estate.
- Every pixel earns its place. No decorative chrome, no shadows on UI, no borders unless functional.
- The product is the prose; the visual job is to get out of the way — *except* for one moment of beauty.
- Trust > novelty. The work should feel timeless, not trendy.

---

## 2. Information Hierarchy

Every section follows the narrative arc:

> **Eyebrow → Promise → Proof → Action**

- **Eyebrow** — a small credibility cue (a number, a date, a quiet detail)
- **Promise** — the value, not the feature, in plain language
- **Proof** — who already trusts us / what we've already done
- **Action** — one decision, no friction

This is a narrative structure, not a feature dump.

---

## 3. Typography

**Voice through type.**

- One serif for warmth + one sans for clarity. No third typeface.
- Headlines are large and confident. Tight tracking, tight leading on display sizes.
- The headline can carry 2–3 full sentences — use a **two-tone fade** (dark → muted) to make it read as a paragraph, not a wall.
- No italics, no underlines, no decorative weights. Just **regular + medium + bold**.
- Body copy is generous: 17–19px, 1.6 line height, max ~65 characters per line.

### Type scale
| Role        | Size (desktop) | Weight   | Notes                          |
|-------------|----------------|----------|--------------------------------|
| Display     | 80–96px        | 600      | Headline, two-tone treatment   |
| H1          | 56px           | 600      | Section opener                 |
| H2          | 40px           | 600      | Section heading                |
| H3          | 28px           | 500      | Subsection                     |
| Body large  | 19px           | 400      | Lead paragraphs                |
| Body        | 17px           | 400      | Default                        |
| Eyebrow     | 13px           | 500      | Uppercase or sentence case     |
| Caption     | 13px           | 400      | Muted                          |

---

## 4. Color

**One brand color. One moment of joy.**

- The whole site is essentially **dark text + muted text + white**.
- The accent color is reserved for **actions and links** — never decorative.
- Greyscale everything else (logos, illustrations, icons) so the accent never has to compete.

### Palette
| Token              | Hex        | Use                                  |
|--------------------|------------|--------------------------------------|
| `--ink`            | `#0A2540`  | Primary text                         |
| `--ink-muted`      | `#6C7793`  | Secondary text, two-tone fade        |
| `--accent`         | `#9A3324`  | CTAs, links — *the* brand color      |
| `--surface`        | `#FFFFFF`  | Base background                      |
| `--surface-warm`   | `#FAF6F2`  | Optional soft section break          |
| `--border`         | `#E8E4DE`  | Hairline dividers only               |

Accent is a deep, dignified maroon — culturally resonant for the wedding context without being a cliché. Saffron, gold, or rose-gold are valid alternatives but **pick one and commit**.

---

## 5. The One Moment of Joy

Every great minimal design has **one element allowed to be beautiful**. Pick one and don't dilute it elsewhere:

- A flowing organic gradient (warm pastels: rose → saffron → gold)
- A single elegant illustration (line art, no fills)
- A typographic flourish (an oversized letterform, a Devanagari accent)

> Beauty diluted becomes wallpaper. Use it once, where it counts most — usually the hero.

---

## 6. Layout & Rhythm

- **12-column grid**, max content width ~1280px.
- **Vertical rhythm in multiples of 8px.** All spacing snaps to this scale.
- **Asymmetric splits** (50/50 or 60/40) are preferred over centered layouts for hero/feature sections.
- Sections breathe: **120–160px of vertical padding** between major sections on desktop.
- Content can be slightly off-center within its column (optical alignment > mathematical alignment).

---

## 7. Motion & Interaction

- **Slow, ambient, never attention-seeking.** Motion suggests sophistication, not flair.
- Hover states: color shift only. No scale, no shadow, no bounce.
- Page transitions: fade or simple slide, 200–300ms, ease-out.
- Decorative animation (e.g. a gradient drift) should loop seamlessly and be ignorable.

---

## 8. Navigation

**Verbs and nouns only.** No marketing fluff.

- Logo + 3–5 nav items + 2 CTAs (one outline, one filled).
- Symmetric CTA weight signals clear hierarchy: secondary action outlined, primary action filled.
- No "Discover", "Explore", or "Why us". Use the actual destination.

---

## 9. Imagery

- **No stock photos.** Ever.
- **No 3D renders, no cartoon illustrations, no AI-generated art that looks AI-generated.**
- If photography is used: real, warm, documentary-style — never staged.
- If illustration is used: hand-drawn line art or a single signature gradient. Pick one and stay consistent.

---

## 10. What We Deliberately Avoid

A design language is defined as much by what it **refuses** as by what it allows.

- No dark mode in marketing (white = clarity = trust).
- No glassmorphism, neumorphism, or "AI shimmer" effects.
- No countdown timers, popups, or "limited time" urgency.
- No emoji, no exclamation marks in product copy.
- No badges ("New!", "Beta") cluttering the hero.
- No drop shadows on UI cards. Use borders or background tint instead.
- No gradient text (the gradient is reserved for the one moment of joy).
- No more than one accent color. Ever.

---

## 11. Voice & Copy

The visual language extends to the words.

- Plain language. No jargon. No buzzwords.
- Short sentences. Active voice.
- Specific over abstract: "Built in 90 seconds" beats "Lightning fast".
- Cultural warmth without kitsch: lean on craft and tradition, never on stereotype.
- Numbers earn trust — use them where you have them.

---

## 12. The Core Rule

> Pick a small set of choices. Apply them with discipline. Allow yourself **one** place to break the rules.

That one place is where the brand lives. Everywhere else, get out of the way.
