import { useEffect, useState } from "react";
import Counter from "../extension/Counter";

// TODO: Python bag of words model to classify websites
// - use sklearn-porter to embed model into application
// - make background execute script that obtains metadata

// enum LABELS {
//     PRODUCTIVITY = 0,
//     ENTERTAINMENT = 1,
//     OTHER = 2,
// }

const useCounterData = () => {
    /*
    {
        "11/26/2022": {
            "youtube.com": [1, 10] // (Label, 10 minutes spent)
        }
    }
    */
    const [data, setData] = useState<Record<string, number>>({});

    useEffect(() => {
        const counter = new Counter();
        counter.get().then((browsingData) => setData(browsingData));
    }, []);

    return data;
};

export default useCounterData;
