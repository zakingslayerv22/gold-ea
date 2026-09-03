# Tablet Visual Fidelity Pass

**Date:** 3 September 2026
**Scope:** audit the existing responsive implementation against
`mockups/tablet.png` and correct genuine discrepancies only.

No third layout was created. There is no tablet-only HTML page, no
tablet-only stylesheet and no tablet fork of any script. Everything still
runs from `index.html`, `frequently-asked-questions.html`,
`assets/styles/styles.css` and the existing modules in `assets/scripts/`.

`CLAUDE.md` was not modified. `DESKTOPUPDATE.md`, `MOBILE.md` and
`FAQ-PAGE.md` were not modified.

---

## 1. Reference Viewport

`mockups/tablet.png` is 480 x 4931 px — a downscaled export, not a
1:1 capture, so its pixel widths could not be read as CSS pixels
directly.

The scale was recovered by fitting elements whose CSS values are already
known and fixed (header height, logo box, announcement-bar height,
container gutter) against their ink bounding boxes in the mockup. Those
anchors agreed on a factor of **≈0.523**, which puts the mockup's design
width at:

```
480 / 0.523 ≈ 918 CSS px
```

**918px was therefore used as the tablet reference viewport.** Every
measurement below was taken there, with 878px and 958px sampled either
side to confirm a finding was a range behaviour rather than a
single-width coincidence.

---

## 2. Structural Audit — No Change Required

The following were measured at 878 / 918 / 958 / 1024px and compared
against the mockup's composition. **Each one already matched. None of
them was changed.**

| Area | Mockup | Build at 918px |
|---|---|---|
| Announcement bar | single row, dismissible | matches |
| Header / navigation | inline nav, no hamburger | inline nav, burger hidden |
| Language selector | inline, panel opens in place | matches |
| Hero | stacked — copy above chart | stacked |
| Live chart container | full width under the copy | matches, clear of the chat widget |
| Quick Benefits | 2 columns | 2 columns |
| How It Works | 2 columns | 2 columns |
| Live Results | statistics row intact | matches |
| Pricing | 1 column | 1 column |
| Source Code | side-by-side row | side-by-side row |
| Free Access | stacked | stacked |
| Downloads | 2 columns | 2 columns |
| Homepage FAQ | 2 columns | 2 columns |
| Footer | matches | matches |
| Live chat widget | pinned, 56 x 56 | pinned, 56 x 56 |

Horizontal overflow was measured as `scrollWidth - clientWidth` at every
width above, on both pages: **0px throughout**. No `overflow: hidden` was
added to `body` or to any section to reach that number.

---

## 3. The One Genuine Discrepancy — FAQ Category Rail

On `frequently-asked-questions.html`, the category chips are a wrapping
bar on desktop and a single-row horizontally-scrolling rail on phones.
The rail's breakpoint was `max-width: 899.98px`, so at the tablet
reference width the chips fell back to the desktop wrapping bar:

| Width | Behaviour before | Rail height | Share of viewport |
|---|---|---|---|
| 768px | scrolling rail | 62px | 6% |
| 880px | scrolling rail | 62px | 6% |
| **918px** | **wrapping bar** | **208px (3 rows)** | **23%** |
| 1024px | wrapping bar | 208px | 20% |

The chips sit inside the sticky bar, so those 208px were pinned above the
answers for the whole scroll — 23% of a 918px-tall-ish tablet viewport
spent on navigation chrome. That is the same problem the phone rail was
built to solve, and it is a real responsive fault rather than a
desktop/tablet difference.

**Change made — two files, one behaviour:**

- `assets/styles/styles.css` — the rail media query moved from
  `(max-width: 899.98px), (max-height: 540px)` to
  `(max-width: 1023.98px), (max-height: 540px)`.
- `assets/scripts/faq-page.js` — `isMobile()`, which decides when the
  pinned search button exists, moved to the identical query so the script
  and the stylesheet cannot disagree about where the rail lives.

`1023.98px` is not an arbitrary number: it is the existing desktop
breakpoint already used elsewhere in the stylesheet, and the chips do not
fit on one row until roughly 1000px. Tablet now shares the phone's rail
rather than gaining a third behaviour of its own; desktop keeps its
approved wrapping bar, unchanged.

Verified by sweeping 600 → 1026px in 6px steps: the rail is 62px and one
row for every width up to 1023, and the wrapping bar resumes at exactly
1024.

---

## 4. Considered and Deliberately Not Changed

**Header wrapping under translation.** German lengthens "How It Trades"
to "Wie es gehandelt wird", and at 918px the translated nav wraps onto
two rows. A change was drafted to force the nav onto one row and let the
header wrap instead. It was reverted, because measurement did not support
it:

- the existing behaviour produces 0 horizontal overflow, 0 labels broken
  mid-phrase, and the header still at its designed 80px;
- the forced-single-row version grew the header to 129px — a *larger*
  departure from the tablet reference than the thing it addressed;
- the tablet mockup is in English, where the nav already fits on one row
  at 918px (nav 492px wide, list 361px), so this is not a tablet-fidelity
  discrepancy at all.

An earlier reading of this as "five ragged nav rows at 810px" was my
measurement error: 810px is below the hamburger breakpoint, so what was
being measured was the mobile drawer's correctly-stacked links, not a
wrap bug.

**Everything in §2.** Audited, measured, unchanged.

---

## 5. Breakpoints Affected

Only one query moved, and only for the FAQ category rail:

```
899.98px  →  1023.98px
```

- **Below 900px** — unchanged; the rail was already active.
- **900px – 1023.98px** — now uses the rail instead of the wrapping bar.
  This is the only range whose rendering differs after this pass.
- **1024px and above** — unchanged; the desktop wrapping bar is
  untouched.
- The `(max-height: 540px)` arm is unchanged, so landscape phones keep
  the rail regardless of width.

No other breakpoint, token, container width or gutter was altered.

---

## 6. Regression Checks Performed

**Tablet suite** (`tablet.mjs`) — 99 assertions at 768 / 810 / 834 / 878
/ 918 / 958 / 1024px, both pages: no horizontal overflow; every card
inside the viewport; pricing and source-code timers reserve their space
when hidden (`visibility: hidden`, `display: flex`, 28px retained); the
chat widget clear of content; rail proportion within budget; search,
no-results, category-content scroll below the sticky rail, sticky search,
accordion behaviour and popular questions. **99 passed, 0 failed.**

**Translation at tablet** (`ttrans.mjs`) — German applied at 918 and
960px: panel opens, translation applies, 0px overflow, no page zoom
(scale 1, width unchanged), no nav label broken mid-phrase, inline nav in
use rather than the drawer, and `GOLDENBOX EA` still protected from
translation. **18 passed, 0 failed.**

**Desktop header** (`headercheck.mjs`) — 1920 / 1440 / 1024 / 918 / 810 /
390px: header height and hero offset unchanged from their approved
values.

**Full matrix** — the seventeen existing suites re-run end to end across
desktop, tablet and mobile on both pages, covering the announcement bar
and its version system, navigation, translation, identity-string
protection (including the wallet address), hero, all sections, pricing
and its timers, the source-code timer, free access, downloads, copy-link
and clipboard interactions, the FAQ page and homepage FAQ, the search
shine and rotating placeholder, dialogs, footer and the live chat widget:

```
verify 48 · interact 12 · identity 82 · copy 23 · mobile 60 · barfull 24
version 24 · interact2 47 · sctimer 27 · glitter 28 · tablet 99
faq/test 52 · faq/fix 44 · faq/states 27 · hpcheck 10 · hpfaq 12
pills 83
```

**702 passed, 0 failed.**

---

## 7. Summary

- Tablet reference viewport established at **918 CSS px**.
- **One** discrepancy found and fixed: the FAQ category rail wrapped to
  three rows (208px, 23% of the viewport) across the tablet range.
- **Two** files changed — `assets/styles/styles.css` and
  `assets/scripts/faq-page.js` — carrying a single behavioural change
  between them.
- One further change was drafted, measured, found unjustified, and
  reverted.
- Everything else listed in this document was audited only.

---
---

# FAQ Page — Tablet Pass

**Date:** 3 September 2026
**Scope:** `frequently-asked-questions.html` only.

`index.html` was not modified in this pass, and §5 below proves it was not
affected either. No tablet-only HTML, no new component, no redesign.

---

## 1. There Is No FAQ Tablet Mockup

The repository contains three tablet-relevant references:

| File | What it is |
|---|---|
| `mockups/tablet.png` (480 x 4931) | the **homepage** at tablet |
| `mockups/desktop/pages/01-faq-desktop.png` (1920 x 8978) | the FAQ page at **desktop** |
| `mockups/desktop/pages/02-faq-answers-not-found-desktop.png` | the FAQ no-results state at **desktop** |

**A tablet mockup of the FAQ page was not supplied.** Rather than invent
one, the reference was derived from what exists:

- **Reference width — 918 CSS px.** Unchanged from the homepage tablet
  pass: `mockups/tablet.png` is a downscaled export, and fitting header,
  logo, announcement-bar and gutter anchors whose CSS is already fixed
  gives a scale of ≈0.523, so 480 / 0.523 ≈ 918. Tested at 878 and 958
  either side, plus 768, 834, 1024, 1065, 1066 and 1194.
- **Shared chrome** (announcement bar, header, navigation, language
  selector, footer, live chat) — governed by `mockups/tablet.png`, since
  the FAQ page must match the homepage.
- **FAQ-specific composition** (hero, search, popular questions, category
  bar, cards, no-results, "Still have a question?", back link) —
  governed by the FAQ desktop mockups, adapted responsively.

---

## 2. Audit — Matched the Reference, Not Changed

Measured at 768 / 834 / 878 / **918** / 958 / 1024 px on the FAQ page:

| Area | Finding |
|---|---|
| Announcement bar | 88px, padding 21px top and bottom, text on two lines — **the tablet mockup shows the same two-line wrap**, so this matches |
| Header | 80px; inline nav, hamburger not shown at 918 — matches the mockup |
| Logo / site name | matches |
| Translation control | inline, panel opens in place |
| Page title | 48px, identical to desktop; no tablet-specific drift |
| Lead text | wraps correctly, not clipped |
| Main search | max 720px, becoming fluid below a 720px container (704px at 768) — never overflows |
| Popular questions | 6 chips, wrapping 5→4→3 rows as width grows; no overflow |
| FAQ cards | **single column**, matching the desktop mockup; 854px at 918px |
| Question text | wraps naturally; 0 clipped at every width |
| Answer padding | `0 26px 24px`; text not clipped when open |
| No-results | centred, 854px at 918px, mutually exclusive with results |
| "Still have a question?" | 854px card, button centred |
| Back to homepage | centred, 236px, `href="index.html"` unchanged |
| Footer | 301px, four rows, content unchanged |
| Live chat | 56 x 56 at 24px from both edges, clear of the rail and the CTA |
| Horizontal overflow | **0px** at every width, on load and after search, accordion, category and popular interactions |

A metric in my own harness initially reported the `72 questions` /
`Expand all` toolbar as two rows at tablet. It is not: the toolbar is
`flex-direction: row; flex-wrap: nowrap; justify-content: space-between`
at every width including 1920, and the two children simply have different
heights, so their `top` values differ under `align-items: center`. The
measurement was wrong, not the layout. **No change made.**

---

## 3. The Discrepancy — A Three-Row Category Bar at 1024–1065px

The previous pass gave tablet the phone's single-row scrolling rail below
1024px. Sweeping upward from there exposed a band where the desktop
wrapping bar renders **worse than either neighbour**:

| Width | Mode | Bar height | Rows |
|---|---|---|---|
| ≤ 1023px | rail | 62px | 1 |
| **1024–1065px** | **wrap** | **259px** | **3** |
| ≥ 1066px | wrap | 199px | 2 |

The bar's content box caps at `--faq-bar-width` (1040px) but is
`viewport - --gutter * 2` until then. The ten chips need a 1002px content
box to make the two rows the desktop design was approved with, and
1002 + 32 * 2 = **1066px** of viewport. Below that they need three.

This is not "different from desktop" — it is a non-monotonic step, and it
peaks exactly on **iPad landscape (1024 x 768)**, where 259px is **34% of
the viewport height** pinned above the answers for the whole scroll.

**Change made — two files, one behaviour:**

- `assets/styles/styles.css` — the rail query moved from
  `(max-width: 1023.98px)` to `(max-width: 1065.98px)`, with the
  derivation above written into the comment so the number can be
  re-derived if a category is ever added.
- `assets/scripts/faq-page.js` — `isMobile()`, which decides whether the
  pinned Search button exists, moved to the identical query so the script
  and the stylesheet cannot disagree about where the rail lives.

The `(max-height: 540px)` arm is unchanged. Result:

| Viewport | Before | After |
|---|---|---|
| iPad classic landscape 1024 x 768 | 259px, 34% | **62px, 8%** |
| iPad Air landscape 1112 x 834 | 199px, 24% | 199px, 24% *(unchanged)* |
| iPad Pro 11 landscape 1194 x 834 | 199px, 24% | 199px, 24% *(unchanged)* |
| Laptop 1440 x 900 | 199px, 22% | 199px, 22% *(unchanged)* |
| All portrait tablets | 62px | 62px *(unchanged)* |

Swept 1010 → 1200px in 2px steps: the transition is now a single clean
step — rail up to 1065, approved two-row bar from 1066 — with the
three-row band gone.

---

## 4. A Scope Leak Found and Closed

`.faq-copy-link { margin-inline-start: 0 }` sat unscoped inside that
media query. The same copy control is rendered inside the **homepage**
FAQ section (`main.js` renders six of them), so the rule was reaching
`index.html` — and had been doing so since the previous pass widened the
query to 1023.98px. That was an unintended homepage change.

It is now scoped to `.faq-group .faq-copy-link`, a container that exists
only on the FAQ page. Verified: the homepage still renders six copy links
and they keep their desktop `margin-inline-start: 4px` at 1024px.

---

## 5. Proof the Homepage Is Unaffected

Every selector inside the changed media query was extracted from the
stylesheet by brace-walking and run against the live homepage DOM, with
the homepage FAQ section opened so its questions and copy links exist:

```
selectors inside the changed query: 18
homepage @  918px: no selector in the block matches anything
homepage @ 1024px: no selector in the block matches anything
homepage @ 1065px: no selector in the block matches anything
```

`index.html` contains zero occurrences of `faq-sticky-bar`,
`faq-category-navigation`, `faq-category-button`, `faq-group`,
`faq-page*`, `faq-popular` or `faq-question__trigger`.

A full-page pixel comparison was attempted first and discarded as
invalid: the homepage differed at *every* width including 1200 and 1440,
which the change cannot reach, because the page renders live content —
the rotating search placeholder, countdown timers and live statistics.
The selector-match test above is deterministic and is what the claim
rests on.

---

## 6. Breakpoints Affected

One query moved, and only for the FAQ category rail:

```
1023.98px  →  1065.98px
```

- **≤ 1023px** — unchanged, rail already active.
- **1024–1065px** — now uses the rail instead of the three-row bar. This
  is the only range whose rendering differs after this pass.
- **≥ 1066px** — unchanged; the approved desktop two-row bar is untouched.
- The `(max-height: 540px)` arm is unchanged, so landscape phones keep the
  rail regardless of width.

No new breakpoint was introduced. No token, container width, gutter,
font size or spacing value was altered anywhere.

---

## 7. Regression Checks Performed

**Preserved-functionality checks at 390 / 878 / 918 / 1024 / 1440px**, all
passing: sticky rail pinned at top 0; sticky Search button present;
compact search opens flush under the rail at 107px (never a full-screen
overlay, `coversViewport: false`), takes focus, filters live, syncs the
main field, and returns focus to its toggle on Escape; no-results shown
with zero groups visible; accordion opens one answer; clicking the same
question closes it; clicking another closes the previous; **clicking
outside does not close the open answer** (verified 1 → 1); popular
question opens its own answer below the rail with the right category
active; category click scrolls the category content below the rail with
the active chip in view; announcement bar, footer, back link and live
chat intact.

**Tablet suite** (`tablet.mjs`) — extended this pass to 1065, 1066 and
1194 and its stale 1024 boundary assertion corrected to 1066:
**141 passed, 0 failed.**

**FAQ translation at tablet** (`faqtrans.mjs`, new) — German at 918 and
1024px: translation applies, 0px overflow, no zoom, rail stays one pinned
row, `GOLDENBOX EA` and `v4.2.3` still protected from translation, and
the accordion still works translated. **18 passed, 0 failed.**

**Full matrix** — the existing suites across desktop, tablet and mobile
on both pages:

```
verify 48 · interact 12 · identity 82 · copy 23 · mobile 60 · barfull 24
version 24 · interact2 47 · sctimer 27 · glitter 28 · tablet 141
faq/test 52 · faq/fix 44 · faq/states 27 · hpcheck 10 · hpfaq 12
pills 83 · faqtrans 18
```

**762 passed, 0 failed.**

---

## 8. Summary

- No FAQ tablet mockup exists; the reference was derived and the
  derivation is stated above rather than assumed.
- Everything in §2 was **audited and left alone**.
- **One** discrepancy fixed: the three-row, 259px category bar at
  1024–1065px, worst on iPad landscape at 34% of the viewport.
- **One** scope leak closed: `.faq-copy-link` was reaching the homepage.
- **Two** files changed — `assets/styles/styles.css` and
  `assets/scripts/faq-page.js`.
- The homepage is provably unaffected.
