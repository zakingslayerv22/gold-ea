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
