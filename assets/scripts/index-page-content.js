/* ======================================================================
 * HOMEPAGE CONTENT
 * ======================================================================
 * Every editable word the homepage renders lives here.
 *
 * WHAT THIS FILE IS FOR
 *   Changing visible homepage copy should not mean editing index.html.
 *   Edit the strings below and the page follows.
 *
 * WHAT THIS FILE IS NOT FOR
 *   Behaviour, and global configuration. The site name, owner, EA version
 *   and filename, Telegram links, payment details, the MetaTrader
 *   whitelist URL, the live-chat and translation settings are shared by
 *   both pages and stay in main.js.
 *
 *   FAQ questions and answers are NOT here either. They have one home,
 *   faq-page-content.js, and the homepage only names the entries it
 *   features, by their existing stable references. Never paste a question
 *   or an answer into this file.
 *
 * TOKENS
 *   "{siteName}" and "{siteOwner}" inside any string below are replaced
 *   with the values configured in main.js, so the brand and the owner are
 *   still written in exactly one place. The substituted name is then
 *   protected from translation automatically.
 *
 * ONE NOTE ON THE ANNOUNCEMENT BAR
 *   The bar is shared chrome: the same wording renders on the homepage
 *   and on the FAQ page. It is kept here because it is copy you will want
 *   to edit alongside the rest of the homepage wording, which is why
 *   main.js imports this file on both pages.
 * ====================================================================== */

/*
 * Where the announcement text links to. Declared first because the Free
 * Access pricing plan sends visitors to the same destination.
 */
const announcementLink = "https://a689.link";

export const indexPageContent = {
  /* ----------------------------------------------------------------
   * ANNOUNCEMENT BAR
   * ----------------------------------------------------------------
   * HOW TO PUBLISH A NEW ANNOUNCEMENT
   *   1. Edit the wording below.
   *   2. Change `version` to a new value (the date is easiest).
   *   3. Make sure `status` is "new".
   * Everyone sees it again, including visitors who dismissed the last one.
   *
   * status  — "new" shows the bar; "old" retires it for everyone,
   *           regardless of what any visitor has dismissed.
   * ---------------------------------------------------------------- */
  announcement: {
    status: "new",
    version: "2026-08-28",

    /* boldText is emphasised in white; highlightText in gold, underlined. */
    boldText: "New Client Offer - Free until Aug 31, 2026:",
    bodyText: "full access, all features — register with",
    highlightText: "VT Markets",
    tailText: "via our IB link. No payment needed.",

    link: announcementLink,
  },

  /* ----------------------------------------------------------------
   * SECTION 1 — HERO
   * ---------------------------------------------------------------- */
  hero: {
    eyebrow: "Automated MT4/MT5 Trading",
    subtitle: "Optimized for Gold Trading. Built for MT4 & MT5.",
    text:
      "{siteName} automates trade execution and basket management using a " +
      "structured trading approach designed for traders who prefer " +
      "consistency over manual execution.",
    primaryCtaLabel: "Get",
    secondaryCtaLabel: "How it works",
    chartCaption:
      "Live chart is for reference. {siteName} still runs inside your own " +
      "MetaTrader terminal.",
  },

  /* ----------------------------------------------------------------
   * SECTION 2 — QUICK BENEFITS
   * The order here is the order they appear in. There are eight cards in
   * index.html; adding a ninth item needs a ninth card there too.
   * ---------------------------------------------------------------- */
  benefits: {
    eyebrow: "Quick Benefits",
    heading: "Why Traders Choose {siteName}",
    items: [
      "Automated Trade Execution",
      "Basket Management System",
      "MT4 & MT5 Compatible",
      "VPS Friendly",
      "Daily Profit Target Option",
      "Built-In Risk Management Features",
      "Optimized for Gold Trading",
      "Suitable for Cent & Standard Accounts",
    ],
  },

  /* ----------------------------------------------------------------
   * SECTION 3 — HOW IT WORKS
   * The 01-06 numbers are part of the card design and stay in the HTML.
   * ---------------------------------------------------------------- */
  howItWorks: {
    eyebrow: "How {siteName} Works",
    heading: "One repeating cycle. No prediction. Pure structure.",
    steps: [
      {
        title: "Automated Entry",
        text:
          "{siteName} automatically places and manages trades based on its " +
          "built-in strategy.",
      },
      {
        title: "Basket Management",
        text:
          "Positions are managed as a basket rather than relying on " +
          "individual trades.",
      },
      {
        title: "Built-In Recovery Logic",
        text:
          "The EA includes recovery and position management features " +
          "designed to help navigate changing market conditions.",
      },
      {
        title: "Structured Exit Management",
        text:
          "Take profit levels are managed automatically according to the " +
          "EA's built-in logic.",
      },
      {
        title: "Repeat The Process",
        text:
          "Once a trading cycle is completed, the EA prepares for the next " +
          "opportunity automatically.",
      },
      {
        title: "Built-In Trading Pause",
        text:
          "To help avoid unstable rollover conditions, {siteName} pauses " +
          "new entries during specific periods while continuing to manage " +
          "active trades.",
      },
    ],
  },

  /* ----------------------------------------------------------------
   * SECTION 4 — LIVE RESULTS
   * The two figures are plain strings so they can carry their own
   * formatting, such as the thousands separator in "2,371".
   * ---------------------------------------------------------------- */
  liveResults: {
    eyebrow: "Live Results",
    heading: "Real Results. Real Users.",
    lead:
      "See live account updates, user feedback, and trading results shared " +
      "by the {siteName} community.",
    ctaLabel: "View Live Results",
    activityLabel: "Live Activity",
    licenseKeysGeneratedToday: "24",
    licenseKeysLabel: "License keys generated today",
    easRunningToday: "2,371",
    easRunningLabel: "EAs running today",
  },

  /* ----------------------------------------------------------------
   * SECTION 5 — PRICING
   * ----------------------------------------------------------------
   * The grid renders one card per entry, so a fourth plan is just a
   * fourth object here.
   *
   *   planName    heading on the card, and the plan named in the dialog
   *   price       starting price; the countdown raises it by `increment`
   *   increment   how much a completed countdown adds to the price
   *   timerTime   countdown length in seconds; 0 means no countdown
   *   currency    suffix shown after the price ("" for the free plan)
   *   caption     one-line description under the price
   *   hot         true renders the small HOT badge beside the price
   *   features    tick list, or `steps` for a numbered list
   *   cta         the button: its label, colour and icon
   * ---------------------------------------------------------------- */
  pricing: {
    plans: [
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
          "Submit MT5/MT4 ID + email for instant access",
        ],
        note: "Free option is locked to <strong>1 MT5 account ID</strong> only.",
        cta: {
          label: "Free Access",
          type: "green",
          href: announcementLink,
          icon: "arrow",
        },
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
          "Priority reply message",
        ],
        cta: { label: "Buy Now", type: "gold", icon: "wallet" },
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
          "Priority reply message",
        ],
        cta: { label: "Buy Now", type: "gold", icon: "wallet" },
      },
    ],
  },

  /* ----------------------------------------------------------------
   * SECTION 6 — SOURCE CODE
   * ----------------------------------------------------------------
   * `timer` is this section's own countdown, independent of the pricing
   * cards. status "show" reveals it, "hide" keeps its space reserved so
   * the card cannot jump when it is switched on or off.
   * ---------------------------------------------------------------- */
  sourceCode: {
    features: [
      "Full MQL4 (.mq4) & MQL5 (.mq5) source",
      "Modify, customize, rebrand",
      "No license server lock-in",
      "Direct support from {siteOwner}",
    ],
    currency: "USD",
    priceMeta: "One-time payment · Lifetime ownership of the source · No refund",
    discussLabel: "Discuss on Telegram",
    timer: {
      startingPrice: 9650,
      countdownDuration: 3600,
      increment: 250,
      status: "hide",
    },
  },

  /* ----------------------------------------------------------------
   * SECTION 7 — FREE ACCESS
   * Four steps, numbered 01-04 by the card design.
   * ---------------------------------------------------------------- */
  freeAccess: {
    eyebrow: "Free Access",
    steps: [
      "Register Under My Link",
      "Full Verify Your Account",
      "Create an MT5 Trading Account",
      "Submit Your Details",
    ],
  },

  /* ----------------------------------------------------------------
   * SECTION 8 — DOWNLOADS
   * The .ex5 / .ex4 filenames are not here: they are built from the EA
   * version configured in main.js, so they stay correct on their own.
   * ---------------------------------------------------------------- */
  downloads: {
    licenceNote: "License key required at runtime",
    downloadLabel: "Download",
    presetTitle: "Need preset .set files?",
    presetText:
      "Ready-made 50K capital presets for every pair, tuned for MT4 & MT5 " +
      "at 1:500 and 1:2000 leverage.",
    presetLinkLabel: "Browse preset files",
    setupNoteTitle: "Setup note — required once per terminal",
    setupNoteText:
      "The EA verifies your license online. Add this URL to your MetaTrader " +
      "whitelist:",
    setupNoteSteps:
      'MT5/MT4 → Tools → Options → Expert Advisors → tick "Allow WebRequest ' +
      'for listed URL" → add the domain → OK.',
  },

  /* ----------------------------------------------------------------
   * SECTION 9 — HOMEPAGE FAQ
   * ----------------------------------------------------------------
   * NO QUESTION OR ANSWER TEXT LIVES HERE.
   *
   * `sections` are the homepage's filter pills. Each one names the
   * questions it features by reference into faq-page-content.js, in the
   * form "<categoryId>/<questionId>". The wording of every question and
   * answer comes from that file and nowhere else, so the homepage and the
   * FAQ page can never drift apart.
   *
   * The pill NAMES are homepage presentation, not content, which is why
   * they differ from the FAQ page's eight category names.
   *
   * The homepage shows the first `data-faq-limit` questions of the
   * selected pill (see index.html), so a pill may list more than that.
   * ---------------------------------------------------------------- */
  faq: {
    eyebrow: "FAQ",
    heading: "Frequently Asked Questions",
    lead: "Everything you need to know about {siteName}.",
    browseLabel: "Browse all questions",
    sections: [
      {
        id: "basics",
        name: "Basics",
        questionRefs: [
          "homepage/what-is-goldtrap",
          "homepage/who-is-it-for",
          "homepage/mt4-and-mt5",
          "homepage/run-on-mobile",
          "homepage/which-pair",
          "homepage/what-strategy",
        ],
      },
      {
        id: "account-broker",
        name: "Account & Broker",
        questionRefs: [
          "homepage/any-broker",
          "homepage/cent-and-standard",
          "homepage/accounts-per-licence",
          "homepage/licence-binding",
          "homepage/move-licence",
          "homepage/what-leverage",
        ],
      },
      {
        id: "capital-risk",
        name: "Capital & Risk",
        questionRefs: [
          "homepage/how-much-capital",
          "homepage/can-it-lose-money",
          "homepage/risk-controls",
          "homepage/stop-loss",
          "homepage/daily-profit-target",
          "homepage/refund",
        ],
      },
      {
        id: "setup-help",
        name: "Setup & Help",
        questionRefs: [
          "homepage/how-to-install",
          "homepage/whitelist-url",
          "homepage/licence-key",
          "homepage/preset-files",
          "homepage/need-a-vps",
          "homepage/get-support",
        ],
      },
    ],
  },
};
