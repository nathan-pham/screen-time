import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { formatDistance } from "date-fns";

import { ClassifierLabels } from "../extension/Classifier";
import parseCounterData from "../utils/parseCounterData";
import useCounterData from "../hooks/useCounterData";

import styles from "./CounterGraph.module.css";

Chart.register(...registerables);

interface CounterGraphProps {
    counterData: ReturnType<typeof useCounterData>;
}

const CounterGraph = ({ counterData }: CounterGraphProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        // no counter data, exit early
        const canvas = canvasRef.current;
        if (Object.keys(counterData).length === 0 || !canvas) return;

        const parsedData = parseCounterData(counterData);
        new Chart(canvas, {
            type: "doughnut",
            options: {
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: (item) =>
                                formatDistance(
                                    0,
                                    parseFloat(item.formattedValue) * 60 * 1000
                                ),
                        },
                    },
                    legend: {
                        align: "start",
                    },
                },
            },
            data: {
                labels: Object.values(ClassifierLabels).filter(
                    (v) => typeof v === "string"
                ),
                datasets: [
                    {
                        label: "Screen Time Dataset",
                        data: Object.values(parsedData),
                        hoverOffset: 4,
                    },
                ],
            },
        });
    }, [counterData]);

    return (
        <div className={styles.wrapper}>
            <canvas ref={canvasRef}></canvas>
        </div>
    );
};

export default CounterGraph;
