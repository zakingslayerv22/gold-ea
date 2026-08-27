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
