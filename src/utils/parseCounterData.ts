import useCounterData from "../hooks/useCounterData";
import { ClassifierLabels } from "../extension/Classifier";

const parseCounterData = (counterData: ReturnType<typeof useCounterData>) => {
    const parsedData: Partial<Record<ClassifierLabels, number>> = {};
    for (const [_, data] of Object.entries(counterData)) {
        const [label, minutesSpent] = data;
        parsedData[label] = (parsedData[label] || 0) + minutesSpent;
    }

    return parsedData;
};

export default parseCounterData;
