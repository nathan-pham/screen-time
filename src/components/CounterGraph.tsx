import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import useCounterData from "../hooks/useCounterData";

Chart.register(...registerables);

const CounterGraph = () => {
    const counterData = useCounterData();
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        // no counter data, exit early
        const canvas = canvasRef.current;
        if (Object.keys(counterData).length === 0 || !canvas) return;

        new Chart(canvas, {
            type: "doughnut",
            data: {
                labels: Object.keys(counterData),
                datasets: [
                    {
                        label: "Screen Time Dataset",
                        data: Object.values(counterData),
                        // backgroundColor: [
                        //     "rgb(255, 99, 132)",
                        //     "rgb(54, 162, 235)",
                        //     "rgb(255, 205, 86)",
                        // ],
                        hoverOffset: 4,
                    },
                ],
            },
        });
    }, [counterData]);

    return (
        <div>
            <canvas ref={canvasRef}></canvas>
        </div>
    );
};

export default CounterGraph;
