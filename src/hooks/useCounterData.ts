import { useEffect, useState } from "react";
import Counter from "../extension/Counter";

const useCounterData = () => {
    /*
    {
        "11/26/2022": {
            "youtube.com": 10 (* Counter.SAVE_TIME_INTERVAL = time used in ms)
        }
    }
    */
    const [data, setData] = useState({});

    useEffect(() => {
        const counter = new Counter();
        counter.get().then((browsingData) => setData(browsingData));
    }, []);

    return data;
};

export default useCounterData;
