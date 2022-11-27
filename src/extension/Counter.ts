import browser from "webextension-polyfill";

export default class Counter {
    static SAVE_TIME_INTERVAL = 15 * 1000;

    currentDate: string;
    savedTime: Record<string, number> = {};

    constructor() {
        this.currentDate = new Date().toLocaleDateString();
    }

    /**
     * Get browsing data for current date
     * @returns Record of domain to time checked
     */
    async get() {
        return (await browser.storage.local.get(this.currentDate)) || {};
    }

    /**
     * Save new saved tiem data
     * @param savedTime - New record of domain to time checked
     */
    async sync(savedTime?: Counter["savedTime"]) {
        if (savedTime) {
            this.savedTime = savedTime;
        }

        // save changes
        chrome.storage.local.set({
            [this.currentDate]: this.savedTime,
        });
    }

    /**
     * Get all saved keys
     * @returns All domain to time checked records
     */
    static getAll() {
        return browser.storage.local.get(null);
    }

    /**
     * Increment counter
     * @param tabs - List of tabs fetched with browser.tabs.query
     */
    async update(tabs: browser.Tabs.Tab[]) {
        const savedTime = await this.get();
        const usedHostnames: Record<string, boolean> = {}; // don't count duplicate sites
        for (const tab of tabs) {
            if (tab.url) {
                const hostname = new URL(tab.url).hostname;
                if (!usedHostnames.hasOwnProperty(hostname)) {
                    savedTime[hostname] = (savedTime[hostname] || 0) + 1;
                }

                usedHostnames[hostname] = true;
            }
        }

        this.sync(savedTime);
    }
}
