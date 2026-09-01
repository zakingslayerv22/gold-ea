/* ======================================================================
 * HOMEPAGE FAQ SERVICE
 * ======================================================================
 * The homepage FAQ section (index.html) shows 24 approved questions
 * behind four filter pills.
 *
 * THIS FILE HOLDS NO FAQ TEXT.
 * ----------------------------
 * Every question and answer on the site lives in exactly one place:
 *
 *     assets/scripts/faq-page-content.js      <- the canonical database
 *
 * That file holds two collections: `faqPageContent`, the 72 entries the
 * full FAQ page renders, and `homepageFaqContent`, the 24 approved entries
 * the homepage shows. This file only decides WHICH of them the homepage
 * features, how they are grouped and in what order. It then hands main.js
 * the same shape it has always consumed, so the homepage markup, styling
 * and behaviour are unchanged.
 *
 *          faq-page-content.js  (all FAQ text on the site)
 *                   |
 *          ┌────────┴─────────┐
 *          |                  |
 *   full FAQ page      faq-index-page.js  (this file: selection + order)
 *   (faq-page.js)              |
 *                          homepage
 *
 * ----------------------------------------------------------------------
 * HOW TO CHANGE WHAT THE HOMEPAGE SHOWS
 * ----------------------------------------------------------------------
 * Edit `homepageFaqSections` below. Each section is one filter pill, and
 * `questionRefs` lists the questions it shows, in display order, by their
 * stable reference:
 *
 *     "<categoryId>/<questionId>"     e.g. "homepage/which-pair"
 *
 * Those ids come from faq-page-content.js. A ref may point at either
 * collection — "homepage/..." for the homepage's own approved copy, or
 * "<faqPageCategory>/..." to feature an entry written for the full FAQ
 * page. Nothing here needs the question or answer text: change the wording
 * in faq-page-content.js and the homepage follows.
 *
 * A reference that no longer resolves is skipped rather than throwing, so
 * renaming an id in the database degrades to a missing entry rather than a
 * broken homepage. `getUnresolvedRefs()` lists any such references.
 *
 * ----------------------------------------------------------------------
 * HOW TO ADD A NEW FAQ
 * ----------------------------------------------------------------------
 * 1. Decide where it belongs. A question for the full FAQ page goes into
 *    `faqPageContent`, where it joins the counts, the hero total and the
 *    category badges automatically. A question written specifically for
 *    the homepage goes into `homepageFaqContent`.
 * 2. Add its ref to one of the sections below if the homepage should
 *    show it.
 *
 * The homepage shows the first `data-faq-limit` questions of the selected
 * section — see index.html — so a section may safely list more than that.
 * ====================================================================== */

import {
    getQuestionByRef,
    getHomepageQuestions
} from "./faq-page-content.js";

/**
 * The homepage's four filter pills and the questions each one features.
 *
 * The pill names are homepage presentation, not content: they are the
 * headings the homepage mockup shows, which is why they differ from the
 * full FAQ page's eight category names.
 */
const homepageFaqSections = [
    {
        id: "basics",
        name: "Basics",
        questionRefs: [
            "homepage/what-is-goldtrap",
            "homepage/who-is-it-for",
            "homepage/mt4-and-mt5",
            "homepage/run-on-mobile",
            "homepage/which-pair",
            "homepage/what-strategy"
        ]
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
            "homepage/what-leverage"
        ]
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
            "homepage/refund"
        ]
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
            "homepage/get-support"
        ]
    }
];


class FaqServiceHomepage {
    /**
     * Resolves one section's refs against the canonical database.
     *
     * main.js has always consumed `{ name, questions: { <id>: { q, a } } }`,
     * so that shape is built here rather than changing the renderer. The
     * text is not copied — it is read straight from faq-page-content.js on
     * every call.
     *
     * @param {object} section an entry from homepageFaqSections
     * @returns {object} { name, questions }
     */
    #buildSection(section) {
        const questions = {};

        section.questionRefs.forEach((ref) => {
            const resolved = getQuestionByRef(ref);
            if (!resolved) {
                return; // Unknown ref: skip it, never break the homepage.
            }
            questions[resolved.question.id] = {
                q: resolved.question.question,
                a: resolved.question.answer
            };
        });

        return { name: section.name, questions };
    }

    /**
     * @returns {object} every homepage section keyed by its id, in the
     *          shape main.js renders.
     */
    getFaqData() {
        const data = {};
        homepageFaqSections.forEach((section) => {
            data[section.id] = this.#buildSection(section);
        });
        return data;
    }

    /**
     * @param {string} id section id
     * @returns {object|null} a single section, or null when it does not exist.
     */
    getCategory(id) {
        const section = homepageFaqSections.find((entry) => entry.id === id);
        return section ? this.#buildSection(section) : null;
    }

    /**
     * @returns {Array<{id: string, name: string}>} lightweight list used to
     *          build the filter pills without resolving every question.
     */
    getCategoryList() {
        return homepageFaqSections.map((section) => ({
            id: section.id,
            name: section.name
        }));
    }

    /**
     * Every featured question, flattened, each keeping the canonical ref it
     * came from. Useful for checking what the homepage currently promotes.
     *
     * @returns {Array<object>}
     */
    getFeaturedQuestions() {
        return homepageFaqSections.flatMap((section) =>
            section.questionRefs
                .map((ref) => {
                    const resolved = getQuestionByRef(ref);
                    return resolved
                        ? {
                              ref,
                              sectionId: section.id,
                              sectionName: section.name,
                              question: resolved.question.question,
                              answer: resolved.question.answer
                          }
                        : null;
                })
                .filter(Boolean)
        );
    }

    /**
     * Any featured reference that no longer resolves — i.e. an id that was
     * renamed or removed from faq-page-content.js. Empty is healthy.
     *
     * @returns {string[]}
     */
    getUnresolvedRefs() {
        const known = new Set(getHomepageQuestions().map((entry) => entry.ref));
        return homepageFaqSections
            .flatMap((section) => section.questionRefs)
            .filter((ref) => !known.has(ref));
    }
}

export const faqServiceInstance = new FaqServiceHomepage();
