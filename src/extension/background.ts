import browser from "webextension-polyfill";
import Counter from "./Counter";

chrome.runtime.onInstalled.addListener(() => {
    console.log("Installed service worker");

    // rountinely check all current tabs and save them into memory
    setInterval(async () => {
        const tabs = await browser.tabs.query({
            currentWindow: true,
            active: true,
        });

        const counter = new Counter();
        counter.update(tabs);
    }, Counter.SAVE_TIME_INTERVAL);
});
