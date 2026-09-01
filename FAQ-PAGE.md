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
site — this page and the homepage section both read from it. It exports a
plain array:

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
stable id instead. The homepage's styling, layout, interactions, category
behaviour, Browse All Questions button, animations and responsive behaviour
all stay as they are.

### What the two files are now

| file | role |
| --- | --- |
| `assets/scripts/faq-page-content.js` | **The canonical FAQ database.** All 8 categories, all 72 questions and answers, the popular-question list, and the lookup helpers. Data only — no markup, no DOM, no presentation. |
| `assets/scripts/faq-index-page.js` | **The homepage FAQ service.** No FAQ text at all. It declares the homepage's four filter pills and, for each, an ordered list of *references* into the database. It resolves them on demand and hands `main.js` the exact shape it has always consumed. |

```
        faq-page-content.js   (all categories, all questions, all answers)
                 |
        ┌────────┴─────────┐
        |                  |
 full FAQ page      faq-index-page.js   (selection + order only)
 (faq-page.js)              |
                        homepage  (main.js initFaq)
```

### Lookup helpers added to the database

```js
getCategoryById(categoryId)               // one category, or null
getQuestionById(categoryId, questionId)   // one question, or null
getQuestionByRef("<categoryId>/<questionId>")  // { category, question } | null
getAllQuestions()                         // flattened, each with .ref/.categoryId/.categoryName
getQuestionCount()                        // 72
```

A **ref** is the stable string `"<categoryId>/<questionId>"`, e.g.
`"vps-running/do-i-need-a-vps"`. Both halves are the slugs already used for
element ids and `aria-controls` on the FAQ page, so there is no second id
scheme to maintain.

### How the homepage selects its questions

```js
const homepageFaqSections = [
    {
        id: "basics",
        name: "Basics",
        questionRefs: [
            "getting-started/what-is-goldtrap",
            "getting-started/suitable-for-beginners",
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

A ref that no longer resolves is skipped rather than thrown, so renaming an
id in the database degrades to one missing card instead of an empty
homepage section. `getUnresolvedRefs()` lists any such refs and currently
returns `[]`.

The pill names (`Basics`, `Account & Broker`, `Capital & Risk`,
`Setup & Help`) are homepage presentation, not content — they group
canonical questions under the broader headings the homepage mockup shows,
which is why they differ from the FAQ page's eight category names.

### How to add a new FAQ

1. Add it to the right category in `faq-page-content.js`. It appears on the
   FAQ page immediately, and the hero total, the "N questions" line, the
   category badges and the search index all follow automatically.
2. **Only if it should also appear on the homepage**, add its ref to one of
   the four sections in `faq-index-page.js`.

Never add question or answer text to `faq-index-page.js`, to `main.js`, or
to either HTML file.

### How to change what the homepage features

Edit the `questionRefs` arrays in `faq-index-page.js`. The array order is
the display order. The homepage shows the first `data-faq-limit` entries of
the selected section (see `index.html`), so a section may safely list more
than it displays. Changing the wording of a featured question is done in
`faq-page-content.js` — the homepage follows.

### ⚠️ The homepage FAQ wording changed

This is the one visible consequence, and it is unavoidable given the brief:
if the text exists **only** in `faq-page-content.js`, the homepage must show
whatever that file says. Of the 24 homepage slots, only 1 question and 2
answers were already byte-identical to their canonical counterparts. Each
slot was mapped to the closest canonical entry:

**Basics**

| was | now | ref |
| --- | --- | --- |
| What is {siteName}? | What is {siteName} and what does it do? | `getting-started/what-is-goldtrap` |
| Who is {siteName} for? | Is {siteName} suitable for beginners? | `getting-started/suitable-for-beginners` |
| Can {siteName} be used on MT4 and MT5? | Does {siteName} work on MetaTrader 4 or MetaTrader 5? | `getting-started/mt4-or-mt5` |
| Can I run {siteName} on a mobile phone? | Can I run {siteName} on my phone (Android or iPhone)? | `getting-started/run-on-phone` |
| Which pair does {siteName} trade? | What do I need to get started with {siteName}? | `getting-started/what-do-i-need` |
| What strategy does {siteName} use? | How does the {siteName} strategy actually work? | `strategy-performance/how-strategy-works` |

**Account & Broker**

| was | now | ref |
| --- | --- | --- |
| Can I use {siteName} with any broker? | Which brokers can I use with {siteName}? | `brokers-accounts/which-brokers` |
| Does {siteName} work on cent and standard accounts? | Should I use a cent account or a standard account? | `brokers-accounts/cent-or-standard` |
| How many accounts does each licence cover? | What do the account tiers (such as 5 Accounts and Unlimited) mean? | `pricing-licensing/account-tiers` |
| How is my licence bound to my account? | How do I activate my license key? | `pricing-licensing/activate-license-key` |
| Can I move my licence to a different account? | How does the customer portal work, and how do I add more MT accounts? | `pricing-licensing/customer-portal` |
| What leverage should I use? | *unchanged* | `capital-risk/what-leverage` |

**Capital & Risk**

| was | now | ref |
| --- | --- | --- |
| How much capital do I need to start? | How much capital do I need to start {siteName}? | `capital-risk/how-much-capital` |
| Can {siteName} lose money? | Is any amount of capital 100% safe? | `capital-risk/is-capital-safe` |
| What risk controls are built in? | What is the biggest risk when running {siteName}? | `capital-risk/biggest-risk` |
| Does the EA use a stop loss? | Why does the EA sometimes hold floating (losing) positions instead of closing them? | `strategy-performance/floating-positions` |
| What is the daily profit target option? | How much profit can I make per day with the EA? | `strategy-performance/profit-per-day` |
| Is there a refund if I change my mind? | Do license keys expire? Do I have to pay again later? | `pricing-licensing/do-keys-expire` |

**Setup & Help**

| was | now | ref |
| --- | --- | --- |
| How do I install {siteName}? | How do I install {siteName} on MT4 or MT5? | `setup-installation/install-on-mt4-mt5` |
| Why do I need to add a URL to the MetaTrader whitelist? | The EA asks me to allow a WebRequest URL. What do I do? | `setup-installation/webrequest-prompt` |
| Where do I get my licence key? | How do I pay for the {siteName} license? | `pricing-licensing/how-do-i-pay` |
| Do I need preset .set files? | Where do I get or download the preset (.set) files? | `setup-installation/where-to-get-presets` |
| Do I need a VPS? | Do I need a VPS to run {siteName}? | `vps-running/do-i-need-a-vps` |
| How do I get support? | I just updated to a new EA version. What should I do, and how do I get support? | `troubleshooting-support/updated-version-and-support` |

Where the old homepage question had no canonical counterpart at all
("Which pair does GoldTrap EA trade?", "Is there a refund if I change my
mind?"), the slot was filled with the nearest canonical question in the same
theme rather than adding a 73rd entry to the database for the homepage's
sake. **23 of 24 questions and 22 of 24 answers now read differently from
before.** Nothing else about the section changed.

If you want a particular old wording back, the fix is in
`faq-page-content.js` — edit that entry's text and both pages update. If you
want a different question in a slot, swap its ref; the file is only a list
of ids.

### Verification

**Duplication audit** — no FAQ prose exists outside `faq-page-content.js`:

- `faq-index-page.js` contains 0 `q:` / `a:` content keys, 24 refs, and its
  longest string literal is 53 characters (a ref).
- Grepping the served `index.html` and `frequently-asked-questions.html` for
  answer text finds nothing.

**Homepage unchanged, structurally** — via Playwright against the served
page: the four pills read `Basics | Account & Broker | Capital & Risk |
Setup & Help`, one is selected at a time, each renders 6 questions in 2
columns, the first is open on load, the accordion still allows one open
answer, and Browse All Questions still navigates to
`frequently-asked-questions.html`.

**Scoped pixel regression** — the homepage was captured before and after at
1920, 1440 and 390 and diffed with the FAQ section excluded:

| width | differing pixels above the FAQ section | page height |
| --- | --- | --- |
| 1920 | 0 | 7688 → 7688 |
| 1440 | 0 | 6966 → 6966 |
| 390 | 0 | 10883 → 10910 |

Nothing outside the FAQ section moved by a pixel. Inside it, pixels differ
because the wording differs, and at 390 the column is 27px taller because
some canonical answers are longer.

**Suites re-run, all green:** FAQ desktop 52, FAQ fix pass 44, no-results
states 27, homepage 10, homepage FAQ 12 — **145 assertions, 0 failures**, no
console or page errors on either page.
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
page goes live.** (Since the *Single source of truth* pass below, they are
the copy the homepage shows too.)

---

## Known limitations

1. **Desktop only, by instruction.** No mobile or tablet rules were added.
   The existing responsive breakpoints do not target any of the new
   classes, so the page currently renders its desktop layout at every
   width. That is the next stage.
2. **The homepage FAQ section is fed from the same database.** It still
   renders from `faq-index-page.js` through `initFaq()` in `main.js`, but
   that file now holds only references into `faq-page-content.js` — see
   *Single source of truth* above, including the wording change that
   followed from it.
3. **The `/` keyboard hint** is a desktop affordance and will be reviewed in
   the mobile pass.
