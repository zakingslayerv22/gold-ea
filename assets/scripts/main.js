/* ======================================================================
 * GOLDTRAP EA — MAIN SCRIPT
 * ======================================================================
 * Everything you are likely to want to change lives in the SITE
 * CONFIGURATION block immediately below. Nothing in this file's lower
 * half needs editing to rebrand, re-price, or re-link the site.
 * ====================================================================== */


/* ======================================================================
 * SITE CONFIGURATION
 * ======================================================================
 * Site identity. Used in the <title>, all social/meta tags, the header
 * wordmark and the footer copyright — never hard-coded in the HTML.
 * ====================================================================== */

const siteName = "GOLDTRAP EA";
const siteOwner = "Abang Rimba";


/* ======================================================================
 * TELEGRAM
 * ======================================================================
 * telegramPersonal — direct chat with the owner. Used by the purchase
 *                    dialogs ("Confirm Payment on Telegram"), the source
 *                    code "Discuss on Telegram" button and the chat widget.
 * telegramChannel  — the public channel. Used by "View Live Results" and
 *                    the footer Telegram icon.
 * Both are reused site-wide; do not duplicate these URLs anywhere else.
 * ====================================================================== */

const telegramPersonal = "https://t.me/abangrimba";
const telegramChannel = "https://t.me/goldtrapea";


/* ======================================================================
 * PAYMENT
 * ======================================================================
 * These populate the purchase dialogs. `network` and `walletAddress` must
 * describe the SAME chain — sending funds on the wrong network loses them.
 *
 * NOTE: CLAUDE.md's example configuration reads "BSC BEP20", but both
 * supplied dialog mockups show TRC20 (Tron) together with a Tron-format
 * address. The mockups are the visual source of truth, so TRC20 is used
 * here. Change both lines together if you switch chains.
 * ====================================================================== */

const walletAddress = "TM74BDqkK3uoaJpZiFcNNChnj8jXQ3xWrT";
const network = "TRC20 (Tron)";
const amountSuffix = "USDT";


/* ======================================================================
 * LIVE ACTIVITY
 * ======================================================================
 * Colour of the pulsing dot in the Live Results stats strip. Accepts any
 * CSS colour. The pulse animation itself is defined in styles.css.
 * ====================================================================== */

const liveActivityColor = "green";


/* ======================================================================
 * LIVE STATISTICS
 * ======================================================================
 * The two figures shown in the Live Results strip. Written into the page
 * with textContent — they are never hard-coded in the HTML.
 * ====================================================================== */

const licenseKeysGeneratedToday = "24";
const easRunningToday = "2,371";


/* ======================================================================
 * DOWNLOAD / WHITELIST
 * ======================================================================
 * The URL a trader must add to the MetaTrader WebRequest whitelist. It is
 * printed into the setup note and copied by the Copy control.
 * ====================================================================== */

const metaTraderWhitelist = "https://a689.link";


/* ======================================================================
 * TOP ACTION BAR
 * ======================================================================
 * The dismissible offer bar. `offerBarBroker` is the highlighted broker
 * name; the supplied mockups disagree on it (desktop says "Vantage",
 * mobile says "VT Markets"), so it is configurable here rather than fixed.
 * Dismissal lasts for the current page session only.
 * ====================================================================== */

const offerBarLead = "New Client Offer - Free until Aug 31, 2026:";
const offerBarBody = "full access, all features — register with";
const offerBarBroker = "VT Markets";
const offerBarTail = "via our IB link. No payment needed.";
const offerBarLink = "https://a689.link";


/* ======================================================================
 * FOOTER CONFIGURATION
 * ======================================================================
 * footerCaveat          — the editable risk disclaimer at the foot of the
 *                         page. Written into #footer-caveat from here.
 * termsAndConditionsLink— destination of the Terms and Conditions anchor.
 * telegramChannel       — configured above; reused by the footer icon.
 * The copyright year is generated with new Date().getFullYear().
 * ====================================================================== */

const footerCaveat =
    "Trading XAUUSD involves substantial risk. Past performance does not " +
    "guarantee future results. The EA, like any automated system, can lose " +
    "money. Use only capital you can afford to lose.";

const termsAndConditionsLink = "#";


/* ======================================================================
 * PRICING PLANS
 * ======================================================================
 * The pricing grid is generated from this array, so adding a fourth plan
 * is a matter of adding one object here — the CSS grid (auto-fit) absorbs
 * it with no other change.
 *
 * Per-plan fields:
 *   planName    plan title shown on the card and in the purchase dialog
 *   price       current price as a number (0 renders as "FREE")
 *   increment   how much `price` rises each time the countdown expires
 *   timerTime   countdown duration in SECONDS
 *   status      "show" reveals the countdown, "hide" keeps its space but
 *               hides it (visibility: hidden — the card never resizes)
 *   currency    suffix printed beside the price
 *   eyebrow     small label above the plan name
 *   accent      "gold" | "green" — drives the card's colour treatment
 *   caption     one-line description under the price
 *   hot         true renders the small HOT badge beside the price
 *   features    tick list
 *   steps       numbered list (used instead of features by the free plan)
 *   note        highlighted warning strip
 *   cta         { label, type, href }. Omit href to open the purchase
 *               dialog; supply one to link out instead.
 *
 * TIMERS ARE SET TO "hide" BY DEFAULT because no countdown appears in the
 * supplied mockups and visual fidelity comes first. Change a plan's
 * `status` to "show" to reveal its timer — the logic is fully implemented.
 * ====================================================================== */

const pricingPlans = [
    {
        planName: "Free Access",
        price: 0,
        increment: 0,
        timerTime: 0,
        status: "hide",
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
        cta: { label: "Free Access", type: "green", href: offerBarLink, icon: "arrow" }
    },
    {
        planName: "5 Accounts",
        price: 299,
        increment: 20,
        timerTime: 3600,
        status: "hide",
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
        status: "hide",
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
 * LANGUAGES
 * ======================================================================
 * Offered in the language selector. `code` must be a Google Translate
 * language code. Add or remove entries freely.
 * ====================================================================== */

const languages = [
    { code: "en", label: "English" },
    { code: "es", label: "Spanish" },
    { code: "zh-CN", label: "Chinese (Simplified)" },
    { code: "hi", label: "Hindi" },
    { code: "ar", label: "Arabic" },
    { code: "pt", label: "Portuguese" },
    { code: "ru", label: "Russian" },
    { code: "ja", label: "Japanese" },
    { code: "de", label: "German" },
    { code: "fr", label: "French" },
    { code: "ko", label: "Korean" },
    { code: "it", label: "Italian" },
    { code: "tr", label: "Turkish" },
    { code: "id", label: "Indonesian" },
    { code: "ms", label: "Malay" },
    { code: "vi", label: "Vietnamese" },
    { code: "th", label: "Thai" }
];


/* ======================================================================
 * BEHAVIOUR CONSTANTS
 * ====================================================================== */

const COPY_FEEDBACK_MS = 5000;   // how long a "copied" confirmation persists
const REVEAL_THRESHOLD = 0.15;   // how much of an element must be visible
const TIMER_TICK_MS = 1000;


/* ======================================================================
 * ============  IMPLEMENTATION — no configuration below here  ==========
 * ====================================================================== */

import { faqServiceInstance } from "./faq-index-page.js";


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
 * TOP ACTION BAR  (CLAUDE.md §5.1)
 * ====================================================================== */

function initActionBar() {
    const bar = qs("#action-bar");
    if (!bar) {
        return;
    }

    // Stay dismissed for the current page session only.
    const DISMISS_KEY = "goldtrap:action-bar-dismissed";
    let dismissed = false;

    try {
        dismissed = sessionStorage.getItem(DISMISS_KEY) === "1";
    } catch (error) {
        dismissed = false; // private mode / storage disabled — show the bar
    }

    if (dismissed) {
        bar.hidden = true;
        return;
    }

    // The offer text and its destination are both configurable.
    withElement(qs("#action-bar-link"), (link) => {
        link.href = offerBarLink;
        link.innerHTML =
            `<strong>${offerBarLead}</strong> ${offerBarBody} ` +
            `<span class="highlight">${offerBarBroker}</span> ${offerBarTail}`;
    });

    withElement(qs("#action-bar-close"), (closeButton) => {
        closeButton.addEventListener("click", () => {
            bar.hidden = true;
            try {
                sessionStorage.setItem(DISMISS_KEY, "1");
            } catch (error) {
                /* storage unavailable — dismissal simply won't persist */
            }
        });
    });
}


/* ======================================================================
 * LANGUAGE SELECTOR  (CLAUDE.md §5.3)
 * ======================================================================
 * Builds a searchable dropdown and drives the Google Translate widget.
 * The widget's own UI is hidden; we set its hidden <select> and dispatch a
 * change event, which is the supported way to translate programmatically.
 * If the widget cannot load (offline, blocked), the dropdown still opens,
 * searches and closes — it just cannot translate.
 * ====================================================================== */

function initLanguageSelector() {
    const root = qs("#lang-select");
    if (!root) {
        return;
    }

    const toggle = qs("#lang-select-toggle", root);
    const panel = qs("#lang-select-panel", root);
    const search = qs("#lang-select-search", root);
    const list = qs("#lang-select-list", root);
    const label = qs("#lang-select-label", root);

    if (!toggle || !panel || !search || !list || !label) {
        return;
    }

    let activeCode = "en";

    /** Renders the option list, filtered by the current search term. */
    function renderOptions(filter = "") {
        const term = filter.trim().toLowerCase();
        const matches = languages.filter((language) =>
            language.label.toLowerCase().includes(term)
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
            option.textContent = language.label;
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

    // Clicking the control toggles the dropdown.
    toggle.addEventListener("click", () => {
        if (isOpen()) {
            closePanel();
        } else {
            openPanel();
        }
    });

    search.addEventListener("input", () => renderOptions(search.value));

    // Event delegation keeps one listener regardless of how many options exist.
    list.addEventListener("click", (event) => {
        const option = event.target.closest(".lang-select__option");
        if (!option) {
            return;
        }

        activeCode = option.dataset.code;
        label.textContent = option.textContent;
        applyTranslation(activeCode);
        closePanel({ restoreFocus: true });
    });

    // Clicking anywhere outside closes the dropdown.
    document.addEventListener("click", (event) => {
        if (isOpen() && !root.contains(event.target)) {
            closePanel();
        }
    });

    // Escape closes it too, and returns focus to the toggle.
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && isOpen()) {
            closePanel({ restoreFocus: true });
        }
    });

    renderOptions();
    loadGoogleTranslate();
}

/**
 * Injects the Google Translate element script once. The library requires a
 * global callback, so it is assigned to window from inside this module.
 */
function loadGoogleTranslate() {
    if (qs("#google-translate-script") || !qs("#google_translate_element")) {
        return;
    }

    window.googleTranslateElementInit = function googleTranslateElementInit() {
        if (!window.google || !window.google.translate) {
            return;
        }

        // eslint-disable-next-line no-new
        new window.google.translate.TranslateElement(
            {
                pageLanguage: "en",
                autoDisplay: false
            },
            "google_translate_element"
        );
    };

    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.head.append(script);
}

/**
 * Switches the page language by driving the widget's hidden <select>.
 * Retries briefly because the widget may not have finished mounting when a
 * user picks a language immediately after load.
 */
function applyTranslation(languageCode, attempt = 0) {
    const combo = qs(".goog-te-combo");

    if (!combo) {
        if (attempt < 20) {
            window.setTimeout(() => applyTranslation(languageCode, attempt + 1), 250);
        }
        return;
    }

    combo.value = languageCode === "en" ? "" : languageCode;
    combo.dispatchEvent(new Event("change"));
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
                    <span class="wallet-row__value">${row.value}</span>
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

    const suffix = row.suffix
        ? `<span class="purchase-row__suffix">${row.suffix}</span>`
        : "";

    return `
        <div class="purchase-row">
            <span class="purchase-row__label">${row.label}</span>
            <span class="${valueClasses}">${row.value}${suffix}</span>
        </div>
    `;
}

/**
 * Reads the EA title from the page rather than duplicating it (§12.1).
 * Falls back to the configured site name if the element is absent.
 */
function getEaTitleFromPage() {
    const source = qs("[data-ea-title]");
    return source ? source.textContent.trim() : siteName;
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
    const currency = plan.currency
        ? `<span class="plan-card__currency">${plan.currency}</span>`
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
                 data-plan-currency="${plan.currency || amountSuffix}">
            <p class="plan-card__eyebrow">${eyebrowIcon}<span>${plan.eyebrow}</span></p>
            <h3 class="plan-card__name">${plan.planName}</h3>
            <div class="plan-card__price-row">
                <span class="plan-card__price" data-plan-price-display>${priceText}</span>
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

    const shouldShow = plan.status === "show" && plan.timerTime > 0;

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

        withElement(qs("[data-plan-price-display]", card), (display) => {
            display.textContent = `$${formatPrice(newPrice)}`;
        });

        withElement(qs(".plan-card__cta .btn-label", card), (label) => {
            label.textContent =
                `${plan.cta.label} — $${formatPrice(newPrice)} ${plan.currency}`.trim();
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
    const currency = card.dataset.planCurrency || amountSuffix;

    purchaseDialog.open({
        title: `Purchase ${getEaTitleFromPage()}`,
        subtitle: `Send ${currency} and confirm on Telegram.`,
        rows: [
            { label: "Plan", value: planName, variant: "gold" },
            {
                label: "Amount",
                value: `$${formatPrice(price)}`,
                suffix: currency,
                variant: "amount"
            },
            { label: "Network", value: network, variant: "gold" },
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
            title: `${getEaTitleFromPage()} — ${headingText}`,
            subtitle: `Send ${amountSuffix} and confirm on Telegram.`,
            rows: [
                {
                    label: "Amount",
                    value: priceText,
                    suffix: currency,
                    variant: "amount"
                },
                { label: "Network", value: network, variant: "gold" },
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
    withElement(qs("#whitelist-url"), (element) => {
        element.textContent = metaTraderWhitelist;
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

        // The mockup shows the first question of a category already open.
        openFirstFaqItem(panelsContainer);
    }

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

    return `
        <div class="faq-item">
            <h3>
                <button type="button"
                        class="faq-item__trigger"
                        id="${triggerId}"
                        aria-expanded="false"
                        aria-controls="${panelId}">
                    <span>${entry.q}</span>
                    <svg class="faq-item__chevron" width="20" height="20" viewBox="0 0 24 24"
                         fill="none" stroke="currentColor" stroke-width="2.5"
                         stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <polyline points="6 9 12 15 18 9"/>
                    </svg>
                </button>
            </h3>
            <div class="faq-item__panel" id="${panelId}" role="region"
                 aria-labelledby="${triggerId}" hidden>
                ${entry.a}
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
        element.textContent = `© ${new Date().getFullYear()} ${siteName} by ${siteOwner}`;
    });

    // The editable footer caveat / disclaimer (§18.2).
    const footerCaveatElement = document.getElementById("footer-caveat");

    if (footerCaveatElement) {
        footerCaveatElement.textContent = footerCaveat;
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
        element.textContent = siteName;
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

function initScrollReveal() {
    const revealElements = qsa(".scroll-reveal");

    if (revealElements.length === 0) {
        return;
    }

    // Without IntersectionObserver, show everything immediately (§20.6).
    if (!("IntersectionObserver" in window)) {
        revealElements.forEach((element) => element.classList.add("is-visible"));
        return;
    }

    // Assign a stagger index to each element within its own parent group.
    revealElements.forEach((element) => {
        if (element.style.getPropertyValue("--reveal-index")) {
            return;
        }

        const siblings = Array.from(element.parentElement?.children || []).filter(
            (child) => child.classList.contains("scroll-reveal")
        );

        element.style.setProperty("--reveal-index", String(siblings.indexOf(element)));
    });

    const revealObserver = new IntersectionObserver(
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
    initConfiguredLinks();
    initActionBar();
    initLanguageSelector();
    initLiveResults();
    purchaseDialog.init();
    initPricing();
    initSourceCode();
    initDownload();
    initFaq();
    initFooter();

    // Runs last so dynamically rendered cards are observed too.
    initScrollReveal();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}
