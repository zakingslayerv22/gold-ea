/* ======================================================================
 * FAQ DATA SERVICE
 * ======================================================================
 * Single source of truth for every FAQ on the site.
 *
 * Both the homepage FAQ section (index.html) and the complete FAQ page
 * (frequently-asked-questions.html) import the SAME instance exported at
 * the bottom of this file. There is deliberately no second FAQ database.
 *
 * HOW TO EDIT THE FAQs
 * --------------------
 * Add / remove / reorder entries inside #faqData below. The markup on both
 * pages is generated from this object at runtime, so no HTML needs editing.
 *
 * SITE NAME IN FAQ TEXT
 * Write {siteName} wherever the product name belongs. The renderer in
 * main.js substitutes the configured siteName when the FAQ is built, so
 * the name is never hard-coded here either. {eaVersion} and {siteOwner}
 * work the same way.
 *
 * Shape:
 *   <categoryId>: {
 *       name: "Category label shown on the filter pill",
 *       questions: {
 *           <questionId>: { q: "The question", a: "The answer" }
 *       }
 *   }
 *
 * The homepage shows only the first `homepageQuestionLimit` questions of the
 * active category (see main.js). The full FAQ page shows every question.
 * ====================================================================== */

class FaqServiceHomepage {
    /**
     * FAQ content is kept in a private class field so it cannot be mutated
     * from outside. Consumers read it through the getters below.
     */
    #faqData = {
        1: {
            name: "Basics",
            questions: {
                1: {
                    q: "What is {siteName}?",
                    a: "{siteName} is an Expert Advisor for MetaTrader 4 and MetaTrader 5, built specifically for XAUUSD (Gold) trading. It uses a straddle-entry strategy, grid recovery, basket take profit, license binding, and strict risk control to manage trades automatically according to your configured settings."
                },
                2: {
                    q: "Who is {siteName} for?",
                    a: "{siteName} is designed for traders who prefer consistency over manual execution. It suits both newer traders who want a structured, rules-based approach and experienced traders who want to automate gold trading across one or more accounts."
                },
                3: {
                    q: "Can {siteName} be used on MT4 and MT5?",
                    a: "Yes. {siteName} ships as a compiled .ex4 file for MetaTrader 4 and a compiled .ex5 file for MetaTrader 5. Your licence covers both platforms, so you can install whichever build matches your terminal."
                },
                4: {
                    q: "Can I run {siteName} on a mobile phone?",
                    a: "No. The MetaTrader mobile apps cannot run Expert Advisors. {siteName} must run inside a desktop MetaTrader terminal, which is why most users run it on a VPS so it stays online around the clock."
                },
                5: {
                    q: "Which pair does {siteName} trade?",
                    a: "{siteName} is optimised for XAUUSD (Gold). Its entry logic, recovery behaviour and risk defaults are tuned specifically for the way gold moves, so running it on other symbols is not recommended."
                },
                6: {
                    q: "What strategy does {siteName} use?",
                    a: "The EA places a straddle entry, then manages the resulting positions as a single basket rather than as individual trades. Take profit is calculated across the whole basket, and built-in recovery logic manages exposure as market conditions change. It repeats this cycle automatically — there is no directional prediction involved."
                }
            }
        },

        2: {
            name: "Account & Broker",
            questions: {
                1: {
                    q: "Can I use {siteName} with any broker?",
                    a: "Yes. The paid licences work with any broker that offers XAUUSD on MetaTrader 4 or MetaTrader 5. The free option is the exception — it is only available through registration under our IB link."
                },
                2: {
                    q: "Does {siteName} work on cent and standard accounts?",
                    a: "Yes. {siteName} runs on both cent and standard accounts. Cent accounts are a practical way to run the EA with smaller real capital while you get familiar with how it behaves."
                },
                3: {
                    q: "How many accounts does each licence cover?",
                    a: "The 5 Accounts licence binds to up to five MT4/MT5 account numbers. The Unlimited licence has no account limit. The free option is locked to one MT5 account ID only."
                },
                4: {
                    q: "How is my licence bound to my account?",
                    a: "Your licence is tied to the MT4/MT5 account IDs you submit. The EA verifies the licence online at runtime, which is why the whitelist URL has to be added to your terminal once per installation."
                },
                5: {
                    q: "Can I move my licence to a different account?",
                    a: "Yes. Message {siteOwner} on Telegram with your current and new account IDs and your licence will be re-bound. You stay within the account allowance of the plan you purchased."
                },
                6: {
                    q: "What leverage should I use?",
                    a: "The ready-made preset .set files are tuned for 1:500 and 1:2000 leverage on a 50K capital base. Pick the preset that matches your account, or ask on Telegram if your broker's conditions differ."
                }
            }
        },

        3: {
            name: "Capital & Risk",
            questions: {
                1: {
                    q: "How much capital do I need to start?",
                    a: "The supplied presets are built around a 50K capital base, which on a cent account means a far smaller real deposit. The right figure depends on your broker, leverage and chosen preset — check on Telegram before going live."
                },
                2: {
                    q: "Can {siteName} lose money?",
                    a: "Yes. Trading XAUUSD involves substantial risk and past performance does not guarantee future results. The EA, like any automated system, can lose money. Use only capital you can afford to lose."
                },
                3: {
                    q: "What risk controls are built in?",
                    a: "{siteName} includes built-in risk management features, a configurable daily profit target, basket-level take profit, and a trading pause that stops new entries during unstable rollover periods while continuing to manage positions that are already open."
                },
                4: {
                    q: "Does the EA use a stop loss?",
                    a: "Positions are managed as a basket rather than individually, so exits are driven by basket-level take profit and the built-in recovery logic instead of a conventional per-trade stop. Position sizing and account capital are therefore your primary risk controls."
                },
                5: {
                    q: "What is the daily profit target option?",
                    a: "You can set a daily profit target in the EA's inputs. Once the target is reached, the EA stops opening new cycles for the rest of the trading day and resumes on the next session."
                },
                6: {
                    q: "Is there a refund if I change my mind?",
                    a: "Licences and the source code are sold as one-time payments with no refund. If you are unsure whether {siteName} fits your setup, start with the free option or ask your questions on Telegram first."
                }
            }
        },

        4: {
            name: "Setup & Help",
            questions: {
                1: {
                    q: "How do I install {siteName}?",
                    a: "Download the build for your platform, drop the .ex4 or .ex5 file into your terminal's Experts folder, restart MetaTrader, then attach the EA to an XAUUSD chart and enter your licence key."
                },
                2: {
                    q: "Why do I need to add a URL to the MetaTrader whitelist?",
                    a: "The EA verifies your licence online. MetaTrader blocks outbound web requests by default, so the licence URL has to be allowed once per terminal: Tools → Options → Expert Advisors → tick \"Allow WebRequest for listed URL\" → add the domain → OK."
                },
                3: {
                    q: "Where do I get my licence key?",
                    a: "After payment, send your transaction screenshot and your MT4/MT5 account IDs to {siteOwner} on Telegram. Your licence key is issued and bound to those accounts."
                },
                4: {
                    q: "Do I need preset .set files?",
                    a: "They are optional but recommended. Ready-made 50K capital presets are available for every pair, tuned for MT4 and MT5 at 1:500 and 1:2000 leverage, so you can load a tested configuration instead of setting every input by hand."
                },
                5: {
                    q: "Do I need a VPS?",
                    a: "A VPS is strongly recommended. {siteName} is VPS friendly and only manages trades while the terminal is running, so a VPS keeps it online even when your own computer is off."
                },
                6: {
                    q: "How do I get support?",
                    a: "Support runs through Telegram, direct with {siteOwner}. The 5 Accounts and Unlimited licences both include priority reply, and source-code buyers get direct support on integration and customisation."
                }
            }
        }
    };

    /**
     * @returns {object} the complete FAQ dataset, keyed by category id.
     */
    getFaqData() {
        return this.#faqData;
    }

    /**
     * @param {string|number} id category id
     * @returns {object|null} a single category, or null when it does not exist.
     */
    getCategory(id) {
        return this.#faqData[id] || null;
    }

    /**
     * @returns {Array<{id: string, name: string}>} lightweight list used to
     *          build the category filter pills without exposing the questions.
     */
    getCategoryList() {
        return Object.keys(this.#faqData).map((id) => ({
            id,
            name: this.#faqData[id].name
        }));
    }
}

export const faqServiceInstance = new FaqServiceHomepage();
