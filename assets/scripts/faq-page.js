/* ======================================================================
 * FAQ PAGE CONTROLLER
 * ======================================================================
 * Behaviour for frequently-asked-questions.html. Everything visible is
 * rendered from assets/scripts/faq-page-content.js — this file owns the
 * interface, that file owns the words, and neither owns configuration.
 *
 * WHAT IT DRIVES
 * --------------
 *   • the "N answers about …" figure in the hero          (counted, never typed)
 *   • the category pills and their per-category counts    (counted, never typed)
 *   • the popular-question chips
 *   • the accordion list, grouped by category
 *   • live search across question, answer and category name
 *   • the no-results state, quoting what was actually searched
 *   • the compact search that opens from the sticky category bar
 *
 * The page is inert without this file only in the sense that the list is
 * empty — the shell (announcement bar, header, footer, live chat) is
 * plain markup handled by main.js exactly as on every other page.
 *
 * ENTRY POINT
 * -----------
 * main.js calls initFaqPage() with the site configuration it already
 * owns, so nothing here duplicates siteName, telegram links or versions.
 * It returns immediately on any page without the FAQ root, so the
 * homepage is unaffected.
 * ====================================================================== */

import { faqPageContent, faqPopularQuestionIds } from "./faq-page-content.js";

/* ----------------------------------------------------------------------
 * Small DOM helpers. Deliberately local: this module has no dependency on
 * main.js beyond the configuration handed to initFaqPage().
 * -------------------------------------------------------------------- */
const qs = (selector, scope = document) => scope.querySelector(selector);
const qsa = (selector, scope = document) =>
    Array.from(scope.querySelectorAll(selector));

/** Escapes text that is about to be interpolated into a template string. */
function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

/**
 * Category icons. Kept here rather than in the data file so the content
 * stays free of markup — the data only names a key.
 */
const ICONS = {
    all: '<circle cx="8" cy="8" r="2.4"/><circle cx="16" cy="8" r="2.4"/><circle cx="8" cy="16" r="2.4"/><circle cx="16" cy="16" r="2.4"/>',
    rocket: '<path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2"/><path d="M14.5 4.5C17 2 21 3 21 3s1 4-1.5 6.5L14 15l-5-5z"/><path d="M9 10l-4 1 3 3 1-4z" opacity=".55"/>',
    key: '<circle cx="8" cy="12" r="4"/><path d="M12 12h9"/><path d="M17 12v3.5"/><path d="M20 12v2.5"/>',
    bank: '<path d="M3 10h18"/><path d="M5 10v8"/><path d="M9.5 10v8"/><path d="M14.5 10v8"/><path d="M19 10v8"/><path d="M3 18h18"/><path d="M12 3l9 5H3z"/>',
    shield: '<path d="M12 3l8 3v6c0 4.5-3.2 7.8-8 9-4.8-1.2-8-4.5-8-9V6z"/>',
    trending: '<polyline points="3 17 9.5 10.5 13.5 14.5 21 7"/><polyline points="15 7 21 7 21 13"/>',
    gear: '<circle cx="12" cy="12" r="3.2"/><path d="M12 2.5v3M12 18.5v3M21.5 12h-3M5.5 12h-3M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1M18.7 18.7l-2.1-2.1M7.4 7.4L5.3 5.3"/>',
    server: '<rect x="3" y="4" width="18" height="7" rx="2"/><rect x="3" y="13" width="18" height="7" rx="2"/><path d="M7 7.5h.01M7 16.5h.01"/>',
    lifebuoy: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.6"/><path d="M5.6 5.6l3.9 3.9M14.5 14.5l3.9 3.9M18.4 5.6l-3.9 3.9M9.5 14.5l-3.9 3.9"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.6-3.6"/>',
    chevron: '<polyline points="6 9 12 15 18 9"/>',
    telegram: '<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>',
    arrowLeft: '<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>',
    close: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>'
};

/** Wraps an icon path set in a sized, decorative <svg>. */
function icon(name, size = 16, strokeWidth = 2) {
    const paths = ICONS[name] || "";
    return `<svg class="faq-icon" width="${size}" height="${size}" viewBox="0 0 24 24"
                 fill="none" stroke="currentColor" stroke-width="${strokeWidth}"
                 stroke-linecap="round" stroke-linejoin="round"
                 aria-hidden="true">${paths}</svg>`;
}

/**
 * Normalises text for searching: lower case, and every run of whitespace
 * collapsed to one space. Applied to both the haystack and the needle so
 * "  MT5 " matches "mt5".
 */
function normalise(text) {
    return String(text).toLowerCase().replace(/\s+/g, " ").trim();
}


/* ======================================================================
 * CONTROLLER
 * ====================================================================== */

export function initFaqPage(config = {}) {
    // #faq-page gates the whole module: it only exists on the FAQ page, so
    // every other page returns here untouched. The hero and the sticky bar
    // live outside it, so element lookups below run against the document.
    if (!qs("#faq-page")) {
        return;
    }

    const {
        siteName = "",
        siteOwner = "",
        eaVersion = "",
        telegramPersonal = "#",
        // Registers content rendered after page load with the site's own
        // scroll-reveal observer. Without it, re-rendered groups keep the
        // .scroll-reveal starting state and the list is invisible.
        observeReveal = () => {},
        // Marks brand names, versions, platform names, symbols and prices
        // inside rendered answers as non-translatable. Every re-render
        // needs it again: replacing the markup discards the marking.
        protectIdentityTerms = () => {},
        // The shared per-question copy-link control (markup + behaviour).
        // Same implementation the homepage uses — there is one, not two.
        renderCopyLink = () => "",
        initCopyLinks = () => {}
    } = config;

    /** The same token substitution the rest of the site uses (§18, §25). */
    const fill = (text) =>
        String(text)
            .replace(/\{siteName\}/g, siteName)
            .replace(/\{siteOwner\}/g, siteOwner)
            .replace(/\{eaVersion\}/g, eaVersion);

    /* ------------------------------------------------------------------
     * Flatten the content once. Every question carries its category so
     * filtering and rendering never have to walk the tree again.
     * ---------------------------------------------------------------- */
    const categories = faqPageContent.map((category) => ({
        id: category.id,
        name: category.name,
        icon: category.icon,
        questions: category.questions.map((entry) => ({
            key: `${category.id}--${entry.id}`,
            id: entry.id,
            categoryId: category.id,
            question: fill(entry.question),
            answer: fill(entry.answer),
            // Pre-computed so keystrokes never re-normalise the corpus.
            haystack: normalise(
                `${entry.question} ${entry.answer} ${category.name}`
                    .replace(/\{siteName\}/g, siteName)
                    .replace(/\{siteOwner\}/g, siteOwner)
                    .replace(/\{eaVersion\}/g, eaVersion)
            )
        }))
    }));

    const totalQuestions = categories.reduce(
        (sum, category) => sum + category.questions.length,
        0
    );

    /* ------------------------------------------------------------------
     * Elements
     * ---------------------------------------------------------------- */
    const lead = qs("#faq-page-lead");
    const searchInput = qs("#faq-search-input");
    const searchClear = qs("#faq-search-clear");
    const popular = qs("#faq-popular");
    const popularList = qs("#faq-popular-list");
    const navigation = qs("#faq-category-navigation");
    const toolbar = qs("#faq-page-toolbar");
    const resultCount = qs("#faq-result-count");
    const expandAll = qs("#faq-expand-all");
    const results = qs("#faq-page-results");
    const noResults = qs("#faq-no-results");
    const noResultsTerm = qs("#faq-no-results-term");
    const clearFromNoResults = qs("#faq-no-results-clear");
    const stickyBar = qs("#faq-sticky-bar");
    const stickyToggle = qs("#faq-sticky-search-toggle");
    const stickyPanel = qs("#faq-sticky-search-panel");
    const stickyInput = qs("#faq-sticky-search-input");
    const stickyClose = qs("#faq-sticky-search-close");
    const supportVersion = qs("#faq-support-version");

    /* ------------------------------------------------------------------
     * State
     * ---------------------------------------------------------------- */
    let activeCategoryId = "all";
    let query = "";
    let openKey = null;
    let allExpanded = false;
    let hasRendered = false;   // see revealRenderedGroups()

    /* ------------------------------------------------------------------
     * Derived data
     * ---------------------------------------------------------------- */

    /** Questions matching the current query, ignoring the category filter. */
    function matchesQuery(question) {
        if (!query) {
            return true;
        }
        return question.haystack.includes(query);
    }

    /** Counts per category for the current query — never hard-coded (§6). */
    function categoryCounts() {
        const counts = { all: 0 };
        categories.forEach((category) => {
            const n = category.questions.filter(matchesQuery).length;
            counts[category.id] = n;
            counts.all += n;
        });
        return counts;
    }

    /** The categories (and their questions) to render right now. */
    function visibleGroups() {
        return categories
            .filter(
                (category) =>
                    activeCategoryId === "all" || category.id === activeCategoryId
            )
            .map((category) => ({
                ...category,
                questions: category.questions.filter(matchesQuery)
            }))
            .filter((category) => category.questions.length > 0);
    }

    /* ------------------------------------------------------------------
     * Rendering
     * ---------------------------------------------------------------- */

    function renderHero() {
        if (lead) {
            // §12: the figure is counted, never written into the HTML.
            lead.textContent =
                `${totalQuestions} answers about ${siteName} — pricing, brokers, ` +
                `capital & risk, setup, and more.`;
        }
        if (supportVersion) {
            supportVersion.textContent = `${siteName} ${eaVersion}`.trim();
        }
    }

    function renderPopular() {
        if (!popularList) {
            return;
        }
        const lookup = new Map();
        categories.forEach((category) =>
            category.questions.forEach((question) =>
                lookup.set(`${category.id}/${question.id}`, question)
            )
        );

        popularList.innerHTML = faqPopularQuestionIds
            .map((reference) => lookup.get(reference))
            .filter(Boolean)
            .map(
                (question) => `
                    <button type="button" class="faq-popular__chip"
                            data-question-key="${question.key}">
                        ${escapeHtml(question.question)}
                    </button>`
            )
            .join("");
    }

    function renderNavigation() {
        if (!navigation) {
            return;
        }
        const counts = categoryCounts();
        const pill = (id, name, iconName, count) => `
            <button type="button"
                    class="faq-category-button${id === activeCategoryId ? " is-active" : ""}"
                    data-category-id="${id}"
                    aria-pressed="${id === activeCategoryId}">
                ${icon(iconName, 15)}
                <span class="faq-category-button__name">${escapeHtml(name)}</span>
                <span class="faq-category-button__count">${count}</span>
            </button>`;

        navigation.innerHTML =
            pill("all", "All", "all", counts.all) +
            categories
                .map((category) =>
                    pill(category.id, category.name, category.icon, counts[category.id])
                )
                .join("");
    }

    function renderQuestion(question) {
        const triggerId = `faq-q-${question.key}`;
        const panelId = `faq-a-${question.key}`;
        const isOpen = allExpanded || openKey === question.key;

        return `
            <div class="faq-question${isOpen ? " is-open" : ""}"
                 id="${question.key}" data-question-key="${question.key}">
                <h3 class="faq-question__heading">
                    <button type="button" class="faq-question__trigger"
                            id="${triggerId}" aria-controls="${panelId}"
                            aria-expanded="${isOpen}">
                        <span class="faq-question__text">${escapeHtml(question.question)}</span>
                        ${icon("chevron", 20, 2.2)}
                    </button>
                    <!--
                        A SIBLING of the trigger, never nested inside it:
                        nested buttons are invalid HTML, and a nested copy
                        control would toggle the answer on every tap.
                    -->
                    ${renderCopyLink(question.key)}
                </h3>
                <div class="faq-answer" id="${panelId}" role="region"
                     aria-labelledby="${triggerId}"${isOpen ? "" : " hidden"}>
                    <p class="faq-answer__text">${escapeHtml(question.answer)}</p>
                </div>
            </div>`;
    }

    /**
     * Renders the one authoritative result state.
     *
     * `groups` is the single filtered collection: the list, the counts, the
     * toolbar and the no-results card are all derived from it inside one
     * branch. There is deliberately no separate "showNoResults" flag that
     * could drift out of step with what was actually rendered, and the two
     * states are mutually exclusive by construction — the else branch also
     * empties the results container, so a stale question can never sit
     * above the no-results card.
     */
    function renderResults() {
        const groups = visibleGroups();
        const shown = groups.reduce(
            (sum, group) => sum + group.questions.length,
            0
        );
        const hasResults = shown > 0;

        if (resultCount) {
            resultCount.textContent =
                shown === 1 ? "1 question" : `${shown} questions`;
        }
        if (expandAll) {
            expandAll.textContent = allExpanded ? "Collapse all" : "Expand all";
            expandAll.setAttribute("aria-expanded", String(allExpanded));
        }

        if (hasResults) {
            if (results) {
                results.innerHTML = groups
                    .map(
                        (group) => `
                            <section class="faq-group scroll-reveal"
                                     data-category-id="${group.id}"
                                     aria-labelledby="faq-group-${group.id}">
                                <h2 class="faq-group__heading" id="faq-group-${group.id}">
                                    <span class="faq-group__icon">${icon(group.icon, 18)}</span>
                                    ${escapeHtml(group.name)}
                                </h2>
                                <div class="faq-group__list">
                                    ${group.questions.map((entry) => renderQuestion(entry)).join("")}
                                </div>
                            </section>`
                    )
                    .join("");
                results.hidden = false;

                // Identity strings first: the answers are full of MT4/MT5,
                // XAUUSD, file names and the product name, and this markup
                // has just replaced whatever was protected before.
                protectIdentityTerms(results);

                // Every re-render produces brand new .scroll-reveal sections.
                // They must be handed back to the observer or they stay at
                // opacity 0.
                observeReveal(results);
                revealRenderedGroups();
            }
            // The count / expand-all row belongs to a populated list.
            if (toolbar) {
                toolbar.hidden = false;
            }
            if (noResults) {
                noResults.hidden = true;
            }
        } else {
            // Empty the container as well as hiding it, so nothing is left
            // to render if the element is ever styled to ignore [hidden].
            if (results) {
                results.replaceChildren();
                results.hidden = true;
            }
            if (toolbar) {
                toolbar.hidden = true;
            }
            if (noResults) {
                noResults.hidden = false;
            }
            // §10: the card quotes the visitor's actual query.
            if (noResultsTerm) {
                noResultsTerm.textContent = query;
            }
        }
    }

    /**
     * Reveals the freshly rendered list.
     *
     * On the FIRST render the sections are left alone: they are part of the
     * page the visitor is arriving at, so they animate in on scroll like
     * every other section, and initScrollReveal() picks them up.
     *
     * Every render AFTER that is the answer to something the visitor just
     * did — a keystroke, a category, a shortcut — and has to be readable
     * immediately. Waiting for a scroll would leave them looking at a blank
     * column, which is precisely the bug this replaced.
     */
    function revealRenderedGroups() {
        if (!hasRendered) {
            hasRendered = true;
            return;
        }
        qsa(".faq-group", results).forEach((group) =>
            group.classList.add("is-visible")
        );
    }

    /** Re-renders everything that depends on the query or active category. */
    function update() {
        renderNavigation();
        renderResults();
        syncSearchUi();
    }

    /* ------------------------------------------------------------------
     * Search
     * ---------------------------------------------------------------- */

    /** Keeps both inputs, the clear button and the chips in step. */
    function syncSearchUi() {
        const hasQuery = query.length > 0;
        if (searchInput && normalise(searchInput.value) !== query) {
            searchInput.value = query;
        }
        if (stickyInput && normalise(stickyInput.value) !== query) {
            stickyInput.value = query;
        }
        if (searchClear) {
            searchClear.hidden = !hasQuery;
        }
        // The popular chips are a starting point, not search results (§10).
        if (popular) {
            popular.hidden = hasQuery;
        }
    }

    /** True when `openKey` is still on screen under the current filters. */
    function openQuestionStillVisible() {
        return visibleGroups().some((group) =>
            group.questions.some((question) => question.key === openKey)
        );
    }

    function setQuery(value, { silent = false } = {}) {
        query = normalise(value);
        allExpanded = false;
        // §10: an answer that survives the new filter stays open; one that
        // does not is dropped so no stale key points at a removed element.
        if (openKey && !openQuestionStillVisible()) {
            openKey = null;
        }
        if (!silent) {
            update();
        }
    }

    function clearSearch({ focusMain = false } = {}) {
        setQuery("");
        if (searchInput) {
            searchInput.value = "";
        }
        if (stickyInput) {
            stickyInput.value = "";
        }
        if (focusMain && searchInput) {
            searchInput.focus();
        }
    }

    /* ------------------------------------------------------------------
     * Accordion (§7)
     * ---------------------------------------------------------------- */

    function setQuestionOpen(key, shouldOpen) {
        const item = qs(`.faq-question[data-question-key="${key}"]`, results);
        if (!item) {
            return;
        }
        const trigger = qs(".faq-question__trigger", item);
        const panel = qs(".faq-answer", item);
        item.classList.toggle("is-open", shouldOpen);
        trigger.setAttribute("aria-expanded", String(shouldOpen));
        panel.hidden = !shouldOpen;
    }

    function toggleQuestion(key) {
        // Only one answer stays open at a time. "Expand all" is the single
        // explicit exception, and the next question click returns to this rule.
        if (allExpanded) {
            qsa(".faq-question", results).forEach((item) =>
                setQuestionOpen(item.dataset.questionKey, false)
            );
            allExpanded = false;
            if (expandAll) {
                expandAll.textContent = "Expand all";
                expandAll.setAttribute("aria-expanded", "false");
            }
            openKey = null;
        }

        if (openKey === key) {
            setQuestionOpen(key, false);
            openKey = null;
            return;
        }
        if (openKey) {
            setQuestionOpen(openKey, false);
        }
        setQuestionOpen(key, true);
        openKey = key;
    }

    /* ------------------------------------------------------------------
     * Compact search in the sticky bar (§14, §15)
     * ---------------------------------------------------------------- */

    function stickySearchIsOpen() {
        return Boolean(stickyPanel) && !stickyPanel.hidden;
    }

    function openStickySearch() {
        if (!stickyPanel || !stickyInput) {
            return;
        }
        stickyPanel.hidden = false;
        stickyBar?.classList.add("is-searching");
        stickyToggle?.setAttribute("aria-expanded", "true");
        stickyInput.value = query;
        // Focus moves into the field so the visitor can type at once. No
        // scrolling happens: the bar is already on screen (§14.10).
        stickyInput.focus({ preventScroll: true });
    }

    function closeStickySearch({ restoreFocus = true } = {}) {
        if (!stickyPanel) {
            return;
        }
        stickyPanel.hidden = true;
        stickyBar?.classList.remove("is-searching");
        stickyToggle?.setAttribute("aria-expanded", "false");
        if (restoreFocus && stickyToggle && !stickyToggle.hidden) {
            stickyToggle.focus({ preventScroll: true });
        }
    }

    /**
     * The compact Search button only exists while the hero search is off
     * screen — there is no point offering a second search next to the first.
     */
    function watchHeroSearch() {
        if (!searchInput || !stickyToggle) {
            return;
        }
        const heroSearch = searchInput.closest(".faq-search") || searchInput;

        if (!("IntersectionObserver" in window)) {
            stickyToggle.hidden = false; // Progressive enhancement fallback.
            return;
        }

        /*
         * On desktop the compact search appears only once the hero search
         * has scrolled away — it would otherwise duplicate a control that
         * is already on screen. On mobile it is the ONLY search affordance
         * in the pinned row, so it stays visible at all times: hiding it
         * would leave a phone visitor with no way to search after
         * scrolling.
         */
        // The same query the stylesheet uses for the scrolling rail, so the
        // pinned button exists exactly where the rail does.
        const isMobile = () =>
            window.matchMedia("(max-width: 899.98px), (max-height: 540px)").matches;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const heroSearchVisible = entry.isIntersecting;
                    stickyToggle.hidden = heroSearchVisible && !isMobile();
                    if (heroSearchVisible && !isMobile() && stickySearchIsOpen()) {
                        closeStickySearch({ restoreFocus: false });
                    }
                });
            },
            { rootMargin: "-80px 0px 0px 0px", threshold: 0 }
        );

        observer.observe(heroSearch);
    }

    /* ------------------------------------------------------------------
     * Events
     * ---------------------------------------------------------------- */

    // Live search — input fires on every keystroke, so no submit is needed.
    searchInput?.addEventListener("input", (event) =>
        setQuery(event.target.value)
    );
    stickyInput?.addEventListener("input", (event) =>
        setQuery(event.target.value)
    );

    // A search field inside a form would submit on Enter and reload.
    qs("#faq-search-form")?.addEventListener("submit", (event) =>
        event.preventDefault()
    );
    qs("#faq-sticky-search-form")?.addEventListener("submit", (event) =>
        event.preventDefault()
    );

    searchClear?.addEventListener("click", () => clearSearch({ focusMain: true }));
    clearFromNoResults?.addEventListener("click", () =>
        clearSearch({ focusMain: true })
    );

    /**
     * Brings the active chip into view inside the RAIL.
     *
     * `block: "nearest"` is not optional. Without it the browser also
     * scrolls the nearest vertical scroller — the page — so every filter
     * tap jumps the reader somewhere else. With it, only the rail moves
     * horizontally and the page stays exactly where it was.
     *
     * @param {Element} [chip] defaults to the currently active chip
     */
    function revealActiveChip(chip) {
        const target = chip || qs(".faq-category-button.is-active", navigation);
        if (!target || !navigation) {
            return;
        }

        // Nothing to reveal when the rail is not scrolling (desktop).
        if (navigation.scrollWidth <= navigation.clientWidth) {
            return;
        }

        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        target.scrollIntoView({
            inline: "center",
            block: "nearest",
            behavior: reduced ? "auto" : "smooth"
        });
    }

    /** Fades the rail's left edge once it has been scrolled away from 0. */
    function updateRailFade() {
        if (!navigation) {
            return;
        }
        navigation.classList.toggle("is-scrolled", navigation.scrollLeft > 4);
    }

    navigation?.addEventListener("scroll", updateRailFade, { passive: true });

    /*
     * Left/Right move between chips. A chip that receives focus is scrolled
     * into view, so a keyboard user never focuses something off-screen.
     */
    navigation?.addEventListener("keydown", (event) => {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
            return;
        }
        const chips = qsa(".faq-category-button", navigation);
        const current = chips.indexOf(event.target.closest(".faq-category-button"));
        if (current === -1) {
            return;
        }
        event.preventDefault();
        const next = chips[current + (event.key === "ArrowRight" ? 1 : -1)];
        if (next) {
            next.focus();
            revealActiveChip(next);
        }
    });

    navigation?.addEventListener("focusin", (event) => {
        const chip = event.target.closest(".faq-category-button");
        if (chip) {
            revealActiveChip(chip);
        }
    });

    navigation?.addEventListener("click", (event) => {
        const button = event.target.closest(".faq-category-button");
        if (!button) {
            return;
        }
        activeCategoryId = button.dataset.categoryId;
        allExpanded = false;
        // §11: close an answer that does not belong to the chosen category,
        // rather than leaving an expanded panel that is no longer rendered.
        if (openKey && !openQuestionStillVisible()) {
            openKey = null;
        }
        update();
        // The chip has just been re-rendered, so re-find it by state.
        revealActiveChip();
    });

    popularList?.addEventListener("click", (event) => {
        const chip = event.target.closest(".faq-popular__chip");
        if (!chip) {
            return;
        }
        const question = categories
            .flatMap((category) => category.questions)
            .find((entry) => entry.key === chip.dataset.questionKey);
        if (!question) {
            return;
        }
        // Jump straight to that answer: switch to its category and open it.
        activeCategoryId = question.categoryId;
        query = "";
        allExpanded = false;
        openKey = question.key;
        update();

        const target = qs(
            `.faq-question[data-question-key="${question.key}"]`,
            results
        );
        if (!target) {
            return;
        }

        /*
         * Reveal the target's section immediately. The scroll-reveal
         * observer would otherwise not have fired by the time the smooth
         * scroll lands, and the visitor would arrive at an answer that is
         * open in the DOM but still at opacity 0.
         */
        target.closest(".faq-group")?.classList.add("is-visible");
        target.scrollIntoView({ block: "center", behavior: "smooth" });
    });

    results?.addEventListener("click", (event) => {
        const trigger = event.target.closest(".faq-question__trigger");
        if (!trigger) {
            return;
        }
        toggleQuestion(trigger.closest(".faq-question").dataset.questionKey);
    });

    // Copy controls, delegated once on the container that survives every
    // re-render. The control is a sibling of the trigger above, so this
    // listener and that one can never both fire for the same click.
    initCopyLinks(results);

    /**
     * Opens the question named by the URL hash.
     *
     * Clears any active filter or search first, so a deep link always
     * resolves even when the visitor's last state hid that question, then
     * opens it under the normal one-open-at-a-time rule and scrolls it
     * clear of the sticky chrome (scroll-margin-top does the offsetting,
     * so there is no magic number here).
     *
     * An unknown or malformed hash returns silently and the page renders
     * its normal state.
     */
    function openQuestionFromHash() {
        const hash = decodeURIComponent(window.location.hash.replace(/^#/, ""));
        if (!hash) {
            return;
        }

        const question = categories
            .flatMap((category) => category.questions)
            .find((entry) => entry.key === hash);

        if (!question) {
            return;
        }

        activeCategoryId = question.categoryId;
        query = "";
        allExpanded = false;
        openKey = question.key;
        if (searchInput) {
            searchInput.value = "";
        }
        update();

        const target = qs(
            `.faq-question[data-question-key="${question.key}"]`,
            results
        );
        if (!target) {
            return;
        }

        // Same reveal fix as the popular chips: the scroll-reveal observer
        // will not have fired by the time the scroll lands.
        target.closest(".faq-group")?.classList.add("is-visible");
        target.scrollIntoView({ block: "start", behavior: "smooth" });
    }

    openQuestionFromHash();
    window.addEventListener("hashchange", openQuestionFromHash);

    expandAll?.addEventListener("click", () => {
        allExpanded = !allExpanded;
        openKey = null;
        qsa(".faq-question", results).forEach((item) =>
            setQuestionOpen(item.dataset.questionKey, allExpanded)
        );
        expandAll.textContent = allExpanded ? "Collapse all" : "Expand all";
        expandAll.setAttribute("aria-expanded", String(allExpanded));
    });

    stickyToggle?.addEventListener("click", () => {
        if (stickySearchIsOpen()) {
            closeStickySearch();
        } else {
            openStickySearch();
        }
    });

    stickyClose?.addEventListener("click", () => closeStickySearch());

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && stickySearchIsOpen()) {
            closeStickySearch();
            return;
        }

        // "/" focuses the search, matching the hint shown in the field.
        // Ignored while the visitor is already typing somewhere.
        if (event.key !== "/" || event.metaKey || event.ctrlKey || event.altKey) {
            return;
        }
        const target = event.target;
        const typing =
            target instanceof HTMLElement &&
            (target.matches("input, textarea, select") || target.isContentEditable);
        if (typing) {
            return;
        }
        event.preventDefault();
        if (stickyToggle && !stickyToggle.hidden) {
            openStickySearch();
        } else {
            searchInput?.focus();
        }
    });

    /* ------------------------------------------------------------------
     * Boot
     * ---------------------------------------------------------------- */
    renderHero();
    renderPopular();
    update();
    watchHeroSearch();

    /*
     * The hero, the popular chips and the category navigation are rendered
     * once at boot and never replaced, so one sweep covers them. The answer
     * list is different — it is re-rendered on every keystroke, so it
     * protects itself inside renderResults().
     */
    protectIdentityTerms(document.body);

    /*
     * The rail starts with "All" selected, but a deep link or a restored
     * category can start it elsewhere — bring whatever is active into view,
     * and set the edge fade from the rail's real scroll position.
     */
    revealActiveChip();
    updateRailFade();

    // The support button reuses the configured Telegram destination (§16).
    qsa("[data-faq-telegram]").forEach((link) => {
        link.href = telegramPersonal;
    });
}
