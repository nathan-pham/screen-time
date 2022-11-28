import useCounterData from "../hooks/useCounterData";
import CounterLink from "./CounterLink";

interface CounterLinksProps {
    counterData: ReturnType<typeof useCounterData>;
}

const CounterLinks = ({ counterData }: CounterLinksProps) => {
    const maxMinutes = Object.values(counterData).reduce(
        (acc, curr) => acc + curr[1],
        0
    );

    return (
        <div>
            {Object.entries(counterData).map(([hostname, data]) => (
                <CounterLink
                    key={hostname}
                    hostname={hostname}
                    minutes={data[1]}
                    maxMinutes={maxMinutes}
                />
            ))}
        </div>
    );
};

export default CounterLinks;
