import useCounterData from "../hooks/useCounterData";
import { ClassifierLabels } from "../extension/Classifier";

const getLabel = (value: number) =>
    Object.entries(ClassifierLabels).filter((item) => item[1] === value)[0][0];

const parseCounterData = (counterData: ReturnType<typeof useCounterData>) => {
    const parsedData: Record<string, number> = {};
    for (const [_, data] of Object.entries(counterData)) {
        const [labelId, minutesSpent] = data;
        const label = getLabel(labelId);
        parsedData[label] =
            (parsedData.hasOwnProperty(label) ? parsedData[label] : 0) +
            minutesSpent;
    }

    return parsedData;
};

export default parseCounterData;
