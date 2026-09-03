# FAQ Page — Desktop Implementation

**Date:** 3 September 2026
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

`faq-page-content.js` is the single source of truth for every FAQ on the
site — this page and the homepage section both read from it. This page
renders the `faqPageContent` array and only that:

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

## Bug-fix pass — 1 September 2026

Two functional bugs were reported after the first pass. Both turned out to
have **one root cause**.

### Reported

1. **Search appeared not to work.** Typing a query left a large blank area
   instead of results.
2. **Popular questions did not open.** Clicking a chip selected the category
   and scrolled, but no answer appeared.

### Root cause

`.faq-group` sections carry the site's `scroll-reveal` class, whose starting
state is `opacity: 0; transform: translateY(30px)`. `initScrollReveal()` in
`main.js` builds its `IntersectionObserver` **once at page load and observes
only the elements that exist at that moment**.

Every search keystroke, category change and popular-question click replaces
`#faq-page-results`' innerHTML. The new sections were `.scroll-reveal` but
were never handed to the observer, so they stayed at `opacity: 0`
**permanently — scrolling did not help.**

Measured before the fix, searching `broker`:

| | |
| --- | --- |
| Questions matched and rendered into the DOM | 29 |
| `.faq-group` sections carrying `is-visible` | **0 of 8** |
| Section opacity at scrollY 0 / 900 / 1400 / 2000 | **0 at every position** |
| Height of the invisible results column | **3496px** |

So the filtering was correct all along — the results were rendered,
counted, and completely invisible. That 3496px of empty column is the
"large blank area". The popular-question click had the same cause: the
target answer was open in the DOM (`hidden` false, 101px tall, inside the
viewport) inside a section at `opacity: 0`.

This also explains why the first pass's tests missed it: they asserted on
`document.querySelectorAll('.faq-question').length`, which counts elements
that are rendered but invisible. **Every check in this pass asserts on what
is actually visible** — computed opacity and measured height — not on DOM
presence.

### Fix

**`main.js`** — the reveal system now accepts nodes rendered after load. The
observer and the stagger-index helper were lifted to module scope and a new
`observeReveal(scope)` registers late-arriving `.scroll-reveal` elements. It
is safe to call repeatedly, skips elements already revealed, and falls back
to showing them immediately where `IntersectionObserver` is unavailable.
`initScrollReveal()` itself behaves exactly as before. The hook is passed
into `initFaqPage({ …, observeReveal })`.

**`faq-page.js`** — after every render the new sections are registered with
that observer, and:

- **The first render is left to animate in on scroll**, exactly as before —
  it is part of the page the visitor is arriving at.
- **Every later render is revealed immediately.** A list redrawn in response
  to a keystroke, a category or a shortcut is the answer to something the
  visitor just did; making them scroll to reveal it is what the bug looked
  like in the first place.
- The popular-question handler additionally reveals the target's section
  before the smooth scroll starts, so the answer is guaranteed visible when
  the scroll lands rather than depending on observer timing.

No CSS changed, and no visual design changed.

### Two related state fixes

- **§10** — an open answer that still matches after the query changes now
  stays open; one that no longer matches is closed, so no key points at a
  removed element.
- **§11** — changing category keeps an open answer only if it belongs to the
  newly selected category, otherwise closes it.

### Accordion behaviour confirmed

Clicking a question opens it; clicking the same one closes it; clicking
another closes the previous and opens the new; **clicking outside the FAQ
does not close it**; **clicking unrelated page content does not close it**;
**scrolling does not close it**; only one answer is open at a time. There
is no outside-click or scroll handler bound to the accordion — this was
verified by test rather than assumed. The same rules hold for search
results, category changes and popular-question shortcuts.

### Testing performed in this pass

**44 checks, 0 failures**, all asserting on visible state.

- **Search on 12 real terms taken from the FAQ data** — `mt5`, `MT5`, `Mt5`,
  `"  mt5  "`, `broker`, `refund`, `martingale`, `leverag` (partial),
  `Strategy Tester` (answer-only), `Troubleshooting` (category name),
  `XAUUSD`, `whitelist` — each returning visible results, with the visible
  count equal to the rendered count in every case (11, 11, 11, 11, 29, 1, 1,
  11, 2, 8, 12, 6).
- Case-insensitivity and whitespace tolerance confirmed by equal counts.
- A genuinely nonexistent query shows the no-results card only, with the
  results container collapsed to **0px** and the count/expand row hidden.
- Category + search: scoped correctly; changing category re-filters with the
  query still applied; clearing restores all 72 **visible**.
- Accordion: all eight behaviours above, including the click-outside,
  click-unrelated and scroll cases.
- Search results behave as normal accordion items, and the opened answer is
  genuinely visible (126px tall, section opacity 1).
- **All six popular chips** individually: correct category becomes active,
  the correct question opens, the section is at opacity 1, the answer is not
  hidden and is 101–152px tall, it is inside the viewport, and exactly one
  question is open.
- No console or page errors after load, searching, clearing, category
  changes, accordion use or popular clicks.
- Regression: the original 52-check desktop suite still passes; the shell,
  sticky bar, sticky Search button and compact search all still work.

**Homepage regression** (required because `main.js` is shared): full-page
renders against the previous `main.js` and `styles.css` — **0 differing
pixels** at 1920, 1440, 920 and 390px.

---

## No-results state bug — 1 September 2026

### Reported

Searching a term that *does* match — `recomm` — showed the matching results
**and** the "No answers found" card underneath them at the same time.

### Root cause

Not the search, and not the state logic: the controller's `hidden` flags
were correct in every case. The cause was **CSS specificity**.

Browsers implement the `hidden` attribute as `[hidden] { display: none }`
in the user-agent stylesheet. That selector has specificity (0,1,0), so
**any class rule that sets `display` silently defeats it.** Four FAQ
components did exactly that:

| Element | Rule | `hidden` honoured? |
| ------- | ---- | ------------------ |
| `#faq-no-results` | `.faq-no-results { display: flex }` | **No — always rendered** |
| `#faq-page-toolbar` | `.faq-page__toolbar { display: flex }` | **No** |
| `#faq-sticky-search-toggle` | `.faq-sticky-search-button { display: inline-flex }` | **No** |
| `#faq-search-clear` | `.faq-search__clear { display: inline-flex }` | **No** |

Measured on a fresh load with all 72 questions showing: `#faq-no-results`
had `hidden === true` and `display: flex`, occupying 334px. It had been
rendering the entire time — the reported search merely made it obvious.

The same measurement explained two things dismissed as screenshot
artefacts in the first pass: the sticky Search pill visible at rest, and
the × clear button visible beside the `/` hint. Both were real, and both
were this bug.

Elements *without* a class-level `display` — the results container, the
popular block, the expand-all button, the sticky search panel and the
answer panels — honoured `hidden` correctly all along, which is why only
some things misbehaved.

Two older components had already been patched individually further down
the stylesheet (`.action-bar[hidden]`, `.lang-select__panel[hidden]`).
Per-component opt-outs are precisely the fragile pattern that let this
through.

### Fix

**`styles.css`** — one authoritative rule in the reset layer:

```css
[hidden] {
    display: none !important;
}
```

This fixes the actual cause for every component, present and future,
rather than patching four of them and waiting for the fifth. It cannot
make anything visible that was previously hidden — it can only make
`hidden` work.

**`faq-page.js`** — `renderResults()` was restructured so the two states
are mutually exclusive *by construction* rather than by three independent
assignments:

```js
const groups = visibleGroups();          // the one filtered collection
const hasResults = shown > 0;

if (hasResults) {  render list; toolbar shown; no-results hidden;  }
else            {  results.replaceChildren(); results hidden;
                   toolbar hidden; no-results shown;  }
```

There is deliberately no separate "showNoResults" flag that could drift
out of step. The empty branch also **empties** the container rather than
only hiding it, so a stale question could not sit above the card even if
the element were ever styled to ignore `hidden` again.

### Note on the earlier passes' testing

The first pass asserted on `element.hidden` — the property — which was
always correct, and on `querySelectorAll(...).length`, which counts
invisible elements. Both are why two suites passed over a page that did
not work. **Every assertion in this pass reads computed `display`,
computed `opacity` and measured height.**

### Testing performed

**27 checks, 0 failures**, all measured from rendered output.

- **State 1 — no query:** all 72 rendered, no-results not rendered,
  clear button not rendered, sticky Search button not rendered. (On a
  fresh load the list is still behind the site's scroll-reveal — the first
  group sits below the fold — so this also verifies scrolling reveals it.)
- **State 2 — matching query:** `recomm` (3 results) plus `mt5` (11),
  `broker` (29), `vps` (13), `license` (30), `preset` (17), `Telegram`
  (17), `XAUUSD` (12) — results shown, **no-results never rendered**.
- **State 3 — zero matches:** no-results rendered, results container
  collapsed to **0px**, toolbar not rendered, the visitor's actual query
  quoted.
- **State 4 — zero → matching:** results appear, no-results disappears.
- **State 5 — matching → zero:** results disappear, no-results appears.
- **State 6 — cleared:** normal content returns; the hidden no-results
  card leaves **0px** of ghost space.
- **State 7 — every category:** all 9 categories × 5 queries
  (`""`, `a`, `license`, `xyzzy123nonexistent`, `recomm`) = **45
  combinations**, each holding the invariant.
- **Rapid typing:** the invariant asserted after every one of the 14
  keystrokes of "recommendation".
- No console or page errors.

**Regression:** the 44-check bug-fix suite and the original 52-check
desktop suite both still pass.

**Homepage** (required — the `[hidden]` rule is global): the announcement
bar still shows and dismisses, the language panel opens and closes and
lists languages, the homepage FAQ accordion still opens with correct ARIA,
the purchase dialog still opens, and the configured-hidden pricing timer
still reserves its row (`display: flex; visibility: hidden`, 24px) as
CLAUDE.md §9.4 requires — that uses a class, not the `hidden` attribute,
so the new rule does not touch it. 10 checks, 0 failures, and full-page
renders against the previous stylesheet and script show **0 differing
pixels** at 1920, 1440, 920 and 390px.

---

## Single source of truth — 1 September 2026

### Brief

`faq-page-content.js` becomes the one place FAQ content lives.
`faq-index-page.js` keeps driving the homepage FAQ section but must hold no
copy of any question or answer — it references the central database by
stable id instead. The homepage's content, styling, layout, interactions,
category behaviour, Browse All Questions button, animations and responsive
behaviour all stay exactly as they are.

### What the two files are now

| file | role |
| --- | --- |
| `assets/scripts/faq-page-content.js` | **The canonical FAQ database — all FAQ text on the site.** Two collections: `faqPageContent` (8 categories, 72 entries, rendered by the FAQ page) and `homepageFaqContent` (the 24 approved homepage entries). Plus the popular-question list and the lookup helpers. Data only — no markup, no DOM, no presentation. |
| `assets/scripts/faq-index-page.js` | **The homepage FAQ service.** No FAQ text at all. It declares the homepage's four filter pills and, for each, an ordered list of *references* into the database. It resolves them on demand and hands `main.js` the exact shape it has always consumed. |

```
        faq-page-content.js
                 |
        ┌────────┴──────────────┐
        |                       |
  faqPageContent          homepageFaqContent
   (72 entries)              (24 entries)
        |                       |
        ▼                       ▼
   full FAQ page        faq-index-page.js   (selection + order only)
   (faq-page.js)                |
                             homepage  (main.js initFaq)
```

### Why two collections rather than one

The first attempt at this pass mapped each of the 24 homepage slots onto
the *closest* entry in the 72-question set. That satisfied "one source of
truth" but rewrote the homepage: 23 of 24 questions and 22 of 24 answers
changed wording, and two slots had no counterpart at all. **That was
rejected, and rightly — the homepage set is approved content, and this pass
was about where content lives, not what it says.** The 24 originals now
live in `faq-page-content.js` verbatim, as their own collection.

Keeping them as a separate collection rather than merging them into the
eight categories is deliberate:

- **The FAQ page stays exact.** `faq-page.js` renders `faqPageContent` and
  only that, so the hero's "72 answers", the "N questions" line and every
  category badge still match the mockup. Merging would have pushed the
  total to 96 and broken every badge.
- **No near-duplicates on the FAQ page.** Ten of the homepage questions ask
  roughly what an FAQ-page question asks, in shorter words. Merged, the
  page would list both.
- **The two sets were approved separately** and read differently on
  purpose: the homepage copy is short and introductory, the FAQ page copy
  is longer and more detailed. Independent entries mean editing one never
  silently rewrites the other.

Two homepage answers happen to be byte-identical to their FAQ-page
counterpart (`homepage/what-is-goldtrap`, `homepage/what-strategy`), and one
question is (`homepage/what-leverage`). They are stored independently
anyway — deliberately, so an edit on one page cannot leak onto the other.
This is noted in the file.

### Lookup helpers added to the database

```js
getCategoryById(categoryId)               // any collection, or null
getQuestionById(categoryId, questionId)   // one question, or null
getQuestionByRef("<categoryId>/<questionId>")  // { category, question } | null
getHomepageQuestions()                    // the 24, in file order, each with .ref
getAllQuestions()                         // the FAQ page's 72, each with .ref
getQuestionCount()                        // 72 — the FAQ page total
```

A **ref** is the stable string `"<categoryId>/<questionId>"` —
`"getting-started/mt4-or-mt5"` for an FAQ-page entry,
`"homepage/which-pair"` for a homepage one. Both halves are the slugs
already used for element ids and `aria-controls`, so there is no second id
scheme to maintain. `getAllQuestions()` and `getQuestionCount()` describe
the FAQ page only, because they back its hero total and badges.

### How the homepage selects its questions

```js
const homepageFaqSections = [
    {
        id: "basics",
        name: "Basics",
        questionRefs: [
            "homepage/what-is-goldtrap",
            "homepage/who-is-it-for",
            …
        ]
    },
    …
];
```

`FaqServiceHomepage` resolves those refs and returns
`{ name, questions: { <id>: { q, a } } }` — the shape `main.js` already
renders — so **the homepage renderer, markup and CSS were not touched**.
Public methods: `getFaqData()`, `getCategory(id)`, `getCategoryList()`,
`getFeaturedQuestions()`, `getUnresolvedRefs()`.

A ref may point at either collection, so a slot can be filled with an
FAQ-page entry if you ever want that. A ref that no longer resolves is
skipped rather than thrown, so renaming an id degrades to one missing card
instead of an empty section. `getUnresolvedRefs()` lists any such refs and
currently returns `[]`.

The pill names (`Basics`, `Account & Broker`, `Capital & Risk`,
`Setup & Help`) are homepage presentation, not content — they are the
headings the homepage mockup shows, which is why they differ from the FAQ
page's eight category names.

### How to add a new FAQ

1. Decide which collection it belongs to in `faq-page-content.js`:
   - **`faqPageContent`** for a question on the full FAQ page. It appears
     immediately, and the hero total, the "N questions" line, the category
     badges and the search index all follow automatically.
   - **`homepageFaqContent`** for a question written specifically for the
     homepage.
2. **Only if the homepage should show it**, add its ref to one of the four
   sections in `faq-index-page.js`.

Never add question or answer text to `faq-index-page.js`, to `main.js`, or
to either HTML file.

### How to change what the homepage features

Edit the `questionRefs` arrays in `faq-index-page.js`. The array order is
the display order. The homepage shows the first `data-faq-limit` entries of
the selected section (see `index.html`), so a section may safely list more
than it displays. Changing the *wording* of a featured question is done in
`faq-page-content.js` — the homepage follows.

### Verification

**The homepage is unchanged — proven three ways.**

1. **Byte comparison of the data.** The service's output was compared slot
   by slot against the pre-refactor commit: 4 sections, same names, same
   order, 24 questions and 24 answers — **0 differences**.

2. **Rendered text, pill by pill.** Playwright loaded the served homepage
   twice, once with the pre-refactor scripts injected and once with the
   working tree, clicked through all four pills and compared the rendered
   heading, every question, every answer and every open/closed state:
   **83 assertions, 0 failures**, and the same (empty, bar two offline-CDN
   aborts the harness itself causes) console output in both runs.

3. **Full-page pixel diff** against the pre-refactor commit, with the FAQ
   section *included* this time:

   | width | page height | differing pixels, whole page | differing pixels, FAQ section |
   | --- | --- | --- | --- |
   | 1920 | 7688 → 7688 | 0 | 0 |
   | 1440 | 6966 → 6966 | 0 | 0 |
   | 390 | 10883 → 10883 | 0 | 0 |

**Duplication audit** — no FAQ prose exists outside `faq-page-content.js`:

- `faq-index-page.js` contains no question or answer text; its longest
  string literal is 29 characters (a ref), and it holds 24 refs.
- Grepping `main.js`, `index.html` and `frequently-asked-questions.html` for
  answer text finds nothing.

**The FAQ page is untouched:** `getQuestionCount()` is still 72,
`faq-page.js` still imports only `faqPageContent` and
`faqPopularQuestionIds`, and the page suites pass unchanged.

**Suites re-run, all green:** FAQ desktop 52, FAQ fix pass 44, no-results
states 27, homepage 10, homepage FAQ 12, homepage pill-by-pill 83 —
**228 assertions, 0 failures**.
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
page goes live.** They apply to this page only — the homepage keeps its own
approved 24, see *Single source of truth* above.

---

## Known limitations

1. **Desktop only, by instruction.** No mobile or tablet rules were added.
   The existing responsive breakpoints do not target any of the new
   classes, so the page currently renders its desktop layout at every
   width. That is the next stage.
2. **The homepage FAQ section is fed from the same file.** It still
   renders from `faq-index-page.js` through `initFaq()` in `main.js`, but
   that file now holds only references into `faq-page-content.js`, where
   its 24 approved entries live as their own collection. See *Single source
   of truth* above for why they are not merged into the 72.
3. **The `/` keyboard hint** is a desktop affordance and will be reviewed in
   the mobile pass.

---

## FAQ Interaction Pass — 1 September 2026

Four focused changes. No redesign, no tablet work.

### 1. Site identity

`siteOwner` is now `"Richie Gold"`; `siteName` was already `"GOLDTRAP EA"`.
Both remain the single authoritative values in `main.js` — there is no
duplicate anywhere. Verified in the browser that every rendered instance
follows the config: the nav wordmark, the hero H1, the document title, the
footer copyright ("© 2026 GOLDTRAP EA by Richie Gold") and the live-chat
hover label ("Chat with Richie Gold"). Two stylesheet comments that quoted
the old owner as an example were updated so they do not mislead.

### 2. Mobile sticky search — the full-screen sheet is gone

**What was wrong.** Tapping the compact Search button opened a
`position: fixed; inset: 0` sheet over the whole page. The FAQ list sat
behind it, so a visitor could type a query and see nothing until they closed
the search again. Search is only useful while its results are visible.

**What it does now.** The panel keeps the desktop implementation —
`position: absolute; top: 100%` on the sticky bar — so it expands as one
compact row directly beneath the category rail. The mobile-only sheet rules
were deleted rather than duplicated; both viewports now share one panel.

Measured at 390 × 844: the open panel covers **under 25% of the viewport**,
the results container stays visible below it, and the FAQ list live-filters
as the visitor types. Verified:

- the input receives focus on open (`preventScroll`, so the page does not
  move — measured 0px of scroll change);
- the current query is carried into the compact field and back out;
- typing filters immediately while the panel stays open, and matching
  questions are on screen and readable;
- changing the query updates the results without closing anything;
- **scrolling the results does not close the search**;
- Escape closes it, focus returns to the Search button, and the results
  state and query survive;
- reopening restores the query;
- no horizontal overflow.

The `backdrop-filter: none` on the mobile sticky bar stays: it was added
because a `backdrop-filter` makes an element a containing block for
fixed-position descendants, and although the panel is no longer fixed, a
solid background is cheaper for a phone to paint.

### 3. Desktop category click now scrolls the content into view

**What was wrong.** With the rail pinned halfway down a long page, clicking
a category changed the active chip and nothing else. The heading and its
questions stayed wherever they were, usually far above the fold, so the
click appeared to do nothing.

**What it does now.** `revealActiveCategoryContent()` scrolls the chosen
category's `.faq-group` into view with `block: "start"`. It is deliberately
separate from `revealActiveChip()`, which moves the horizontal rail with
`block: "nearest"` so the chip itself is visible — **two different scroll
concerns, and conflating them is what makes a rail scroll the page.**

It only scrolls when the target is not already comfortably in view, so
clicking a category while reading the top of the page does not throw the
visitor down past the hero.

### 4. Sticky offset — and a bug it exposed

The landing position comes from `scroll-margin-top` on `.faq-group`, never
from an offset in the scroll call. That margin is
`calc(var(--faq-sticky-offset) + 16px)`, and `--faq-sticky-offset` is the
existing `--sticky-offset` (site chrome) **plus the FAQ category rail**,
written by `updateFaqStickyOffset()` in `main.js`. Pages without a rail fall
back to `--sticky-offset`.

**The rail changes height as you scroll.** Its compact Search button appears
once the hero search leaves the viewport, which on desktop pushes the chips
onto another row: the rail is **148px at the top of the page and 199px once
pinned**. Measuring it once at load left every scrolled-to heading 35px
underneath the chips. The bar, the header and the rail are now all watched
by a `ResizeObserver`, so the offset follows the rail growing, the
announcement bar being dismissed, and the text wrapping.

That bug was also silently affecting the **deep-link landings** from the
previous pass — a copied question link landed under the rail. Two test
assertions that only checked "on screen" have been tightened to require the
target to clear the rail, and both now pass.

Verified with the announcement bar visible and dismissed, on three
categories each: the category becomes active, its heading lands **below**
the rail, the heading and its first questions are on screen, and the page
never jumps to the top.

### 5. Homepage FAQ starts collapsed

`openFirstFaqItem()` is gone — the helper as well as its two call sites, so
no dead code remains. On load and on every category change, every question
is closed and every trigger has `aria-expanded="false"`.

Interaction after load is unchanged: click A opens A, click A again closes
A, click B closes A and opens B, and clicking anywhere else leaves the open
answer open.

### Not regressed

The FAQ data architecture, all FAQ text, the featured-question selection,
live search (question, answer and category matching), the mutually exclusive
no-results state, the popular-question behaviour, the sticky rail itself and
its chips, the announcement bar, navigation, translation and the live chat
are all untouched and re-verified.

### Verification

| suite | result |
| --- | --- |
| FAQ interaction pass (this pass) | 47 / 0 |
| Mobile FAQ (6 viewports) | 60 / 0 |
| Announcement bar + version system | 24 / 0 and 24 / 0 |
| Copy link | 23 / 0 |
| Identity strings, six languages | 83 / 0 |
| Desktop regression | 48 / 0 |
| Translation (Chromium + WebKit) | 28 / 0 |
| Interactions (dialogs, clipboard, timers) | 12 / 0 |
| FAQ page under translation | 9 / 0 |
| FAQ desktop / fix pass / no-results | 52, 44, 27 / 0 |
| Homepage / homepage FAQ / pill-by-pill | 10, 12, 83 / 0 |

**586 assertions across sixteen suites, 0 failures.** Zero console errors.

Three suite assertions were updated because they encoded behaviour this
brief deliberately changed: the homepage's first question is no longer open
on load (two suites), and a chip tap now moves the page to the category
content on purpose rather than staying put.
