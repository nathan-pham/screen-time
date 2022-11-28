import browser from "webextension-polyfill";

const entertainment = [
    "Adult",
    "Games",
    "Streaming Services",
    "Social Networking and Messaging",
    "News",
];

const productivity = [
    "Business/Corporate",
    "Computers and Technology",
    "Education",
    "Food",
];

export enum ClassifierLabels {
    Entertainment = 0,
    Productivity = 1,
    Other = 2,
}

export default class Classifier {
    static WEBSITE_API =
        "https://website-classifier.phamn23.repl.co/api/predict";

    static async classifyWebsite(tabId: number) {
        const label = await Classifier.classify(
            await Classifier.retrieveWebsiteContent(tabId)
        );

        return label;
    }

    static async retrieveWebsiteContent(tabId: number) {
        const results = await browser.scripting.executeScript({
            target: { tabId, allFrames: true },
            func: () => {
                const nodes = [...document.body.children]
                    .filter((el) => {
                        const tag = el.tagName.toLowerCase();
                        const blacklist = ["script", "style"];
                        return !blacklist.includes(tag);
                    })
                    .map((el) => el.textContent);

                return nodes.join(" ");
            },
        });

        return results[0].result;
    }

    static async classify(content: string) {
        content = content
            .toLowerCase()
            .replace(/[^\w\s\']|_/g, "")
            .replace(/\s+/g, " ");

        const prediction = (
            await fetch(Classifier.WEBSITE_API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ content }),
            }).then((res) => res.json())
        ).prediction;

        // sort primary categories into simpler versions
        if (entertainment.includes(prediction)) {
            return ClassifierLabels.Entertainment;
        } else if (productivity.includes(prediction)) {
            return ClassifierLabels.Productivity;
        }

        return ClassifierLabels.Other;
    }
}
