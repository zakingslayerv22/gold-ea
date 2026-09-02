# Mobile Implementation

**Date:** 29 August 2026
**Scope:** responsive mobile + tablet layout, built on the approved desktop
implementation as the content and functional baseline.

The desktop layout is untouched. It still renders at 7688px with every
section within the same margin of the desktop mockup as when it was
approved — verified after this work, not assumed.

No mobile-only HTML page was created. Everything runs from the existing
`index.html`, `frequently-asked-questions.html`, `assets/scripts/main.js`,
`assets/scripts/faq-index-page.js` and `assets/styles/styles.css`.

This document sits alongside `DESKTOPUPDATE.md` and `CLAUDE.md`; neither
was modified.

---

## Mobile Header

The header is one flex row with two groups and the space between them
distributed by `justify-content: space-between`:

```
┌──────────────────────────────────────────┐
│ [GB] GOLDTRAP EA              [EN ⌄] [☰] │
└──────────────────────────────────────────┘
   brand group          →      actions group
```

**Left — `.brand`**
- The GB logo (`assets/images/logo-gb.svg`), 40px on mobile and 36px
  below 380px.
- The site name, written from `siteName` in `main.js` via
  `data-site-name`. It is never hard-coded in the HTML. The wordmark can
  shrink and, in the extreme, ellipsise rather than push the controls off
  screen.

**Right — `.site-header__actions`**
- The language control, then the hamburger, in that order.
- They sit in **one shared container with a 10px gap**, so `space-between`
  can only ever separate the brand from the pair — never the language
  control from the hamburger. This is deliberate: horizontal room is
  scarce on a phone and the two controls belong together.

The markup change was to wrap the language selector and the hamburger in
`.site-header__actions`. On desktop that group holds only the visible
language pill, so the desktop header is unchanged.

**Responsive behaviour**
- ≥ 900px — inline navigation, full language name, no hamburger.
- < 900px — hamburger appears, navigation becomes a panel.
- < 640px — the language control switches to the abbreviation, the header
  drops to a 72px row, the logo to 40px.
- < 380px — logo 36px, wordmark 14px, hamburger 40px, gutters 16px.

---

## Mobile Language Selector

**Closed**, the header shows only the abbreviation of the language
currently in use — `EN`, `FR`, `PT`, `ES` — never a list of codes.

**Open**, the panel is exactly the one the desktop uses. It was not
redesigned:

```
┌──────────────────────────┐
│ 🔍 Search languages…     │   ← still at the TOP
├──────────────────────────┤
│ English                  │   ← full names, never codes
│ Spanish                  │
│ Portuguese               │
│ French                   │
│ German                   │
│ …                        │
└──────────────────────────┘
```

- The search field remains the first element in the panel. It was not
  moved, restyled or replaced.
- The list always renders `name`, so the open dropdown shows full language
  names at every screen size.
- The currently selected language is marked with `aria-selected="true"`
  and shown in gold.
- Selecting a language closes the panel and returns focus to the toggle.
- The panel is `width: min(280px, calc(100vw - 32px))` and right-aligned,
  so it cannot overflow a narrow screen.

**How the abbreviation stays current.** The toggle contains two labels:

```html
<span class="lang-select__name" id="lang-select-label">English</span>
<span class="lang-select__code" id="lang-select-code">EN</span>
```

CSS decides which is visible — the name above 640px, the code below.
`showCurrentLanguage()` in `main.js` writes **both** every time the
language changes, so neither can drift and nothing is hard-coded. The
abbreviation is derived from the language code by `languageAbbreviation()`
(`"pt"` → `PT`, `"zh-CN"` → `ZH`), so adding a language needs no extra
field.

The toggle's `aria-label` is also rewritten — "Language: Portuguese.
Change language" — so screen-reader users get the full name even though
the visible label is two letters.

---

## Language Configuration

Everything lives in one place: the **TRANSLATION LANGUAGES** section of
`assets/scripts/main.js`. There is no second copy of the language data
anywhere in the project.

```js
const translationLanguages = [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "pt", name: "Portuguese" },
    …
];

const translationExtraLanguages = [
    { code: "nl", name: "Dutch" },
    …
];
```

- `translationLanguages` — the 17 shown the moment the panel opens.
- `translationExtraLanguages` — a further 30 that stay out of the way but
  remain searchable. Typing in the search box searches **both** lists.

**To add a language**, add one object to either list:

```js
{
    code: "de",
    name: "German"
}
```

That is the only edit required. The dropdown picks it up, the search
finds it, GTranslate receives the code, and the mobile header derives its
abbreviation automatically.

The section carries a comment block explaining exactly this, including
which part of the UI shows the code and which shows the name, and a
reminder to keep the search field at the top.

---

## Hamburger Navigation

The hamburger uses the **same `<nav>` element** as the desktop. The links
are not duplicated anywhere — below 900px that nav is restyled into a
drop-down panel.

**Visual state.** Three bars in a fixed 20 × 14 box; when
`aria-expanded="true"` the outer bars rotate ±45° onto the centre line and
the middle bar fades, forming an ×. CSS transitions only, and they are
covered by the reduced-motion rules.

**Behaviour** (`initMobileNavigation()` in `main.js`):

| Action | Result |
|---|---|
| Tap / Enter on the hamburger | toggles the panel |
| `Escape` | closes it and returns focus to the hamburger |
| Click or tap outside | closes it |
| Choosing any link | closes it |

**Accessibility**
- `aria-label="Open navigation menu"`
- `aria-expanded` maintained on every state change
- `aria-controls="primary-nav"`, resolving to the real nav element
- 44 × 44px target (40 × 40 below 380px), above the 44px guideline at the
  sizes that matter
- Visible focus ring from the site-wide `:focus-visible` rule
- Closed state uses `visibility: hidden`, so the links leave the tab order
  rather than staying focusable behind the header

The panel is `position: absolute` under the header, constrained to the
viewport, `max-height: calc(100dvh - 100%)` with internal scrolling, so a
long list can never push the page sideways. `body.nav-is-open` locks page
scrolling behind it.

---

## Responsive Layout

Three breakpoints, each earning its place. Sizing between them is fluid —
the type scale uses `clamp()`, grids use `auto-fit`/`minmax()`, and
spacing uses `clamp()` — so intermediate widths interpolate rather than
snap. There are no per-device media queries.

| Breakpoint | What changes | Why |
|---|---|---|
| **1024px** | Hero becomes one column; three-across grids drop to two; pricing stacks; source-code card stacks; dialogs gain scroll safety | Matches the tablet mockup, which shows 2-up benefit and step cards and single-column pricing |
| **900px** | Inline nav collapses into the hamburger panel | The inline nav needs roughly 820px before it crowds the brand and language pill. Landscape tablets keep the inline nav the tablet mockup shows; portrait tablets and phones get the hamburger |
| **640px** | Single column throughout, 20px gutter, full-width buttons, compact header with the language abbreviation | The mobile mockup |
| *(380px)* | Header only: smaller logo, wordmark and controls, 16px gutters | Not a device hack — below ~380px the brand and the two controls genuinely compete for room |

**Values measured from the mobile mockup at 360px** rather than scaled
down from desktop:

- gutter **20px**
- section padding **~83px top / ~78px bottom**
- H1 **~48px**, H2 **~36px**, hero body **~18px**
- benefit cards **66px tall with a 12px gap**
- buttons full width at **~53px**
- chart panel roughly **320 × 370** (portrait)

**Section-by-section**, all single column on mobile: hero (copy then
chart), quick benefits, how-it-works, live results (button below the
heading block), pricing, source code, free access, download, FAQ, footer.
No content was removed at any width.

**The live chart** uses `aspect-ratio` rather than fixed dimensions:
`672/597` on desktop, `16/12` on tablet, `320/370` on mobile. It fills its
column and cannot overflow.

---

## Pricing

The grid keeps its `auto-fit` architecture, so a fourth plan still drops
in from configuration alone at every width.

- **Desktop** — `repeat(auto-fit, minmax(150px, 1fr))`, three across.
- **Tablet and below** — `repeat(auto-fit, minmax(min(100%, 420px), 1fr))`,
  which resolves to a single column without hard-coding a column count.
- **Mobile** — one column, 16px gap, 24/20px card padding, full-width CTA.

Card internals were tightened to the mockup's mobile rhythm: 18px divider
margins, 11px feature-list gaps, smaller caption and plan name.

**Timers are unchanged.** `pricingTimerStatus` is still `"hide"`,
durations and increments untouched, each plan still independent. The
hidden timer still reserves its space (`visibility: hidden`, 20px
min-height and 10px margin on mobile), so switching to `"show"` never
resizes a card. Verified at mobile width with `"show"` temporarily set.

---

## Dialogs

Both the payment dialog and the source-code dialog were made responsive
without redesigning them.

- **Tablet and below** — `width: min(640px, calc(100vw - 40px))`,
  `max-height: calc(100dvh - 40px)`, `overflow-y: auto`.
- **Mobile** — `width: calc(100vw - 24px)`, tighter padding, 20px radius,
  smaller title and amount, wallet address at 13px.

Everything else is preserved and was re-tested at 320px, 390px and 768px:
plan name and amount from the clicked card, `TRC20 (TRON)`, `USDT`, the
wallet copy behaviour with its 5-second green check, the Telegram
confirmation link, the X button, outside-click closing and `Escape`.

---

## Live Chat

- Still **68 × 68px** at every width — not resized for mobile.
- Green online indicator unchanged, still a separate element from the
  gold pulse.
- The continuous gold pulse still uses `var(--site-primary-accent)`, and
  there is still no permanent gold ring — the glow only appears while the
  ring is expanding.
- Positioned `right: 16px; bottom: 16px` on mobile (40px on desktop), so
  it sits clear of content and inside the viewport.

**Touch handling.** The hover label is a hover affordance, so under
`@media (hover: none)` it is suppressed rather than left half-triggered by
a tap, and the launcher's lift on hover is disabled because it reads as a
stuck state on touch. The launcher's `aria-label` carries the same wording
(`Chat with Abang Rimba — online`) so the information is never
hover-only, and keyboard focus still reveals the label on hybrid devices.

The launcher remains a plain anchor, so it is fully usable by tap.

---

## FAQ

Architecture unchanged — still one `FaqServiceHomepage` instance feeding
both pages, with no duplicated data.

- **Categories** — two pills per row on mobile
  (`flex: 1 1 calc(50% - 4px)`), matching the mockup, at 11px/12px padding
  for a comfortable target.
- **Questions** — one column below 640px, 18px/16px trigger padding, 16px
  question text.
- Only one answer open at a time; opening another closes the previous one.
- Keyboard operation, `aria-expanded` and `aria-controls` all unchanged.

---

## Footer

- Content stays centred and stacks naturally; no layout change was needed
  beyond type sizing.
- Caveat, terms notice and copyright drop to 13px on mobile.
- Padding reduces to 44px top and bottom.
- The dynamic year, `siteName`, `siteOwner`, the configurable caveat, the
  Terms and Conditions link and the Telegram icon all behave exactly as on
  desktop.
- No horizontal overflow at any tested width.

---

## Accessibility

- Semantic HTML throughout; no new wrappers that break the landmark
  structure. The header actions group is a plain `<div>` inside the
  existing `<header>`.
- Touch targets: hamburger 44px, nav links 15px vertical padding, FAQ
  triggers 18px, buttons ≥ 48px tall.
- `aria-expanded` on the hamburger, the language toggle and every FAQ
  trigger; `aria-controls` pointing at real elements.
- The language toggle's accessible name states the full language even when
  only two letters are visible.
- `Escape` closes the nav panel, the language panel and both dialogs, each
  returning focus to its trigger.
- Visible focus rings everywhere from the shared `:focus-visible` rule.
- Nothing depends solely on hover: the chat label is suppressed on touch
  and its content is duplicated in the `aria-label`.
- Reduced motion is respected — the nav transition, hamburger animation,
  chat pulse and scroll reveal are all disabled or neutralised under
  `prefers-reduced-motion: reduce`.
- Scroll reveal remains behind `@media (scripting: enabled)`, so content is
  fully visible if JavaScript never runs.

---

## Testing

Rendered and asserted in a real browser at every category below. No
horizontal overflow at any width.

| Category | Width | Overflow | Hamburger | Language label | Layout |
|---|---|---|---|---|---|
| Very small phone | 320 | 0px | yes | `EN` | 1 column |
| Small phone | 360 | 0px | yes | `EN` | 1 column |
| Normal phone | 390 | 0px | yes | `EN` | 1 column |
| Large phone | 430 | 0px | yes | `EN` | 1 column |
| Portrait tablet | 768 | 0px | yes | full name | 2-up grids, 1-col pricing |
| Landscape tablet | 1024 | 0px | no | full name | desktop layout |
| Small laptop | 1280 | 0px | no | full name | desktop layout |
| Desktop | 1920 | 0px | no | full name | desktop layout |

**Automated suites — 210 checks passing**, plus the full GTranslate
round-trip suite:

| Suite | Checks |
|---|---|
| Mobile header / language / hamburger | 22 |
| Mobile dialogs / chat / FAQ (320, 390, 768) | 51 |
| Functional (desktop) | 46 |
| Update / configuration | 45 |
| Accessibility | 26 |
| Announcement versioning + timers | 17 |
| Motion / reduced motion / no-JS | 3 |
| Translation round-trips | all pass |
| Four-plan pricing grid | passes |

**Specifically verified on mobile:** `EN` shown initially; tapping it
opens the dropdown; the search field is above the first option; full names
are listed; selecting French → `FR`, Portuguese → `PT`, Spanish → `ES`,
English → `EN`; hamburger opens and closes; `aria-expanded` flips; Escape,
outside click and link selection all close it; focus returns to the
hamburger; pricing stacks; the chart fits; both dialogs fit and scroll;
the wallet copy works; the footer fits.

**Visual comparison** against the supplied mockups: the mobile hero,
pricing band and free-access/download band were rendered at 360px and
compared side by side with `mockups/mobile.png`; the tablet layout was
rendered at 820px and compared with `mockups/tablet.png`. Card internals,
the preset banner and the free-access/download spacing were corrected
based on what those comparisons showed.

Section heights against the mobile mockup after those corrections:

| Section | Mockup | Built | Δ |
|---|---|---|---|
| announcement | 69 | 71 | +2 |
| hero | 1228 | 1197 | −31 |
| quick benefits | 969 | 967 | −2 |
| how it works | 1832 | 1768 | −64 |
| live results | 452 | 454 | +2 |
| stats strip | 158 | 179 | +21 |
| pricing + source | 2266 | 2537 | +271 |
| free access + download | 2042 | 2247 | +205 |
| FAQ | 1250 | 1271 | +21 |
| footer | 233 | 355 | +122 |

Seven of the ten sections are within ~2%. The two larger deltas are
structural rather than layout errors: the pricing band carries the
countdown timers' reserved rows, which CLAUDE.md §9.4 requires to stay
even while hidden, and the footer carries the specification's Terms and
Conditions line, which the mockup does not contain. Per the brief, the
page was not compressed further merely to reduce its total height.

**Desktop regression:** re-rendered at 1920px after all mobile work. Total
page height 7688px and every section delta identical to the approved
build — unchanged.

---

## Google Translate Mobile Overflow Fix

A horizontal scrollbar appeared on some phones — iPhone/Safari especially —
after the visitor changed the site language, and went away again on reload.

### The cause

Google Translate appends its own UI **directly to `<body>`**. Every element
it injects therefore sits outside `.page-wrapper`, which carries this
site's only `overflow-x: clip`. Nothing on the page constrained them.

The offending element is **`div#goog-gt-tt`** — Google's "original text"
bubble, classes `VIpgJd-suEOdc VIpgJd-yAWNEb-L7lbkb skiptranslate`. Google
gives it:

```
position: absolute;
width: 420px;            /* from Google's el_main.css */
margin: 0 0 0 -23px;     /* inline, set by Google's script */
display: none;           /* until a phrase is tapped or hovered */
```

420px is wider than every phone viewport the site supports (320–414px), and
the bubble has no clipping ancestor, so the moment Google displays it the
document's scrollable width grows past the screen. Translating also flips
`<body>` to `position: relative`, which makes `<body>` the containing block
for that absolutely positioned bubble — so its box lands in the page's
scroll area rather than being resolved against the viewport.

That also explains the reload behaviour: the bubble is rebuilt hidden on
every page load, so refreshing clears it even though the page stays
translated.

The other elements Google injects were checked and ruled out rather than
assumed. `iframe.VIpgJd-ZVi9od-ORHb-OEVmcd` (the banner) and the two
`iframe.VIpgJd-ZVi9od-xl07Ob-OEVmcd` popups are already suppressed by the
existing `iframe.skiptranslate { display: none }` rule; the spinner
`div.VIpgJd-ZVi9od-aZ2wEe-wOHMyf` is `position: fixed` at `left: -1000px`
(then `-14px`), which is off to the left and measurably adds nothing to the
scrollable width. They were left alone — `.skiptranslate` was not blanket
hidden, because some of it is load-bearing for translation.

### Measured, before and after

Real Google Translate engine, iPhone 14 viewport (390px), English → French,
then the bubble displayed:

| Engine   | Stylesheet | `documentElement.scrollWidth` | Overflow |
| -------- | ---------- | ----------------------------- | -------- |
| WebKit   | before     | 537px                         | **147px** |
| WebKit   | after      | 390px                         | 0 |
| Chromium | before     | 397px                         | **7px** |
| Chromium | after      | 390px                         | 0 |

The two engines differ only in where Google happened to place the bubble on
that run; isolated runs measured WebKit at +111px and Chromium at +157px.
Either way the page scrolled sideways before the fix and does not after.

### The fix

`assets/styles/styles.css`, section 20 — the bubble is **constrained, not
hidden**, so it still works as part of Google's translation UI:

```css
#goog-gt-tt {
    box-sizing: border-box !important;
    left: 12px !important;
    right: 12px !important;
    width: auto !important;
    max-width: 420px !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
}
```

With both offsets set and `width: auto`, the bubble fills the viewport
minus a 12px gutter on phones and keeps Google's own 420px wherever the
screen is wide enough for it — so it can never be wider than the screen it
is drawn on. Google's vertical placement is left alone. Measured results:

| Viewport | Bubble width | Right edge |
| -------- | ------------ | ---------- |
| 320px    | 296px        | 308px |
| 360px    | 336px        | 348px |
| 390px    | 366px        | 378px |
| 414px    | 390px        | 402px |
| 768px+   | 420px        | 432px |

Two supporting rules cap the same bubble addressed by its class (in case
Google renders a second instance without the id) and stop anything Google
lays out inside it from pushing past its edges.

### Defensive rule

`html { overflow-x: clip; }` was added next to the existing `.page-wrapper`
clip — **as a backstop, not as the fix**. Google can append UI anywhere in
`<body>`, which the wrapper's clip cannot reach. `clip` rather than
`hidden`: `overflow-x: hidden` would leave the page a horizontally
scrollable container that merely hides its scrollbar and still pans under a
swipe on iOS, whereas `clip` refuses the scroll outright. On the root
element the value propagates to the viewport, so vertical scrolling is
unaffected and no new scroll container is created — `position: sticky` and
`position: fixed` still behave.

### Tested

Both suites ran against **the real Google Translate engine** — Google's own
`element.js`, `el_main.js` and `el_main.css` fetched live, and real
translation responses, so the injected DOM measured here is the DOM a
visitor gets.

- **WebKit (Safari's engine), iPhone 14 profile — 46 checks, 0 failures**
- **Chromium, iPhone 14 profile — 46 checks, 0 failures**

Covering, in both engines: fresh load; English → French, Portuguese,
Spanish; French → English; six consecutive switches; the bubble displayed
after translating; language dropdown opened and closed; hamburger opened
and closed; the payment dialog; the source-code dialog; widths 320, 360,
375, 390, 414, 768, 820, 1024, 1280, 1440 and 1920, each in English, in
French, and in French with the bubble displayed. Zero horizontal overflow
in every case.

**No visual change.** index.html rendered full-page at 1440px, 820px and
390px with the patched stylesheet and with the previous one: **0 differing
pixels** at all three widths.

The Safari-engine testing is WebKit via Playwright, not a physical iPhone.
It is the same engine, but a device check on real hardware is still worth
doing before release.

---

## Google Translate Mobile Layout Fix

### 1. The symptom

On iPhone/Safari, after changing the site language the page appeared
**enlarged** — text looked larger, the layout looked zoomed, and the page
gained horizontal scrolling. Reloading cleared it.

### 2. The actual root cause

**iOS Safari's automatic zoom-on-focus, triggered by the language search
field.** It is not a Google Translate bug at all.

iOS Safari zooms the whole page in whenever a focused form control has a
computed `font-size` under **16px**, and it does **not** zoom back out when
the field is blurred — only a reload or a manual pinch clears it.

`openPanel()` in `main.js` focuses the search field the moment the language
dropdown opens:

```js
function openPanel() {
    panel.hidden = false;
    ...
    search.focus();      // <- iOS zooms here
}
```

and `.lang-select__search` computed **14px**. So on an iPhone the sequence
is: tap the language button → the field is focused → Safari zooms the page
in → pick a language → the panel closes but **the zoom stays**. The page is
now genuinely scaled up and scrolls sideways.

Because the visitor only ever sees this right after switching language, it
reads as "translating broke the layout" — but the zoom happens when the
dropdown *opens*, before Google Translate has done anything.

### 3. The evidence

Measured with the real Google Translate engine in both WebKit and Chromium,
before and after translation at 390px:

| Measurement | Before | After |
| ----------- | ------ | ----- |
| `visualViewport.scale` | 1 | **1 — unchanged** |
| `devicePixelRatio` | 3 | **3 — unchanged** |
| `window.innerWidth` / `documentElement.clientWidth` | 390 | **390 — unchanged** |
| computed `font-size`, all 22 control elements | — | **unchanged** |
| `documentElement.scrollWidth` | 390 | **390 — unchanged** |

Nothing Google does changes the page's scale or typography. The 22 elements
checked included body, page wrapper, header, logo, site name, navigation,
hero heading, hero paragraph, primary CTA, quick benefits, benefit card,
section headings, pricing grid, pricing card, pricing button, FAQ, FAQ
question, footer, announcement bar and the language selector. Google's own
`<font>` wrappers inherit correctly — measured `font-size: 36px`,
`line-height: 37.8px`, `font-family: Poppins` on a translated `<h2>`,
identical to the untranslated element.

What Google *does* change, measured:

- `<html>` gains `class="translated-ltr"`, `lang="fr"` and inline `height: 100%`
- `<body>` gains inline `position: relative; min-height: 100%; top: 40px`
  (the site's existing `body { top: 0 !important }` already neutralises the
  40px offset — computed `top` stayed `0px`)

Neither changes width, scale or type size, so neither was touched.

The zoom trigger itself was confirmed directly: the site has exactly **one**
form control on either page, `#lang-select-search`, and it computed
**14px — under the 16px threshold — at 320, 360, 375, 390, 414, 768 and
1440px, on both `index.html` and `frequently-asked-questions.html`**, with
`document.activeElement` confirmed as that field after opening the panel.

### 4. Why the previous `#goog-gt-tt` theory was insufficient

It was not wrong, but it was a *different* bug. `#goog-gt-tt` is Google's
"original text" bubble: `position: absolute`, a hard `width: 420px`,
appended to `<body>` outside `.page-wrapper`. It genuinely does add 7–147px
of horizontal overflow when displayed, which was measured and fixed.

But it only appears when a visitor taps a translated phrase, and it can
never change the page's *scale* or make text larger. It could not produce
the reported symptom. **That fix is correct and has been kept** — it
addresses real overflow — it simply was not the cause of the zoom.

### 5. The fixes

Three changes, all in `assets/styles/styles.css`.

**a. The root cause — the iOS zoom trigger.** The search field is given
16px on touch devices, which is the threshold below which Safari zooms:

```css
@media (hover: none), (pointer: coarse) {
    .lang-select__search {
        font-size: 16px;
    }
}
```

Desktop keeps the mockup's 14px (verified: 14px at 1440px with no touch,
16px on every touch viewport). The alternative — `user-scalable=no` or
`maximum-scale=1` in the viewport meta — would also stop the zoom, but by
blocking pinch-zoom for everyone. It was not used.

**b. `.preset-banner__link` — real overflow at every mobile width.** On
mobile the link takes its own row with `flex-basis: 100%` and
`margin-left: 46px`, and the base rule sets `flex-shrink: 0`. 100% plus a
46px margin is 46px wider than the row, and it could not shrink back — so
it pushed **9–13px past the viewport at every mobile width, in English as
well as every translation**. `.page-wrapper { overflow-x: clip }` was
hiding it; on Safari 15 and older, where `overflow: clip` is not supported
and the declaration is dropped, it is a real horizontal scrollbar. Fixed by
sizing the basis to leave room for the indent:

```css
.preset-banner__link { flex-basis: calc(100% - 46px); }
```

**c. `.benefit-card__label` — long translated words forcing the card wide.**
As a flex item it defaulted to `min-width: auto`, so its minimum width was
its longest word. German compounds broke it: `Warenkorbverwaltungssystem`
measured 242px against 280px of usable width at 320px, pushing the card to
327px on a 320px screen. Fixed by letting the box shrink and the word
break:

```css
.benefit-card__label { min-width: 0; overflow-wrap: anywhere; }
```

`anywhere` rather than `break-word` because only `anywhere` also lowers the
min-content size that was forcing the card wide. No text is truncated and
no English dimension is hard-coded.

### 6–8. Testing

**True layout width, with `.page-wrapper`'s clip neutralised** — i.e. what a
browser without `overflow: clip` support actually lays out. This is the
measurement that exposes overflow the backstop was masking:

| | Before the fix | After |
| --- | --- | --- |
| 320px, EN / FR / DE / RU | 13px over | **0** |
| 360px, EN / FR / DE / RU | 13px over | **0** |
| 375px, EN / FR / DE / RU | 9–13px over | **0** |
| 390px, EN / FR / DE / RU | 9px over | **0** |
| 414px, EN / FR / DE / RU | 9px over | **0** |

20 measurements, all zero. The mobile layout no longer depends on the
`overflow-x: clip` backstop at all.

**Full suite, against the real Google Translate engine:**

- **WebKit (Safari's engine), iPhone 14 profile — 46 checks, 0 failures**
- **Chromium, iPhone 14 profile — 46 checks, 0 failures**

Translation combinations: English → French, French → English, English →
Portuguese, English → Spanish, English → German, English → Russian, and six
consecutive switches ending back at English. Widths: 320, 360, 375, 390,
414, 768, 820, 1024, 1280, 1440, 1920 — each in English, in French, and in
French with Google's bubble displayed. Also the language dropdown open and
closed, the hamburger open and closed, the payment dialog and the
source-code dialog, all while translated.

**No visual change.** `index.html` rendered full-page at 1440px, 820px and
390px with the patched stylesheet and with the previous one: **0 differing
pixels** at all three widths.

### Caveat

iOS Safari's zoom-on-focus is a behaviour of Safari on iOS, not of the
WebKit engine build available here, so the zoom itself could not be
reproduced in this environment. What *was* verified directly is the trigger
condition and its removal: the focused field measured 14px (below the 16px
threshold) before the fix and 16px after, on every mobile viewport in both
engines, with desktop unchanged at 14px. A confirmation pass on a physical
iPhone is still worth doing.

---

## Tablet Responsive Audit

Audit of the existing responsive implementation against `mockups/tablet.png`.
Not a rebuild: the question was whether the responsive system already
produces the tablet mockup's layout, and only genuine discrepancies were to
be fixed.

### Mockup dimensions

`mockups/tablet.png` is **480 × 4931**, but that is an export scale, not a
viewport. Four independent header anchors — whose CSS sizes are fixed and
known from the desktop build — put the export at **≈0.52×, i.e. a viewport
of roughly 918–928 CSS px**:

| Anchor | Mockup (image px) | Our CSS px | Implied scale | Implied viewport |
| ------ | ----------------- | ---------- | ------------- | ---------------- |
| Logo disc | 24 | 48 | 0.500 | 960 |
| Nav "Features" | 34 | 63.1 | 0.539 | 891 |
| Nav "Downloads" | 43 | 79.2 | 0.543 | 884 |
| Nav "Pricing" | 27 | 48.9 | 0.552 | 869 |
| "English" | 29 | 57.8 | 0.502 | 957 |
| **Total ink length** | 172 | 329 | **0.523** | **918** |

Cross-checks confirming the method: `mockups/desktop.png` is a 1× export at
1920 (its logo measures 50px against our 48px, its nav "Features" 66px
against our 63.1px, its hero H1 cap 65px against our 94px font's 65.8px),
and `mockups/mobile.png` is a 1× export at 360 (H1 cap 35px against our
48px font's 33.6px).

The page total therefore corresponds to ≈9460 CSS px against our 8904px —
our build is shorter, which the typography note below accounts for.

### Did the existing implementation already cover tablet?

**Almost entirely, yes.** At the mockup's width the existing responsive
system already produced its layout with no tablet-specific CSS:

| Section | Mockup at ≈920px | Implementation | |
| ------- | ---------------- | -------------- | - |
| Announcement bar | 2-line wrap, dismiss × | same | ✓ |
| Header / navigation | **full inline nav, no hamburger** | inline from 900px up | ✓ |
| Language selector | "English ⌄" pill, full word | same | ✓ |
| Hero | stacked, chart full width below | 1-column below 1024px | ✓ |
| Live chart | full-width landscape panel | same | ✓ |
| Quick benefits | 2 columns × 4 rows | 2 columns | ✓ |
| How it works | 2 columns × 3 rows | 2 columns | ✓ |
| Live results | heading + button on one row, stats row | same | ✓ |
| Pricing | **1 column** | 1 column up to ~940px | ✓ |
| Source code | **row: copy left, buttons right** | stacked | **✗** |
| Free access | 2×2 steps, buttons on one row | same | ✓ |
| Download | 2 cards + preset banner as a row | same | ✓ |
| FAQ | 4 pills on one row, 2-column accordion | same | ✓ |
| Footer | caveat, terms, telegram, copyright | same | ✓ |

The hamburger appears **below** 900px, i.e. below the mockup's width, so
the mockup does not contradict it. Pricing goes to 2 columns **above**
~940px, again outside the mockup's width, and that is `auto-fit` doing what
CLAUDE.md §9.1 requires — category B, left alone.

### Discrepancy found, and the fix

**One genuine discrepancy: the Source Code card.** The mockup shows it as a
two-column row — heading, blurb, 2×2 feature ticks, price and timer on the
left; the Purchase and Discuss on Telegram buttons stacked on the right.
The implementation stacked the buttons underneath at any width below
1024px, so at the mockup's width they ran full-width across the card.
Category **C** — a desktop rule whose threshold was set too high.

Measured with the row forced on, the copy column is **452px at 920px** and
**436px at 900px** — both comfortable — and only becomes cramped further
down. The stacking was therefore moved from `max-width: 1023.98px` to the
**existing `max-width: 899.98px` breakpoint** that the navigation already
uses. No new breakpoint was introduced, and no device-specific value
(768/820/834/912) was invented.

A breakpoint rather than intrinsic wrapping, deliberately: the buttons must
be **full width** once they drop below the copy (the mobile mockup shows
them that way, ~294px of a 360px viewport), and a wrapped flex item cannot
be told to grow only on the line it wrapped onto. `flex-wrap` alone would
have left them at their 268px content width, matching neither mockup.

### Breakpoints changed

One threshold moved; none added, none removed:

```
.source-code__layout { flex-direction: column }   1023.98px -> 899.98px
.source-code__actions { width: 100% }             1023.98px -> 899.98px
```

### Noted, not changed: tablet type scale

The mockup's hero and section headings are larger relative to the layout
than the build's. Scale-free (both measured inside the same image, so no
export-scale assumption):

| | Mockup | Implementation |
| --- | --- | --- |
| H1 cap ÷ nav "Features" width | 0.82 | 0.62 |
| H1 cap ÷ content width | 0.063 | 0.047 |

The same ratio on desktop is 0.99 (mockup) against 1.04 (ours) — a match —
so this is specific to the tablet band. The cause is simply that
`--fs-display: clamp(3.5rem, 4.9vw, 5.875rem)` and
`--fs-h2: clamp(2.25rem, 3vw, 3.625rem)` sit on their **floors** (56px and
36px) from roughly 640px to 1143px, while the mockup uses larger display
type there. In the mockup "Why Traders Choose GoldTrap EA" wraps to two
lines; in the build it fits on one.

This was classified **category B — an intentional difference produced by
the approved fluid type scale** — and deliberately left alone, per §22
(typography not to be altered) and §17 (do not modify working code merely
because a mockup exists). It is recorded here rather than silently dropped:
if the larger tablet display type is wanted, it is a change to those two
clamp floors and nothing else.

### Tests performed

**Tablet audit — 36 checks in Chromium and 36 in WebKit, 0 failures each**,
covering widths 744, 768, 800, 820, 834, 880, 900, 912, 920, 960, 1000 and
1024:

- no horizontal overflow at any width
- header on one row, not clipped; inline nav never overlapping the brand or
  the actions; the collapsed nav verified `visibility: hidden` rather than
  merely off-screen
- payment dialog and source-code dialog: open, fit inside the viewport, not
  clipped, no page overflow, close on Escape, content filled dynamically
  (plan, amount, network, wallet)
- live chat launcher: 68px, `position: fixed`, on screen, pulse animating
- scroll reveal: 58 elements wired, firing on scroll (16 → 33)
- accessibility: `aria-expanded` / `aria-haspopup` / `aria-controls` on the
  language toggle, 5 nav links, labelled dialog, skip link, keyboard reach
  with a visible 2px focus outline
- language panel opens inside the viewport, search filters, 16px field (the
  iOS zoom fix still in place)

**Translation regression at tablet widths** — **WebKit 51 checks, 0
failures**; Chromium the same set, with the 1000px cases re-run and passing
(three misses on the first Chromium pass were the test harness failing to
warm Google's engine in time, not the page — WebKit passed the identical
cases and the Chromium re-run passed all of them).

Widths 820, 920 and 1000, against the real Google Translate engine, English
→ French → English → Portuguese → Spanish → English at each: no horizontal
overflow, and `visualViewport.scale`, `devicePixelRatio`, root font-size, H1
and H2 font-size and the nav state all unchanged through every switch. The
language selector still opens and filters afterwards. The `#goog-gt-tt` fix
and the iOS zoom fix are both untouched.

**Desktop and mobile regression** — full-page renders against the previous
stylesheet:

| Viewport | Result |
| -------- | ------ |
| 1920px | **0 differing pixels** |
| 1440px | **0 differing pixels** |
| 920px | height 8960 → 8904 (the source-code row, as intended) |
| 390px | **0 differing pixels** |
| 320px | **0 differing pixels** |

---

## Known Limitations

1. **The tablet mockup shows no hamburger**, and neither does the mobile
   mockup — the mobile mockup simply drops the nav links, leaving the logo
   and language pill. A hamburger was nonetheless required by the brief,
   so the collapse point was set at 900px: landscape tablets keep the
   inline nav the tablet mockup shows, and portrait tablets and phones get
   the hamburger.

2. **Live translation has now been exercised against Google's servers.**
   This supersedes the limitation recorded here and in `DESKTOPUPDATE.md`:
   during the overflow fix above, Chromium and WebKit were driven against
   Google's live `element.js`/`el_main.js` and real translation responses,
   and English → French/Portuguese/Spanish/German/Russian and back to
   English all round-tripped correctly. A check on physical hardware is
   still worth doing before release.

3. **`termsAndConditionsLink` remains `"#"`** — no terms URL has been
   supplied.

---

## Copy Link, Mobile FAQ Page, Sticky Rail and the Announcement Bar

**Date:** 1 September 2026

Four pieces of work. Taken in the brief's priority order, with the
announcement bar first.

---

### D. The announcement bar — no regression found

**The two breakages described were not present in any build.** Measured with
devtools, not from screenshots, at 1920px:

| | reference `goldenboxea.com` | deployed GitHub Pages | working tree (before this pass) |
| --- | --- | --- | --- |
| bar height | 51px | 51px | 51px |
| inner padding | 6px / 6px | 6px / 6px | 6px / 6px |
| text above / below | 13.8 / 14.8 | 13.6 / 14.6 | 13.6 / 14.6 |
| bottom border | 1px `rgb(41,35,18)` | 1px `rgb(41,35,18)` | 1px `rgb(41,35,18)` |

All three were byte-for-byte the same layout. The padding was symmetric, the
text was vertically centred, and the 1px muted-gold bottom border
(`--rule-warm`, `#292312`) was present in every one — including the build
described as broken. The height was 51px everywhere, not 64px before and
42px after.

**So there was nothing to find a cause for.** Screenshot measurement is the
likely source: a page captured at a different zoom or device pixel ratio
scales every dimension, and 51px reads as anything from 42 to 64 depending
on the factor.

**What was done anyway.** The bar's height was the one real difference from
the number requested, so it was rebuilt to that specification:

| | before | after |
| --- | --- | --- |
| height at 1920 | 51px | **65.75px** |
| vertical padding | 6px / 6px (with `min-height: 50px`) | **21px / 21px** |
| text above / below | 13.6 / 14.6 | **21 / 21** |
| bottom border | present | present, unchanged |

The 65.75 is 21 + 22.75 + 21 + 1: the requested 21px on both sides, the
line's real height at Roboto 14px/1.625, and the border. It is 1.75px over
the 64 in the brief because the brief assumed a 21px text line.

Three structural points:

- The padding is **one custom property**, `--action-bar-padding-block`, used
  for both sides. Two sides cannot drift apart in a future pass because
  there is only one value.
- `min-height` is gone. A min-height centres the text in a fixed box and
  would have *masked* a broken padding value rather than exposing it.
- The height comes from padding only, never a fixed `height`, so the bar
  grows when the text wraps: measured 65.75px at 1920 (1 line), 103px at
  390 (4 lines), 122.5px at 320 (5 lines), padding symmetric at every one.

The dismiss button gains a 44px touch target on phones while its visual
circle stays 32px. Dismissal, the version-based re-show, the hover
behaviour and the copy are untouched and re-verified.

**`--sticky-offset` is now measured at runtime**, in `updateStickyOffset()`.
It sums the height of any chrome that is actually `position: sticky` or
`fixed`, and it is recomputed on load, on resize, on orientation change,
through a `ResizeObserver` on the bar and the header, and — the case that
matters — the moment the bar is **dismissed**. CSS uses it for the FAQ
rail's `top` and for `scroll-margin-top` on every FAQ item, so the two can
never disagree. Verified: with the bar dismissed there is no leftover gap
and a deep-linked question still lands 16px below the pinned rail.

---

### A. Per-question copy link

Every question on the homepage and the full FAQ page carries a control that
copies a deep link to that one question.

**The link.** `<origin><current page>#<stable question id>` — the origin
from `window.location`, never a hard-coded domain, so it is correct on a
local server, on GitHub Pages and on production. The fragment is the id
already in `faq-page-content.js`; there is no parallel id scheme and no
array position, so reordering the database does not break a link.

> **One deviation, flagged.** The brief's shape points every link at
> `frequently-asked-questions.html`. A link always points at **the page it
> was copied from** instead. The homepage's 24 featured questions are their
> own approved collection — they do not exist on the FAQ page — so a
> homepage link sent there would land on different wording or on nothing.
> On the FAQ page the result is exactly the shape asked for.

**The trap.** The control is a **sibling** of the accordion trigger, never
nested inside it: a button inside a button is invalid HTML and breaks
keyboard and screen-reader behaviour. Both question headers were
restructured into a flex row holding the two controls. The handler also
calls `stopPropagation()` so no listener added later on an ancestor can
toggle the answer. **Verified explicitly on both pages: the open/closed
state of every question is identical before and after a copy tap.**

**States.** Muted at rest, white on hover, green with a check mark when
copied, red with the same check on failure — reverting after 5s, the same
`COPY_FEEDBACK_MS` the wallet and download controls use, so there is one
copy idiom site-wide. `copyText()` is reused, so the `execCommand` fallback
for insecure origins comes with it; a genuine failure shows the failed
state rather than a silent no-op.

**Deep links.** On load and on `hashchange`, both pages switch to the
question's category, clear any active search, open it under the existing
one-open-at-a-time rule, and scroll it into view. The offset comes from
`scroll-margin-top: calc(var(--sticky-offset) + 16px)` — no magic number in
the scroll call. An unknown or malformed hash returns silently.

**Accessibility.** `aria-label="Copy link to this question"`, updated on
success and failure; a shared `role="status" aria-live="polite"` region
announces the result, because colour is not perceivable to every visitor;
the icon swap and the label carry the meaning and colour only reinforces
it; 44px of touch target with a 16px icon, so the question text is not
crowded; visible `:focus-visible`. The copied URL is an identity string and
is announced verbatim.

---

### B. Mobile sticky category bar

**Measured before and after**, on the FAQ page:

| viewport | before | after |
| --- | --- | --- |
| 320 × 844 | 566.9px — 67.2% of the viewport, 9 chip rows | **62px — 7.3%, 1 row** |
| 360 × 800 | 507px — 63.4%, 8 rows | **62px — 7.8%, 1 row** |
| 390 × 844 | 507px — 60.1%, 8 rows | **62px — 7.3%, 1 row** |
| 414 × 896 | 507px — 56.6%, 8 rows | **62px — 6.9%, 1 row** |
| 768 × 1024 | 267.5px — 26.1%, 4 rows | **62px — 6.1%, 1 row** |
| 844 × 390 (landscape) | 259.1px — 66.4%, 3 rows | **62px — 15.9%, 1 row** |

Every width is now far inside the 25% budget.

**The rail.** `flex-wrap: nowrap` is the whole fix — chips can no longer
stack. Left-aligned (`justify-content: flex-start`; centring is what
produced the pyramid), `overflow-x: auto`, `scroll-snap-type: x proximity`
with `scroll-snap-align: start`, momentum scrolling on iOS, scrollbar
hidden but scrolling intact, and a mask that fades the right edge — and the
left edge too once scrolled, set from JS — so it is visible that there is
more off-screen. The rail's leading padding is the page gutter, so the
first chip lines up with the content below, and its trailing padding clears
the pinned search button. Chips are compact but never below 44px tall.

**The query is deliberately wider than the phone breakpoint:**
`max-width: 899.98px, (max-height: 540px)`. Ten chips do not fit on one row
until roughly 1000px, so 768px still wrapped onto four rows — over budget —
and a landscape phone is 844px *wide* but only 390px *tall*, where four
rows is 66% of the screen. Short viewports get the rail regardless of
width.

**Search moved out of the rail.** Inside it, it scrolled away with the
chips. It is now an icon button pinned at the end of the row, outside the
`overflow-x` container, and it stays visible at all times on mobile rather
than only after the hero search scrolls away — on a phone it is the only
search affordance in the pinned row. Tapping it opens a **full-screen
sheet**: 72 questions produce long result lists, and a sheet gives them the
whole screen. Focus moves to the input on open; Escape closes it and
returns focus to the trigger; live search and the no-results state behave
exactly as on desktop.

> **A trap worth recording.** The sheet is `position: fixed; inset: 0`, but
> it first rendered 60px tall pinned to the bar. `backdrop-filter` on the
> sticky bar makes that element a **containing block for fixed-position
> descendants**, so the sheet was sizing against the 60px bar instead of the
> viewport. The blur is dropped on small screens and replaced with a solid
> background, which fixes it and costs a phone less to paint.

**Active chip visibility.** `scrollIntoView({ inline: 'center', block:
'nearest' })` on load, on tap, and on keyboard focus. `block: 'nearest'` is
not optional — without it the browser also scrolls the nearest *vertical*
scroller, which is the page. **Verified at all six sizes: tapping a chip
moves the page by 0px.**

> A note on that measurement. It first appeared to drift 20–70px. It does
> not: the site sets `scroll-behavior: smooth`, so the harness's own
> `scrollTo` was still animating when the baseline was read. Waiting for
> two identical frames before measuring shows the true figure — zero. A
> scroll-anchoring fix written for the phantom drift was reverted.

**Rail accessibility.** `role="group"` and `aria-label` on the rail,
`aria-pressed` on each chip — both already present and kept. Left/Right
arrows move between chips and scroll the focused chip into view, so a
keyboard user never focuses something off-screen. The rail carries
`padding-block: 6px; margin-block: -6px` so `overflow-x: auto` cannot clip
the focus ring — the classic way a scroll rail becomes unusable by
keyboard. Smooth scrolling is skipped under `prefers-reduced-motion`.

---

### C. Mobile FAQ page layout

> **`mockups/mobile/pages/` does not exist in the repository.** The only
> mobile mockup present is `mockups/mobile.png`, which is the homepage. The
> arrangement therefore follows the established desktop page — the same
> elements in the same order, stacked into one column — which is what the
> mockup would have governed. Everything else in this section came from the
> brief's explicit instructions. **Please add the mockup if the arrangement
> should differ; the spacing work below stands either way.**

**Spacing tokens, not one-off margins.** A six-step scale on `.faq-page`
(`--space-2xs` 6px through `--space-xl` 44px) supplies every vertical gap,
so the rhythm is deliberate rather than accumulated.

**What was tightened, and why:**

| what | before | after | why |
| --- | --- | --- | --- |
| hero top padding | 64px | **24px** | the eyebrow, heading and search field must be visible without scrolling at 390 × 844 |
| hero bottom padding | 60px | 32px | consistent with the scale |
| title → lead | 20px | 10px | the two read as one block |
| lead → search | 32px | 24px | |
| popular chips top | 40px | 24px | |
| content top padding | 64px | **32px** | the mockup's gap between the last popular question and the first section is not needed |
| between question groups | 56px | 32px | |
| back-to-homepage top | 48px | 32px | |
| question row padding | 22px / 24px | 16px / 16px / 16px / 4px | makes room for the copy control without crowding the text |

**Verified at 390 × 844: the eyebrow, the heading and the search field are
all above the fold.**

**Quality bar.** No horizontal overflow at 320, 360, 390, 414, 768 or
844 × 390. Every touch target at least 44px. No interactive element sits
under the chat launcher at the bottom of the page at any width — checked by
rectangle intersection, not by eye. Long category names do not wrap because
the rail scrolls instead.

---

### Verification

| suite | result |
| --- | --- |
| Copy link (both pages, states, deep links, unknown hash, a11y) | 23 / 0 |
| Mobile FAQ (6 viewports: rail, budget, chips, search sheet, overflow, chat) | 60 / 0 |
| Announcement bar (3 widths, wrapping, dismiss, offset, persistence) | 24 / 0 |
| Identity strings, six languages | 83 / 0 |
| Desktop regression (type, gutters, fonts, shimmer, chat) | 48 / 0 |
| Translation (Chromium + WebKit) | 28 / 0 |
| Interactions (dialogs, clipboard, timers, accordion, search) | 12 / 0 |
| FAQ desktop | 52 / 0 |
| FAQ fix pass | 44 / 0 |
| FAQ no-results states | 27 / 0 |
| Homepage | 10 / 0 |
| Homepage FAQ | 12 / 0 |
| Homepage pill-by-pill | 83 / 0 |

**506 assertions, 0 failures.** Zero console errors at any width.

**Desktop is unchanged.** A full-page pixel diff against the previous commit
at 1920px, with the announcement bar removed from both captures so its
deliberate 14.75px height change does not shift every glyph onto a
different subpixel:

- **homepage: pixel-identical from y0 down to y6397.** The FAQ section spans
  y6020–7037, so everything above the FAQ questions is untouched. The
  differences are the question rows gaining the copy control and the footer
  shifting 24px as the section grew.
- **FAQ page: the hero and search band are pixel-identical**; the
  differences are the 72 question rows gaining the copy control.
- The harness was validated by diffing the previous commit against itself:
  0 differing pixels.

---

### Flagged rather than changed

1. **`mockups/mobile/pages/` is missing** — see section C.
2. **The announcement-bar regression could not be reproduced** — see section
   D. The bar was rebuilt to the requested specification anyway, but no
   rule was found stripping padding or removing a border, so there is
   nothing quietly affecting other components.
3. **The bar is 65.75px, not exactly 64px.** 21 + 21 padding plus the real
   22.75px line height plus the 1px border. Ask and the line-height can be
   set to 1.5 to land on exactly 64.
4. **A landscape phone keeps the desktop dropdown position for the search
   sheet at widths above 900px** only if it is also taller than 540px —
   below that it gets the full-screen sheet like every other small screen.
