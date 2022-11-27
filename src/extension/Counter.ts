import browser from "webextension-polyfill";

export default class Counter {
    static SAVE_TIME_INTERVAL = 15 * 1000;
    private currentDate: string;
    constructor() {
        this.currentDate = new Date().toLocaleDateString();
    }

    async get() {
        return (await browser.storage.local.get(this.currentDate)) || {};
    }

    async update(tabs: browser.Tabs.Tab[]) {
        const savedTime = await this.get();
        for (const tab of tabs) {
            if (tab.url) {
                const hostname = new URL(tab.url).hostname;
                savedTime[hostname] = (savedTime[hostname] || 0) + 1;
            }
        }
    }
}
