import useCounterData from "./hooks/useCounterData";

function App() {
    const counterData = useCounterData();

    return (
        <>
            <h1>
                <img src="/icons/favicon-32x32.png" /> Screen Time
            </h1>
            <p>Time management made simple.</p>
            <pre>{JSON.stringify(counterData, null, 2)}</pre>
        </>
    );
}

export default App;
