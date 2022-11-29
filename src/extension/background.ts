import browser from "webextension-polyfill";
import Counter from "./Counter";

const syncTabs = async () => {
    const tabs = await browser.tabs.query({
        active: true,
    });

    const counter = new Counter();
    counter.update(tabs);
};

browser.runtime.onInstalled.addListener(async () => {
    console.log("Installed service worker");

    // create alarm (more reliable than setInterval)
    // https://stackoverflow.com/questions/66391018/how-do-i-call-a-function-periodically-in-a-manifest-v3-chrome-extension
    const alarmName = "periodic";
    const periodicAlarm = await browser.alarms.get(alarmName);
    if (!periodicAlarm) {
        browser.alarms.create(alarmName, {
            periodInMinutes: Counter.SYNC_INTERVAL,
        });
    }

    syncTabs();
});

browser.alarms.onAlarm.addListener(() => {
    syncTabs();
});
