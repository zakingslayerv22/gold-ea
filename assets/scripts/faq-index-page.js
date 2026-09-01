/* ======================================================================
 * HOMEPAGE FAQ SERVICE
 * ======================================================================
 * The homepage FAQ section (index.html) shows a small, curated selection
 * of the site's FAQs behind four filter pills.
 *
 * THIS FILE HOLDS NO FAQ TEXT.
 * ----------------------------
 * Every question and answer on the site lives in exactly one place:
 *
 *     assets/scripts/faq-page-content.js      <- the canonical database
 *
 * This file only decides WHICH of those entries the homepage features,
 * how they are grouped, and in what order. It then hands main.js the same
 * shape it has always consumed, so the homepage markup, styling and
 * behaviour are unchanged.
 *
 *          faq-page-content.js  (all categories, all questions, all answers)
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
 *     "<categoryId>/<questionId>"     e.g. "vps-running/do-i-need-a-vps"
 *
 * Those ids come from faq-page-content.js. Nothing here needs the question
 * or answer text — change the wording there and the homepage follows.
 *
 * A reference that no longer resolves is skipped rather than throwing, so
 * renaming an id in the database degrades to a missing entry rather than a
 * broken homepage. `getUnresolvedRefs()` lists any such references.
 *
 * ----------------------------------------------------------------------
 * HOW TO ADD A NEW FAQ
 * ----------------------------------------------------------------------
 * 1. Add it to faq-page-content.js (it appears on the full FAQ page, and
 *    the counts, hero total and category badges all follow automatically).
 * 2. Only if it should also appear on the homepage, add its ref to one of
 *    the sections below.
 *
 * The homepage shows the first `data-faq-limit` questions of the selected
 * section — see index.html — so a section may safely list more than that.
 * ====================================================================== */

import {
    getQuestionByRef,
    getAllQuestions
} from "./faq-page-content.js";

/**
 * The homepage's four filter pills and the questions each one features.
 *
 * The pill names are homepage presentation, not content: they group the
 * canonical questions into the broader headings the homepage mockup shows,
 * which is why they may differ from the full FAQ page's category names.
 */
const homepageFaqSections = [
    {
        id: "basics",
        name: "Basics",
        questionRefs: [
            "getting-started/what-is-goldtrap",
            "getting-started/suitable-for-beginners",
            "getting-started/mt4-or-mt5",
            "getting-started/run-on-phone",
            "getting-started/what-do-i-need",
            "strategy-performance/how-strategy-works"
        ]
    },
    {
        id: "account-broker",
        name: "Account & Broker",
        questionRefs: [
            "brokers-accounts/which-brokers",
            "brokers-accounts/cent-or-standard",
            "pricing-licensing/account-tiers",
            "pricing-licensing/activate-license-key",
            "pricing-licensing/customer-portal",
            "capital-risk/what-leverage"
        ]
    },
    {
        id: "capital-risk",
        name: "Capital & Risk",
        questionRefs: [
            "capital-risk/how-much-capital",
            "capital-risk/is-capital-safe",
            "capital-risk/biggest-risk",
            "strategy-performance/floating-positions",
            "strategy-performance/profit-per-day",
            "pricing-licensing/do-keys-expire"
        ]
    },
    {
        id: "setup-help",
        name: "Setup & Help",
        questionRefs: [
            "setup-installation/install-on-mt4-mt5",
            "setup-installation/webrequest-prompt",
            "pricing-licensing/how-do-i-pay",
            "setup-installation/where-to-get-presets",
            "vps-running/do-i-need-a-vps",
            "troubleshooting-support/updated-version-and-support"
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
        const known = new Set(getAllQuestions().map((entry) => entry.ref));
        return homepageFaqSections
            .flatMap((section) => section.questionRefs)
            .filter((ref) => !known.has(ref));
    }
}

export const faqServiceInstance = new FaqServiceHomepage();
