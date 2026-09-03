/* ======================================================================
 * GOLDTRAP EA — MAIN SCRIPT
 * ======================================================================
 * EVERYTHING YOU ARE LIKELY TO WANT TO EDIT IS IN THE CONFIGURATION
 * BLOCK BELOW. You do not need to understand the rest of this file, or
 * touch any HTML or CSS, to change the site's name, colours, prices,
 * links, wallet address, announcement or chat text.
 *
 * Each setting says what it controls and where it shows up.
 * ====================================================================== */


/* ======================================================================
 * SITE INFORMATION
 * ======================================================================
 * siteName  is the single authoritative source for the product name.
 *           It is written into the browser tab title, the meta and
 *           social tags, the header wordmark, headings, buttons, the
 *           purchase dialogs and the footer copyright.
 *           Change it here and the whole site follows — the name is not
 *           hard-coded anywhere in the HTML.
 *
 * siteOwner is the person the site belongs to. It appears in the footer
 *           copyright, the purchase dialogs and the live-chat label.
 * ====================================================================== */

const siteName = "GOLDTRAP EA";
const siteOwner = "Abang Rimba";

/*
 * The current Expert Advisor version, e.g. "v4.2.3".
 * Shown in the source-code section, both purchase dialogs and the
 * download filenames. Change it here when you release a new version.
 */
const eaCurrentVersion = "v4.2.3";

/*
 * The compiled MetaTrader 5 filename offered on the Download section.
 * The MetaTrader 4 filename is derived from it by swapping the
 * extension, so you normally only need to edit this one line.
 */
const eaCurrentFileName = "GoldTrap_v4_2_3.ex5";

/*
 * A short tagline used in the browser tab title and the social preview
 * text, printed after the site name.
 */
const siteTagline = "Automated MT4/MT5 Gold Trading";

/*
 * The sentence search engines and social networks show under the title.
 * "{siteName}" is replaced with the value of siteName above.
 */
const siteDescription =
    "{siteName} automates trade execution and basket management for XAUUSD " +
    "on MetaTrader 4 and MetaTrader 5, using a structured trading approach " +
    "built for consistency.";


/* ======================================================================
 * SITE COLORS
 * ======================================================================
 * These are the website's real colours, sampled from the design. They
 * are pushed into CSS at runtime as custom properties, so changing a
 * value here re-themes the whole site — no CSS editing required.
 *
 * Colours only. Spacing, type sizes, layout and animation timing stay
 * in assets/styles/styles.css where they belong.
 * ====================================================================== */

/* The darkest page background, behind every section. */
const siteBackgroundColor = "#050505";

/* Card and panel background — benefit cards, FAQ items, dark buttons. */
const siteSurfaceColor = "#111113";

/* The gold used for buttons, eyebrows, icons and the live-chat pulse. */
const sitePrimaryAccentColor = "#DDB954";

/*
 * The near-black that gold buttons switch to when hovered, and the text
 * colour printed on top of gold and green fills.
 */
const sitePrimaryAccentHoverColor = "#09090B";

/* Headings and primary copy. */
const siteTextColor = "#FFFFFF";

/* Body paragraphs and secondary copy. */
const siteMutedTextColor = "#AFAEB1";

/* Hairline borders around cards, inputs and pills. */
const siteBorderColor = "#232019";

/* Green used by the live/online indicators and the free-plan accents. */
const siteSuccessColor = "#00D492";


/* ======================================================================
 * LIVE CHAT / PITCHBAR
 * ======================================================================
 * The floating avatar in the bottom-right corner.
 *
 * The real chat system will be Pitchbar, self-hosted on a VPS. It is NOT
 * integrated yet. The launcher below is the site's own element and will
 * keep working exactly as it does now; when Pitchbar is ready you only
 * fill in the section marked "PITCHBAR INTEGRATION POINT" further down
 * this file. Nothing else on the site has to change.
 * ====================================================================== */

/*
 * The label that slides out to the LEFT of the avatar on hover or
 * keyboard focus. Edit the words before ${siteOwner} freely.
 */
const liveChatIconHoverText = `Chat with ${siteOwner}`;

/*
 * Until Pitchbar is installed the launcher opens a direct Telegram chat.
 * Set to false once Pitchbar takes over the click.
 */
const liveChatUsesTelegramFallback = true;


/* ======================================================================
 * LIVE CHART
 * ======================================================================
 * The hero holds an empty, correctly-sized container for an external
 * price chart. homepageLiveChartApi is the endpoint / embed URL that
 * chart is loaded from; it is read by the chart initialiser below and is
 * never written into the HTML.
 *
 * The mockup shows a TradingView XAUUSD widget. Put your own endpoint
 * here — leave it as an empty string to keep the container empty.
 * Never put a private API key in this file: it ships to the browser.
 * ====================================================================== */

const homepageLiveChartApi =
    "https://s.tradingview.com/widgetembed/?symbol=OANDA%3AXAUUSD&interval=15&theme=dark&style=1&timezone=Etc%2FUTC&hide_side_toolbar=0&withdateranges=1&studies=Volume%40tv-basicstudies";


/* ======================================================================
 * PAYMENT
 * ======================================================================
 * These populate both purchase dialogs.
 *
 * IMPORTANT: paymentNetwork and walletAddress must describe the SAME
 * blockchain. Sending funds on the wrong network loses them.
 * ====================================================================== */

const walletAddress = "TM74BDqkK3uoaJpZiFcNNChnj8jXQ3xWrT";

/* The chain shown on the "Network" row of the purchase dialogs. */
const paymentNetwork = "TRC20 (TRON)";

/* The currency printed beside the amount, e.g. "$299 USDT". */
const paymentAmountSuffix = "USDT";


/* ======================================================================
 * PRICING TIMERS
 * ======================================================================
 * Every pricing card has its own independent countdown. When a card's
 * countdown reaches zero, that card's price rises by its own increment
 * and its timer restarts. Cards never affect each other.
 *
 *   "show" — reveal the countdowns
 *   "hide" — keep the countdowns running but invisible
 *
 * "hide" is the default because no countdown appears in the approved
 * design. Hiding uses visibility:hidden, so the space stays reserved and
 * the cards do not change height when you switch between the two.
 *
 * Per-plan price, increment and duration live in PRICING PLANS below.
 * ====================================================================== */

const pricingTimerStatus = "hide";


/* ======================================================================
 * ANNOUNCEMENT BAR
 * ======================================================================
 * The dismissible offer bar across the very top of the page.
 *
 * HOW TO PUBLISH A NEW ANNOUNCEMENT
 *   1. Edit the announcement text below.
 *   2. Change announcementVersion to a new value (the date is easiest).
 *   3. Make sure announcementStatus is "new".
 *
 * Everyone sees the new announcement again, including visitors who
 * dismissed the previous one. Nobody has to clear their browser data.
 *
 * How it works: when a visitor dismisses the bar, their browser stores
 * the announcementVersion they dismissed. The bar stays hidden only
 * while that stored version matches the version below. A different
 * version means a different announcement, so it shows again.
 * ====================================================================== */

/*
 * Set to "new" when an announcement should be displayed.
 * Set to "old" when the announcement should no longer be displayed
 * at all, for everyone, regardless of what they have dismissed.
 */
let announcementStatus = "new";

/*
 * Change this whenever you publish a NEW announcement.
 * Changing this value makes the announcement new again for all visitors.
 */
const announcementVersion = "2026-08-28";

/* The announcement wording. announcementBoldText is emphasised in white,
 * announcementHighlightText is emphasised in gold and underlined. */
const announcementBoldText = "New Client Offer - Free until Aug 31, 2026:";
const announcementBodyText = "full access, all features — register with";
const announcementHighlightText = "VT Markets";
const announcementTailText = "via our IB link. No payment needed.";

/* Where the announcement text links to. */
const announcementLink = "https://a689.link";


/* ======================================================================
 * TELEGRAM LINKS
 * ======================================================================
 * telegramPersonal — direct chat with the owner. Used by the purchase
 *                    dialogs, "Discuss on Telegram" and the live chat.
 * telegramChannel  — the public channel. Used by "View Live Results",
 *                    the preset files link and the footer icon.
 * Reused everywhere; never write a Telegram URL into the HTML.
 * ====================================================================== */

const telegramPersonal = "https://t.me/abangrimba";
const telegramChannel = "https://t.me/goldtrapea";


/* ======================================================================
 * DOWNLOAD / WHITELIST
 * ======================================================================
 * The URL a trader must add to the MetaTrader WebRequest whitelist. It
 * is printed into the setup note and copied by the Copy button.
 * ====================================================================== */

const metaTraderWhitelist = "https://a689.link";


/* ======================================================================
 * LIVE ACTIVITY + STATISTICS
 * ======================================================================
 * The pulsing dot and the two figures in the Live Results strip.
 * liveActivityColor accepts any CSS colour.
 * ====================================================================== */

const liveActivityColor = "green";

const licenseKeysGeneratedToday = "24";
const easRunningToday = "2,371";


/* ======================================================================
 * FOOTER
 * ======================================================================
 * The copyright line is generated automatically as
 *     © [current year] [siteName] by [siteOwner]
 * so the year is never out of date.
 * ====================================================================== */

/* The editable risk disclaimer at the foot of every page. */
const footerCaveatText =
    "Trading XAUUSD involves substantial risk. Past performance does not " +
    "guarantee future results. The EA, like any automated system, can lose " +
    "money. Use only capital you can afford to lose.";

/* Where the "Terms and Conditions" link in the footer points. */
const termsAndConditionsLink = "#";


/* ======================================================================
 * TRANSLATION LANGUAGES
 * ======================================================================
 * Translation is powered by the free GTranslate widget. The site's own
 * gold dropdown is the visible interface; GTranslate runs hidden behind
 * it and does the actual translating.
 *
 * The languages offered in the dropdown are configured here.
 *
 * Each language has:
 *   - code: the language code the translation system uses
 *   - name: the human-readable language name
 *
 * translationLanguages is the shortlist shown the moment the panel opens.
 * translationExtraLanguages holds the rest; they do not clutter the list
 * but stay fully reachable — typing any language name into the panel's
 * search box searches BOTH lists.
 *
 * To add another supported language, add another object to either list:
 *
 *     {
 *         code: "de",
 *         name: "German"
 *     }
 *
 * WHAT APPEARS WHERE
 *   - The mobile header does NOT display this whole list. It shows only a
 *     two-letter abbreviation of the CURRENTLY selected language, derived
 *     from `code` (so "pt" renders as PT, "zh-CN" as ZH). Nothing needs to
 *     be added here for that to work.
 *   - Desktop and tablet headers show the full `name` instead.
 *   - The open dropdown always lists full `name` values, never codes.
 *   - The search field stays at the TOP of the dropdown.
 *
 * English is the site's original language and must stay first.
 * ====================================================================== */

const translationDefaultLanguage = "en";

/*
 * TRANSLATION DIAGNOSTICS
 * ----------------------------------------------------------------------
 * Set to true and every step of a language switch is logged to the browser
 * console, prefixed with [translate]. Set to false to silence it.
 *
 * What each line tells you:
 *   script requested / loaded / FAILED  the GTranslate widget script
 *   init                                the selector wired up, plus the
 *                                       googtrans cookie found at load
 *   select                              a language was chosen
 *   reset                               English chosen: cookie before,
 *                                       what was cleared, cookie after
 *   apply                               the pair handed to the widget
 *   engine missing                      the hidden switcher never appeared
 *
 * If a switch appears dead, the useful lines are `reset` and `apply`: a
 * cookie that is still present on the "after" line means something is
 * writing it back, and an `engine missing` line means the widget script
 * never rendered its switcher (usually a blocked request).
 */
const translationDiagnostics = true;

const translationLanguages = [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "pt", name: "Portuguese" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "zh-CN", name: "Chinese (Simplified)" },
    { code: "hi", name: "Hindi" },
    { code: "ar", name: "Arabic" },
    { code: "ru", name: "Russian" },
    { code: "ja", name: "Japanese" },
    { code: "ko", name: "Korean" },
    { code: "it", name: "Italian" },
    { code: "tr", name: "Turkish" },
    { code: "id", name: "Indonesian" },
    { code: "ms", name: "Malay" },
    { code: "vi", name: "Vietnamese" },
    { code: "th", name: "Thai" }
];

/* Also selectable, but only once searched for. */
const translationExtraLanguages = [
    { code: "nl", name: "Dutch" }, { code: "pl", name: "Polish" },
    { code: "uk", name: "Ukrainian" }, { code: "ro", name: "Romanian" },
    { code: "el", name: "Greek" }, { code: "cs", name: "Czech" },
    { code: "sv", name: "Swedish" }, { code: "da", name: "Danish" },
    { code: "fi", name: "Finnish" }, { code: "no", name: "Norwegian" },
    { code: "hu", name: "Hungarian" }, { code: "he", name: "Hebrew" },
    { code: "bn", name: "Bengali" }, { code: "ta", name: "Tamil" },
    { code: "te", name: "Telugu" }, { code: "ur", name: "Urdu" },
    { code: "fa", name: "Persian" }, { code: "sw", name: "Swahili" },
    { code: "tl", name: "Filipino" }, { code: "zh-TW", name: "Chinese (Traditional)" },
    { code: "bg", name: "Bulgarian" }, { code: "sr", name: "Serbian" },
    { code: "hr", name: "Croatian" }, { code: "sk", name: "Slovak" },
    { code: "af", name: "Afrikaans" }, { code: "ha", name: "Hausa" },
    { code: "yo", name: "Yoruba" }, { code: "ig", name: "Igbo" },
    { code: "zu", name: "Zulu" }, { code: "am", name: "Amharic" }
];


/* ======================================================================
 * PRICING PLANS
 * ======================================================================
 * The pricing grid is generated from this array, so adding a fourth plan
 * is a matter of adding one object here — the CSS grid absorbs it with
 * no other change.
 *
 * Per-plan fields:
 *   planName    plan title, shown on the card and in the purchase dialog
 *   price       current price as a number (0 renders as "FREE")
 *   increment   how much this plan's price rises when its timer expires
 *   timerTime   this plan's countdown duration, in SECONDS
 *   currency    suffix printed beside the price
 *   eyebrow     small label above the plan name
 *   accent      "gold" | "green" — the card's colour treatment
 *   caption     one-line description under the price
 *   hot         true renders the small HOT badge beside the price
 *   features    tick list
 *   steps       numbered list (used instead of features by the free plan)
 *   note        highlighted warning strip
 *   cta         { label, type, href }. Omit href to open the purchase
 *               dialog; supply one to link out instead.
 *
 * Timer visibility is global — see PRICING TIMERS above.
 * ====================================================================== */

const pricingPlans = [
    {
        planName: "Free Access",
        price: 0,
        increment: 0,
        timerTime: 0,
        currency: "",
        eyebrow: "Free Option",
        eyebrowIcon: "dot",
        accent: "green",
        caption: "Via VT Markets IB registration · 1 account only",
        steps: [
            "Register under my link",
            "Full verify your account",
            "Create an MT5 trading account",
            "Submit MT5/MT4 ID + email for instant access"
        ],
        note: 'Free option is locked to <strong>1 MT5 account ID</strong> only.',
        cta: { label: "Free Access", type: "green", href: announcementLink, icon: "arrow" }
    },
    {
        planName: "5 Accounts",
        price: 299,
        increment: 20,
        timerTime: 3600,
        currency: "USDT",
        eyebrow: "Most Popular",
        eyebrowIcon: "flame",
        accent: "gold",
        caption: "Perfect for most traders",
        features: [
            "Lifetime license",
            "Up to 5 MT5/MT4 accounts",
            "Use with any broker",
            "Free upgrades to all future versions",
            "Priority reply message"
        ],
        cta: { label: "Buy Now", type: "gold", icon: "wallet" }
    },
    {
        planName: "Unlimited",
        price: 740,
        increment: 20,
        timerTime: 3600,
        currency: "USDT",
        eyebrow: "Unlimited Access",
        eyebrowIcon: "crown",
        accent: "gold",
        caption: "For traders managing multiple accounts",
        hot: true,
        features: [
            "Lifetime license",
            "Unlimited MT5/MT4 accounts",
            "Use with any broker",
            "Free upgrades to all future versions",
            "Priority reply message"
        ],
        cta: { label: "Buy Now", type: "gold", icon: "wallet" }
    }
];


/* ======================================================================
 * BEHAVIOUR CONSTANTS
 * ====================================================================== */

const COPY_FEEDBACK_MS = 5000;   // how long a "copied" confirmation persists
const REVEAL_THRESHOLD = 0.15;   // how much of an element must be visible
const TIMER_TICK_MS = 1000;
const ANNOUNCEMENT_STORAGE_KEY = "goldtrap:announcement-dismissed-version";




/* ======================================================================
 * ============  IMPLEMENTATION — no configuration below here  ==========
 * ====================================================================== */

import { faqServiceInstance } from "./faq-index-page.js";
import { initFaqPage } from "./faq-page.js";


/* ----------------------------------------------------------------------
 * Small DOM helpers. Every lookup is guarded so a page that legitimately
 * lacks an optional element (e.g. the FAQ page has no pricing grid) never
 * stops the rest of the script from running.
 * -------------------------------------------------------------------- */

const qs = (selector, scope = document) => scope.querySelector(selector);
const qsa = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

/** Runs `callback` only when `element` actually exists. */
function withElement(element, callback) {
    if (element) {
        callback(element);
    }
}

/** Formats a number with thousands separators, e.g. 9650 → "9,650". */
function formatPrice(value) {
    return Number(value).toLocaleString("en-US");
}

/** Reusable inline SVG icons, kept in one place so markup stays readable. */
const icons = {
    check: '<svg class="check" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>',
    arrow: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
    wallet: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="6" width="18" height="14" rx="2"/><path d="M3 10h18"/><circle cx="17" cy="15" r="1.2"/></svg>',
    flame: '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2c1 4-3 5-3 9a3 3 0 0 0 6 0c0-1-.4-2-1-3 2 1 4 3.5 4 6a6 6 0 1 1-12 0c0-4.5 4-7 6-12z"/></svg>',
    crown: '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 8l4 3 5-6 5 6 4-3-2 11H5L3 8z"/></svg>',
    telegram: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>',
    clock: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/></svg>'
};


/* ======================================================================
 * SITE COLORS → CSS CUSTOM PROPERTIES
 * ======================================================================
 * Pushes the SITE COLORS configuration onto the document root. The
 * stylesheet reads these through var(--site-*, fallback), so the page is
 * already correctly coloured before this runs and simply re-themes when
 * it does. Only genuine theme colours live here — layout, spacing,
 * typography and animation timing stay in styles.css.
 * ====================================================================== */

function applySiteColors() {
    const root = document.documentElement;

    const palette = {
        "--site-background": siteBackgroundColor,
        "--site-surface": siteSurfaceColor,
        "--site-primary-accent": sitePrimaryAccentColor,
        "--site-primary-accent-hover": sitePrimaryAccentHoverColor,
        "--site-text": siteTextColor,
        "--site-muted-text": siteMutedTextColor,
        "--site-border": siteBorderColor,
        "--site-success": siteSuccessColor
    };

    Object.entries(palette).forEach(([property, value]) => {
        if (value) {
            root.style.setProperty(property, value);
        }
    });
}


/* ======================================================================
 * SITE IDENTITY → PAGE
 * ======================================================================
 * Writes siteName, eaCurrentVersion and eaCurrentFileName into every
 * place they appear, so none of them is hard-coded in the HTML.
 *
 *   data-site-name       element's text becomes siteName
 *   data-site-name-in    "{siteName}" inside the text is substituted
 *   data-ea-version      element's text becomes eaCurrentVersion
 *   data-ea-filename     element's text becomes the EA filename; the
 *                        optional value picks the platform ("mt4"/"mt5")
 *
 * Document title, meta description and the Open Graph / Twitter tags are
 * rewritten from the same values.
 * ====================================================================== */

/* ======================================================================
 * IDENTITY STRINGS MUST NEVER BE TRANSLATED
 * ======================================================================
 * A brand name, a version, a wallet address, a file name, a symbol or a
 * price is an IDENTIFIER, not prose. Google Translate does not know that:
 * left alone it renders the wordmark as "TRAMPA DE ORO EA" in Spanish and
 * "جولدن بوكس" in Arabic. A translated, transliterated or re-spaced wallet
 * address is the worst case of all — someone could send funds nowhere.
 *
 * Two mechanisms are applied together, because they cover different cases:
 *   translate="no"          the standards-compliant HTML attribute
 *   class="notranslate"     what Google's engine honours most reliably
 *
 * There are two ways to use this, and one rule.
 *
 *   protectIdentityText(element, value)
 *       The element IS the identifier — a wordmark, a price, a wallet
 *       address. Marks it and writes the text in one step, so a future
 *       developer cannot write the text and forget the marking.
 *
 *   protectIdentityTerms(root)
 *       The identifier is EMBEDDED IN PROSE that should still translate.
 *       Walks the text under `root` and wraps only the identifiers it
 *       finds in marked spans, leaving the sentence around them free to
 *       translate.
 *
 * THE RULE: never mark a parent and assume a later textContent write
 * inherits it. It does not — rewriting textContent destroys any marked
 * children. Every identity write goes through one of the two functions
 * above, and protectIdentityTerms() is re-run over anything rendered
 * after load.
 * ====================================================================== */

/** Applies both non-translatable markers to one element. */
function markNotTranslatable(element) {
    if (!element) {
        return element;
    }
    element.setAttribute("translate", "no");
    element.classList.add("notranslate");
    return element;
}

/**
 * Writes an identity string into an element and marks the whole element
 * non-translatable. Use when the element carries nothing but the
 * identifier.
 *
 * @param {Element|null} element
 * @param {string} value
 * @returns {Element|null} the element, for chaining
 */
function protectIdentityText(element, value) {
    if (!element) {
        return null;
    }
    markNotTranslatable(element);
    element.textContent = value;
    return element;
}

/**
 * Every string that must survive translation byte-for-byte.
 *
 * Order matters: the list is sorted longest-first before matching, so
 * "MetaTrader 5" wins over "MetaTrader" and the full file name wins over
 * the version inside it. Prices are matched by pattern rather than by
 * value, since they are configurable per plan.
 */
function getIdentityTerms() {
    return [
        siteName,
        siteOwner,
        eaCurrentVersion,
        eaCurrentFileName,
        eaFileNameFor("mt4"),
        walletAddress,
        paymentNetwork,
        paymentAmountSuffix,
        metaTraderWhitelist,
        "MetaTrader 4",
        "MetaTrader 5",
        "MetaTrader",
        "MT4",
        "MT5",
        "XAUUSD",
        "Telegram"
    ].filter(Boolean).sort((a, b) => b.length - a.length);
}

/** Prices and money figures: $299, $9,650, $1.50. */
const identityPricePattern = /\$\d[\d,]*(?:\.\d+)?/;

/** Elements whose subtree must never be walked or rewritten. */
const identitySkipSelector =
    "script, style, textarea, .notranslate, [translate='no'], " +
    ".gtranslate_wrapper, #goog-gt-tt, .skiptranslate";

/**
 * Wraps every identity term found in the text under `root` in a marked
 * span, leaving the surrounding prose translatable.
 *
 * Safe to call repeatedly: a term that has already been wrapped now sits
 * inside a `.notranslate` element, and those subtrees are skipped. Call it
 * again after rendering anything new — the FAQ list, a dialog, the pricing
 * cards — so late content is protected too.
 *
 * @param {Node} [root=document.body]
 */
function protectIdentityTerms(root = document.body) {
    if (!root) {
        return;
    }

    const terms = getIdentityTerms();
    // One pattern: the identifiers, plus the price shape, in one pass.
    const escaped = terms.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    const pattern = new RegExp(
        `(${escaped.join("|")}|${identityPricePattern.source})`,
        "g"
    );

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
            if (!node.nodeValue || !node.nodeValue.trim()) {
                return NodeFilter.FILTER_REJECT;
            }
            if (node.parentElement && node.parentElement.closest(identitySkipSelector)) {
                return NodeFilter.FILTER_REJECT;
            }
            return NodeFilter.FILTER_ACCEPT;
        }
    });

    // Collect first: rewriting while walking would invalidate the walker.
    const targets = [];
    let current = walker.nextNode();

    while (current) {
        pattern.lastIndex = 0;
        if (pattern.test(current.nodeValue)) {
            targets.push(current);
        }
        current = walker.nextNode();
    }

    targets.forEach((textNode) => {
        const fragment = document.createDocumentFragment();
        const text = textNode.nodeValue;
        let index = 0;

        pattern.lastIndex = 0;
        let match = pattern.exec(text);

        while (match) {
            /*
             * The spaces either side of the term are pulled INSIDE the
             * protected span. Google replaces each translatable text node
             * wholesale and trims its edges, so a space left outside is
             * silently eaten and the line renders as
             * "© 2026 GOLDTRAP EAporAbang Rimba". Inside the span it is
             * untouchable. `index` clamps the start so two adjacent terms
             * cannot both claim the same space.
             */
            let start = match.index;
            if (start > index && text[start - 1] === " ") {
                start -= 1;
            }

            let end = match.index + match[0].length;
            if (text[end] === " ") {
                end += 1;
            }

            if (start > index) {
                fragment.append(text.slice(index, start));
            }

            const span = document.createElement("span");
            markNotTranslatable(span);
            span.textContent = text.slice(start, end);
            fragment.append(span);
            index = end;
            match = pattern.exec(text);
            // A match already swallowed by the space above is skipped.
            while (match && match.index < index) {
                match = pattern.exec(text);
            }
        }

        if (index < text.length) {
            fragment.append(text.slice(index));
        }

        textNode.parentNode.replaceChild(fragment, textNode);
    });
}


/** Replaces the {siteName} / {eaVersion} placeholders in a string. */
function fillTokens(text) {
    return text
        .replace(/\{siteName\}/g, siteName)
        .replace(/\{eaVersion\}/g, eaCurrentVersion)
        .replace(/\{siteOwner\}/g, siteOwner);
}

/** MetaTrader 4 uses the same filename with an .ex4 extension. */
function eaFileNameFor(platform) {
    if (platform === "mt4") {
        return eaCurrentFileName.replace(/\.ex5$/i, ".ex4");
    }
    return eaCurrentFileName;
}

function applySiteIdentity() {
    // The element IS the identifier: marked and written in one step.
    qsa("[data-site-name]").forEach((element) => {
        protectIdentityText(element, siteName);
    });

    qsa("[data-ea-version]").forEach((element) => {
        protectIdentityText(element, eaCurrentVersion);
    });

    qsa("[data-ea-filename]").forEach((element) => {
        protectIdentityText(element, eaFileNameFor(element.dataset.eaFilename));
    });

    /*
     * These carry the name INSIDE a sentence, so the element itself stays
     * translatable and only the substituted identifier is protected —
     * protectIdentityTerms() at the end of init() wraps it.
     */
    qsa("[data-site-name-in]").forEach((element) => {
        element.textContent = fillTokens(element.textContent);
    });

    // Metadata — the title pattern is supplied by the page itself.
    const titleTemplate = document.documentElement.dataset.titleTemplate
        || "{siteName} — " + siteTagline;
    document.title = fillTokens(titleTemplate);

    const description = fillTokens(
        document.documentElement.dataset.description || siteDescription
    );

    const meta = (selector, value) => {
        withElement(qs(selector), (element) => element.setAttribute("content", value));
    };

    meta('meta[name="description"]', description);
    meta('meta[property="og:site_name"]', siteName);
    meta('meta[property="og:title"]', document.title);
    meta('meta[property="og:description"]', description);
    meta('meta[name="twitter:title"]', document.title);
    meta('meta[name="twitter:description"]', description);
}


/* ======================================================================
 * ANNOUNCEMENT BAR  (version-based dismissal)
 * ======================================================================
 * The bar is shown when announcementStatus is "new" AND the visitor has
 * not dismissed THIS announcementVersion.
 *
 * Dismissing stores the current announcementVersion in localStorage.
 * Publishing a new announcement means changing announcementVersion — the
 * stored value no longer matches, so the bar returns for everyone with
 * nobody needing to clear their browser data.
 *
 * Nothing here rewrites the configuration; announcementStatus and
 * announcementVersion are developer settings, edited by hand.
 * ====================================================================== */

/** Reads the announcement version this visitor last dismissed. */
function getDismissedAnnouncementVersion() {
    try {
        return localStorage.getItem(ANNOUNCEMENT_STORAGE_KEY);
    } catch (error) {
        // Private mode or storage disabled — treat as "never dismissed".
        return null;
    }
}

function storeDismissedAnnouncementVersion(version) {
    try {
        localStorage.setItem(ANNOUNCEMENT_STORAGE_KEY, version);
    } catch (error) {
        /* storage unavailable — the dismissal simply will not persist */
    }
}

function initAnnouncementBar() {
    const bar = qs("#announcement-bar");
    if (!bar) {
        return;
    }

    const isRetired = announcementStatus !== "new";
    const alreadyDismissed = getDismissedAnnouncementVersion() === announcementVersion;

    if (isRetired || alreadyDismissed) {
        bar.hidden = true;
        return;
    }

    bar.hidden = false;
    bar.dataset.announcementVersion = announcementVersion;

    withElement(qs("#announcement-link", bar), (link) => {
        link.href = announcementLink;
        link.innerHTML =
            `<strong>${announcementBoldText}</strong> ${announcementBodyText} ` +
            `<span class="highlight">${announcementHighlightText}</span> ` +
            `${announcementTailText}`;
    });

    withElement(qs("#announcement-close", bar), (closeButton) => {
        closeButton.addEventListener("click", () => {
            bar.hidden = true;
            storeDismissedAnnouncementVersion(announcementVersion);
            /*
             * Dismissing changes how much chrome sits at the top, so the
             * sticky offset is recomputed immediately. Without this the FAQ
             * category rail and every deep-link landing would stay off by
             * the bar's height for the rest of the session.
             */
            updateStickyOffset();
        });
    });
}


/* ======================================================================
 * TRANSLATION — GTRANSLATE FREE
 * ======================================================================
 * The site's own gold dropdown is the visible interface. The free
 * GTranslate widget runs hidden underneath and performs the translation.
 *
 * How the pieces fit together:
 *   1. window.gtranslateSettings is assigned BEFORE GTranslate's script
 *      loads — the script reads it as it parses.
 *   2. dropdown.js is injected. It renders its own <select class=
 *      "gt_selector"> into .gtranslate_wrapper, which the stylesheet
 *      keeps hidden. That hidden switcher is the piece GTranslate needs
 *      in order to be driven; our gold dropdown stays the visible UI.
 *   3. GTranslate loads Google's engine lazily, when its own widget is
 *      hovered or focused. Our panel therefore fires pointerenter and
 *      focusin on that widget when it opens, so the engine is ready by
 *      the time a language is chosen. Both are GTranslate's own hooks.
 *   4. Choosing a language sets the hidden switcher's value to "en|xx"
 *      and fires change — exactly what a visitor does on GTranslate's
 *      widget. GTranslate then calls its own doGTranslate() internally.
 *      We never talk to Google's engine directly.
 *
 * Returning to English selects "en|en" and only THEN clears the
 * googtrans cookie. The order matters: GTranslate reads that cookie to
 * decide whether the page is currently translated, so clearing it first
 * makes the call a no-op and strands the visitor in the translated
 * language. That is what the previous implementation got wrong. No page
 * reload is involved.
 * ====================================================================== */

/** The shortlist plus the searchable extras, English always first. */
function getAllTranslationLanguages() {
    return [...translationLanguages, ...translationExtraLanguages];
}

/**
 * The two-letter abbreviation the mobile header shows for a language.
 * Derived from the code, so adding a language needs no extra field:
 * "pt" → PT, "zh-CN" → ZH.
 */
function languageAbbreviation(code) {
    return String(code).split("-")[0].slice(0, 2).toUpperCase();
}

/** Loads GTranslate's free widget once, after its settings are in place. */
function loadGTranslate() {
    if (qs("#gtranslate-script")) {
        return;
    }

    // Read by the widget script as it parses; must be assigned first.
    window.gtranslateSettings = {
        default_language: translationDefaultLanguage,
        languages: getAllTranslationLanguages().map((language) => language.code),
        wrapper_selector: ".gtranslate_wrapper",
        url_structure: "none",
        horizontal_position: "inline",
        detect_browser_language: false,
        native_language_names: false
    };

    const script = document.createElement("script");
    script.id = "gtranslate-script";
    script.src = "https://cdn.gtranslate.net/widgets/latest/dropdown.js";
    script.addEventListener("load", () => translationLog("script loaded"));
    script.addEventListener("error", () =>
        translationLog("script FAILED to load — the request was blocked or offline")
    );
    translationLog("script requested", script.src);
    script.defer = true;
    document.body.append(script);
}

/** GTranslate's hidden switcher, once its script has rendered it. */
function getGTranslateSelector() {
    return qs(".gtranslate_wrapper .gt_selector");
}

/**
 * Asks GTranslate to load Google's engine.
 * GTranslate loads it lazily on pointerenter/focusin over its own widget,
 * so firing those is the documented way to warm it up ahead of a choice.
 */
function preloadTranslationEngine() {
    const widget = qs(".gtranslate_wrapper");
    if (!widget) {
        return;
    }

    [widget, ...qsa("*", widget)].forEach((element) => {
        element.dispatchEvent(new Event("pointerenter", { bubbles: false }));
        element.dispatchEvent(new Event("focusin", { bubbles: true }));
    });
}

/** Reads the language GTranslate currently has the page in. */
function getActiveTranslationLanguage() {
    const match = document.cookie.match("(^|;) ?googtrans=([^;]*)(;|$)");
    const fromCookie = match ? decodeURIComponent(match[2]).split("/")[2] : null;
    return fromCookie || translationDefaultLanguage;
}

/**
 * Selects a language pair on GTranslate's hidden switcher and fires the
 * change event it listens for — the same thing a visitor does on the
 * widget itself. The script is deferred, so we retry until it exists.
 */
function callGTranslate(languagePair, attempt = 0) {
    const selector = getGTranslateSelector();

    if (selector) {
        preloadTranslationEngine();
        selector.value = languagePair;
        selector.dispatchEvent(new Event("change", { bubbles: true }));
        translationLog("apply", { pair: languagePair, afterAttempts: attempt });
        return;
    }

    if (attempt < 60) {
        window.setTimeout(() => callGTranslate(languagePair, attempt + 1), 150);
        return;
    }

    translationLog("engine missing — the hidden switcher never appeared", {
        pair: languagePair
    });
}

/** Reads the raw googtrans cookie, or null. Used by the diagnostics. */
function readTranslationCookie() {
    const match = document.cookie.match("(^|;) ?googtrans=([^;]*)(;|$)");
    return match ? decodeURIComponent(match[2]) : null;
}

/** Console tracing for the translation flow. See translationDiagnostics. */
function translationLog(step, detail) {
    if (!translationDiagnostics) {
        return;
    }
    window.console.log(`[translate] ${step}`, detail === undefined ? "" : detail);
}

/**
 * Removes the googtrans cookie from every host and path variant it may
 * have been written on.
 *
 * GTranslate and Google's own element do not agree on where they set it:
 * depending on which wrote it, it can live on the bare host, on the
 * dot-prefixed host, on the registrable domain, and at "/" or at the
 * current path. A cookie left behind on ANY of those keeps the page
 * translated, which is what makes a return to English look dead — the
 * text reverts and then the surviving cookie puts it straight back on the
 * next navigation. So every combination is expired, not just the one we
 * think we wrote.
 *
 * @returns {string[]} the variants that were cleared, for the log.
 */
function clearTranslationCookie() {
    const hostname = window.location.hostname;
    const domains = ["", hostname, "." + hostname];

    // A bare hostname like "localhost" has no parent domain to also clear.
    const parts = hostname.split(".");
    if (parts.length > 2) {
        domains.push("." + parts.slice(-2).join("."));
    }

    // Both the root path and the current directory: a cookie written at a
    // deeper path shadows the one at "/" and is not cleared by expiring "/".
    const paths = new Set(["/", window.location.pathname]);
    const directory = window.location.pathname.replace(/[^/]*$/, "");
    if (directory) {
        paths.add(directory);
    }

    const cleared = [];

    domains.forEach((domain) => {
        paths.forEach((path) => {
            const suffix = domain ? "; domain=" + domain : "";
            document.cookie =
                "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=" +
                path + suffix;
            cleared.push(`${domain || "(host)"}${path}`);
        });
    });

    return cleared;
}

/**
 * Returns the page to English.
 *
 * English is treated as an explicit RESET, not as "just another language".
 * Asking the widget for en|en tells it to restore the original text, but
 * it is the cookie that decides whether the page comes back translated,
 * so the cookie is cleared afterwards across every variant above and the
 * result is verified. If a cookie survives — something wrote it back — the
 * page is reloaded once, which is the only guaranteed way to drop
 * Google's in-memory state.
 */
function resetSiteLanguageToDefault() {
    const before = readTranslationCookie();
    translationLog("reset requested", { cookieBefore: before });

    // Restore the original text FIRST, then forget the cookie: clearing it
    // first makes the widget treat the call as a no-op and the visitor is
    // stranded in the translated page.
    callGTranslate(`${translationDefaultLanguage}|${translationDefaultLanguage}`);

    window.setTimeout(() => {
        const cleared = clearTranslationCookie();
        const after = readTranslationCookie();
        translationLog("reset cookie cleared", { variants: cleared, cookieAfter: after });

        if (!after) {
            return;
        }

        /*
         * The cookie came back. Nothing else can be done from here without
         * a fresh document, so reload once — guarded by a sessionStorage
         * flag so a persistent cookie can never cause a reload loop.
         */
        const guard = "goldtrap-translate-reset";
        let alreadyTried = false;
        try {
            alreadyTried = window.sessionStorage.getItem(guard) === "1";
            window.sessionStorage.setItem(guard, "1");
        } catch (error) {
            // Private mode or storage disabled: skip the reload entirely
            // rather than risk looping.
            alreadyTried = true;
        }

        if (!alreadyTried) {
            translationLog("reset needs reload", { cookieAfter: after });
            window.location.reload();
        } else {
            translationLog("reset FAILED — cookie persists", { cookieAfter: after });
        }
    }, 120);
}

/**
 * Switches the page language.
 * Handles English → other, other → other, and other → English alike.
 */
function setSiteLanguage(languageCode) {
    translationLog("select", { to: languageCode, cookie: readTranslationCookie() });

    if (languageCode === translationDefaultLanguage) {
        resetSiteLanguageToDefault();
        return;
    }

    // Leaving English for another language: the reset guard is spent, so a
    // later return to English may reload again if it has to.
    try {
        window.sessionStorage.removeItem("goldtrap-translate-reset");
    } catch (error) {
        // Storage unavailable — the guard simply stays as it is.
    }

    callGTranslate(`${translationDefaultLanguage}|${languageCode}`);
}

function initTranslation() {
    const root = qs("#lang-select");
    if (!root) {
        return;
    }

    const toggle = qs("#lang-select-toggle", root);
    const panel = qs("#lang-select-panel", root);
    const search = qs("#lang-select-search", root);
    const list = qs("#lang-select-list", root);
    const label = qs("#lang-select-label", root);
    const codeLabel = qs("#lang-select-code", root);

    if (!toggle || !panel || !search || !list || !label) {
        return;
    }

    const allLanguages = getAllTranslationLanguages();

    /**
     * Writes the current language into the header.
     * The full name is shown on desktop and tablet, the abbreviation on
     * mobile; CSS decides which is visible, so both are always current.
     * The accessible name always states the full language.
     */
    function showCurrentLanguage(entry) {
        label.textContent = entry.name;

        if (codeLabel) {
            codeLabel.textContent = languageAbbreviation(entry.code);
        }

        toggle.setAttribute("aria-label", `Language: ${entry.name}. Change language`);
    }

    /*
     * Reflect the language the visitor is already in — the cookie survives
     * reloads, so a returning visitor lands on a translated page and the
     * control must say so.
     *
     * A cookie naming a language the selector does not offer, or naming
     * English itself (en/en, which some widget versions leave behind), is
     * STALE: it is cleared here rather than trusted, because that leftover
     * is exactly what makes a later switch look dead.
     */
    let activeCode = getActiveTranslationLanguage();
    const cookieAtLoad = readTranslationCookie();
    const activeEntry = allLanguages.find((language) => language.code === activeCode);

    if (activeEntry && activeCode !== translationDefaultLanguage) {
        showCurrentLanguage(activeEntry);
    } else {
        if (cookieAtLoad) {
            translationLog("stale cookie at load — clearing", cookieAtLoad);
            clearTranslationCookie();
        }
        activeCode = translationDefaultLanguage;
        const fallback = allLanguages.find((l) => l.code === activeCode);
        if (fallback) {
            showCurrentLanguage(fallback);
        }
    }

    translationLog("init", {
        cookieAtLoad,
        activeCode,
        languagesListed: translationLanguages.length
    });

    /**
     * Renders the option list.
     * With no search term only the shortlist shows; typing searches the
     * full set, so every supported language stays reachable.
     */
    function renderOptions(filter = "") {
        const term = filter.trim().toLowerCase();
        const pool = term ? allLanguages : translationLanguages;
        // The open dropdown always lists full language names, never codes.
        const matches = pool.filter((language) =>
            language.name.toLowerCase().includes(term)
        );

        list.innerHTML = "";

        if (matches.length === 0) {
            const empty = document.createElement("p");
            empty.className = "lang-select__empty";
            empty.textContent = "No languages found";
            list.append(empty);
            return;
        }

        matches.forEach((language) => {
            const option = document.createElement("button");
            option.type = "button";
            option.className = "lang-select__option";
            option.setAttribute("role", "option");
            option.setAttribute("aria-selected", String(language.code === activeCode));
            option.dataset.code = language.code;
            option.textContent = language.name;
            list.append(option);
        });
    }

    function openPanel() {
        panel.hidden = false;
        toggle.setAttribute("aria-expanded", "true");
        search.value = "";
        renderOptions();
        search.focus();
    }

    function closePanel({ restoreFocus = false } = {}) {
        panel.hidden = true;
        toggle.setAttribute("aria-expanded", "false");
        if (restoreFocus) {
            toggle.focus();
        }
    }

    const isOpen = () => !panel.hidden;

    toggle.addEventListener("click", () => {
        if (isOpen()) {
            closePanel();
            return;
        }
        // Warm Google's engine up while the visitor is still choosing.
        preloadTranslationEngine();
        openPanel();
    });

    search.addEventListener("input", () => renderOptions(search.value));

    /**
     * Moves the roving focus through the rendered options.
     * The search field is the panel's first stop, so ArrowDown from it
     * enters the list and ArrowUp from the first option returns to it.
     *
     * @param {HTMLElement} from the element focus is leaving
     * @param {number} step +1 for down, -1 for up
     */
    function moveOptionFocus(from, step) {
        const options = qsa(".lang-select__option", list);
        if (options.length === 0) {
            return;
        }

        const current = options.indexOf(from);

        if (current === -1) {
            // Coming from the search field.
            (step > 0 ? options[0] : options[options.length - 1]).focus();
            return;
        }

        const next = current + step;

        if (next < 0) {
            search.focus();
            return;
        }

        options[Math.min(next, options.length - 1)].focus();
    }

    /*
     * Keyboard model for the panel (CLAUDE.md §22):
     *   ArrowDown / ArrowUp  move through the options
     *   Home / End           first / last option
     *   Enter or Space       choose the focused option (native button)
     *   Escape               close and return focus to the trigger
     *   Tab                  still walks the options in order
     */
    panel.addEventListener("keydown", (event) => {
        const target = event.target;

        if (event.key === "ArrowDown") {
            event.preventDefault();
            moveOptionFocus(target, 1);
            return;
        }

        if (event.key === "ArrowUp") {
            event.preventDefault();
            moveOptionFocus(target, -1);
            return;
        }

        const options = qsa(".lang-select__option", list);

        if (event.key === "Home" && options.length) {
            event.preventDefault();
            options[0].focus();
            return;
        }

        if (event.key === "End" && options.length) {
            event.preventDefault();
            options[options.length - 1].focus();
        }
    });

    // ArrowDown on the closed trigger opens the panel and enters the list.
    toggle.addEventListener("keydown", (event) => {
        if (event.key !== "ArrowDown" || isOpen()) {
            return;
        }
        event.preventDefault();
        preloadTranslationEngine();
        openPanel();
        const first = qs(".lang-select__option", list);
        if (first) {
            first.focus();
        }
    });

    // Delegated: one listener however many options are rendered.
    list.addEventListener("click", (event) => {
        const option = event.target.closest(".lang-select__option");
        if (!option) {
            return;
        }

        activeCode = option.dataset.code;
        showCurrentLanguage({ code: activeCode, name: option.textContent });
        setSiteLanguage(activeCode);
        closePanel({ restoreFocus: true });
    });

    // Clicking anywhere outside closes the panel.
    document.addEventListener("click", (event) => {
        if (isOpen() && !root.contains(event.target)) {
            closePanel();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && isOpen()) {
            closePanel({ restoreFocus: true });
        }
    });

    renderOptions();
    loadGTranslate();
}


/* ======================================================================
 * LIVE CHART
 * ======================================================================
 * The hero's chart container is deliberately empty in the markup. The
 * endpoint comes from homepageLiveChartApi so the URL is never written
 * into the HTML, and the container already carries its final size and
 * aspect ratio — injecting a chart cannot reflow the hero.
 *
 * Leave homepageLiveChartApi empty to keep the container blank.
 * ====================================================================== */

function initLiveChart() {
    const container = qs("#live-chart-container");
    if (!container || !homepageLiveChartApi) {
        return;
    }

    const frame = document.createElement("iframe");
    frame.src = homepageLiveChartApi;
    frame.title = `Live XAUUSD price chart`;
    frame.loading = "lazy";
    frame.setAttribute("frameborder", "0");
    frame.setAttribute("scrolling", "no");
    container.append(frame);
}


/* ======================================================================
 * LIVE CHAT / PITCHBAR
 * ======================================================================
 * The launcher is the site's own element: a 68px avatar with a green
 * online dot and a continuous gold pulse, plus a label that slides out
 * on hover and on keyboard focus.
 *
 * ------------------------------------------------------------------
 * PITCHBAR INTEGRATION POINT
 * ------------------------------------------------------------------
 * Pitchbar will eventually be self-hosted on a VPS and embedded here.
 * It is NOT integrated yet and nothing below depends on it.
 *
 * When Pitchbar is deployed:
 *   1. Load its script/widget inside openLiveChat() below (or from a
 *      loader called there), using the URL of your own VPS instance.
 *   2. Replace the Telegram fallback by setting
 *      liveChatUsesTelegramFallback = false in the configuration.
 *   3. Call Pitchbar's own open method in place of the fallback.
 *
 * Everything else — the launcher markup, its styling, the pulse, the
 * hover label, the online dot and the accessibility behaviour — stays
 * exactly as it is. No other part of the site needs restructuring.
 *
 * Do not add Pitchbar scripts or assume an API before it is purchased
 * and its real documentation is available.
 * ------------------------------------------------------------------
 * ====================================================================== */

/** Opens the chat. Today: Telegram. Later: Pitchbar. */
function openLiveChat(event) {
    // --- PITCHBAR INTEGRATION POINT -------------------------------
    // if (window.Pitchbar) { event.preventDefault(); window.Pitchbar.open(); return; }
    // --------------------------------------------------------------

    if (!liveChatUsesTelegramFallback) {
        event.preventDefault();
    }
    // Otherwise the anchor's configured Telegram href handles the click.
}

function initLiveChat() {
    const launcher = qs("#live-chat-launcher");
    if (!launcher) {
        return;
    }

    // Hover/focus label text comes from configuration, not the markup.
    withElement(qs("#live-chat-label", launcher), (labelElement) => {
        /*
         * liveChatIconHoverText interpolates ${siteOwner}, so the owner's
         * name is inside the label. The label itself stays translatable —
         * protectIdentityTerms() wraps just the name.
         */
        labelElement.textContent = liveChatIconHoverText;
    });

    // The accessible name matches the visible label, plus the online state.
    launcher.setAttribute("aria-label", `${liveChatIconHoverText} — online`);

    launcher.addEventListener("click", openLiveChat);
}


/* ======================================================================
 * MOBILE NAVIGATION (architecture only — not yet implemented)
 * ======================================================================
 * DESKTOP IS UNCHANGED by this function.
 *
 * The supplied mobile mockup shows no hamburger: it drops the nav links
 * entirely, leaving only the logo and the language pill. A modern
 * hamburger menu is nonetheless an intentional requirement for the
 * mobile build, so the markup and behaviour are prepared here and the
 * toggle stays hidden at desktop widths via CSS.
 *
 * The mobile phase only needs to reveal .nav-toggle in its media query
 * and style .primary-nav's open state — the toggle, aria-expanded,
 * Escape handling, outside-click handling, link-closes-menu behaviour
 * and focus return are all already wired below.
 * ====================================================================== */

function initMobileNavigation() {
    const toggle = qs("#nav-toggle");
    const nav = qs("#primary-nav");

    if (!toggle || !nav) {
        return;
    }

    const setOpen = (open) => {
        toggle.setAttribute("aria-expanded", String(open));
        nav.classList.toggle("is-open", open);
        document.body.classList.toggle("nav-is-open", open);
    };

    const isOpen = () => toggle.getAttribute("aria-expanded") === "true";

    toggle.addEventListener("click", () => setOpen(!isOpen()));

    // Choosing a destination closes the menu.
    nav.addEventListener("click", (event) => {
        if (event.target.closest("a") && isOpen()) {
            setOpen(false);
        }
    });

    // Escape closes it and returns focus to the toggle.
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && isOpen()) {
            setOpen(false);
            toggle.focus();
        }
    });

    // Clicking outside closes it.
    document.addEventListener("click", (event) => {
        if (isOpen() && !nav.contains(event.target) && !toggle.contains(event.target)) {
            setOpen(false);
        }
    });
}


/* ======================================================================
 * CLIPBOARD  (CLAUDE.md §10.3 and §14.1)
 * ======================================================================
 * One implementation serving both copy controls. Adds .is-copied for
 * COPY_FEEDBACK_MS, optionally swaps a text label, and announces the
 * result to assistive technology.
 * ====================================================================== */

async function copyText(text) {
    // Clipboard API where supported...
    if (navigator.clipboard && window.isSecureContext) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (error) {
            /* fall through to the legacy path below */
        }
    }

    // ...with a execCommand fallback for insecure contexts and older browsers.
    try {
        const scratch = document.createElement("textarea");
        scratch.value = text;
        scratch.setAttribute("readonly", "");
        scratch.style.position = "fixed";
        scratch.style.opacity = "0";
        document.body.append(scratch);
        scratch.select();
        const succeeded = document.execCommand("copy");
        scratch.remove();
        return succeeded;
    } catch (error) {
        return false;
    }
}

/**
 * Wires a copy control.
 *
 * @param {HTMLElement} button   the control (always a real <button>)
 * @param {Function}    getValue returns the string to copy
 * @param {object}      options  { labelElement, idleLabel, copiedLabel }
 */
function initCopyControl(button, getValue, options = {}) {
    if (!button) {
        return;
    }

    const { labelElement, idleLabel, copiedLabel } = options;
    let resetTimer = null;

    button.addEventListener("click", async () => {
        const value = getValue();
        if (!value) {
            return;
        }

        const copied = await copyText(value);
        if (!copied) {
            return;
        }

        button.classList.add("is-copied");

        if (labelElement && copiedLabel) {
            labelElement.textContent = copiedLabel;
        }

        // Announce for screen readers, which cannot see the icon swap.
        button.setAttribute("aria-label", `${copiedLabel || "Copied"}: ${value}`);

        window.clearTimeout(resetTimer);
        resetTimer = window.setTimeout(() => {
            button.classList.remove("is-copied");

            if (labelElement && idleLabel) {
                labelElement.textContent = idleLabel;
            }

            button.setAttribute("aria-label", `Copy ${value}`);
        }, COPY_FEEDBACK_MS);
    });
}


/* ======================================================================
 * STICKY OFFSET
 * ======================================================================
 * How much fixed/sticky chrome sits at the top of the viewport, written to
 * --sticky-offset for CSS to use as the FAQ rail's `top` and as
 * `scroll-margin-top` on anything scrolled to.
 *
 * MEASURED, NEVER ASSUMED. The announcement bar is dismissible: hard-coding
 * its height leaves every deep link and the category rail off by that much
 * the moment a visitor closes it. So the value is recomputed whenever the
 * chrome changes — on load, on resize, and when the bar is dismissed.
 *
 * Only elements that are actually pinned count. The announcement bar
 * scrolls away with the page, so it contributes nothing once scrolled; it
 * is the sticky header, where one exists, that occupies the viewport.
 * ====================================================================== */

function updateStickyOffset() {
    let offset = 0;

    qsa(".site-header, .action-bar").forEach((element) => {
        if (element.hidden || element.offsetParent === null) {
            return;
        }
        const position = window.getComputedStyle(element).position;
        if (position === "sticky" || position === "fixed") {
            offset += element.getBoundingClientRect().height;
        }
    });

    document.documentElement.style.setProperty(
        "--sticky-offset",
        `${Math.round(offset)}px`
    );

    updateHeroGlowRise();
}

/**
 * How far the hero's warm glow has to reach ABOVE itself to sit behind the
 * header and the announcement bar, as the mockup shows.
 *
 * The element carrying the glow starts at a different height on each page —
 * a wrapper just below the bar on the FAQ page, the hero section below the
 * header on the homepage — so a fixed offset covers one and falls short on
 * the other. Measuring the real distance to the top of the page makes one
 * CSS rule correct on both.
 *
 * The 100px floor preserves the FAQ page's existing look exactly: its hero
 * sits 66px down, so the measurement never lowers what was already there.
 * Recomputed alongside the sticky offset, which means it also follows the
 * announcement bar being dismissed or wrapping to more lines.
 */
function updateHeroGlowRise() {
    const hero = qs(".hero");
    if (!hero) {
        return;
    }

    const distanceToTop = hero.getBoundingClientRect().top + window.scrollY;

    document.documentElement.style.setProperty(
        "--hero-glow-rise",
        `${Math.max(100, Math.round(distanceToTop))}px`
    );
}

/** Recomputes the offset whenever the chrome can have changed. */
function initStickyOffset() {
    updateStickyOffset();
    window.addEventListener("resize", updateStickyOffset);
    window.addEventListener("orientationchange", updateStickyOffset);

    // The announcement bar is dismissible and the header can wrap, so watch
    // them rather than guessing when they change.
    if ("ResizeObserver" in window) {
        const observer = new ResizeObserver(() => updateStickyOffset());
        qsa(".site-header, .action-bar").forEach((element) => observer.observe(element));
    }
}


/* ======================================================================
 * PER-QUESTION COPY LINK
 * ======================================================================
 * Every FAQ question — on the homepage and on the full FAQ page — carries
 * a control that copies a deep link to that one question.
 *
 * THE LINK
 * The origin comes from window.location, never a hard-coded domain, so the
 * same code produces a correct link on a local server, on the GitHub Pages
 * build and on the production domain. The fragment is the question's
 * STABLE id from faq-page-content.js — reordering the database does not
 * change it, and there is no parallel id scheme.
 *
 * A link always points at the page it was copied from. The homepage's
 * featured questions are their own approved collection, so a homepage
 * question does not exist on the FAQ page and linking there would land on
 * the wrong text or on nothing at all.
 *
 * THE TRAP
 * The control sits in the question header, which is itself the accordion
 * trigger. It is therefore a SIBLING of the trigger button, never nested
 * inside it: nested interactive elements are invalid HTML and break
 * keyboard and screen-reader behaviour. The click handler also stops
 * propagation, so no delegated accordion listener can ever see it.
 * ====================================================================== */

/** Icons for the copy control. Two states: link, and copied. */
const faqCopyIcons = {
    link: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/></svg>',
    done: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>'
};

/**
 * The absolute URL of a question on the CURRENT page.
 *
 * @param {string} questionId the question's stable id
 * @returns {string} e.g. "https://example.com/frequently-asked-questions.html#getting-started--mt4-or-mt5"
 */
function faqDeepLinkUrl(questionId) {
    const url = new URL(window.location.href);
    url.search = "";
    url.hash = questionId;
    return url.toString();
}

/**
 * Markup for one copy control. Rendered as a sibling of the accordion
 * trigger — see the note above about nested interactive elements.
 *
 * @param {string} questionId the question's stable id
 * @returns {string} HTML
 */
function renderFaqCopyLink(questionId) {
    return `
        <button type="button" class="faq-copy-link" data-faq-copy="${questionId}"
                aria-label="Copy link to this question">
            <span class="faq-copy-link__icon faq-copy-link__icon--link">${faqCopyIcons.link}</span>
            <span class="faq-copy-link__icon faq-copy-link__icon--done">${faqCopyIcons.done}</span>
        </button>`;
}

/**
 * The shared announcement region. Colour and an icon swap are not
 * perceivable to a screen-reader user, so every copy result is also spoken.
 */
function faqCopyLiveRegion() {
    let region = qs("#faq-copy-status");

    if (!region) {
        region = document.createElement("p");
        region.id = "faq-copy-status";
        region.className = "visually-hidden";
        region.setAttribute("role", "status");
        region.setAttribute("aria-live", "polite");
        document.body.append(region);
    }

    return region;
}

/**
 * One delegated listener for every copy control on the page, present and
 * future — the FAQ list is re-rendered on each keystroke, so per-button
 * listeners would be lost.
 *
 * @param {Element} scope the container to listen on
 */
function initFaqCopyLinks(scope) {
    if (!scope || scope.dataset.copyLinksReady === "true") {
        return;
    }
    scope.dataset.copyLinksReady = "true";

    const timers = new WeakMap();

    scope.addEventListener("click", async (event) => {
        const button = event.target.closest(".faq-copy-link");
        if (!button || !scope.contains(button)) {
            return;
        }

        /*
         * The control is already a sibling of the trigger, so no accordion
         * listener matches it. This is belt and braces: it also stops any
         * listener added later on an ancestor from toggling the question.
         */
        event.preventDefault();
        event.stopPropagation();

        const questionId = button.dataset.faqCopy;
        const url = faqDeepLinkUrl(questionId);
        const region = faqCopyLiveRegion();
        const copied = await copyText(url);

        window.clearTimeout(timers.get(button));
        button.classList.remove("is-copied", "is-failed");

        if (copied) {
            button.classList.add("is-copied");
            button.setAttribute("aria-label", "Link copied to clipboard");
            region.textContent = `Link copied: ${url}`;
        } else {
            /*
             * A real failure gets a real failed state. Silently doing
             * nothing would leave the visitor believing they had the link.
             */
            button.classList.add("is-failed");
            button.setAttribute("aria-label", "Copying the link failed");
            region.textContent = "Could not copy the link. Please copy it from the address bar.";
        }

        timers.set(button, window.setTimeout(() => {
            button.classList.remove("is-copied", "is-failed");
            button.setAttribute("aria-label", "Copy link to this question");
            region.textContent = "";
        }, COPY_FEEDBACK_MS));
    });
}


/* ======================================================================
 * PURCHASE DIALOG  (CLAUDE.md §10 and §26)
 * ======================================================================
 * A single reusable dialog serving both the EA plans and the source code.
 * Callers pass a payload; nothing about the content is hard-coded here.
 * ====================================================================== */

const purchaseDialog = {
    element: null,
    lastFocused: null,

    init() {
        this.element = qs("#purchase-dialog");
        if (!this.element) {
            return;
        }

        // Close on the X button.
        withElement(qs("#purchase-dialog-close", this.element), (closeButton) => {
            closeButton.addEventListener("click", () => this.close());
        });

        // Close on backdrop click. <dialog> reports clicks on the backdrop as
        // clicks on the dialog itself, so compare against its content box.
        this.element.addEventListener("click", (event) => {
            if (event.target !== this.element) {
                return;
            }

            const box = this.element.getBoundingClientRect();
            const outside =
                event.clientX < box.left ||
                event.clientX > box.right ||
                event.clientY < box.top ||
                event.clientY > box.bottom;

            if (outside) {
                this.close();
            }
        });

        // Escape is handled natively by <dialog>; restore focus when it fires.
        this.element.addEventListener("close", () => {
            withElement(this.lastFocused, (element) => element.focus());
            this.lastFocused = null;
        });
    },

    /**
     * @param {object} payload
     *   title    dialog heading
     *   subtitle line under the heading
     *   rows     [{ label, value, suffix, variant }]
     *   note     paragraph above the confirm button
     *   ctaLabel confirm button text
     */
    open(payload) {
        if (!this.element) {
            return;
        }

        this.lastFocused = document.activeElement;

        withElement(qs("#purchase-dialog-title", this.element), (title) => {
            title.textContent = payload.title;
        });

        withElement(qs("#purchase-dialog-subtitle", this.element), (subtitle) => {
            subtitle.textContent = payload.subtitle;
        });

        withElement(qs("#purchase-dialog-rows", this.element), (container) => {
            container.innerHTML = payload.rows.map(renderPurchaseRow).join("");

            // The wallet row is rebuilt each time, so rewire its copy control.
            initCopyControl(qs(".wallet-row", container), () => walletAddress);
        });

        withElement(qs("#purchase-dialog-note", this.element), (note) => {
            note.textContent = payload.note;
        });

        withElement(qs("#purchase-dialog-confirm", this.element), (confirm) => {
            confirm.href = telegramPersonal;
            confirm.querySelector(".btn-label").textContent = payload.ctaLabel;
        });

        // The dialog's rows are rebuilt on every open, so the wallet
        // address, amount, network and any identifier in the note are
        // re-protected here, immediately before it becomes visible.
        protectIdentityTerms(this.element);

        if (typeof this.element.showModal === "function") {
            this.element.showModal();
        } else {
            this.element.setAttribute("open", "");
        }
    },

    close() {
        if (!this.element) {
            return;
        }

        if (typeof this.element.close === "function") {
            this.element.close();
        } else {
            this.element.removeAttribute("open");
        }
    }
};

/** Renders one dialog row; the wallet row is a button, the rest are static. */
function renderPurchaseRow(row) {
    if (row.type === "wallet") {
        return `
            <button type="button" class="wallet-row" aria-label="Copy ${row.value}">
                <span>
                    <span class="wallet-row__label">${row.label}</span>
                    <!--
                        THE highest-stakes string on the site. A translated,
                        transliterated or re-spaced address could send funds
                        nowhere, so it is marked here in the markup that
                        creates it rather than relying on an ancestor.
                    -->
                    <span class="wallet-row__value notranslate" translate="no">${row.value}</span>
                </span>
                <span class="wallet-row__icon">
                    <svg class="icon-copy" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                    <svg class="icon-check" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                </span>
            </button>
        `;
    }

    const valueClasses = [
        "purchase-row__value",
        row.variant === "gold" ? "purchase-row__value--gold" : "",
        row.variant === "amount" ? "purchase-row__value--amount" : ""
    ]
        .filter(Boolean)
        .join(" ");

    // The amount suffix ("USDT") is a currency code, never translated.
    const suffix = row.suffix
        ? `<span class="purchase-row__suffix notranslate" translate="no">${row.suffix}</span>`
        : "";

    /*
     * Row LABELS ("Plan", "Amount", "Network") are prose and translate
     * normally. Row VALUES are identifiers — the plan name, the price, the
     * network — and are marked here, on the element that receives them.
     */
    return `
        <div class="purchase-row">
            <span class="purchase-row__label">${row.label}</span>
            <span class="${valueClasses} notranslate" translate="no">${row.value}${suffix}</span>
        </div>
    `;
}

/**
 * Reads the EA title from the page rather than duplicating it (§12.1).
 * Falls back to the configured site name if the element is absent.
 */
function getEaTitle() {
    return `${siteName} ${eaCurrentVersion}`;
}


/* ======================================================================
 * SECTION 5 — PRICING  (CLAUDE.md §9 and §25)
 * ====================================================================== */

function initPricing() {
    const grid = qs("#pricing-grid");
    if (!grid) {
        return;
    }

    grid.innerHTML = pricingPlans.map(renderPlanCard).join("");

    // Each card gets its own independent timer instance.
    pricingPlans.forEach((plan, index) => {
        const card = qs(`[data-plan-index="${index}"]`, grid);
        if (card) {
            setTimer(card, plan);
        }
    });

    // Delegated so cards can be re-rendered without rebinding listeners.
    grid.addEventListener("click", (event) => {
        const button = event.target.closest("[data-open-purchase]");
        if (!button) {
            return;
        }

        const card = button.closest(".plan-card");
        if (!card) {
            return;
        }

        openPlanDialog(card);
    });
}

function renderPlanCard(plan, index) {
    const isFree = Number(plan.price) === 0;
    const accentClass = plan.accent === "green" ? " plan-card--free" : "";

    const priceText = isFree ? "FREE" : `$${formatPrice(plan.price)}`;
    // The currency code is an identifier, not a word.
    const currency = plan.currency
        ? `<span class="plan-card__currency notranslate" translate="no">${plan.currency}</span>`
        : "";

    const hotBadge = plan.hot
        ? `<span class="badge-hot">${icons.flame} Hot</span>`
        : "";

    const eyebrowIcon =
        plan.eyebrowIcon === "dot"
            ? '<span class="status-dot" aria-hidden="true"></span>'
            : icons[plan.eyebrowIcon] || "";

    // A plan supplies either a tick list or a numbered step list.
    const features = plan.features
        ? `<ul class="plan-card__features">${plan.features
              .map((feature) => `<li>${icons.check}<span>${feature}</span></li>`)
              .join("")}</ul>`
        : "";

    const steps = plan.steps
        ? `<ol class="plan-card__steps">${plan.steps
              .map(
                  (step, stepIndex) =>
                      `<li><span class="icon-disc icon-disc--sm icon-disc--green" aria-hidden="true">${
                          stepIndex + 1
                      }</span><span>${step}</span></li>`
              )
              .join("")}</ol>`
        : "";

    const note = plan.note ? `<p class="plan-card__note">${plan.note}</p>` : "";

    // A plan with an href links out; without one it opens the purchase dialog.
    const ctaIcon = plan.cta.icon ? icons[plan.cta.icon] : "";
    const ctaLabel = isFree
        ? plan.cta.label
        : `${plan.cta.label} — $${formatPrice(plan.price)} ${plan.currency}`.trim();

    const cta = plan.cta.href
        ? `<a class="btn btn--${plan.cta.type} btn--block plan-card__cta" href="${plan.cta.href}"
              target="_blank" rel="noopener noreferrer">
               <span class="btn-label">${ctaLabel}</span>${ctaIcon}
           </a>`
        : `<button type="button" class="btn btn--${plan.cta.type} btn--block plan-card__cta"
                   data-open-purchase>
               ${ctaIcon}<span class="btn-label">${ctaLabel}</span>
           </button>`;

    /*
     * data-* attributes carry the plan's identity so the dialog can read the
     * selected card instead of holding its own copy of the values (§24).
     */
    return `
        <article class="plan-card${accentClass} scroll-reveal"
                 style="--reveal-index: ${index}"
                 data-plan-index="${index}"
                 data-plan-name="${plan.planName}"
                 data-plan-price="${plan.price}"
                 data-plan-currency="${plan.currency || paymentAmountSuffix}">
            <p class="plan-card__eyebrow">${eyebrowIcon}<span>${plan.eyebrow}</span></p>
            <h3 class="plan-card__name">${plan.planName}</h3>
            <div class="plan-card__price-row">
                <!--
                    The price cell, including the free plan's "FREE".
                    Leaving "FREE" translatable was tried and reverted:
                    with no sentence around it Google picks the wrong sense
                    of the word — "自由的" and "حر" mean free as in liberty,
                    and German gave "FREI". A price field reading that is
                    worse than one reading English.
                -->
                <span class="plan-card__price notranslate" translate="no"
                      data-plan-price-display>${priceText}</span>
                ${currency}
                ${hotBadge}
            </div>
            <p class="plan-card__caption">${plan.caption}</p>
            <p class="plan-card__timer is-hidden" data-plan-timer aria-live="polite">
                ${icons.clock}<span data-plan-timer-value></span>
            </p>
            <div class="plan-card__divider"></div>
            ${steps}
            ${features}
            ${note}
            ${cta}
        </article>
    `;
}

/**
 * Independent countdown timer for one pricing card (CLAUDE.md §9.3).
 *
 * When the countdown reaches zero the plan's price rises by its increment,
 * the card and its CTA are re-rendered from the new price, and the timer
 * restarts. Each card keeps its own state — no shared globals.
 *
 * @param {HTMLElement} card the .plan-card element
 * @param {object}      plan the matching entry from pricingPlans
 */
function setTimer(card, plan) {
    const timerElement = qs("[data-plan-timer]", card);
    const valueElement = qs("[data-plan-timer-value]", card);

    if (!timerElement || !valueElement) {
        return;
    }

    // Visibility is global (pricingTimerStatus); the countdown itself is per-plan.
    const shouldShow = pricingTimerStatus === "show" && plan.timerTime > 0;

    /*
     * §9.4: when hidden the timer keeps its allocated space using
     * visibility: hidden, so showing or hiding it never shifts the layout.
     */
    if (!shouldShow) {
        timerElement.classList.add("is-hidden");
        return;
    }

    timerElement.classList.remove("is-hidden");

    let remaining = plan.timerTime;
    let currentPrice = plan.price;

    function formatRemaining(totalSeconds) {
        const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
        const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
        const seconds = String(totalSeconds % 60).padStart(2, "0");
        return `${hours}:${minutes}:${seconds} left at this price`;
    }

    function applyPrice(newPrice) {
        currentPrice = newPrice;

        // Keep the card's data attribute authoritative for the dialog.
        card.dataset.planPrice = String(newPrice);

        // Rewritten live, so it is re-marked on the element being written.
        withElement(qs("[data-plan-price-display]", card), (display) => {
            protectIdentityText(display, `$${formatPrice(newPrice)}`);
        });

        withElement(qs(".plan-card__cta .btn-label", card), (label) => {
            label.textContent =
                `${plan.cta.label} — $${formatPrice(newPrice)} ${plan.currency}`.trim();
            // "Buy Now" translates; the price and currency inside must not.
            protectIdentityTerms(label);
        });
    }

    function tick() {
        remaining -= 1;

        if (remaining <= 0) {
            applyPrice(currentPrice + plan.increment);
            remaining = plan.timerTime;
        }

        valueElement.textContent = formatRemaining(remaining);
    }

    valueElement.textContent = formatRemaining(remaining);
    window.setInterval(tick, TIMER_TICK_MS);
}

/**
 * Builds the EA purchase dialog from the clicked card's own content, so the
 * plan name and amount are never duplicated in the dialog markup (§10.1).
 */
function openPlanDialog(card) {
    const planName = card.dataset.planName;
    const price = Number(card.dataset.planPrice);
    const currency = card.dataset.planCurrency || paymentAmountSuffix;

    purchaseDialog.open({
        title: `Purchase ${getEaTitle()}`,
        subtitle: `Send ${currency} and confirm on Telegram.`,
        rows: [
            { label: "Plan", value: planName, variant: "gold" },
            {
                label: "Amount",
                value: `$${formatPrice(price)}`,
                suffix: currency,
                variant: "amount"
            },
            { label: "Network", value: paymentNetwork, variant: "gold" },
            { type: "wallet", label: "Wallet Address", value: walletAddress }
        ],
        note: `After payment, send the transaction screenshot to ${siteOwner} on Telegram for license activation.`,
        ctaLabel: "Confirm Payment on Telegram"
    });
}


/* ======================================================================
 * SECTION 6 — SOURCE CODE DIALOG  (CLAUDE.md §12)
 * ======================================================================
 * Title, EA version and price are all read from the live page, so editing
 * the section's HTML automatically updates the dialog.
 * ====================================================================== */

function initSourceCode() {
    const trigger = qs("#source-code-purchase");
    if (!trigger) {
        return;
    }

    trigger.addEventListener("click", () => {
        // "Source Code" comes from the highlighted half of the page heading.
        const headingAccent = qs("#source-code-heading .accent");
        const headingText = headingAccent
            ? headingAccent.textContent.trim()
            : "Source Code";

        const priceElement = qs("#source-code-price");
        const priceText = priceElement ? priceElement.textContent.trim() : "";
        const currencyElement = qs("#source-code-currency");
        const currency = currencyElement ? currencyElement.textContent.trim() : "USD";

        purchaseDialog.open({
            title: `${getEaTitle()} — ${headingText}`,
            subtitle: `Send ${paymentAmountSuffix} and confirm on Telegram.`,
            rows: [
                {
                    label: "Amount",
                    value: priceText,
                    suffix: currency,
                    variant: "amount"
                },
                { label: "Network", value: paymentNetwork, variant: "gold" },
                { type: "wallet", label: "Wallet Address", value: walletAddress }
            ],
            note: `After payment, send the transaction screenshot to ${siteOwner} on Telegram for license activation.`,
            ctaLabel: "Confirm Payment on Telegram"
        });
    });
}


/* ======================================================================
 * SECTION 4 — LIVE ACTIVITY + STATISTICS  (CLAUDE.md §8.2 and §8.3)
 * ====================================================================== */

function initLiveResults() {
    /*
     * Colour of the live-activity indicator. The continuous pulse itself is
     * a CSS animation; only the colour is controlled from here.
     */
    const liveActivityPulsingDot = qs(".pulsing-dot");

    if (liveActivityPulsingDot) {
        liveActivityPulsingDot.style.background = liveActivityColor;
    }

    withElement(qs("#stat-license-keys"), (element) => {
        element.textContent = licenseKeysGeneratedToday;
    });

    withElement(qs("#stat-eas-running"), (element) => {
        element.textContent = easRunningToday;
    });
}


/* ======================================================================
 * SECTION 8 — DOWNLOAD  (CLAUDE.md §14 and §14.1)
 * ====================================================================== */

function initDownload() {
    // The whitelist URL is printed from configuration, never hard-coded.
    // A URL a visitor copies character for character: never translated.
    withElement(qs("#whitelist-url"), (element) => {
        protectIdentityText(element, metaTraderWhitelist);
    });

    initCopyControl(
        qs("#whitelist-copy"),
        () => metaTraderWhitelist,
        {
            labelElement: qs("#whitelist-copy-label"),
            idleLabel: "Copy",
            copiedLabel: "Copied"
        }
    );
}


/* ======================================================================
 * SECTION 9 — FAQ  (CLAUDE.md §15 and §16)
 * ======================================================================
 * Drives both the homepage section and the complete FAQ page from the same
 * service. `mode` decides how much is rendered.
 * ====================================================================== */

function initFaq() {
    const root = qs("#faq");
    if (!root) {
        return;
    }

    const categoriesContainer = qs("#faq-categories", root);
    const panelsContainer = qs("#faq-panels", root);

    if (!categoriesContainer || !panelsContainer) {
        return;
    }

    // "all" renders every category stacked; otherwise one category at a time.
    const mode = root.dataset.faqMode === "all" ? "all" : "single";
    const questionLimit = Number(root.dataset.faqLimit) || Infinity;

    const faqData = faqServiceInstance.getFaqData();
    const categoryIds = Object.keys(faqData);

    if (categoryIds.length === 0) {
        return;
    }

    if (mode === "all") {
        // Full FAQ page: no filter pills, every category rendered in order.
        categoriesContainer.remove();
        panelsContainer.innerHTML = categoryIds
            .map((id) => renderFaqCategoryBlock(faqData[id], id, questionLimit))
            .join("");
        // FAQ prose mentions MT4/MT5, XAUUSD and the product by name.
        protectIdentityTerms(panelsContainer);
        openFirstFaqItem(panelsContainer);
    } else {
        categoriesContainer.innerHTML = categoryIds
            .map(
                (id, index) => `
                    <button type="button"
                            class="faq__category"
                            role="tab"
                            id="faq-tab-${id}"
                            aria-controls="faq-panel-${id}"
                            aria-selected="${index === 0}"
                            data-category-id="${id}">
                        ${faqData[id].name}
                    </button>
                `
            )
            .join("");

        renderSingleCategory(categoryIds[0]);

        // Only one category may be active at a time.
        categoriesContainer.addEventListener("click", (event) => {
            const tab = event.target.closest(".faq__category");
            if (!tab) {
                return;
            }

            qsa(".faq__category", categoriesContainer).forEach((button) => {
                button.setAttribute(
                    "aria-selected",
                    String(button === tab)
                );
            });

            renderSingleCategory(tab.dataset.categoryId);
        });
    }

    function renderSingleCategory(categoryId) {
        const category = faqServiceInstance.getCategory(categoryId);
        if (!category) {
            return;
        }

        panelsContainer.innerHTML = renderFaqColumns(
            category.questions,
            categoryId,
            questionLimit
        );

        // Re-rendered content is unprotected until this runs over it.
        protectIdentityTerms(panelsContainer);

        // The mockup shows the first question of a category already open.
        openFirstFaqItem(panelsContainer);
    }

    // Copy controls: one delegated listener for every question, present
    // and future — the panel is re-rendered whenever the category changes.
    initFaqCopyLinks(panelsContainer);

    /**
     * Opens the question named by the URL hash, if there is one.
     *
     * Switches to its category first when a filter is active, respects the
     * one-open-at-a-time rule, and scrolls it clear of the sticky chrome
     * via scroll-margin-top rather than a magic offset. An unknown or
     * malformed hash falls through silently and the page renders normally.
     */
    function openQuestionFromHash() {
        const hash = decodeURIComponent(window.location.hash.replace(/^#/, ""));
        if (!hash) {
            return;
        }

        // The key is "<categoryId>-<questionId>"; the category is the part
        // before the first dash that names one of the rendered categories.
        const categoryId = categoryIds.find(
            (id) => hash === id || hash.startsWith(`${id}-`)
        );

        if (!categoryId) {
            return;     // Not one of ours: leave the page alone.
        }

        if (mode !== "all") {
            const tab = qs(
                `.faq__category[data-category-id="${categoryId}"]`,
                categoriesContainer
            );
            if (tab) {
                qsa(".faq__category", categoriesContainer).forEach((button) => {
                    button.setAttribute("aria-selected", String(button === tab));
                });
                renderSingleCategory(categoryId);
            }
        }

        const item = qs(`[data-question-key="${hash}"]`, panelsContainer);
        if (!item) {
            return;
        }

        const trigger = qs(".faq-item__trigger", item);
        if (trigger && trigger.getAttribute("aria-expanded") !== "true") {
            trigger.click();
        }

        item.scrollIntoView({ block: "start", behavior: "smooth" });
    }

    openQuestionFromHash();
    window.addEventListener("hashchange", openQuestionFromHash);

    // One delegated listener covers every accordion on the page.
    panelsContainer.addEventListener("click", (event) => {
        const trigger = event.target.closest(".faq-item__trigger");
        if (!trigger) {
            return;
        }

        const item = trigger.closest(".faq-item");
        const panel = qs(`#${trigger.getAttribute("aria-controls")}`, panelsContainer);
        const isOpen = trigger.getAttribute("aria-expanded") === "true";

        // Close every other question first — only one stays open (§15.2).
        qsa(".faq-item__trigger", panelsContainer).forEach((otherTrigger) => {
            otherTrigger.setAttribute("aria-expanded", "false");
            otherTrigger.closest(".faq-item").classList.remove("is-open");

            const otherPanel = qs(
                `#${otherTrigger.getAttribute("aria-controls")}`,
                panelsContainer
            );

            if (otherPanel) {
                otherPanel.hidden = true;
            }
        });

        // Clicking an open question (or its chevron) closes it.
        if (!isOpen) {
            trigger.setAttribute("aria-expanded", "true");
            item.classList.add("is-open");
            if (panel) {
                panel.hidden = false;
            }
        }
    });
}

/** Opens the first question in a freshly rendered set, as the mockup shows. */
function openFirstFaqItem(scope) {
    const trigger = qs(".faq-item__trigger", scope);
    if (!trigger) {
        return;
    }

    trigger.setAttribute("aria-expanded", "true");
    trigger.closest(".faq-item").classList.add("is-open");

    withElement(qs(`#${trigger.getAttribute("aria-controls")}`, scope), (panel) => {
        panel.hidden = false;
    });
}

/**
 * Renders questions into two independent columns, alternating left/right,
 * exactly as the mockup lays them out. Independent columns mean an open
 * answer grows only its own column.
 */
function renderFaqColumns(questions, categoryId, limit) {
    const entries = Object.entries(questions).slice(0, limit);
    const columns = [[], []];

    entries.forEach(([questionId, entry], index) => {
        columns[index % 2].push(renderFaqItem(entry, `${categoryId}-${questionId}`));
    });

    return `
        <div class="faq__columns">
            <div class="faq__column">${columns[0].join("")}</div>
            <div class="faq__column">${columns[1].join("")}</div>
        </div>
    `;
}

function renderFaqCategoryBlock(category, categoryId, limit) {
    return `
        <section class="faq-block scroll-reveal">
            <h2 class="section-heading section-heading--center">${category.name}</h2>
            ${renderFaqColumns(category.questions, categoryId, limit)}
        </section>
    `;
}

function renderFaqItem(entry, key) {
    const triggerId = `faq-trigger-${key}`;
    const panelId = `faq-panel-${key}`;

    /*
     * The heading holds TWO sibling controls: the accordion trigger and the
     * copy-link button. The copy button is deliberately outside the trigger
     * — a button inside a button is invalid HTML and breaks keyboard and
     * screen-reader behaviour, and every copy tap would toggle the answer.
     */
    return `
        <div class="faq-item" id="${key}" data-question-key="${key}">
            <h3 class="faq-item__heading">
                <button type="button"
                        class="faq-item__trigger"
                        id="${triggerId}"
                        aria-expanded="false"
                        aria-controls="${panelId}">
                    <span>${fillTokens(entry.q)}</span>
                    <svg class="faq-item__chevron" width="20" height="20" viewBox="0 0 24 24"
                         fill="none" stroke="currentColor" stroke-width="2.5"
                         stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <polyline points="6 9 12 15 18 9"/>
                    </svg>
                </button>
                ${renderFaqCopyLink(key)}
            </h3>
            <div class="faq-item__panel" id="${panelId}" role="region"
                 aria-labelledby="${triggerId}" hidden>
                ${fillTokens(entry.a)}
            </div>
        </div>
    `;
}


/* ======================================================================
 * SECTION 10 — FOOTER  (CLAUDE.md §18)
 * ====================================================================== */

function initFooter() {
    // Copyright is generated — the year is never hard-coded (§18.1).
    withElement(qs("#footer-copyright"), (element) => {
        /*
         * "© 2026 GOLDTRAP EA by Abang Rimba" — the year and the word "by"
         * are prose and may translate; the two names may not. The sentence
         * is written whole and protectIdentityTerms() (run at the end of
         * init) wraps just the names.
         */
        element.textContent =
            `© ${new Date().getFullYear()} ${siteName} by ${siteOwner}`;
    });

    // The editable footer caveat / disclaimer (§18.2).
    const footerCaveatElement = document.getElementById("footer-caveat");

    if (footerCaveatElement) {
        footerCaveatElement.textContent = footerCaveatText;
    }

    // Terms and Conditions destination (§18.3).
    const termsLinkElement = document.getElementById("terms-and-conditions-link");

    if (termsLinkElement) {
        termsLinkElement.href = termsAndConditionsLink;
    }
}


/* ======================================================================
 * SHARED TELEGRAM / CONFIGURED LINKS
 * ======================================================================
 * Any element carrying data-telegram="channel" or "personal" receives the
 * matching configured URL, so no Telegram URL is ever written into the HTML.
 * ====================================================================== */

function initConfiguredLinks() {
    qsa("[data-telegram]").forEach((link) => {
        link.href =
            link.dataset.telegram === "personal" ? telegramPersonal : telegramChannel;
    });

    qsa("[data-whitelist-link]").forEach((link) => {
        link.href = metaTraderWhitelist;
    });

    // The site name appears in the header wordmark and the document title.
    qsa("[data-site-name]").forEach((element) => {
        protectIdentityText(element, siteName);
    });
}


/* ======================================================================
 * SCROLL REVEAL  (CLAUDE.md §20)
 * ======================================================================
 * Elements are revealed once, then unobserved. Groups stagger via a
 * --reveal-index custom property rather than one CSS rule per child.
 *
 * Tuning: REVEAL_THRESHOLD above controls how much of an element must be
 * visible; distance, duration, easing and stagger live in styles.css.
 * ====================================================================== */

let revealObserver = null;
let revealIsReady = false;

/**
 * Hands elements to the reveal observer.
 *
 * Anything rendered AFTER page load — the FAQ page re-renders its list on
 * every search, category change and shortcut — has to be registered here,
 * or it keeps the .scroll-reveal starting state (opacity: 0) forever and
 * the visitor sees a blank column. Safe to call repeatedly: elements that
 * are already revealed are skipped.
 *
 * @param {ParentNode} [scope] where to look; defaults to the document.
 */
function observeReveal(scope = document) {
    if (!revealIsReady) {
        // initScrollReveal() has not run yet — it will collect these itself.
        return;
    }

    const elements = qsa(".scroll-reveal", scope).filter(
        (element) => !element.classList.contains("is-visible")
    );

    if (elements.length === 0) {
        return;
    }

    // No IntersectionObserver: everything is shown immediately (§20.6).
    if (!revealObserver) {
        elements.forEach((element) => element.classList.add("is-visible"));
        return;
    }

    assignRevealIndexes(elements);
    elements.forEach((element) => revealObserver.observe(element));
}

/** Stagger index of each element within its own parent group. */
function assignRevealIndexes(elements) {
    elements.forEach((element) => {
        if (element.style.getPropertyValue("--reveal-index")) {
            return;
        }

        const siblings = Array.from(element.parentElement?.children || []).filter(
            (child) => child.classList.contains("scroll-reveal")
        );

        element.style.setProperty("--reveal-index", String(siblings.indexOf(element)));
    });
}

function initScrollReveal() {
    const revealElements = qsa(".scroll-reveal");

    revealIsReady = true;

    if (revealElements.length === 0) {
        return;
    }

    // Without IntersectionObserver, show everything immediately (§20.6).
    if (!("IntersectionObserver" in window)) {
        revealElements.forEach((element) => element.classList.add("is-visible"));
        return;
    }

    assignRevealIndexes(revealElements);

    revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("is-visible");

                // Stop observing once revealed — the animation runs once.
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: REVEAL_THRESHOLD
        }
    );

    revealElements.forEach((element) => revealObserver.observe(element));
}


/* ======================================================================
 * BOOTSTRAP
 * ======================================================================
 * Each initialiser guards its own elements, so a page missing an optional
 * section (the FAQ page has no pricing grid, for instance) still runs the
 * rest of the script (§27).
 * ====================================================================== */

function init() {
    // Theme and identity first: everything rendered later inherits them.
    applySiteColors();
    applySiteIdentity();
    initConfiguredLinks();

    initAnnouncementBar();
    initTranslation();
    initMobileNavigation();
    initLiveChart();
    initLiveChat();
    initLiveResults();
    purchaseDialog.init();
    initPricing();
    initSourceCode();
    initDownload();
    initFaq();

    /*
     * The complete FAQ page. Returns immediately on any page without the
     * FAQ root, so the homepage is unaffected. Configuration is passed in
     * rather than re-declared, so there is still one source of truth (§18).
     */
    initFaqPage({
        siteName,
        siteOwner,
        eaVersion: eaCurrentVersion,
        telegramPersonal,
        telegramChannel,
        // Lets the FAQ page register list content it renders after load.
        observeReveal,
        // ...and protect the identity strings inside what it renders.
        protectIdentityTerms,
        // The per-question copy link: one implementation, both pages.
        renderCopyLink: renderFaqCopyLink,
        initCopyLinks: initFaqCopyLinks
    });

    initFooter();

    /*
     * Identity strings last, once every section has rendered: this walks
     * the page and wraps brand names, versions, file names, symbols,
     * platform names and prices so the translation layer leaves them
     * byte-identical. Sections rendered later re-run it themselves.
     */
    protectIdentityTerms(document.body);

    // Measure the sticky chrome once everything above it exists.
    initStickyOffset();

    // Runs last so dynamically rendered cards are observed too.
    initScrollReveal();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}
