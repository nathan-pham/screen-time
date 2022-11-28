import { useState } from "react";
import useCounterData from "../hooks/useCounterData";
import CounterLink from "./CounterLink";

import styles from "./CounterLinks.module.css";

interface CounterLinksProps {
    counterData: ReturnType<typeof useCounterData>;
}

const CounterLinks = ({ counterData }: CounterLinksProps) => {
    const showIncrement = 5;
    const [show, setShow] = useState(showIncrement);
    const maxMinutes = Object.values(counterData).reduce(
        (acc, curr) => acc + curr[1],
        0
    );

    return (
        <div className={styles.wrapper}>
            {Object.entries(counterData)
                // sort by minutes
                .sort((a, b) => b[1][1] - a[1][1])
                .slice(0, show)
                .map(([hostname, data]) => (
                    <CounterLink
                        key={hostname}
                        hostname={hostname}
                        minutes={data[1]}
                        maxMinutes={maxMinutes}
                    />
                ))}

            {show < Object.keys(counterData).length && (
                <button
                    onClick={() => setShow(show + showIncrement)}
                    className={styles.button}
                >
                    Show More
                </button>
            )}
        </div>
    );
};

export default CounterLinks;
