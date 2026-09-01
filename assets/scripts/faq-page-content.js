/* ======================================================================
 * FAQ PAGE CONTENT
 * ======================================================================
 * The complete FAQ collection for frequently-asked-questions.html.
 *
 * This file is DATA ONLY. It knows nothing about the DOM, and nothing in
 * frequently-asked-questions.html hard-codes a question, an answer or a
 * category count — the page is rendered from this array by
 * assets/scripts/faq-page.js.
 *
 * HOW TO EDIT
 * -----------
 * Add, remove or reorder entries below. Everything the interface shows is
 * derived from this file at runtime:
 *
 *   • the category pills and their counts
 *   • the "N answers about …" figure in the hero
 *   • the "N questions" line above the list
 *   • the popular-question chips (see faqPopularQuestionIds)
 *
 * So a new question needs no HTML, no CSS and no count to be updated.
 *
 * SITE NAME IN FAQ TEXT
 * ---------------------
 * Never write the product name literally. Use the same tokens the rest of
 * the site uses and they are substituted when the page is built:
 *
 *   {siteName}   the configured site name      (main.js → siteName)
 *   {siteOwner}  the configured owner          (main.js → siteOwner)
 *   {eaVersion}  the current EA version        (main.js → eaCurrentVersion)
 *
 * IDS
 * ---
 * Category and question ids are stable, human-readable slugs. They are
 * used for element ids, aria-controls wiring and the popular-question
 * list, so renaming one is a breaking change — prefer adding a new id.
 *
 * ICONS
 * -----
 * `icon` names a key in the ICONS map in faq-page.js. Add the SVG there
 * rather than putting markup in this data file.
 * ====================================================================== */

export const faqPageContent = [
    {
        id: "getting-started",
        name: "Getting Started",
        icon: "rocket",
        questions: [
            {
                id: "what-is-goldtrap",
                question: "What is {siteName} and what does it do?",
                answer:
                    "{siteName} is an Expert Advisor for MetaTrader 4 and MetaTrader 5, built specifically for XAUUSD (Gold) trading. It uses a straddle-entry strategy, grid recovery, basket take profit, license binding, and strict risk control to manage trades automatically according to your configured settings."
            },
            {
                id: "mt4-or-mt5",
                question: "Does {siteName} work on MetaTrader 4 or MetaTrader 5?",
                answer:
                    "Both. {siteName} ships as a compiled .ex4 file for MetaTrader 4 and a compiled .ex5 file for MetaTrader 5. Your license covers both platforms, so you can install whichever build matches your terminal."
            },
            {
                id: "run-on-phone",
                question: "Can I run {siteName} on my phone (Android or iPhone)?",
                answer:
                    "No. The MetaTrader mobile apps cannot run Expert Advisors at all — that is a MetaTrader limitation, not a {siteName} one. The EA has to run inside a desktop MetaTrader terminal, which is why most users put it on a VPS so it stays online when their own device is off."
            },
            {
                id: "how-do-i-get-it",
                question: "How do I get {siteName}?",
                answer:
                    "Two routes. Buy a direct license from the pricing section — the 5 Accounts and Unlimited tiers are one-time payments that work with any broker. Or take the Free Access route by registering a new broker account under our IB link, verifying it, and submitting your MT5/MT4 ID and email."
            },
            {
                id: "suitable-for-beginners",
                question: "Is {siteName} suitable for beginners?",
                answer:
                    "It is designed for traders who prefer consistency over manual execution, and it suits newer traders who want a structured, rules-based approach as well as experienced traders automating gold across several accounts. It is not a shortcut around risk: you still choose the capital, the account type and the preset, and gold can move against an open basket. Start on a demo or a cent account and ask questions on Telegram before scaling up."
            },
            {
                id: "what-do-i-need",
                question: "What do I need to get started with {siteName}?",
                answer:
                    "Four things: a broker account that offers XAUUSD on MetaTrader 4 or 5, a desktop terminal (ideally on a VPS), a license key bound to your MT account ID, and the EA file for your platform. Add the license URL to your terminal's WebRequest whitelist once, attach the EA to an XAUUSD chart, and it is ready."
            },
            {
                id: "support-language",
                question: "What language is {siteName} and its support available in?",
                answer:
                    "The EA's inputs and on-chart messages are in English, and support with {siteOwner} runs in English on Telegram. This website itself can be translated into any of the languages in the selector at the top of the page if you would rather read it in your own."
            }
        ]
    },

    {
        id: "pricing-licensing",
        name: "Pricing & Licensing",
        icon: "key",
        questions: [
            {
                id: "direct-license-vs-free-access",
                question:
                    "How can I get the {siteName}, and what's the difference between the Direct License and Free Access?",
                answer:
                    "A Direct License is a one-time payment and works with any broker: the 5 Accounts tier covers up to five MT5/MT4 accounts, Unlimited has no account limit. Both include lifetime licensing, free upgrades to all future versions and priority replies. Free Access costs nothing but comes with conditions — you register a new broker account under our IB link, fully verify it, and the license is locked to one MT5 account ID only."
            },
            {
                id: "activate-license-key",
                question: "How do I activate my license key?",
                answer:
                    "Attach {siteName} to an XAUUSD chart and enter the key in the EA's inputs. The EA verifies it online at runtime, so the license URL must already be in your terminal's WebRequest whitelist. Once the key checks out the EA reports it on the chart and begins managing trades."
            },
            {
                id: "do-keys-expire",
                question: "Do license keys expire? Do I have to pay again later?",
                answer:
                    "No. Direct licenses are lifetime and a one-time payment — there is no renewal and no subscription, and free upgrades to all future versions are included. A key can still stop working if it is revoked, and Free Access licenses depend on your broker account staying registered under our IB link."
            },
            {
                id: "account-tiers",
                question:
                    "What do the account tiers (such as 5 Accounts and Unlimited) mean?",
                answer:
                    "A tier is how many MetaTrader account numbers one license may be bound to. 5 Accounts binds to up to five MT5/MT4 account IDs, Unlimited has no cap, and Free Access is locked to a single MT5 account ID. The EA itself is identical on every tier — only the binding allowance differs."
            },
            {
                id: "unlimited-still-register",
                question:
                    "I have the Unlimited tier. Do I still need to register my MT accounts?",
                answer:
                    "Yes. Unlimited removes the cap on how many accounts you may bind, not the binding itself — the EA still verifies that the account it is running on is registered to your key. Send any new MT account IDs to {siteOwner} on Telegram and they will be added."
            },
            {
                id: "customer-portal",
                question:
                    "How does the customer portal work, and how do I add more MT accounts?",
                answer:
                    "License changes are handled directly with {siteOwner} on Telegram rather than through a self-service portal. Send your license key and the MT account IDs you want added or swapped, and your key is re-bound within your tier's allowance."
            },
            {
                id: "free-access-if-i-leave",
                question:
                    "What happens to my Free Access EA if I stop trading or move my account to a different IB?",
                answer:
                    "Free Access is granted on the basis that your broker account stays registered under our IB link. If the account is moved to another IB, closed, or stops being used, the free license can be withdrawn. If you want a license that is yours regardless of where you trade, buy a Direct License."
            },
            {
                id: "direct-license-any-broker",
                question:
                    "If I buy the Direct License, can I use it on any broker and any computer?",
                answer:
                    "Any broker, yes — a Direct License works with any broker offering XAUUSD on MetaTrader 4 or 5. Any computer, also yes: the license binds to your MT account IDs, not to a machine, so you can move between a PC and a VPS freely as long as the terminal is signed into a registered account."
            },
            {
                id: "source-code-license",
                question: "Is there a source-code license, and what does it include?",
                answer:
                    "Yes. The source-code license is a separate one-time purchase that gives you the full MQL4 (.mq4) and MQL5 (.mq5) source for {siteName} {eaVersion}, lifetime ownership of that source, the right to modify, customise and rebrand it, no license-server lock-in, and direct support from {siteOwner}. It is sold with no refund — see the Source Code section on the homepage for the current price."
            },
            {
                id: "how-do-i-pay",
                question: "How do I pay for the {siteName} license?",
                answer:
                    "Payment is in USDT on the network shown in the purchase dialog. Open a plan's Buy Now button, copy the wallet address from the dialog, send the exact amount, then confirm on Telegram with your transaction screenshot and your MT4/MT5 account IDs. Your key is issued and bound to those accounts."
            }
        ]
    },

    {
        id: "brokers-accounts",
        name: "Brokers & Accounts",
        icon: "bank",
        questions: [
            {
                id: "which-brokers",
                question: "Which brokers can I use with {siteName}?",
                answer:
                    "Any broker that offers XAUUSD on MetaTrader 4 or MetaTrader 5 will run a Direct License. Free Access is the exception — it is only available through registration under our IB link with the partner broker named in the Free Access section."
            },
            {
                id: "cent-or-standard",
                question: "Should I use a cent account or a standard account?",
                answer:
                    "Both are supported. A cent account is the practical choice for starting out: the same lot sizes represent a fraction of the money, so you can run the EA on real capital while you learn how it behaves. Move to a standard account once you are comfortable and are funding it properly."
            },
            {
                id: "capital-and-cent-safer",
                question:
                    "What capital do I need, and is a cent account safer for testing?",
                answer:
                    "The supplied presets are built around a 50K capital base, which on a cent account is a far smaller real deposit. A cent account is not safer in percentage terms — the same bad move costs the same share of the account — but it does cap the cash at risk while you test, which is why it is the usual starting point."
            },
            {
                id: "existing-broker-account",
                question: "Can I use my existing broker account instead of opening a new one?",
                answer:
                    "With a Direct License, yes — use whatever account you already have, as long as it offers XAUUSD on MT4 or MT5. Free Access cannot use an existing account, because it depends on the account being registered under our IB link from the start."
            },
            {
                id: "change-or-register-ib",
                question:
                    "I already have a broker account. How do I change or register my IB for Free Access?",
                answer:
                    "Existing accounts usually cannot be moved to a different IB after the fact — most brokers only assign the IB when the account is opened. The Free Access route is designed around registering a new account under our link. If you are unsure whether your broker allows a change, ask {siteOwner} on Telegram before opening anything."
            },
            {
                id: "account-type-leverage-swap-free",
                question:
                    "Does the EA need a specific account type, leverage, or a swap-free (Islamic) option?",
                answer:
                    "It runs on cent and standard accounts alike. Leverage matters most: the ready-made presets are tuned for 1:500 and 1:2000, so pick the preset that matches your account. Swap-free accounts work, but swap-free brokers often apply their own fees on positions held for longer — worth checking, because baskets can stay open across sessions."
            },
            {
                id: "gold-symbol-suffix",
                question:
                    "My broker uses a different Gold symbol suffix, like XAUUSDm. Will the EA still work?",
                answer:
                    "Yes. Attach the EA to your broker's own gold chart, whatever it is called — XAUUSD, XAUUSDm, GOLD or similar. The EA trades the symbol of the chart it is attached to. Just make sure it is the gold symbol you intend to trade and not a variant with different contract sizes."
            },
            {
                id: "multiple-accounts",
                question: "Can I run the EA on multiple accounts?",
                answer:
                    "Yes, up to your tier's allowance — five MT5/MT4 accounts on the 5 Accounts license, no limit on Unlimited, and a single MT5 account ID on Free Access. Each account has to be registered against your key before the EA will run on it."
            },
            {
                id: "no-cent-accounts-in-country",
                question:
                    "Cent accounts are not available with brokers in my country. What are my options?",
                answer:
                    "Run a standard account and size the capital accordingly, using the preset that matches your leverage, or test on a demo account first. A Direct License works with any broker, so you are free to choose one that does offer cent accounts. Ask on Telegram if you want the setup sanity-checked before you fund it."
            },
            {
                id: "demo-first",
                question: "Can I test {siteName} on a demo account first?",
                answer:
                    "Yes, and it is a sensible first step. A demo account shows you the entry, basket and recovery behaviour with no money at risk. Bear in mind demo spreads and fills are usually kinder than live ones, so treat it as a way to learn the mechanics rather than as a performance forecast."
            },
            {
                id: "which-account-type",
                question:
                    "Which account type should I choose — Cent Standard, Cent Raw/ECN, or others?",
                answer:
                    "Any of them will run the EA. Raw/ECN accounts have tighter spreads with a commission, standard accounts fold the cost into the spread; because the EA has a spread guard that pauses entries when spreads widen, a consistently tight spread is the more important quality. If you are undecided, start on a cent account and confirm your choice on Telegram."
            }
        ]
    },

    {
        id: "capital-risk",
        name: "Capital & Risk",
        icon: "shield",
        questions: [
            {
                id: "how-much-capital",
                question: "How much capital do I need to start {siteName}?",
                answer:
                    "The supplied presets are built around a 50K capital base, which on a cent account means a far smaller real deposit. The right figure depends on your broker, your leverage and the preset you load, so check your intended setup on Telegram before going live rather than guessing."
            },
            {
                id: "minimum-capital-cent-vs-standard",
                question:
                    "What is the minimum capital for a cent account vs a standard account?",
                answer:
                    "There is no single number — it follows from the preset and the leverage, not from a rule. Because a cent account denominates the same 50K preset base in cents, the real deposit needed is a small fraction of the standard-account equivalent. Under-funding either type is the most common cause of trouble, so confirm your figure before you start."
            },
            {
                id: "right-lot-size",
                question: "How do I choose the right lot size?",
                answer:
                    "Load the preset that matches your account's leverage and capital instead of setting lots by hand. The presets already size the starting lot against the 50K base and the grid steps that follow it. If you raise the lot size without raising capital to match, you shorten how far the account can follow a move against it."
            },
            {
                id: "is-capital-safe",
                question: "Is any amount of capital 100% safe?",
                answer:
                    "No. Trading XAUUSD involves substantial risk, past performance does not guarantee future results, and {siteName} — like any automated system — can lose money. More capital lets an account absorb a larger adverse move, but nothing makes it safe. Use only capital you can afford to lose."
            },
            {
                id: "what-leverage",
                question: "What leverage should I use?",
                answer:
                    "The ready-made preset .set files are tuned for 1:500 and 1:2000 leverage on a 50K capital base. Pick the preset that matches your account, or ask on Telegram if your broker's conditions differ. Higher leverage does not add safety — it only changes the margin required, not the size of the move against you."
            },
            {
                id: "biggest-risk",
                question: "What is the biggest risk when running {siteName}?",
                answer:
                    "A sustained one-way move in gold while a basket is open. Because positions are managed as a basket with recovery logic rather than closed at a fixed per-trade stop, exposure can grow while the market keeps going. Capital and correct position sizing are what carry the account through such a move — which is why under-funding is the single biggest risk."
            },
            {
                id: "margin-call-or-stop-out",
                question: "What causes a margin call or stop out with this EA?",
                answer:
                    "Free margin running out while a basket is still open — normally the result of too little capital for the preset in use, a lot size raised without matching capital, or an unusually long move against the basket before take profit is reached. Matching preset, leverage and capital is what prevents it."
            },
            {
                id: "capital-and-survival",
                question: "How does my capital affect whether the account survives a bad move?",
                answer:
                    "Directly. Capital determines how many grid steps the account can support before free margin runs out, so it decides how far gold can travel against an open basket before the position is closed against you. Doubling capital for the same lot settings roughly doubles the room the account has."
            },
            {
                id: "risk-around-news",
                question: "How should I manage capital and risk around high-impact news?",
                answer:
                    "High-impact releases such as NFP, CPI and FOMC bring fast moves and wider spreads. The EA's spread guard pauses new entries when spreads widen, and the session guard and start/end hour settings let you keep it out of chosen periods, but positions already open are still managed through the event. Being well funded and, if you prefer, keeping the EA out of those windows are the two practical controls."
            }
        ]
    },

    {
        id: "strategy-performance",
        name: "Strategy & Performance",
        icon: "trending",
        questions: [
            {
                id: "how-strategy-works",
                question: "How does the {siteName} strategy actually work?",
                answer:
                    "The EA places a straddle entry, then manages the resulting positions as a single basket rather than as individual trades. Take profit is calculated across the whole basket, and built-in recovery logic manages exposure as market conditions change. It repeats this cycle automatically — there is no directional prediction involved."
            },
            {
                id: "guarantee-profit",
                question: "Does {siteName} guarantee profit?",
                answer:
                    "No, and no honest EA does. Trading XAUUSD involves substantial risk and past performance does not guarantee future results. {siteName} automates a structured approach; it does not remove the possibility of loss."
            },
            {
                id: "profit-per-day",
                question: "How much profit can I make per day with the EA?",
                answer:
                    "There is no promised figure. Results depend on market conditions, your capital, your broker's spreads and the preset you run, and losing periods are part of any strategy. The EA does include a configurable daily profit target: once it is reached, no new cycles are opened for the rest of the trading day. Judge the EA on the live results shared by the community rather than on a projected daily number."
            },
            {
                id: "run-during-news",
                question:
                    "Should I keep the EA running during high-impact news like NFP, CPI, or FOMC?",
                answer:
                    "That is your call. The spread guard already pauses new entries when spreads widen, which covers much of the disruption around a release, and the session guard and start/end hour settings let you exclude specific windows. Many users leave it running and rely on capital; more cautious users keep it out of the largest releases. Either way, baskets already open continue to be managed."
            },
            {
                id: "live-results-or-backtest",
                question: "Can I see live results or run a backtest before deciding?",
                answer:
                    "Both. Live account updates, user feedback and trading results shared by the community are linked from the Live Results section on the homepage, and you can run your own backtest in the MetaTrader Strategy Tester. A demo account is the third option if you would rather watch it work forward in real time."
            },
            {
                id: "floating-positions",
                question:
                    "Why does the EA sometimes hold floating (losing) positions instead of closing them?",
                answer:
                    "Because it manages a basket, not individual trades. Take profit is calculated across the whole basket, so an individual position showing a loss is normal and expected while the cycle is still open — the EA is waiting for the basket as a whole to reach its target, with recovery logic managing exposure meanwhile. This is also why capital matters: the account has to be able to carry that floating position."
            },
            {
                id: "withdraw-profit",
                question:
                    "How do I withdraw my profit, and how long should I leave the EA running?",
                answer:
                    "Withdrawals are made through your broker, not the EA. The practical rule is to withdraw between cycles rather than mid-basket, because taking money out while a basket is open reduces the free margin the basket depends on. There is no fixed run time — most users leave the EA running continuously and review results over weeks rather than days."
            },
            {
                id: "martingale-and-lot-scaling",
                question:
                    "Does {siteName} use martingale, and how do lot sizes scale in the grid?",
                answer:
                    "The EA uses grid recovery, and how the lots progress through the grid is set by the preset you load rather than fixed in the EA. That is exactly why the preset, your leverage and your capital have to match: the scaling determines how much margin later grid steps consume. Load a preset built for your account rather than editing the scaling by hand."
            },
            {
                id: "can-i-backtest",
                question: "Can I backtest {siteName}?",
                answer:
                    "Yes, in the MetaTrader Strategy Tester with your license key entered and the whitelist URL already allowed. Use real-tick data and your broker's own spreads for anything meaningful — a backtest on ideal spreads will flatter a strategy that has a spread guard and holds baskets across sessions."
            }
        ]
    },

    {
        id: "setup-installation",
        name: "Setup & Installation",
        icon: "gear",
        questions: [
            {
                id: "download-the-file",
                question: "How do I download the {siteName} file?",
                answer:
                    "From the Downloads section on the homepage. There are two builds — {eaVersion} for MetaTrader 5 and the matching MetaTrader 4 build — and you take whichever matches your terminal. A license key is required at runtime, so download the file and have your key ready before attaching it."
            },
            {
                id: "install-on-mt4-mt5",
                question: "How do I install {siteName} on MT4 or MT5?",
                answer:
                    "Download the build for your platform, drop the .ex4 or .ex5 file into your terminal's Experts folder, restart MetaTrader, then attach the EA to an XAUUSD chart and enter your license key. In the terminal it is File → Open Data Folder → MQL4 or MQL5 → Experts."
            },
            {
                id: "chart-timeframe-and-key",
                question:
                    "Which chart and timeframe should I use, and do I enter the license key?",
                answer:
                    "Attach the EA to your broker's XAUUSD chart and enter the license key in the EA's inputs — it is required at runtime. The strategy is driven by its own logic rather than by the chart's timeframe, so use the timeframe your preset specifies and leave it alone. One chart per account is enough; the EA manages the whole basket from there."
            },
            {
                id: "enable-autotrading",
                question: "How do I enable AutoTrading and Allow Algo Trading?",
                answer:
                    "Click the AutoTrading (MT5) or Expert Advisors (MT4) button in the terminal toolbar so it turns green, and tick \"Allow Algo Trading\" in the EA's own properties dialog when you attach it. If the chart shows a sad face rather than a smiley, one of those two is still off."
            },
            {
                id: "webrequest-prompt",
                question: "The EA asks me to allow a WebRequest URL. What do I do?",
                answer:
                    "Allow it — the EA verifies your license online and MetaTrader blocks outbound requests by default. Go to Tools → Options → Expert Advisors, tick \"Allow WebRequest for listed URL\", add the domain shown in the Downloads section, and click OK. This is done once per terminal."
            },
            {
                id: "change-settings-or-defaults",
                question: "Do I need to change any settings, or just use the defaults?",
                answer:
                    "Load a preset rather than relying on the defaults. The presets are tuned to a 50K capital base at 1:500 and 1:2000 leverage, so they already match lot sizing and grid behaviour to a real account. The defaults are a starting point, not a configuration for live trading."
            },
            {
                id: "load-a-preset",
                question: "How do I load a preset or set file?",
                answer:
                    "Save the .set file into your terminal's MQL4/Presets or MQL5/Presets folder, then in the EA's properties dialog click Load, choose the file, and click OK. Check afterwards that the inputs shown match the preset you intended to load."
            },
            {
                id: "presets-vs-defaults-and-chart-open",
                question:
                    "What is the difference between the website presets and the default settings, and do I need to keep the chart open?",
                answer:
                    "The website presets are ready-made 50K capital configurations for every pair, tuned for MT4 and MT5 at 1:500 and 1:2000 leverage; the defaults are generic starting values that are not matched to your account. And yes — the chart must stay open and the terminal must stay running, because the EA only manages trades while it is attached and live. That is the reason a VPS is recommended."
            },
            {
                id: "session-guard",
                question:
                    "How do the session guard and start/end hour settings affect open trades?",
                answer:
                    "They control when the EA may open new entries, not when it abandons existing ones. Outside the permitted window no new cycle starts, but any basket already open continues to be managed through to its take profit. {siteName} also pauses new entries around unstable rollover periods for the same reason."
            },
            {
                id: "spread-guard",
                question: "What is the spread guard, and why does a high spread stop trades?",
                answer:
                    "The spread guard stops the EA opening entries while your broker's spread is wider than the configured limit. A wide spread means every position starts further underwater and the basket needs a larger move to reach take profit, so entering is worse value. Spreads widen around news and at rollover; when they come back in, the EA resumes on its own."
            },
            {
                id: "where-to-get-presets",
                question: "Where do I get or download the preset (.set) files?",
                answer:
                    "From the preset link in the Downloads section on the homepage — ready-made 50K capital presets for every pair, tuned for MT4 and MT5 at 1:500 and 1:2000 leverage. If none of them matches your broker's conditions, ask {siteOwner} on Telegram."
            }
        ]
    },

    {
        id: "vps-running",
        name: "VPS & Running 24/5",
        icon: "server",
        questions: [
            {
                id: "do-i-need-a-vps",
                question: "Do I need a VPS to run {siteName}?",
                answer:
                    "Not strictly, but it is strongly recommended. The EA only manages trades while the terminal is running, so anything that interrupts your machine interrupts an open basket. {siteName} is VPS friendly and a VPS keeps it online even when your own computer is off."
            },
            {
                id: "own-pc-instead",
                question: "Can I run {siteName} on my own PC or laptop instead of a VPS?",
                answer:
                    "Yes, and it works exactly the same — but the PC has to stay on, awake and connected for as long as a basket is open. A laptop that sleeps when the lid closes, or a home connection that drops overnight, will leave positions unmanaged. That is the trade-off a VPS removes."
            },
            {
                id: "pc-off-or-offline",
                question: "What happens if my PC is off, asleep, or loses internet?",
                answer:
                    "The EA stops managing trades for as long as the terminal is not running. Positions already open stay open at your broker — they are not closed — but no new entries are placed and no basket take profit is managed until the terminal is back. When it reconnects the EA picks the basket up again."
            },
            {
                id: "choose-a-vps",
                question: "How do I choose a good VPS, and does latency matter?",
                answer:
                    "Look for a Windows VPS with enough RAM for the number of terminals you plan to run, uptime you can rely on, and a location near your broker's trade servers. Latency matters in the ordinary sense — lower is better for fills — but this is not a scalping strategy that lives or dies on milliseconds. Reliability matters far more than the last few milliseconds."
            },
            {
                id: "multiple-terminals-one-vps",
                question: "Can one VPS run multiple MetaTrader accounts at the same time?",
                answer:
                    "Yes. Run a separate terminal instance per account, each with the EA attached to its own XAUUSD chart, as long as every account is registered against your license. Size the VPS for the number of terminals — each one takes its own memory."
            },
            {
                id: "weekends-and-closed-market",
                question: "What happens on weekends or when the Gold market is closed?",
                answer:
                    "Nothing trades while the market is closed. The EA stays attached and simply has no ticks to act on; anything open when the market closed is still there when it reopens. Leave the terminal and VPS running so the EA is live for the open rather than restarting into an existing basket."
            },
            {
                id: "which-vps-recommended",
                question: "Which VPS do you recommend?",
                answer:
                    "There is no single provider tied to {siteName} — any reliable Windows VPS with good uptime and a location near your broker's servers will do, and many brokers offer their own VPS to funded accounts. If you would like a recommendation for your broker and region, ask {siteOwner} on Telegram."
            }
        ]
    },

    {
        id: "troubleshooting-support",
        name: "Troubleshooting & Support",
        icon: "lifebuoy",
        questions: [
            {
                id: "not-opening-trades",
                question: "My EA is on but it is not opening any trades. What should I check?",
                answer:
                    "Work through it in order: is AutoTrading on and does the chart show a smiley rather than a sad face; is the license key accepted; is the WebRequest URL whitelisted; is the spread currently wider than the spread guard allows; are you inside the session guard's permitted hours; and is the market actually open? Most quiet EAs are one of those six, and the chart usually says which."
            },
            {
                id: "invalid-license-key",
                question: "The EA shows \"Invalid license key\" on the chart. How do I fix it?",
                answer:
                    "Re-enter the key exactly as issued — no leading or trailing spaces — and confirm the terminal is signed into an MT account registered against it. If it still fails, the whitelist URL may be missing so the EA cannot verify at all. Send the on-chart message and your account ID to {siteOwner} on Telegram if it persists."
            },
            {
                id: "license-expired-or-revoked",
                question:
                    "The chart says \"License EXPIRED\" or \"License REVOKED\". What does that mean?",
                answer:
                    "The key is no longer valid for that account. Direct licenses are lifetime, so this normally points to a Free Access license whose broker account is no longer registered under our IB link, or to a key withdrawn for the terms it was issued under. Message {siteOwner} on Telegram with your key and account ID to find out which."
            },
            {
                id: "bound-to-different-account",
                question:
                    "The EA says \"This license is bound to a different MT account\". How do I fix it?",
                answer:
                    "The terminal is signed into an account that is not among those your key is bound to. Either switch to a registered account, or send {siteOwner} the current and new account IDs on Telegram and the key will be re-bound within your tier's allowance."
            },
            {
                id: "not-yet-bound",
                question:
                    "The EA says \"This license is not yet bound to any MT account\". What do I do?",
                answer:
                    "The key exists but no account has been registered against it yet. Send your MT4/MT5 account ID to {siteOwner} on Telegram and it will be bound; the EA picks it up on the next verification without any reinstallation."
            },
            {
                id: "cannot-reach-license-server",
                question: "The EA shows it cannot reach the license server. What causes this?",
                answer:
                    "The terminal cannot make the outbound request. Nearly always that is the WebRequest whitelist — the URL has not been added, or was added to a different terminal. Otherwise check the VPS or machine's internet connection, and any firewall or antivirus blocking MetaTrader."
            },
            {
                id: "allow-webrequest",
                question: "How do I allow WebRequest so the EA can verify the license?",
                answer:
                    "In MetaTrader: Tools → Options → Expert Advisors → tick \"Allow WebRequest for listed URL\" → add the domain shown in the Downloads section → OK. It is required once per terminal, so a new VPS or a fresh MetaTrader install needs it again."
            },
            {
                id: "updated-version-and-support",
                question:
                    "I just updated to a new EA version. What should I do, and how do I get support?",
                answer:
                    "Close the old chart, replace the file in your Experts folder, restart MetaTrader, then re-attach the EA and load your preset again — settings do not carry across on their own. Your existing key still works, since free upgrades to all future versions are included. Support runs through Telegram direct with {siteOwner}, with priority replies on the 5 Accounts and Unlimited tiers."
            }
        ]
    }
];

/**
 * The questions offered as one-tap chips under the hero search.
 *
 * Each entry is a "<categoryId>/<questionId>" pair so a question can be
 * promoted or demoted here without touching the question itself. An id
 * that no longer exists is skipped rather than throwing.
 */
export const faqPopularQuestionIds = [
    "pricing-licensing/direct-license-vs-free-access",
    "capital-risk/how-much-capital",
    "setup-installation/download-the-file",
    "vps-running/do-i-need-a-vps",
    "troubleshooting-support/not-opening-trades",
    "brokers-accounts/cent-or-standard"
];


/* ----------------------------------------------------------------------
 * HOMEPAGE FAQ COLLECTION
 * ----------------------------------------------------------------------
 * The 24 approved questions and answers the homepage FAQ section shows,
 * in their original wording. They live here — not in faq-index-page.js —
 * so every piece of FAQ text on the site is in this one file.
 *
 * This is deliberately a SEPARATE collection from `faqPageContent` above:
 *
 *   • The full FAQ page renders `faqPageContent` and only that, so its 72
 *     answers, its per-category badges and its hero total keep matching
 *     the mockup exactly. Nothing in this collection appears on that page,
 *     which is why the two sets' near-duplicate questions never show up
 *     side by side.
 *
 *   • The two sets were approved separately. The homepage copy is short
 *     and introductory; the FAQ page copy is longer and more detailed.
 *     Keeping them independent means editing one never silently rewrites
 *     the other. Where an entry here happens to share its answer with an
 *     FAQ-page entry, that is a coincidence of wording, not a link.
 *
 * Entries are referenced as "homepage/<questionId>". faq-index-page.js
 * decides which of them appear under which homepage filter pill and in
 * what order; it holds no text of its own.
 *
 * The tokens {siteName}, {siteOwner} and {eaVersion} work here exactly as
 * they do above.
 * -------------------------------------------------------------------- */
export const homepageFaqContent = {
    id: "homepage",
    name: "Homepage FAQ",
    questions: [
        // Basics
        {
            id: "what-is-goldtrap",
            question: "What is {siteName}?",
            answer:
                "{siteName} is an Expert Advisor for MetaTrader 4 and MetaTrader 5, built specifically for XAUUSD (Gold) trading. It uses a straddle-entry strategy, grid recovery, basket take profit, license binding, and strict risk control to manage trades automatically according to your configured settings."
        },
        {
            id: "who-is-it-for",
            question: "Who is {siteName} for?",
            answer:
                "{siteName} is designed for traders who prefer consistency over manual execution. It suits both newer traders who want a structured, rules-based approach and experienced traders who want to automate gold trading across one or more accounts."
        },
        {
            id: "mt4-and-mt5",
            question: "Can {siteName} be used on MT4 and MT5?",
            answer:
                "Yes. {siteName} ships as a compiled .ex4 file for MetaTrader 4 and a compiled .ex5 file for MetaTrader 5. Your licence covers both platforms, so you can install whichever build matches your terminal."
        },
        {
            id: "run-on-mobile",
            question: "Can I run {siteName} on a mobile phone?",
            answer:
                "No. The MetaTrader mobile apps cannot run Expert Advisors. {siteName} must run inside a desktop MetaTrader terminal, which is why most users run it on a VPS so it stays online around the clock."
        },
        {
            id: "which-pair",
            question: "Which pair does {siteName} trade?",
            answer:
                "{siteName} is optimised for XAUUSD (Gold). Its entry logic, recovery behaviour and risk defaults are tuned specifically for the way gold moves, so running it on other symbols is not recommended."
        },
        {
            id: "what-strategy",
            question: "What strategy does {siteName} use?",
            answer:
                "The EA places a straddle entry, then manages the resulting positions as a single basket rather than as individual trades. Take profit is calculated across the whole basket, and built-in recovery logic manages exposure as market conditions change. It repeats this cycle automatically — there is no directional prediction involved."
        },

        // Account & Broker
        {
            id: "any-broker",
            question: "Can I use {siteName} with any broker?",
            answer:
                "Yes. The paid licences work with any broker that offers XAUUSD on MetaTrader 4 or MetaTrader 5. The free option is the exception — it is only available through registration under our IB link."
        },
        {
            id: "cent-and-standard",
            question: "Does {siteName} work on cent and standard accounts?",
            answer:
                "Yes. {siteName} runs on both cent and standard accounts. Cent accounts are a practical way to run the EA with smaller real capital while you get familiar with how it behaves."
        },
        {
            id: "accounts-per-licence",
            question: "How many accounts does each licence cover?",
            answer:
                "The 5 Accounts licence binds to up to five MT4/MT5 account numbers. The Unlimited licence has no account limit. The free option is locked to one MT5 account ID only."
        },
        {
            id: "licence-binding",
            question: "How is my licence bound to my account?",
            answer:
                "Your licence is tied to the MT4/MT5 account IDs you submit. The EA verifies the licence online at runtime, which is why the whitelist URL has to be added to your terminal once per installation."
        },
        {
            id: "move-licence",
            question: "Can I move my licence to a different account?",
            answer:
                "Yes. Message {siteOwner} on Telegram with your current and new account IDs and your licence will be re-bound. You stay within the account allowance of the plan you purchased."
        },
        {
            id: "what-leverage",
            question: "What leverage should I use?",
            answer:
                "The ready-made preset .set files are tuned for 1:500 and 1:2000 leverage on a 50K capital base. Pick the preset that matches your account, or ask on Telegram if your broker's conditions differ."
        },

        // Capital & Risk
        {
            id: "how-much-capital",
            question: "How much capital do I need to start?",
            answer:
                "The supplied presets are built around a 50K capital base, which on a cent account means a far smaller real deposit. The right figure depends on your broker, leverage and chosen preset — check on Telegram before going live."
        },
        {
            id: "can-it-lose-money",
            question: "Can {siteName} lose money?",
            answer:
                "Yes. Trading XAUUSD involves substantial risk and past performance does not guarantee future results. The EA, like any automated system, can lose money. Use only capital you can afford to lose."
        },
        {
            id: "risk-controls",
            question: "What risk controls are built in?",
            answer:
                "{siteName} includes built-in risk management features, a configurable daily profit target, basket-level take profit, and a trading pause that stops new entries during unstable rollover periods while continuing to manage positions that are already open."
        },
        {
            id: "stop-loss",
            question: "Does the EA use a stop loss?",
            answer:
                "Positions are managed as a basket rather than individually, so exits are driven by basket-level take profit and the built-in recovery logic instead of a conventional per-trade stop. Position sizing and account capital are therefore your primary risk controls."
        },
        {
            id: "daily-profit-target",
            question: "What is the daily profit target option?",
            answer:
                "You can set a daily profit target in the EA's inputs. Once the target is reached, the EA stops opening new cycles for the rest of the trading day and resumes on the next session."
        },
        {
            id: "refund",
            question: "Is there a refund if I change my mind?",
            answer:
                "Licences and the source code are sold as one-time payments with no refund. If you are unsure whether {siteName} fits your setup, start with the free option or ask your questions on Telegram first."
        },

        // Setup & Help
        {
            id: "how-to-install",
            question: "How do I install {siteName}?",
            answer:
                "Download the build for your platform, drop the .ex4 or .ex5 file into your terminal's Experts folder, restart MetaTrader, then attach the EA to an XAUUSD chart and enter your licence key."
        },
        {
            id: "whitelist-url",
            question: "Why do I need to add a URL to the MetaTrader whitelist?",
            answer:
                "The EA verifies your licence online. MetaTrader blocks outbound web requests by default, so the licence URL has to be allowed once per terminal: Tools → Options → Expert Advisors → tick \"Allow WebRequest for listed URL\" → add the domain → OK."
        },
        {
            id: "licence-key",
            question: "Where do I get my licence key?",
            answer:
                "After payment, send your transaction screenshot and your MT4/MT5 account IDs to {siteOwner} on Telegram. Your licence key is issued and bound to those accounts."
        },
        {
            id: "preset-files",
            question: "Do I need preset .set files?",
            answer:
                "They are optional but recommended. Ready-made 50K capital presets are available for every pair, tuned for MT4 and MT5 at 1:500 and 1:2000 leverage, so you can load a tested configuration instead of setting every input by hand."
        },
        {
            id: "need-a-vps",
            question: "Do I need a VPS?",
            answer:
                "A VPS is strongly recommended. {siteName} is VPS friendly and only manages trades while the terminal is running, so a VPS keeps it online even when your own computer is off."
        },
        {
            id: "get-support",
            question: "How do I get support?",
            answer:
                "Support runs through Telegram, direct with {siteOwner}. The 5 Accounts and Unlimited licences both include priority reply, and source-code buyers get direct support on integration and customisation."
        }
    ]
};

/* ======================================================================
 * LOOKUP HELPERS
 * ======================================================================
 * This file is the canonical FAQ database for the whole site. The full FAQ
 * page renders `faqPageContent` directly; the homepage picks entries out of
 * `homepageFaqContent` through `faq-index-page.js`. These helpers are what
 * that selection is built on.
 *
 * A "ref" is the stable pair that identifies one question anywhere on the
 * site:
 *
 *     "<categoryId>/<questionId>"      e.g. "getting-started/mt4-or-mt5"
 *     "homepage/<questionId>"          e.g. "homepage/what-is-goldtrap"
 *
 * `getCategoryById` and `getQuestionByRef` resolve across both collections,
 * so a caller only ever needs the ref. `getAllQuestions` and
 * `getQuestionCount` describe the FAQ page's 72 entries only — they back
 * the page's hero total and badges, which must not count homepage copy.
 *
 * Deliberately small — resolving a reference is all any caller needs.
 * ====================================================================== */

/**
 * Every addressable collection: the FAQ page's categories, plus the
 * homepage collection. Kept private so callers go through a ref.
 */
const allCollections = [...faqPageContent, homepageFaqContent];

/** @returns {object|null} one category, or null when the id is unknown. */
export function getCategoryById(categoryId) {
    return (
        allCollections.find((category) => category.id === categoryId) || null
    );
}

/** @returns {Array<object>} the homepage collection's entries, in file order. */
export function getHomepageQuestions() {
    return homepageFaqContent.questions.map((question) => ({
        ...question,
        ref: `${homepageFaqContent.id}/${question.id}`
    }));
}

/** @returns {object|null} one question, or null when either id is unknown. */
export function getQuestionById(categoryId, questionId) {
    const category = getCategoryById(categoryId);
    if (!category) {
        return null;
    }
    return category.questions.find((entry) => entry.id === questionId) || null;
}

/**
 * Resolves a "<categoryId>/<questionId>" reference.
 *
 * Returns null rather than throwing, so one stale reference in a featured
 * list can be skipped instead of taking a page down with it.
 *
 * @param {string} ref
 * @returns {{category: object, question: object}|null}
 */
export function getQuestionByRef(ref) {
    const [categoryId, questionId] = String(ref).split("/");
    const category = getCategoryById(categoryId);
    const question = getQuestionById(categoryId, questionId);
    return category && question ? { category, question } : null;
}

/**
 * Every FAQ-page question, flattened, each carrying its category and ref.
 * The homepage collection is not included — see getHomepageQuestions().
 */
export function getAllQuestions() {
    return faqPageContent.flatMap((category) =>
        category.questions.map((question) => ({
            ...question,
            ref: `${category.id}/${question.id}`,
            categoryId: category.id,
            categoryName: category.name
        }))
    );
}

/** Number of questions on the full FAQ page — never hard-code this. */
export function getQuestionCount() {
    return faqPageContent.reduce(
        (total, category) => total + category.questions.length,
        0
    );
}
