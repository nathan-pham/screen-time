import browser from "webextension-polyfill";
import { entertainment, productivity } from "./classes";

export enum ClassifierLabels {
    Entertainment = 0,
    Productivity = 1,
    Other = 2,
}

export default class Classifier {
    static WEBSITE_API =
        "https://website-classifier.phamn23.repl.co/api/predict";

    static async classifyWebsite(tabId: number) {
        const content = await Classifier.retrieveWebsiteContent(tabId);
        const label = await Classifier.classify(content);
        return label;
    }

    static stripContent(content: string) {
        return content
            .trim()
            .toLowerCase()
            .replace(/[^\w\s\']|_/g, "")
            .replace(/\s+/g, " ");
    }

    static async retrieveWebsiteContent(tabId: number) {
        const results = await browser.scripting.executeScript({
            target: { tabId, allFrames: true },
            func: () => {
                // method 1: get meta data
                const targets = ["title", "description", "keywords"];
                const matchesTarget = (prop?: string | null) => {
                    if (!prop) return false;

                    for (const target of targets) {
                        if (prop === target || prop.includes(target)) {
                            return true;
                        }
                    }

                    return false;
                };

                const title =
                    document.querySelector("title")?.textContent || "";

                const metadata = [...document.querySelectorAll("meta")]
                    .filter(
                        (data) =>
                            matchesTarget(data.getAttribute("name")) ||
                            matchesTarget(data.getAttribute("property"))
                    )
                    .map((data) => data.getAttribute("content"))
                    .filter((data) => data)
                    .join(" ");

                // method 2: get all page text content
                const nodes = [
                    ...document.querySelectorAll("p,h1,h2,h3,h4,h5,ul"),
                ]
                    .map((el) => el.textContent)
                    .join(" ");

                return `${title} ${metadata} ${nodes}`;
            },
        });

        return Classifier.stripContent(results[0].result);
    }

    static async classify(content: string) {
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
