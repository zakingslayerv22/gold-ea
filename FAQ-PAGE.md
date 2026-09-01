# FAQ Page — Desktop Implementation

**Date:** 1 September 2026
**Scope:** desktop only. The mobile and tablet passes are deliberately not
started — no mobile-specific CSS or interpretation has been added.

**Reference mockups**

- `mockups/desktop/pages/01-faq-desktop.png` (1920 × 8978)
- `mockups/desktop/pages/02-faq-answers-not-found-desktop.png` (1920 × 1207)

---

## What was implemented

The FAQ page body was replaced to match the desktop mockup. The site shell
was left exactly as it was: the dismissible announcement bar, the site
header (logo, siteName, navigation, hamburger), the language/translation
system, the footer and the live chat widget are all untouched, as is the
Back to Homepage control, which stays below the support card.

New files:

| File | Role |
| ---- | ---- |
| `assets/scripts/faq-page-content.js` | **Data only.** 8 categories, 72 questions and answers. No DOM, no markup. |
| `assets/scripts/faq-page.js` | **Interface only.** Renders and drives the page from that data. |

Changed files:

| File | Change |
| ---- | ------ |
| `frequently-asked-questions.html` | `<main>` replaced with structural containers. Shell untouched. |
| `assets/styles/styles.css` | New section 22, appended. No existing rule modified. |
| `assets/scripts/main.js` | Two lines: an import, and a guarded `initFaqPage({…})` call. |

`main.js` passes the configuration it already owns — `siteName`,
`siteOwner`, `eaCurrentVersion`, `telegramPersonal`, `telegramChannel` —
into the FAQ controller, so nothing is duplicated and no second source of
configuration exists.

---

## FAQ data architecture

`faq-page-content.js` exports a plain array:

```js
export const faqPageContent = [
    {
        id: "getting-started",       // stable slug
        name: "Getting Started",
        icon: "rocket",              // names a key in the ICONS map in faq-page.js
        questions: [
            { id: "what-is-goldtrap", question: "…", answer: "…" }
        ]
    }
];

export const faqPopularQuestionIds = ["pricing-licensing/direct-license-vs-free-access", …];
```

Properties this gives:

- **Category and question ids are stable slugs**, used for element ids,
  `aria-controls` wiring and the popular list.
- **Content is separate from presentation** — the data file contains no
  markup, and the icons live in the controller.
- **Adding a question means editing the data file only.** The HTML has no
  question, answer or count in it — verified by a test that greps the
  served HTML for answer text.
- **Every number is derived**: the hero's "72 answers about …", the
  "N questions" line, and each category's badge are all counted at runtime.
- Product names use the site's existing `{siteName}`, `{siteOwner}` and
  `{eaVersion}` tokens, substituted from the global configuration.

Counts as rendered: Getting Started 7, Pricing & Licensing 10, Brokers &
Accounts 11, Capital & Risk 9, Strategy & Performance 9, Setup &
Installation 11, VPS & Running 24/5 7, Troubleshooting & Support 8 —
**72 total**, matching every badge in the mockup.

---

## Search behaviour

Live: results update on every keystroke from the `input` event. There is no
submit button, and both search forms call `preventDefault()` so Enter never
reloads the page.

- **Case-insensitive and whitespace-tolerant.** Both the query and the
  searchable text are lower-cased with runs of whitespace collapsed, so
  `"  MT5 "` matches `mt5`.
- **Searches question text, answer text and category name.** Each
  question's searchable string is built once at start-up, so typing never
  re-processes the corpus.
- **Combines with the category filter.** With All selected the search spans
  every category; with a category selected it is scoped to that category.
- **Category counts recompute against the query** — during a search every
  badge shows how many of that category's questions match, which is why the
  no-results mockup shows every badge at 0.
- **Clearing** (the × in the field, or "Clear search" in the no-results
  card) empties the query, restores the selected category's questions and
  returns focus to the main field.

---

## Category behaviour

Pills are rendered from the data, All first. The active pill takes the
site's established gold fill with near-black text; inactive pills use the
established dark surface and turn white on hover and on keyboard focus.
Exactly one is active at a time, tracked with `aria-pressed`.

---

## Accordion behaviour

Each question is a real `<button>` inside an `<h3>`, with `aria-expanded`,
`aria-controls` pointing at a `role="region"` panel that is `hidden` when
collapsed and labelled back by `aria-labelledby`. The chevron rotates 180°
when open.

Clicking a question opens it; clicking it again closes it; opening another
closes the previous one — **only one answer is open at a time.**

**One documented exception:** the mockup shows an "Expand all" control above
the list, which cannot coexist with a strict single-open rule. It is
implemented as the mockup shows, as an explicit bulk action that toggles to
"Collapse all". Clicking any individual question afterwards collapses
everything and returns to single-open behaviour. If you would rather the
brief's single-open rule hold absolutely, deleting the `#faq-expand-all`
button from the HTML is sufficient — the controller already guards for it
being absent.

---

## Sticky navigation behaviour

The category bar is `position: sticky; top: 0` with a blurred translucent
background. The site header is static rather than fixed, so there is
nothing to offset against and no second navigation is introduced — these
are filters, not links.

---

## Sticky Search behaviour

1. While the hero search field is on screen, the compact Search button is
   `hidden` — there is no point offering a second search beside the first.
2. An `IntersectionObserver` on the hero field reveals the button once that
   field scrolls away, and hides it again when it returns.
3. Clicking it expands a compact field and moves focus straight into it,
   with `preventScroll: true`.
4. **The page does not move.** The compact panel is absolutely positioned
   against the sticky bar rather than being an extra row inside it, so
   opening it changes the document height by nothing at all — verified by a
   test asserting both `scrollY` and `scrollHeight` are unchanged. This was
   a real defect found during testing: as a flow item it grew the bar by
   66px and pushed the list down under the reader.
5. Typing filters live and keeps the two fields in sync.
6. Escape or the × closes it and restores focus to the Search button.
7. Focus is never trapped.

A `/` shortcut focuses whichever search is currently appropriate, matching
the hint chip shown in the field. It is ignored while the visitor is typing
in any input, textarea, select or contenteditable.

---

## No-results behaviour

When a query matches nothing, the list and the count/expand row are hidden
and the no-results card appears: magnifier, "No answers found", and

> We couldn't find anything matching **"…"**. Try a different keyword or ask
> us directly.

The quoted term is the visitor's actual query, read from state — nothing is
hard-coded. Two actions follow, as in the mockup: "Clear search" (dark) and
"Ask on Telegram" (gold), the latter using the configured Telegram link.

---

## Accessibility decisions

- Real `<button>` elements throughout — no click handlers on generic divs.
- Accordion: `aria-expanded`, `aria-controls`, `role="region"`,
  `aria-labelledby`, and `hidden` panels so collapsed answers are out of
  the accessibility tree and the tab order.
- Both search fields have visually-hidden `<label>`s; the forms carry
  `role="search"` and an `aria-label`.
- The result count is `aria-live="polite"`, so filtering is announced.
- Category pills use `aria-pressed`; the sticky Search button uses
  `aria-expanded` and `aria-controls`.
- Focus moves into the compact search on open and back to its button on
  close; focus is never trapped.
- The search wrapper takes the focus ring (`:focus-within`) so the ring
  surrounds the whole control rather than the bare input.
- Decorative SVGs are `aria-hidden`; the `/` hint is `aria-hidden` since it
  is a mouse/keyboard affordance rather than content.
- Answers use `overflow-wrap: anywhere` and `min-width: 0`, so long
  translated strings wrap instead of widening the layout.

---

## Measurements taken from the mockup

| | Mockup | Built |
| --- | --- | --- |
| Content column | x 510, 900px wide | x 510, 900px |
| Hero search field | x 600, 720 × 65 | x 600, 720 × 66 |
| Category bar | wraps within ~1040px | 1040px |
| Category pill height | 53px | 52px |
| Question card | 900 × 77, 14px radius | 900 × 77, 14px radius |
| Card gap | 16px | 16px |
| Card border | #222224 | #222223 (`--rule`) |
| Category icon disc | 38px | 38px |
| Hero H1 cap height | 44px (≈63px type) | 63px type |
| lead → search | 45px | 45px |
| search → "Popular:" | 30px | 30px |
| nav → toolbar | 91px | 91px |
| toolbar → category heading | 38px | 38px |
| heading → first card | 30px | 30px |

Widths are max-widths on centred columns and every list wraps on its own,
so the later mobile and tablet passes adapt this structure rather than
replacing it. No fixed heights were used for content.

---

## Testing performed

All of the following were actually run against the built page in Chromium
at 1920 × 1080 unless stated otherwise. **52 checks, 0 failures.**

Page and data: loads with no console errors; all 9 pills render; every
category count matches the mockup; All is active by default; the hero count
is derived and uses `siteName`; All renders 72 questions; the count line
agrees; each of the 8 categories filters to its own count with exactly one
pill active.

Accordion: opens (class, `aria-expanded`, panel `hidden`); closes on a
second click; opening another closes the previous, leaving exactly one
open; opens from the keyboard with Enter; ARIA wiring resolves
(`aria-controls` finds the panel, `aria-labelledby` points back).

Search: live without a submit; case-insensitive (`MT5` = `mt5`, 11 results
each); whitespace-tolerant; finds question-only text; finds answer-only
text ("Strategy Tester"); finds category names; counts recompute during a
search; category + search combine and scope to one category.

No results: state appears; the quoted term is the actual query; every
badge reads 0; "Clear search" restores all 72 and empties the field.

Sticky: the bar computes `position: sticky`; the Search button is hidden at
rest and appears after scrolling away; the compact search opens and takes
focus; **`scrollY` and `scrollHeight` are both unchanged when it opens**;
typing in it filters and syncs the main field; Escape closes it and
restores focus to the button; the × closes it.

Other: Expand all opens all 72 and relabels to Collapse all, and back; the
`/` shortcut focuses the search; 6 popular chips render; both Telegram
buttons carry the configured link; Back to Homepage points at `index.html`
and sits after the support card; the shell is intact (announcement bar,
header, 5 nav links, language selector, footer, 68px chat launcher); no
horizontal overflow; scroll reveal participates (19 elements, firing); and
no question or answer text appears in the served HTML.

**Translation (§23):** run against the real Google Translate engine at
1920, 1440, 920 and 390px, English → French → Portuguese → English at each.
**No horizontal overflow in any state**, `visualViewport.scale` unchanged at
1, all 72 questions still rendered, and the content genuinely translated
("Qu'est-ce que GOLDTRAP EA…", "O que é o GOLDTRAP EA…"). The iOS
zoom fix is intact — the search field measures 16px. One first-pass miss at
920px was the harness failing to warm Google's engine in time, not the
page; re-running that width passed all five of its checks.

**Reduced motion (§22):** with `prefers-reduced-motion: reduce` the reveal
transition is off, opacity is 1 and the transform is `none`, so all 72
questions are visible immediately; the chevron transition is effectively
instant. The new content uses the site's established `.scroll-reveal`
class, so no separate animation system was introduced.

**Homepage regression (§29):** rendered full-page against the previous
`styles.css` and `main.js` — **0 differing pixels** at 1920, 1440, 920 and
390px.

---

## Decisions worth reviewing

**1. The mockup's top strip was not implemented.** The mockup opens with a
slim bar carrying "← Back to GoldTrap" on the left and a "Support" pill on
the right. That slot is already occupied on the real page by the
announcement bar and the site header, which the brief says to preserve, and
adding it would put a second back-control and a second navigation above the
existing one. Both of its functions are already present: Back to Homepage
below the support card, and Contact Support in the support card. Say the
word if you want it added anyway.

**2. "Expand all" versus one-answer-at-a-time.** Described under *Accordion
behaviour* above.

**3. Answer content.** The mockup shows all 72 questions collapsed, so it
supplies the question wording but no answers. The 24 established answers in
`faq-index-page.js` were carried across wherever they genuinely answer one
of the mockup's questions. **The remaining answers were written for this
pass**, strictly from what the site already states: the pricing tiers and
their account allowances, the Free Access IB route, USDT payment through
the purchase dialog, the .ex4/.ex5 builds and the Experts folder, the
WebRequest whitelist, the 50K presets at 1:500 and 1:2000, the straddle /
basket / grid-recovery description, the daily profit target, the rollover
pause, the spread and session guards, the source-code licence, and Telegram
support with `{siteOwner}`. Where a question asks something the site does
not establish — "Which VPS do you recommend?", exact capital figures — the
answer gives the requirement and points to Telegram rather than inventing a
specific. **These answers are new copy and should be reviewed before the
page goes live.**

---

## Known limitations

1. **Desktop only, by instruction.** No mobile or tablet rules were added.
   The existing responsive breakpoints do not target any of the new
   classes, so the page currently renders its desktop layout at every
   width. That is the next stage.
2. **The homepage FAQ section is unchanged.** It still renders from
   `faq-index-page.js` through `initFaq()` in `main.js`. There are now two
   FAQ datasets: the 24-question homepage set and this 72-question page
   set. Consolidating them was outside this brief; if you want the homepage
   to draw from `faq-page-content.js` too, that is a small follow-up.
3. **The `/` keyboard hint** is a desktop affordance and will be reviewed in
   the mobile pass.
