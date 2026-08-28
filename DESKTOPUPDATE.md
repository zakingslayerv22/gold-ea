# GoldTrap Website Project

This file is the permanent specification for this website.

Read and follow this document before making implementation decisions.

## Development Workflow

The website will be implemented in three responsive phases:

1. Desktop
2. Mobile
3. Tablet

Do not fully implement all three responsive layouts simultaneously.

Complete and visually refine the desktop version first.

After desktop is stable, adapt it to the supplied mobile references.

After mobile is stable, adapt it to the supplied tablet references.

The supplied screenshots are the visual source of truth.

Do not redesign the website unless explicitly instructed.

Website Creation & Development Specification

1. Objective
   I will provide website mockups section-by-section. For each section, I may provide:
   • Desktop view
   • Tablet view
   • Mobile view
   Your task is to create the website as an accessible, responsive, visually faithful carbon copy of the supplied mockups.
   The mockups are the primary source of truth for:
   • layout
   • spacing
   • typography
   • colors
   • borders
   • shadows
   • buttons
   • icons
   • images
   • positioning
   • visual hierarchy
   • responsive behavior
   Do not redesign, modernize, simplify, or otherwise alter the visual design unless necessary for accessibility, responsiveness, or functional correctness.
   The website should consist of:
   /index.html
   /frequently-asked-questions.html

/assets/
/images/
/scripts/
main.js
faq-index-page.js
/styles/
styles.css
Core architecture requirements
• All CSS must be in assets/styles/styles.css.
• All JavaScript must be in JavaScript files.
• Do not use inline <style> blocks.
• Do not use inline JavaScript.
• Use semantic HTML5.
• Use descriptive class names, IDs, and variable names.
• Add helpful comments throughout the code, especially around configuration and complex interactions.
• Keep JavaScript modular and maintainable.
• Avoid unnecessary libraries/frameworks.
• The website must work on desktop, tablet, and mobile.
• Prioritize accessibility and keyboard usability.

---

2. Global JavaScript Configuration
   At the top of:
   assets/scripts/main.js
   create a clearly labelled configuration section.
   At minimum:
   // ======================================================
   // SITE CONFIGURATION
   // ======================================================

const siteName = "YOUR SITE NAME";
const siteOwner = "YOUR SITE OWNER";

// ======================================================
// TELEGRAM
// ======================================================

const telegramPersonal = "YOUR PERSONAL TELEGRAM LINK";
const telegramChannel = "YOUR TELEGRAM CHANNEL LINK";

// ======================================================
// PAYMENT
// ======================================================

const walletAddress = "YOUR WALLET ADDRESS";
const network = "BSC BEP20";
const amountSuffix = "USDT";

// ======================================================
// LIVE ACTIVITY
// ======================================================

const liveActivityColor = "green";

// ======================================================
// LIVE STATISTICS
// ======================================================

const licenseKeysGeneratedToday = "24";
const easRunningToday = "2,371";

// ======================================================
// DOWNLOAD / WHITELIST
// ======================================================

const metaTraderWhitelist = "https://a689.link";

// ======================================================
// FOOTER
// ======================================================

const footerCaveat = "YOUR FOOTER CAVEAT TEXT";
const termsAndConditionsLink = "YOUR TERMS AND CONDITIONS URL";
Add comments explaining what each setting controls.

---

3. Site Name and Metadata
   Every visible instance of:
   GOLDTRAP EA
   that represents the site/product name should use:
   siteName
   Do not hard-code the site name elsewhere.
   Use siteName in all relevant metadata, including:
   • <title>
   • meta description/site references
   • Open Graph metadata
   • Twitter/social metadata
   • other site-identifying metadata
   Use the supplied/recreated GB logo as the website logo.
   Use the GB logo as the favicon.

---

4. Assets
   All supplied images, logos, icons, and other visual assets should be placed in:
   assets/images/
   Use supplied assets whenever available rather than replacing them with approximations.
   The logo shown beside the site name should be the GB logo.

---

5. Section 1 — Hero + Navigation
   Recreate the supplied Hero and Navigation section as closely as possible.
   Maintain the same left/right composition shown in the mockup.
   Preserve:
   • navigation
   • hero heading
   • hero text
   • buttons
   • imagery
   • decorative elements
   • typography
   • spacing
   • alignment
   • proportions
   • responsive behavior
   Use the supplied desktop/tablet/mobile mockups as the source of truth for responsive changes.
   Do not arbitrarily rearrange elements.

---

5.1 Top Action Bar
Create the action bar shown at the top.
Requirements:
• User can close/dismiss it.
• The text is an anchor/link.
• Default text color is gray.
• On hover, the text becomes white.
• Its destination must be configurable.
• When dismissed, it should remain hidden for the current page session.

---

5.2 Navigation
Recreate the navigation exactly as shown.
Requirements:
• Navigation links become white on hover.
• Preserve spacing and typography.
• Use semantic navigation markup.
• Support keyboard navigation.
• Implement the mobile navigation shown in the mobile mockup.
• Do not substitute a different navigation design.

---

5.3 Translation / Language Selector
Implement the translation control shown in the mockup.
Requirements:
• Approximately 15 popular languages.
• Search functionality.
• User can select a language.
• Use JavaScript and Google Translate where technically feasible.
• Match the supplied dropdown visually.
• Clicking the translation control toggles the dropdown.
• Clicking anywhere outside the dropdown closes it.
The translation system must not interfere with normal navigation.

---

5.4 Live Chart Container
The Hero section must contain a dedicated container into which I can later insert a live chart/API integration.
For example:

<div id="live-chart-container"></div>
Do not create a fake chart if the mockup expects an externally supplied/live chart.
The container must already have the correct dimensions, position, and styling so an external chart can be inserted without changing the hero layout.
________________________________________
5.5 Live Chat Widget
Recreate the live chat widget shown in the mockup.
Requirements:
•	It remains visible as shown.
•	It has an Online indicator.
•	The indicator remains visually active.
•	The avatar/image must come from assets/images.
•	It must be accessible and keyboard usable.
•	Its appearance should closely match the mockup.
________________________________________
6. Section 2 — Quick Benefits
Recreate the Quick Benefits section exactly as shown.
On hover, each benefit item must:
•	change text color to the same color used by its tick/check icon
•	respond visually through its border
•	preserve the overall layout
Do not redesign this section.
________________________________________
7. Section 3
Recreate Section 3 exactly as supplied.
Maintain:
•	layout
•	spacing
•	typography
•	images
•	buttons
•	borders
•	shadows
•	colors
•	responsive behavior
Do not redesign this section.
________________________________________
8. Section 4 — Live Results
Recreate the Live Results section exactly as shown.
________________________________________
8.1 View Live Results Button
The button must redirect to the configured Telegram channel:
telegramChannel
Do not hard-code the final URL into the HTML.
________________________________________
8.2 Live Activity Indicator
Create a continuously pulsing status dot.
Make the color configurable from main.js.
Example:
const liveActivityPulsingDot = document.querySelector(".pulsing-dot");

if (liveActivityPulsingDot) {
liveActivityPulsingDot.style.background = liveActivityColor;
}
The initial color should be:
green
Add comments explaining that this controls the live-activity indicator color.
The pulsing effect itself should be implemented in CSS.

---

8.3 Live Statistics
The numbers/text must be configurable using JavaScript .textContent.
Statistic 1
24
license keys generated today
Statistic 2
2,371
EAs running today
Example configuration:
const licenseKeysGeneratedToday = "24";
const easRunningToday = "2,371";
Do not permanently hard-code those values in the HTML.

---

9. Section 5 — Get GoldTrap EA
   Recreate the pricing section exactly as shown.

---

9.1 Pricing Grid
Build the pricing cards using a responsive grid capable of displaying up to four plans.
Use an approach equivalent to:
grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
The actual widths, spacing, and proportions must still match the mockups.
The implementation must make it easy to add another plan later.

---

9.2 Dynamic Pricing
Prices must be controlled from JavaScript.
Do not create pricing logic that depends on duplicated hard-coded values.
The system should allow configuration of:
• plan name
• current price
• countdown duration
• increment
• timer visibility

---

9.3 Independent Countdown Timers
Every pricing card must have its own independent countdown timer.
Use a reusable timer function such as:
setTimer()
Each plan must be independently configurable.
The configuration must allow me to define:
• starting price
• countdown duration
• increment
• timer visibility
• price update behavior
Example:
let increment = 20;
When the countdown ends:
new price = current price + increment
The displayed price must be updated with JavaScript.
Each pricing card must maintain its own timer state.

---

9.4 Timer Show/Hide
Each plan must support:
status = "show";
or:
status = "hide";
Expected behavior:
if (status === "show" && timerTime > 0) {
// show the timer and perform timer logic
}
When hidden:
• timer is visually hidden
• allocated space remains
Use:
visibility: hidden;
rather than:
display: none;
The layout must therefore remain unchanged when the timer is hidden.

---

9.5 Telegram Configuration
Provide:
const telegramPersonal = "...";
const telegramChannel = "...";
These values must be reused throughout the site.
Do not create duplicated hard-coded Telegram URLs.

---

10. EA Purchase Dialog
    Every Buy Now button in Section 5 must open a reusable purchase dialog.
    Prefer a semantic <dialog> implementation.

---

10.1 Dynamic Plan and Amount
The dialog must obtain its plan name and amount dynamically from the selected pricing card.
For example, if the user clicks:
Buy Now — $299 USDT
on the:
5 Accounts
plan, the dialog should show:
Plan: 5 Accounts
Amount: $299
Do not hard-code these values separately inside the dialog.
Use the actual selected card's content or associated data.

---

10.2 Payment Configuration
Use:
const walletAddress = "...";
const network = "BSC BEP20";
const amountSuffix = "USDT";
These values must populate the payment dialog dynamically.

---

10.3 Wallet Address Interaction
The wallet address area must be interactive.
On hover:
• border changes to #DDB954
• copy icon changes to #DDB954
On click:

1. Copy the wallet address.
2. Replace the copy icon with a green checkmark.
3. Keep the checkmark for 5 seconds.
4. Restore the copy icon after 5 seconds.
   Use the Clipboard API where supported.
   The control must be keyboard accessible.
   Prefer a semantic <button> rather than relying on a clickable <div>.

---

10.4 Confirm Payment on Telegram
The Confirm Payment on Telegram button must link to:
telegramPersonal
On hover:
background: #DDB954;
Preserve sufficient text contrast.

---

10.5 Dialog Closing
The purchase dialog must close when:
• the X button is clicked
• the user clicks outside the dialog content/backdrop
• Escape is pressed
The dialog must be accessible and keyboard friendly.

---

11. Section 6 — Source Code
    Recreate the Source Code section exactly as shown.
    Do not redesign it.

---

11.1 Global Button Hover
Buttons that use the original orange-ish style should use:
#09090B
on hover.
All buttons across the website should become subtly lighter on hover while preserving the original visual design.
Use smooth transitions.

---

12. Source Code Purchase Dialog
    The Purchase — $9,650 button must open a dialog.
    The dialog title must come dynamically from the actual page heading:
    Get the Source Code
    Do not hard-code a second copy.
    The price must come dynamically from the actual visible source-code price:
    $9,650
    If the page heading or price changes, the dialog should reflect the changed content automatically.

---

12.1 EA Title
The dialog should dynamically obtain the EA title from the page content, for example:
GOLDTRAP EA v4.2.3
Do not maintain an unnecessary duplicate hard-coded version.
The Source Code text/content should also reflect the corresponding source-code content from the page.

---

12.2 Discuss on Telegram
The Discuss on Telegram button must redirect to the appropriate configured Telegram URL.
Reuse the same dialog accessibility behavior.

---

13. Section 7 — Free Access
    Recreate the Free Access section exactly as shown.
    Do not redesign it.
    Maintain the supplied responsive behavior.

---

14. Download Section
    Recreate the Download section exactly as shown.
    The MetaTrader whitelist/download link must be configurable from JavaScript:
    const metaTraderWhitelist = "https://a689.link";
    Do not hard-code the final URL anywhere else.

---

14.1 Copy URL
The copy control must:

1. Copy the configured URL.
2. Change Copy to Copied.
3. Show a checkmark.
4. Remain in that state for 5 seconds.
5. Restore the original Copy state.
   The interaction must be accessible and keyboard friendly.

---

15. Homepage FAQ Section
    The homepage FAQ section should remain visually mostly unchanged from the supplied mockup.
    Categories may include:
    • Basics
    • Account & Broker
    • other categories supplied in the mockup

---

15.1 FAQ Categories
Each category must:
• become active when clicked
• receive the same active color that Basics has in the mockup
• change inactive category text to white on hover
• display its corresponding FAQ questions
Only one category should be treated as active at a time.

---

15.2 FAQ Accordion
Each question must:
• open when clicked
• reveal its answer
• close when clicked again
• close when its ^ control is clicked
• close when another FAQ opens
• allow only one FAQ to remain open at a time
Use accessible accordion patterns with appropriate ARIA attributes such as:
aria-expanded
aria-controls

---

16. FAQ Data Architecture
    Store FAQ data in:
    assets/scripts/faq-index-page.js
    Use a class-based service with a private field.
    Example:
    class FaqServiceHomepage {
    // Keep FAQ data private and expose it through methods.
    #faqData = {
    1: {
    name: "Basics",
    questions: {
    1: {
    q: "What is GoldTrap EA?",
    a: "GoldTrap EA is an Expert Advisor for MetaTrader 4 and MetaTrader 5..."
    },
    2: {
    q: "Can GoldTrap EA be used on MT4 and MT5?",
    a: "Yes, it supports both platforms."
    }
    }
    }
    };

        getFaqData() {
            return this.#faqData;
        }

        getCategory(id) {
            return this.#faqData[id] || null;
        }

    }

export const faqServiceInstance = new FaqServiceHomepage();
Use ES modules.
The homepage should import:
import { faqServiceInstance } from "./faq-index-page.js";
Then:
const faqData = faqServiceInstance.getFaqData();
Build the FAQ markup dynamically from this data.
Do not duplicate the full FAQ content manually in the HTML.

---

17. Frequently Asked Questions Page
    Create:
    frequently-asked-questions.html
    This page must display the complete FAQ collection.
    Use the same FAQ service/data source.
    Do not maintain a second independent FAQ database.
    The homepage:
    Browse All Questions
    button must navigate to:
    frequently-asked-questions.html
    The complete FAQ page must visually match the homepage.

---

18. Section 8 — Footer
    Recreate the footer mostly as shown in the mockup.
    The footer should include, in the appropriate visual order:
1. Existing footer content from the mockup
1. Copyright line
1. Configurable caveat/disclaimer
1. Terms and Conditions notice
1. Telegram icon/link

---

18.1 Dynamic Copyright
The copyright line must be generated dynamically.
Example:
© 2026 SITE NAME by SITE OWNER
Use:
new Date().getFullYear()
for the current year.
Use:
siteName
for the site name.
Use:
siteOwner
for the owner.
Do not hard-code the year.

---

18.2 Configurable Footer Caveat
The caveat/disclaimer text shown at the bottom of the footer must be configurable directly from main.js.
Create:
const footerCaveat = "YOUR FOOTER CAVEAT TEXT";
Create a dedicated HTML element:

<p id="footer-caveat"></p>
Populate it from JavaScript using .textContent.
Example:
const footerCaveatElement = document.getElementById("footer-caveat");

if (footerCaveatElement) {
footerCaveatElement.textContent = footerCaveat;
}
Do not hard-code the final caveat text into the HTML.
Add a comment explaining that this is the editable footer caveat/disclaimer.

---

18.3 Terms and Conditions Notice
Immediately underneath the footer caveat, display:
Using this site and/or any of its products puts you under its Terms and Conditions
The words:
Terms and Conditions
must be an anchor.
Its URL must be configured through:
const termsAndConditionsLink = "YOUR TERMS AND CONDITIONS URL";
Example HTML:

<p class="terms-notice">
    Using this site and/or any of its products puts you under its
    <a id="terms-and-conditions-link" href="#">
        Terms and Conditions
    </a>
</p>
Set the URL from JavaScript:
const termsLinkElement = document.getElementById(
    "terms-and-conditions-link"
);

if (termsLinkElement) {
termsLinkElement.href = termsAndConditionsLink;
}
The Terms and Conditions link must behave like the other website links:
• normal site link color by default
• white on hover
• smooth transition
• visible keyboard focus state
• accessible
Do not hard-code the production URL into the HTML.

---

18.4 Footer Telegram Icon
The Telegram icon/container below the Terms and Conditions notice must be interactive.
It should be a proper link using the configured Telegram destination.
On hover:
• container background becomes lighter
• Telegram icon becomes white
• container border becomes white
The hover effect must affect the entire clickable container, not just the icon.
The transition should be smooth.
Use the configured:
telegramChannel
or the appropriate existing Telegram configuration value.
Do not create a separate hard-coded Telegram URL.
The Telegram link must:
• be keyboard accessible
• have a visible focus state
• have an accessible label, such as aria-label="Telegram"
• preserve the dimensions and position shown in the mockup

---

19. Footer Configuration Summary
    Keep these values in the configuration section of main.js:
    // ======================================================
    // FOOTER CONFIGURATION
    // ======================================================

const footerCaveat = "YOUR FOOTER CAVEAT TEXT";

const termsAndConditionsLink = "YOUR TERMS AND CONDITIONS URL";

const telegramChannel = "YOUR TELEGRAM CHANNEL URL";
The final footer should use:
new Date().getFullYear()
siteName
siteOwner
footerCaveat
termsAndConditionsLink
telegramChannel
dynamically.

---

20. Scroll-Triggered Animations — Scroll Reveal
    Integrate subtle scroll-triggered reveal animations throughout the website.
    The goal is to make sections and selected contents progressively appear as they enter the viewport without changing the visual character of the supplied design.
    Do not make the animations distracting.

---

20.1 Default Animation
Use approximately:
• opacity: 0 → 1
• translateY: 30px → 0
• duration: 600ms
• easing: ease-out
Example:
.scroll-reveal {
opacity: 0;
transform: translateY(30px);
transition:
opacity 0.6s ease-out,
transform 0.6s ease-out;
}

.scroll-reveal.is-visible {
opacity: 1;
transform: translateY(0);
}

---

20.2 Intersection Observer
Use the native IntersectionObserver API.
Example:
const revealElements = document.querySelectorAll(".scroll-reveal");

const revealObserver = new IntersectionObserver(
(entries, observer) => {
entries.forEach((entry) => {
if (!entry.isIntersecting) {
return;
}

            entry.target.classList.add("is-visible");

            // Stop observing after the element has been revealed.
            observer.unobserve(entry.target);
        });
    },
    {
        threshold: 0.15
    }

);

revealElements.forEach((element) => {
revealObserver.observe(element);
});
Add comments explaining how to adjust:
• animation distance
• duration
• easing
• threshold

---

20.3 Elements to Animate
Apply .scroll-reveal selectively to things such as:
• section headings
• descriptions
• benefit cards
• feature cards
• live-result statistics
• pricing cards
• source-code content
• free-access content
• download content
• FAQ sections
• footer content where visually appropriate
Do not animate every single element individually.

---

20.4 Staggered Reveals
Where a group of cards/items enters together, use a subtle stagger.
For example:
.scroll-reveal:nth-child(2) {
transition-delay: 100ms;
}

.scroll-reveal:nth-child(3) {
transition-delay: 200ms;
}

.scroll-reveal:nth-child(4) {
transition-delay: 300ms;
}
Prefer a reusable solution where practical.
Do not create hundreds of unnecessary one-off CSS rules.

---

20.5 Reduced Motion
Respect the user's reduced-motion preference.
Use:
@media (prefers-reduced-motion: reduce) {
.scroll-reveal {
opacity: 1;
transform: none;
transition: none;
}
}
When reduced motion is enabled, content should appear normally without animation.

---

20.6 Animation Safety
Scroll reveal must never:
• create horizontal scrolling
• change layout unexpectedly
• interfere with links/buttons
• interfere with dialogs
• interfere with FAQ accordions
• interfere with the live chart
• interfere with the live chat widget
• permanently hide important content
If JavaScript or IntersectionObserver fails, content must remain accessible.

---

21. Responsive Requirements
    Use the supplied mockups to determine the responsive implementation.
    Desktop
    Use the desktop mockup as the primary layout reference.
    Tablet
    Use the tablet mockup to determine:
    • widths
    • stacking
    • spacing
    • typography
    • navigation behavior
    • image placement
    • card layouts
    Mobile
    Use the mobile mockup to determine:
    • stacking
    • navigation
    • card layout
    • typography
    • spacing
    • buttons
    • dialogs
    • images
    • overflow behavior
    Do not simply shrink the desktop design.
    Build an intentionally responsive layout.

---

22. Accessibility Requirements
    The site must be accessible.
    At minimum:
    • semantic HTML5
    • keyboard navigation
    • visible focus states
    • logical tab order
    • accessible buttons
    • accessible links
    • accessible dialogs
    • accessible accordions
    • appropriate ARIA attributes
    • descriptive image alt text
    • adequate contrast
    • reduced-motion support
    Do not make interactive elements depend only on hover.
    Use a semantic <button> or <a> when appropriate rather than a clickable <div>.

---

23. General Button Behavior
    Across the website:
    • Preserve the button styling from the mockups.
    • All buttons become slightly lighter on hover.
    • Orange-ish buttons use #09090B on hover.
    • Hover transitions should be smooth.
    • Maintain readable text contrast.
    • Include visible keyboard focus states.
    Do not introduce excessive button animations.

---

24. Dynamic Content Rule
    Whenever a value is requested to be controlled from JavaScript, do not create a separate hard-coded duplicate.
    This applies to:
    • site name
    • site owner
    • prices
    • countdown timers
    • price increments
    • timer visibility
    • Telegram links
    • wallet address
    • payment network
    • payment currency
    • live statistics
    • live activity color
    • MetaTrader whitelist URL
    • source-code title
    • source-code price
    • EA title
    • footer caveat
    • Terms and Conditions URL
    • current year
    For example, if the selected pricing card contains $299, the purchase dialog must retrieve the selected price rather than contain its own hard-coded $299.
    The same principle applies throughout the site.

---

25. Pricing Data Architecture
    The pricing system should be easy to maintain and extend to four plans.
    Use a reusable data structure where practical.
    Example:
    const pricingPlans = [
    {
    planName: "1 Account",
    price: 99,
    increment: 20,
    timerTime: 3600,
    status: "show"
    },
    {
    planName: "5 Accounts",
    price: 299,
    increment: 20,
    timerTime: 3600,
    status: "show"
    }
    ];
    The actual plans/prices must come from the supplied mockups.
    Each plan must have independent timer behavior.

---

26. Dialog Architecture
    Create reusable dialog behavior rather than duplicated implementations.
    The dialog system should support:
    • EA purchase dialogs
    • Source Code purchase dialog
    The dialog should dynamically receive:
    • title
    • plan
    • amount
    • offer/source information
    Keep dialog behavior accessible, maintainable, and reusable.

---

27. JavaScript Safety and Defensive Coding
    JavaScript should gracefully handle missing elements.
    For example:
    const element = document.getElementById("some-element");

if (element) {
// perform operation
}
Do not allow an absent optional element to stop the rest of the site JavaScript from executing.
Use clear function names and group related logic into functions.

---

28. Code Quality
    Use:
    • semantic HTML
    • descriptive class names
    • descriptive IDs
    • CSS custom properties where useful
    • reusable JavaScript functions
    • ES modules
    • event delegation where appropriate
    • defensive element checks
    • meaningful comments
    • reusable components/logic
    Avoid:
    • inline CSS
    • inline JavaScript
    • duplicated FAQ data
    • duplicated dialog logic
    • unnecessary dependencies
    • unexplained magic numbers
    • excessive global state
    • unnecessary hard-coded configuration values

---

29. Final File Structure
    The final implementation should be:
    /
    ├── index.html
    ├── frequently-asked-questions.html
    │
    └── assets/
    ├── images/
    │ ├── favicon/logo/assets...
    │ └── other supplied images...
    │
    ├── scripts/
    │ ├── main.js
    │ └── faq-index-page.js
    │
    └── styles/
    └── styles.css

---

30. Implementation Priority
    When implementing the website, prioritize in this order:
1. Visual fidelity to the mockups
1. Correct desktop/tablet/mobile responsive behavior
1. Correct functionality
1. Accessibility
1. Maintainable code
1. Easy JavaScript configuration
   Do not sacrifice visual fidelity unless necessary for accessibility, responsiveness, or functional correctness.

---

31. Mockup Handling
    I will send the mockups section-by-section.
    When a new mockup section is supplied:
    • treat the mockup as authoritative for that section
    • inspect desktop/tablet/mobile differences carefully
    • reproduce the visual structure faithfully
    • do not invent unnecessary design elements
    • integrate the section with previously implemented sections
    • preserve existing functionality
    • ensure the new section remains responsive
    • maintain the same visual language throughout the entire website
    Do not implement a section based only on textual assumptions when an actual mockup has been provided.

---

32. Final Requirement
    The finished result must feel like the same website represented by the mockups, not a redesign inspired by them.
    It must combine:
    • pixel-faithful visual recreation
    • responsive desktop/tablet/mobile layouts
    • accessible HTML
    • maintainable CSS
    • modular JavaScript
    • dynamic configuration
    • reusable dialogs
    • dynamic pricing/countdowns
    • FAQ data architecture
    • scroll-reveal animations
    • live activity indicator
    • Telegram integrations
    • clipboard interactions
    • configurable footer content
    • configurable Terms and Conditions URL
    • responsive footer Telegram interaction
    All requested behavior should work without requiring me to manually modify the HTML after implementation, except where the specification explicitly says I will later insert external content such as a live chart/API.

---

# Desktop Update

**Date:** 28 August 2026
**Stage:** DESKTOP-COMPLETE / PRE-MOBILE
**Baseline:** the completed first desktop implementation (commit `b4b99ca`)

Mobile and tablet were **not** started. The desktop layout was not
redesigned: page height, section heights and every container width are
byte-for-byte identical to the baseline (7606px total, sections within
±22px of the mockup). Everything below is functionality and
configuration.

Everything above this line is the complete, unmodified contents of
`CLAUDE.md`. `CLAUDE.md` itself is unchanged and remains the permanent
specification.

---

## 1. Google Translate Element removed

**What changed.** The previous implementation injected
`https://translate.google.com/translate_a/element.js` directly, created
`#google_translate_element`, and switched languages by writing to
Google's `.goog-te-combo` select. All of it is gone.

**Where.** `assets/scripts/main.js` (`loadGoogleTranslate()`,
`applyTranslation()`, `initLanguageSelector()` deleted), `index.html` and
`frequently-asked-questions.html` (the `#google_translate_element` div
removed), `assets/styles/styles.css` (section 20 rewritten).

**Verify.** A project-wide search for `translate_a/element.js` and
`google_translate_element` returns nothing.

**What a future developer needs to know.** GTranslate is itself a wrapper
around Google's translation engine, so that script still gets requested
*by GTranslate's own CDN bundle* at runtime. What was removed is our
direct dependency on it: the string no longer appears anywhere in this
project's source, and we no longer drive Google's combo ourselves.

---

## 2. GTranslate Free implemented

**What changed.** Translation now runs on the free GTranslate widget,
loaded from `https://cdn.gtranslate.net/widgets/latest/dropdown.js`. No
paid plan, no translation API, no backend, no credentials. The site
remains fully static.

**Where.** `assets/scripts/main.js` → the `TRANSLATION — GTRANSLATE FREE`
section. Mount point: `<div class="gtranslate_wrapper">` at the bottom of
both pages, kept invisible by `styles.css` section 20.

**How it is configured.**

```js
const translationDefaultLanguage = "en";
const translationLanguages = [ /* the 17 shown when the panel opens */ ];
const translationExtraLanguages = [ /* 30 more, reachable by search */ ];
```

`main.js` assigns `window.gtranslateSettings` from those lists and then
injects the widget script, in that order — GTranslate reads the settings
object as its script parses, so assigning first is mandatory.

**Why `dropdown.js` and not `base.js`.** This matters, and it is the
single most important implementation note in this document.

GTranslate lazily loads Google's engine only when *its own* widget is
hovered or focused (`pointerenter` / `focusin`). `base.js` renders no
widget markup at all, so on a page that starts in English the engine
never loads, `doGTranslate()` retries forever against an empty
`#google_translate_element2`, and nothing translates. This was verified
against the real bundle, not assumed. `dropdown.js` renders a real
`<select class="gt_selector">` carrying those hooks. CLAUDE.md §
"If GTranslate requires an underlying selector or hidden widget in order
for the custom interface to control it, keep that implementation hidden"
explicitly sanctions this arrangement, so the hidden switcher is what we
drive.

**How our UI drives it.** Two documented interactions, nothing invented:

1. Opening the panel fires `pointerenter` and `focusin` on the GTranslate
   wrapper — GTranslate's own lazy-load hooks — so Google's engine is
   warm before the visitor has finished choosing.
2. Choosing a language sets the hidden `.gt_selector` value to `"en|xx"`
   and dispatches `change`, which is exactly what a visitor does on
   GTranslate's widget. GTranslate then calls its own `doGTranslate()`.

**Do not** call Google's engine directly, and do not hand-roll a
`googtrans` cookie write to translate — both are what made the previous
implementation unreliable.

---

## 3. Translation language switching fixed

**The bug.** Returning to English was slow, unreliable, and sometimes
silently did nothing.

**The root cause.** GTranslate decides whether a page is currently
translated by reading the `googtrans` cookie. If the cookie is cleared
*before* asking it to restore English, its guard
(`if (get_current_lang() == null && lang == source) return;`) short-
circuits, the call becomes a no-op, and the visitor is stranded in the
translated language.

**The fix.** `setSiteLanguage()` in `main.js` restores first and clears
second:

```js
callGTranslate("en|en");                  // restore the original text
window.setTimeout(clearTranslationCookie, 60);   // then forget the cookie
```

Clearing afterwards means a later page load also starts in English. No
page reload is involved at any point.

**Verified.** English → Portuguese / French / Spanish / German / Japanese
→ English all round-trip correctly, plus French → Spanish directly and
Spanish → English. Each case asserts three things: the text changed, it
came back identical to the original, and the cookie was cleared.

**Testing caveat, stated plainly.** Chromium in the build sandbox has no
outbound network access (curl does; the browser does not). The suite
therefore runs GTranslate's **real, unmodified `dropdown.js`** — the file
downloaded from their CDN — against a stand-in for Google's
`element.js` that renders the same `.goog-te-combo` select and maintains
the same `googtrans` cookie. That exercises every line of our integration
and all of GTranslate's own switching logic. What it cannot exercise is
Google's actual translation quality. **Confirm the five round-trips once
in a real browser before going live.**

---

## 4. siteName made globally authoritative

**What changed.** `siteName` is now the only place the product name is
written.

**Where and how.** `applySiteIdentity()` in `main.js` fills:

| Hook | Effect |
|---|---|
| `data-site-name` | element's text becomes `siteName` |
| `data-site-name-in` | `{siteName}` inside the text is substituted |
| `data-title-template` on `<html>` | pattern for `document.title` |
| `data-description` on `<html>` | pattern for the meta description |

The document title, meta description, `og:site_name`, `og:title`,
`og:description`, `twitter:title` and `twitter:description` are all
rewritten at runtime from those values.

FAQ content is covered too: `faq-index-page.js` now writes `{siteName}`,
`{siteOwner}` and `{eaVersion}` as tokens, and the FAQ renderer passes
every question and answer through `fillTokens()`. The FAQ data stays
separated from the rendering logic, exactly as before.

**One deliberate exception.** The HTML still contains the literal
`GOLDTRAP EA` inside `data-site-name` elements and in `<title>`. That is
the **pre-JavaScript fallback**, so the page is correct for crawlers and
for the moment before the module executes. Every one of those is
overwritten by `applySiteIdentity()` on load. Emptying them would leave
the page briefly nameless and hurt SEO, which would be a worse outcome
than the duplication. If you change `siteName`, they need no edit — they
are never displayed once JavaScript has run.

---

## 5. Case-insensitive site-name replacement performed

A case-insensitive sweep for `goldtrap ea` across all six project files
was run and repeated after the change. What remains, and why:

| Location | Status |
|---|---|
| `data-site-name` / `data-site-name-in` elements | intended pre-JS fallback, overwritten on load |
| `<title>` in both pages | intended fallback, overwritten on load |
| `const siteName = "GOLDTRAP EA"` | the authoritative value |
| Section banners in `main.js` / `styles.css` | code comments, not user-visible |
| A `styles.css` comment quoting the mockup's line break | documentation of the design, not user-visible |

No user-visible occurrence is hard-coded. 19 occurrences in the FAQ data
and 3 of the owner's name were tokenised as part of this pass.

---

## 6. eaCurrentVersion implemented

```js
const eaCurrentVersion = "v4.2.3";
```

Rendered through `data-ea-version` elements and composed into both dialog
titles by `getEaTitle()`, which returns `` `${siteName} ${eaCurrentVersion}` ``.
The purchase dialog reads "Purchase GOLDTRAP EA v4.2.3"; the source-code
dialog reads "GOLDTRAP EA v4.2.3 — Source Code". A search for `v4.2.3`
now returns only the configuration line and its explanatory comment.

---

## 7. eaCurrentFileName implemented

```js
const eaCurrentFileName = "GoldTrap_v4_2_3.ex5";
```

Rendered through `data-ea-filename="mt5"` and `data-ea-filename="mt4"`.
The MT4 name is **derived** by `eaFileNameFor()` swapping the extension,
so you edit one line and both download cards update. A search for
`GoldTrap_v4_2_3` returns only the configuration line.

---

## 8. Live-chat size reduced

72px → **68px**, per the update brief. `styles.css` section 18 and the
`width`/`height` attributes on the `<img>` in both pages.

---

## 9. Live-chat gold pulsing energy effect added

**What changed.** A continuous gold pulse behind the launcher.

**How it is built.** `.chat-widget__pulse` is a separate ring *behind*
the photo, plus a steady halo on `.chat-widget__avatar-wrap::after`. Two
offset pulses (the element and its `::after`, 1.3s apart) give a
continuous rather than throbbing rhythm. The avatar itself never scales,
blurs or distorts — only the ring animates.

**Colour.** `var(--site-primary-accent)`, i.e.
`sitePrimaryAccentColor` — never a hard-coded gold.

**Reduced motion.** A `prefers-reduced-motion` block placed *after* the
chat rules stops the animation and leaves the steady halo, so the
launcher still reads as active. It has to sit after those rules: the
general reduced-motion block in section 6 has equal specificity and was
being beaten on source order. That bug was found in testing and fixed.

---

## 10. Live-chat hover label added

```js
const liveChatIconHoverText = `Chat with ${siteOwner}`;
```

Appears to the **left** of the launcher on hover *and* on keyboard focus,
with a smooth opacity + translate transition. It is absolutely positioned
so revealing it cannot shift the launcher or the page. `siteOwner` is
never written into the HTML. The launcher's `aria-label` is set from the
same value plus the online state, so the information is not hover-only.

---

## 11. Pitchbar-ready architecture prepared

**Nothing about Pitchbar was integrated.** No script, no dependency, no
invented API.

`main.js` carries a clearly marked
`LIVE CHAT / PITCHBAR` configuration section and a
`PITCHBAR INTEGRATION POINT` comment block inside `openLiveChat()`
listing the three steps to switch over:

1. Load Pitchbar's widget from your VPS inside `openLiveChat()`.
2. Set `liveChatUsesTelegramFallback = false`.
3. Call Pitchbar's own open method in place of the fallback.

Until then the launcher opens Telegram via the configured
`telegramPersonal` link. The launcher markup, styling, pulse, label,
online dot and accessibility behaviour are all independent of whatever
chat system sits behind them, so no restructuring will be needed.

---

## 12. Pricing timer visibility confirmed as hidden by default

```js
const pricingTimerStatus = "hide";
```

Visibility is now a **single global switch**; the per-plan `status` field
was removed. Per-plan `price`, `increment` and `timerTime` are unchanged
and remain per-plan. Hiding uses `visibility: hidden`, so the row keeps
its space and cards do not change height between the two modes.

**Verified** with `pricingTimerStatus = "show"`: timers become visible,
count down, tick independently per card, and the free plan (no duration)
stays hidden while reserving its space. The increment behaviour was
confirmed unchanged — a card's price rises by its own increment when its
own timer expires, and the purchase dialog then reads the new price.

---

## 13. Announcement versioning system implemented

Replaces the session-based dismissal.

```js
let announcementStatus = "new";          // "new" | "old"
const announcementVersion = "2026-08-28";
```

**To publish a new announcement:** edit the text, change
`announcementVersion`, ensure `announcementStatus` is `"new"`.

**Behaviour.** Dismissing stores the current `announcementVersion` in
`localStorage` under `goldtrap:announcement-dismissed-version`. The bar
stays hidden only while the stored value matches the configured one, so a
new version returns for everyone — including visitors who dismissed the
previous one — with nobody clearing browser data. `announcementStatus =
"old"` hides it for everyone regardless. Nothing rewrites the source;
both values are developer settings.

The bar starts `hidden` in the markup and is revealed by JavaScript, so a
dismissed announcement never flashes on load.

**Verified** across the full matrix: version-A shows → dismiss → stays
dismissed on reload → version-B appears despite the earlier dismissal →
dismissing B stores B → back to version-A shows again → status `"old"`
hides it.

---

## 14. Site colors centralized in main.js

Eight beginner-named settings in the `SITE COLORS` section:
`siteBackgroundColor`, `siteSurfaceColor`, `sitePrimaryAccentColor`,
`sitePrimaryAccentHoverColor`, `siteTextColor`, `siteMutedTextColor`,
`siteBorderColor`, `siteSuccessColor`. They are the site's existing
colours — the palette was not redesigned.

`applySiteColors()` writes them to `document.documentElement` as
`--site-*` custom properties. The stylesheet's theme tokens read them
with a matching fallback, e.g.
`--gold-400: var(--site-primary-accent, #DDB954)`, so the page is
correctly coloured before JavaScript runs and re-themes when it does.

Only genuine theme colours moved. Layout, spacing, typography and
animation timing remain in CSS.

---

## 15. Homepage live chart API centralized in main.js

```js
const homepageLiveChartApi = "https://s.tradingview.com/widgetembed/?symbol=OANDA%3AXAUUSD&…";
```

`initLiveChart()` reads it and injects a lazy-loaded iframe into
`#live-chart-container`. The URL is not in the HTML. The container keeps
its final size and locked aspect ratio, so injecting a chart cannot
reflow the hero. Setting the value to an empty string leaves the
container empty. Do not put a private key here — this file ships to the
browser.

---

## 16. Payment network resolved to TRC20 (TRON)

```js
const paymentNetwork = "TRC20 (TRON)";
```

`BSC BEP20` is gone from the implementation; a search confirms it. The
mockup is the visual source of truth and both dialog mockups show TRC20
alongside a Tron-format address, so the contradiction is resolved in
favour of the mockup.

---

## 17. Payment configuration centralized

```js
const walletAddress      = "TM74BDqkK3uoaJpZiFcNNChnj8jXQ3xWrT";  // unchanged
const paymentNetwork     = "TRC20 (TRON)";
const paymentAmountSuffix = "USDT";
```

The wallet address was not invented or modified. `network` and
`amountSuffix` were renamed to the specified names throughout.

All existing dialog behaviour was preserved and re-verified: plan and
amount come from the clicked card; network and currency from
configuration; the wallet row is a real `<button>` that copies on click
and on Enter; hover turns the border and copy icon gold; the icon becomes
a green check for 5 seconds; the X button, backdrop click and Escape all
close the dialog; focus returns to the trigger. Confirm Payment on
Telegram still uses `telegramPersonal`.

---

## 18. Source-code dialog configuration preserved

Unchanged in behaviour, now fed from configuration. The title is composed
from the live page — `getEaTitle()` plus the gold half of the page
heading — giving "GOLDTRAP EA v4.2.3 — Source Code" with no duplicated
constant. The price is still read from the visible `#source-code-price`
text, so editing the page updates the dialog. Discuss on Telegram still
uses the configured link.

---

## 19. Mobile hamburger architecture prepared

**No mobile layout was implemented.**

A `#nav-toggle` button was added to both pages with `aria-label`,
`aria-expanded` and `aria-controls` pointing at `#primary-nav`. It is
`display: none` at desktop widths, so **desktop navigation is completely
unchanged**.

`initMobileNavigation()` already wires the full behaviour: toggle,
`aria-expanded` maintenance, Escape to close with focus returned to the
button, click-outside to close, and clicking a link closing the menu.

Both the markup and the CSS carry a comment recording that the hamburger
is an intentional requirement even though the supplied mobile mockup
shows no menu button — the mockup simply drops the nav links, leaving
only the logo and language pill.

The mobile phase only needs to reveal `.nav-toggle` in its media query
and style the open state of `.primary-nav`.

---

## 20. Scroll-reveal animation

The existing `IntersectionObserver` implementation was kept (no scroll
event listener), with `threshold: 0.15`, one-shot reveal via
`unobserve()`, and a stagger driven by a single `--reveal-index` custom
property rather than one rule per child.

**One real defect was found and fixed.** The hidden starting state
applied unconditionally, so a visitor with JavaScript disabled saw a page
of invisible content. It is now scoped:

```css
@media (scripting: enabled) { .scroll-reveal { opacity: 0; … } }
```

That is pure CSS, so it needs no inline script, and browsers without the
`scripting` media feature fall through to the visible default. Verified
with JavaScript disabled: content renders at full opacity.

Reduced motion continues to disable the movement entirely.

---

## 21. Footer caveat configuration

```js
const footerCaveatText = "Trading XAUUSD involves substantial risk. …";
```

Renamed from `footerCaveat` to the specified name. Written into
`#footer-caveat` with `textContent`; not present in the HTML. The
copyright line is still generated as
`© [current year] [siteName] by [siteOwner]` using
`new Date().getFullYear()`.

---

## 22. Terms and Conditions link configuration

```js
const termsAndConditionsLink = "#";
```

Applied to `#terms-and-conditions-link`. The notice sits immediately
below the caveat. The link is muted by default, turns white on hover, and
keeps the site-wide visible focus ring. Replace `"#"` with the real URL
when the terms page exists.

---

## 23. Telegram footer hover behaviour

Unchanged and re-verified: on hover the container background lightens,
the border turns white and the icon turns white, all on a smooth
transition affecting the whole clickable container. Destination is the
configured `telegramChannel`; it has `aria-label="Telegram"` and a
visible focus state.

---

## 24. Accessibility improvements

Preserved from the baseline: semantic landmarks, skip link first in tab
order, visible focus rings, `aria-expanded` on every expandable control,
keyboard-operable dialogs with focus restoration, Escape and outside
click to close, real `<button>` elements rather than clickable divs,
`aria-live` announcement on clipboard actions.

Added in this update:

- The live-chat launcher shows its label on **keyboard focus** as well as
  hover, so the information is never hover-only, and carries an
  `aria-label` built from the same configured text plus the online state.
- The hamburger ships with `aria-label`, `aria-expanded` and
  `aria-controls` already correct.
- Scroll-reveal no longer hides content when JavaScript is unavailable.
- Reduced motion now genuinely stops the chat pulse.
- The online indicator remains green and visually distinct from the gold
  pulse — status and decoration are separate elements.

---

## 25. Additional fixes made during this task

Three defects were found by testing rather than by reading:

1. **Reduced motion did not stop the chat pulse.** The override sat
   earlier in the stylesheet than the animation it was overriding and
   lost on source order. Fixed by re-stating it after the chat rules,
   with a comment explaining why the position matters.

2. **Scroll-reveal hid all content without JavaScript.** Fixed with
   `@media (scripting: enabled)` as described in §20.

3. **`base.js` cannot drive a custom UI on an English page.** Discovered
   by testing against the real bundle: it renders no widget, so
   GTranslate's lazy loader never fires and nothing translates. Switched
   to `dropdown.js` as described in §2.

Also in this pass: the FAQ data was tokenised for `{siteName}` and
`{siteOwner}`; the hero `<h1>` gained `data-site-name`; the announcement
bar starts hidden to prevent a flash; and the two pre-existing test
suites were updated for the renamed element ids.

---

## Verification performed

| Check | Result |
|---|---|
| Case-insensitive `GoldTrap EA` | only intended fallbacks, config and comments |
| `v4.2.3` | only `eaCurrentVersion` and its comment |
| `GoldTrap_v4_2_3.ex5` | only `eaCurrentFileName` |
| `BSC BEP20` | absent |
| `translate_a/element.js` | absent from project source |
| `paymentNetwork === "TRC20 (TRON)"` | yes |
| `pricingTimerStatus === "hide"` | yes; `"show"` verified working |
| Timers hidden preserve space | yes (`visibility: hidden`) |
| Timers independent per plan | yes |
| Announcement version matrix | all cases pass |
| Translation round-trips (5 languages + cross-language) | all pass |
| Custom translation UI intact | yes; GTranslate's own widget hidden |
| Live chat 68px, accent pulse, reduced motion | yes |
| Chart reads `homepageLiveChartApi` | yes |
| Footer caveat, T&C link, Telegram hover | yes |
| Wallet copy, dialog close paths, Escape | yes |
| Scroll reveal; reduced motion; no-JS visibility | yes |
| Desktop layout unchanged | 7606px, identical to baseline |

**Automated total: 134 checks passing**, across six suites
(translation, update, announcement/timers, functional, accessibility,
motion), with no JavaScript errors and no horizontal overflow from
1024px to 2560px.

---

## Known limitations

1. **Live translation was not exercised against Google's servers.**
   Chromium has no outbound network in the build sandbox. The suite runs
   GTranslate's real `dropdown.js` against a faithful stub of Google's
   engine, which covers all of our logic. Confirm the five round-trips
   once in a real browser.

2. **`termsAndConditionsLink` is still `"#"`.** No terms URL has been
   supplied.

3. **The mobile navigation gap is still open.** The supplied mobile
   mockup contains no hamburger and no nav links. The architecture is
   ready; the visual design of the open menu is a decision for the mobile
   phase.

---

# Final Desktop Correction Pass

**Date:** 28 August 2026
**Stage on completion:** DESKTOP APPROVED / READY FOR MOBILE IMPLEMENTATION

Only the corrections requested were made. Nothing else was redesigned,
tightened or "improved". Mobile and tablet were not started.

## 1. Typography restored to the previous commit

The five headings named in the brief — "Why Traders Choose GOLDTRAP EA",
"One repeating cycle. No prediction. Pure structure.", "Real Results.
Real Users.", "Get GOLDTRAP EA" and "How to Get Free Access" — are all
`.section-heading` elements in the large tier. Their values were read out
of git rather than guessed, from commit `a20b5ce`, the last commit before
the typeface pass:

| Property | Recent (wrong) | Restored (`a20b5ce`) |
|---|---|---|
| `--fs-h2` | `clamp(2.25rem, 3.39vw, 4.0625rem)` → 65px | `clamp(2.25rem, 3vw, 3.625rem)` → **58px** |
| `line-height` | `0.9` set on `.section-heading` | removed → inherits **1.05** |
| `letter-spacing` | `0.007em` set on `.section-heading` | removed → inherits **-0.02em** |
| `max-width` | `894px` | **`800px`** |
| `font-weight` | 800 | 800 (unchanged) |

Verified in the browser: all five now render at 57.6px, weight 800,
line-height 1.05, letter-spacing -1.152px, measure 800px, and they break
onto the same number of lines as the mockup.

Two notes for a future developer:

- **The font family was not reverted.** `a20b5ce` used Figtree; the
  current build uses Poppins, which was requested and approved in the
  typeface pass. The brief listed font-size, font-weight, line-height and
  letter-spacing as the properties to restore, not font-family. Poppins
  at these restored metrics is what shipped.
- **`--fs-h2-sm` (48px, Download and FAQ headings) was left alone.**
  Those two were not among the five reported, and 48px was measured
  directly against the mockup. Restoring `line-height: 1.05` does affect
  them, and that is correct: with the size back at 58px, a two-line
  heading's ink measures 113px against the mockup's 117px, whereas the
  0.9 line-height only existed to compensate for the oversized 65px.

The headings remain fully dynamic — the site name still comes from
`siteName`, and no hard-coded name was reintroduced to achieve the visual
restoration.

## 2. Vertical spacing between "Get GOLDTRAP EA" and Source Code restored

**This was a measurement error on my part, not a design choice.**

The earlier pass set `.source-code { margin-top: 8px }` from a reading
that put the pricing cards' bottom at y4069 and the source card's top
border at y4076. That reading used a brightness threshold which counted
the source-code card's large gold glow — which bleeds *upward* across the
gap — as though it were the pricing cards.

Re-measured by finding the actual card borders instead of a brightness
threshold:

- pricing card bottom border: **y = 4013** (`#584A26` at x=900)
- source-code card top border: **y = 4075**
- **true gap: 62px**

`.source-code { margin-top: 62px }`. Verified in the browser: pricing
grid bottom 4108, source card top 4170, gap **62px** exactly.

A comment in `styles.css` records the measurement and warns against
reducing it again.

Nothing else was touched to achieve this: no typography, no card heights,
no content, no section padding.

**Related observation, deliberately not changed.** The pricing cards
render 606px tall against the mockup's 540px. That difference is *not*
from this pass — it was present in the approved baseline — and roughly
38px of it is the countdown timer's reserved row, which CLAUDE.md §9.4
and item 8 of this brief both explicitly require to keep its space while
hidden. Since the brief says not to compensate through card heights and
not to redesign cards, it was left as-is and is recorded here instead.

## 3. Permanent gold ring around the live chat removed

Three things were producing a ring that read as permanent:

1. A static halo — `.chat-widget__avatar-wrap::after` with
   `box-shadow: 0 0 24px -4px` in the accent colour. **Removed entirely.**
2. The pulse was a **filled gold disc** at `opacity: 0.55`, which looked
   like a heavy gold plate behind the photo rather than a glow. It is now
   a thin ring: `border: 2px solid` the accent plus a soft
   `box-shadow` glow, with no background fill.
3. A **second, offset pulse ring** (`::after`, delayed 1.3s) meant one
   ring was always sitting close to the avatar. **Removed** — a single
   ring per cycle leaves a clear gap, so the effect is unmistakably an
   animation rather than a border.

The keyframes now begin fully transparent at the avatar's own size and
fade in only as the ring leaves the photo:

```css
0%   { transform: scale(1);   opacity: 0; }
18%  { opacity: 0.5; }
100% { transform: scale(1.7); opacity: 0; }
```

The hover label's border was changed from `--border-gold` to
`--border-subtle` so hovering introduces no gold near the launcher
either. The label text remains white.

**Verified two ways.** Sampling the live animation across a full 2.6s
cycle: peak opacity 0.475, and **zero** frames show a ring at the avatar
edge with visible opacity — there is never a resting outline. Pixel
analysis of a captured frame: **0** gold pixels outside the avatar at
rest, thousands mid-expansion. The 1px `#69655B` warm-grey edge on the
photo itself is retained — it is part of the avatar in the mockup and is
not a gold ring.

## 4. The animated gold pulse was retained

Still present, still continuous, still driven by
`sitePrimaryAccentColor` through `var(--site-primary-accent)` — no
separate hard-coded gold. The avatar image itself never scales, blurs or
distorts; only the ring animates.

Reduced motion now sets `animation: none; opacity: 0`, so those visitors
get no perpetual animation **and** no static ring, while the launcher,
photo and green online dot stay fully visible and usable. (The previous
value left a `0.32` opacity ring behind, which would have contradicted
this pass's intent.)

## 5. Live-chat launcher size unchanged

Still **68px × 68px** — confirmed in the browser. Not resized in this
pass. The green online indicator remains a separate element from the gold
pulse.

## 6. Pricing timers remain hidden by default

`const pricingTimerStatus = "hide";` — unchanged. Durations, increments,
per-plan independence and the hidden timer's reserved space are all
untouched and were re-verified, including a temporary `"show"` run
confirming the countdowns still display, tick and remain independent.

## 7. No mobile or tablet implementation was started

No breakpoints added, no hamburger menu implemented, no responsive
redesign. The hamburger architecture prepared in the previous pass is
untouched and still hidden at desktop widths.

## Verification

All six suites re-run after the corrections:

| Suite | Result |
|---|---|
| Translation (GTranslate round-trips) | all pass |
| Update / configuration | 45 pass |
| Announcement versioning + timers | 17 pass |
| Functional | 46 pass |
| Accessibility | 26 pass |
| Motion / reduced motion / no-JS | 3 pass |
| Four-plan pricing grid | passes |

**137 automated checks passing**, no JavaScript errors, no horizontal
overflow. Required searches: `GoldTrap EA` (case-insensitive) returns
only the intended pre-JS fallbacks, `siteName` itself and comments;
`v4.2.3` and `GoldTrap_v4_2_3.ex5` only their config lines; `BSC BEP20`
and `translate_a/element.js` absent.

Section heights against the mockup after the corrections:

| Section | Mockup | Built | Δ |
|---|---|---|---|
| top bar | 50 | 51 | +1 |
| hero | 873 | 871 | −2 |
| quick benefits | 784 | 792 | +8 |
| how it works | 986 | 989 | +3 |
| live results | 394 | 400 | +6 |
| stats strip | 130 | 131 | +1 |
| pricing + source | 1313 | 1390 | +77 |
| free access + download | 1759 | 1791 | +32 |
| FAQ | 942 | 952 | +10 |
| footer | 266 | 321 | +55 |

The footer's +55 is the specification's Terms and Conditions line, which
the mockup does not contain. The pricing band's +77 is the pre-existing
card height discussed in §2 above, the larger part of it being the
timer's mandated reserved space.
