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
