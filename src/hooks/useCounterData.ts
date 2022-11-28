import { useEffect, useState } from "react";
import { ClassifierLabels } from "../extension/Classifier";
import Counter from "../extension/Counter";

const useCounterData = () => {
    const [data, setData] = useState<
        Record<string, [ClassifierLabels, number]>
    >({});

    useEffect(() => {
        const counter = new Counter();
        counter.get().then((browsingData) => setData(browsingData));
    }, []);

    return data;
};

export default useCounterData;
