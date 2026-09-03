/* ======================================================================
 * FAQ SEARCH — ATTENTION BEHAVIOUR
 * ======================================================================
 * Two effects that make the FAQ search control invite a click, and
 * nothing else. This file owns their configuration and their lifecycle.
 *
 *   1. A typewriter PLACEHOLDER that types a real FAQ question, holds it,
 *      deletes it, and moves on to another.
 *   2. A gold BORDER SHINE: a bright highlight travelling once around the
 *      control's edge at random intervals, like light catching polished
 *      metal. The border, not the box.
 *
 * WHERE THINGS LIVE
 *   main.js             global site configuration
 *   faq-page-content.js the canonical FAQ database
 *   faq-search.js       THIS FILE — FAQ search UI behaviour and its config
 *
 * TWO RULES THIS FILE NEVER BREAKS
 *   • It writes to `placeholder`, NEVER to `value`. The input's value
 *     belongs to the visitor. Nothing here can overwrite, delete or
 *     filter on their text.
 *   • Search always wins. The moment a field is focused or holds any
 *     text, the animation suspends and the field's own placeholder comes
 *     back. It resumes only when every field is empty and unfocused.
 * ====================================================================== */

import { getQuestionByRef } from "./faq-page-content.js";


/* ======================================================================
 * CONFIGURATION
 * ======================================================================
 * Every timing lives here, in milliseconds, and nothing in this file
 * hard-codes a duration. Where a MIN and a MAX are given, each cycle
 * picks a fresh random value between them — that is what stops the
 * effect feeling mechanical.
 *
 * HOW TO ADJUST
 *   enabled ................ false turns both effects off entirely
 *   shimmerEnabled ......... false leaves the border static
 *   shimmerIntervalMin/Max . gap between border shines
 *   shimmerDuration ........ how long one trip around the border takes
 *   typingSpeedMin/Max ..... per-character delay while typing
 *   deletingSpeedMin/Max ... per-character delay while deleting
 *                            (lower than typing: backspacing is quick)
 *   holdDurationMin/Max .... how long a finished question stays on screen
 *   questionGapDuration .... pause after deleting, before the next one
 *   startDelay ............. quiet period after page load
 *
 * HOW TO CHANGE THE ROTATING QUESTIONS
 *   Edit `questionRefs` below. Each entry is a reference into the
 *   canonical database:
 *
 *       "<categoryId>/<questionId>"    e.g. "vps-running/do-i-need-a-vps"
 *
 *   The ids come from faq-page-content.js. The wording is NOT copied
 *   here — it is read from the database at runtime, so a question edited
 *   there changes here too and the two can never drift apart. A
 *   reference that no longer resolves is skipped rather than throwing.
 * ====================================================================== */

export const faqSearchAnimationConfig = {
    enabled: true,

    /*
     * Border shine. A bright highlight travels once around the search
     * bar's gold edge, then the border goes back to normal. It is not a
     * glow and it is not continuous — most of the time nothing animates.
     *
     *   shimmerEnabled ....... false leaves the border completely static
     *   shimmerIntervalMin/Max gap between shines (7–14 seconds)
     *   shimmerDuration ...... how long one trip around the border takes
     */
    shimmerEnabled: true,
    shimmerIntervalMin: 7000,
    shimmerIntervalMax: 14000,
    shimmerDuration: 1400,

    /* Typewriter. */
    typingSpeedMin: 45,
    typingSpeedMax: 95,
    deletingSpeedMin: 20,
    deletingSpeedMax: 40,
    holdDurationMin: 1800,
    holdDurationMax: 2800,
    questionGapDuration: 500,
    startDelay: 1500,

    /*
     * The questions that rotate through the placeholder, by reference.
     * Shown in a shuffled order — see nextQuestion() — so the same one
     * never appears twice in a row.
     */
    questionRefs: [
        "getting-started/what-is-goldtrap",
        "strategy-performance/how-strategy-works",
        "setup-installation/install-on-mt4-mt5",
        "pricing-licensing/account-tiers",
        "vps-running/do-i-need-a-vps",
        "capital-risk/how-much-capital",
        "brokers-accounts/which-brokers",
        "troubleshooting-support/not-opening-trades",
        "pricing-licensing/how-do-i-pay",
        "strategy-performance/can-i-backtest"
    ]
};


/* ---------------------------------------------------------------------
 * Small helpers
 * ------------------------------------------------------------------- */

/** A random whole number between min and max, inclusive of both ends. */
function randomBetween(min, max) {
    return Math.round(min + Math.random() * (max - min));
}

/**
 * Resolves the configured references into the canonical wording.
 * A reference that no longer exists is skipped, so renaming an id in the
 * database degrades to one fewer rotating question rather than an error.
 *
 * @param {Function} fill substitutes {siteName} and friends
 * @returns {string[]}
 */
function resolveQuestions(fill) {
    return faqSearchAnimationConfig.questionRefs
        .map((ref) => getQuestionByRef(ref))
        .filter(Boolean)
        .map((entry) => fill(entry.question.question));
}

/**
 * A queue that hands back every question once, in a random order, then
 * reshuffles — rather than picking at random each time, which repeats.
 * The reshuffle also guarantees the last question of one round is not the
 * first of the next.
 */
function createShuffledQueue(items) {
    let queue = [];
    let previous = null;

    function refill() {
        queue = items.slice();
        for (let i = queue.length - 1; i > 0; i -= 1) {
            const j = Math.floor(Math.random() * (i + 1));
            [queue[i], queue[j]] = [queue[j], queue[i]];
        }
        // Never let a reshuffle repeat the question just shown.
        if (queue.length > 1 && queue[0] === previous) {
            [queue[0], queue[1]] = [queue[1], queue[0]];
        }
    }

    return function next() {
        if (queue.length === 0) {
            refill();
        }
        previous = queue.shift();
        return previous;
    };
}


/* ======================================================================
 * THE CONTROLLER
 * ======================================================================
 * One controller for the whole page, however many search fields there
 * are. The FAQ page has two — the hero field and the compact sticky one —
 * and they are two views of a single search, so they get ONE animation
 * that writes to whichever is currently on screen. Two independent
 * typewriters fighting over the same search is exactly what this avoids.
 * ====================================================================== */

export function initFaqSearchAnimation(config = {}) {
    const { siteName = "", siteOwner = "", eaVersion = "" } = config;

    const inputs = Array.from(
        document.querySelectorAll("#faq-search-input, #faq-sticky-search-input")
    );

    if (inputs.length === 0 || !faqSearchAnimationConfig.enabled) {
        return null;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    /** The site's token substitution, so the placeholder reads correctly. */
    const fill = (text) =>
        String(text)
            .replace(/\{siteName\}/g, siteName)
            .replace(/\{siteOwner\}/g, siteOwner)
            .replace(/\{eaVersion\}/g, eaVersion);

    const questions = resolveQuestions(fill);

    // Each field's own placeholder is what shows whenever the animation
    // is suspended, so it is captured before anything is written.
    const basePlaceholder = new WeakMap();
    inputs.forEach((input) =>
        basePlaceholder.set(input, input.getAttribute("placeholder") || "")
    );

    /* ------------------------------------------------------------------
     * Lifecycle
     * ---------------------------------------------------------------- */

    // Exactly one pending timer at a time, for each effect. Every path
    // that schedules work goes through these, so nothing can leak.
    let typeTimer = null;
    let shimmerTimer = null;
    let shimmerClearTimer = null;
    let suspended = false;

    function clearTypeTimer() {
        window.clearTimeout(typeTimer);
        typeTimer = null;
    }

    function clearShimmerTimers() {
        window.clearTimeout(shimmerTimer);
        window.clearTimeout(shimmerClearTimer);
        shimmerTimer = null;
        shimmerClearTimer = null;
    }

    /**
     * The field a visitor can actually see right now, if any.
     *
     * `offsetParent` alone is not enough: the hero field stays rendered
     * after it has scrolled away, so it would keep winning over the
     * compact sticky field that is genuinely on screen. The field whose
     * box is inside the viewport is the one being looked at.
     */
    function visibleInput() {
        const rendered = inputs.filter((input) => input.offsetParent !== null);

        const onScreen = rendered.find((input) => {
            const rect = input.getBoundingClientRect();
            return rect.bottom > 0 && rect.top < window.innerHeight;
        });

        return onScreen || rendered[0] || null;
    }

    /** Restores every field's own placeholder. */
    function restorePlaceholders() {
        inputs.forEach((input) =>
            input.setAttribute("placeholder", basePlaceholder.get(input) || "")
        );
    }

    /**
     * The animation runs only when the visitor is not using the search:
     * no field focused, and no field holding text. Their input always
     * wins.
     */
    function shouldAnimate() {
        if (suspended || reducedMotion.matches) {
            return false;
        }
        return inputs.every(
            (input) => input.value === "" && document.activeElement !== input
        );
    }

    /* ------------------------------------------------------------------
     * Typewriter
     * ---------------------------------------------------------------- */

    const nextQuestion = createShuffledQueue(questions);

    function writePlaceholder(text) {
        const target = visibleInput();
        if (!target) {
            return;
        }

        target.setAttribute("placeholder", text);

        /*
         * Every OTHER field goes back to its own placeholder. When the
         * visitor opens the sticky search mid-question, the hero field
         * must not be left holding half a typed question.
         */
        inputs.forEach((input) => {
            if (input !== target) {
                input.setAttribute("placeholder", basePlaceholder.get(input) || "");
            }
        });
    }

    function typeQuestion(question, index = 0) {
        if (!shouldAnimate()) {
            return stop();
        }

        writePlaceholder(question.slice(0, index));

        if (index < question.length) {
            typeTimer = window.setTimeout(
                () => typeQuestion(question, index + 1),
                randomBetween(
                    faqSearchAnimationConfig.typingSpeedMin,
                    faqSearchAnimationConfig.typingSpeedMax
                )
            );
            return;
        }

        // Finished: hold the complete question, then delete it.
        typeTimer = window.setTimeout(
            () => deleteQuestion(question, question.length),
            randomBetween(
                faqSearchAnimationConfig.holdDurationMin,
                faqSearchAnimationConfig.holdDurationMax
            )
        );
    }

    function deleteQuestion(question, index) {
        if (!shouldAnimate()) {
            return stop();
        }

        writePlaceholder(question.slice(0, index));

        if (index > 0) {
            typeTimer = window.setTimeout(
                () => deleteQuestion(question, index - 1),
                randomBetween(
                    faqSearchAnimationConfig.deletingSpeedMin,
                    faqSearchAnimationConfig.deletingSpeedMax
                )
            );
            return;
        }

        typeTimer = window.setTimeout(
            () => typeQuestion(nextQuestion()),
            faqSearchAnimationConfig.questionGapDuration
        );
    }

    /* ------------------------------------------------------------------
     * Border shine
     * ---------------------------------------------------------------- */

    /**
     * One trip of the highlight around the visible control's border.
     *
     * A class is added, the CSS animation runs once, the class comes off —
     * so the border is static except during that trip, and a focused field
     * is left alone entirely.
     *
     * shimmerDuration is written to the element as a custom property, so
     * the CSS animation and the class-removal timeout read the SAME
     * configured value rather than each carrying their own copy.
     */
    function playShimmer() {
        const target = visibleInput();
        const control = target ? target.closest(".faq-search") : null;

        if (!control || !shouldAnimate()) {
            return;
        }

        const duration = faqSearchAnimationConfig.shimmerDuration;
        control.style.setProperty("--faq-shimmer-duration", `${duration}ms`);
        control.classList.add("is-shimmering");

        shimmerClearTimer = window.setTimeout(
            () => control.classList.remove("is-shimmering"),
            duration
        );
    }

    /*
     * Recursive scheduling, deliberately not setInterval: each wait is a
     * fresh random value, so the shine never falls into a mechanical
     * rhythm.
     */
    function scheduleShimmer() {
        if (!faqSearchAnimationConfig.shimmerEnabled) {
            return;
        }
        window.clearTimeout(shimmerTimer);
        shimmerTimer = window.setTimeout(() => {
            playShimmer();
            scheduleShimmer();
        }, randomBetween(
            faqSearchAnimationConfig.shimmerIntervalMin,
            faqSearchAnimationConfig.shimmerIntervalMax
        ));
    }

    /* ------------------------------------------------------------------
     * Start / stop
     * ---------------------------------------------------------------- */

    function stop() {
        clearTypeTimer();
        clearShimmerTimers();
        document
            .querySelectorAll(".faq-search.is-shimmering")
            .forEach((control) => control.classList.remove("is-shimmering"));
        restorePlaceholders();
    }

    function start() {
        if (!shouldAnimate() || questions.length === 0) {
            return;
        }
        // Restarting always clears first, so there is only ever one chain.
        clearTypeTimer();
        clearShimmerTimers();

        typeTimer = window.setTimeout(
            () => typeQuestion(nextQuestion()),
            faqSearchAnimationConfig.startDelay
        );
        scheduleShimmer();
    }

    /** Called whenever the visitor's relationship to the search changes. */
    function refresh() {
        if (shouldAnimate()) {
            if (!typeTimer && !shimmerTimer) {
                start();
            }
            return;
        }
        stop();
    }

    inputs.forEach((input) => {
        // Focus and any keystroke suspend it; emptying and leaving resumes.
        input.addEventListener("focus", refresh);
        input.addEventListener("blur", () => window.setTimeout(refresh, 0));
        input.addEventListener("input", refresh);
    });

    // The compact field is revealed and hidden as the sticky panel opens
    // and closes, which changes which field is on screen.
    const panel = document.querySelector("#faq-sticky-search-panel");
    if (panel && "MutationObserver" in window) {
        new MutationObserver(() => refresh()).observe(panel, {
            attributes: true,
            attributeFilter: ["hidden"]
        });
    }

    // A visitor who turns reduced motion on mid-session gets a static
    // placeholder immediately.
    const onMotionChange = () => (reducedMotion.matches ? stop() : refresh());
    if (typeof reducedMotion.addEventListener === "function") {
        reducedMotion.addEventListener("change", onMotionChange);
    }

    // Nothing animates in a background tab.
    document.addEventListener("visibilitychange", () => {
        suspended = document.hidden;
        refresh();
    });

    start();

    // Returned for tests and for any future caller that needs to tear the
    // behaviour down; every timer it owns is cleared by stop().
    return { start, stop, refresh, questions };
}
