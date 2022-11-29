import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { formatDistance } from "date-fns";

import { ClassifierLabels } from "../extension/Classifier";
import parseCounterData from "../utils/parseCounterData";
import useCounterData from "../hooks/useCounterData";

import styles from "./CounterGraph.module.css";
import Counter from "../extension/Counter";

Chart.register(...registerables);

interface CounterGraphProps {
    counterData: ReturnType<typeof useCounterData>;
}

const CounterGraph = ({ counterData }: CounterGraphProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const parsedData = parseCounterData(counterData);
        new Chart(canvasRef.current!, {
            type: "doughnut",
            options: {
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: (item) =>
                                formatDistance(
                                    0,
                                    Counter.convertInterval(
                                        parseFloat(item.formattedValue)
                                    )
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
                        backgroundColor: [
                            "rgb(255, 99, 132)",
                            "rgb(54, 162, 235)",
                            "rgb(255, 205, 86)",
                        ],
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
