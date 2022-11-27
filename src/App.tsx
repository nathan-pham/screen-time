import CounterGraph from "./components/CounterGraph";

function App() {
    return (
        <>
            <h1>
                <img src="/icons/favicon-32x32.png" /> Screen Time
            </h1>
            <p>Time management made simple.</p>
            <CounterGraph />
            {/* <pre>{JSON.stringify(counterData, null, 2)}</pre> */}
        </>
    );
}

export default App;
