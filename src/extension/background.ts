import browser from "webextension-polyfill";
import Counter from "./Counter";

const syncTabs = async () => {
    const tabs = await browser.tabs.query({});
    const counter = new Counter();
    counter.update(tabs);
};

chrome.runtime.onInstalled.addListener(() => {
    console.log("Installed service worker");

    // rountinely check all current tabs and save them into memory
    setInterval(syncTabs, Counter.SAVE_TIME_INTERVAL);
    syncTabs();
});
