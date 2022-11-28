import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { ClassifierLabels } from "../extension/Classifier";
import useCounterData from "../hooks/useCounterData";
import styles from "./CounterGraph.module.css";
import { formatDistance } from "date-fns";

Chart.register(...registerables);

const parseCounterData = (counterData: ReturnType<typeof useCounterData>) => {
    const parsedData: Partial<Record<ClassifierLabels, number>> = {};
    for (const [_, data] of Object.entries(counterData)) {
        const [label, minutesSpent] = data;
        parsedData[label] = (parsedData[label] || 0) + minutesSpent;
    }

    return parsedData;
};

const CounterGraph = () => {
    const counterData = useCounterData();
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
                                    (parseInt(item.formattedValue) / 60) * 1000
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
