import useCounterData from "./hooks/useCounterData";

import Header from "./components/Header";
import Footer from "./components/Footer";
import CounterGraph from "./components/CounterGraph";
import CounterLinks from "./components/CounterLinks";

function App() {
    const counterData = useCounterData();

    return (
        <>
            <Header />
            {Object.keys(counterData).length === 0 ? (
                <p>No data yet. Check back later!</p>
            ) : (
                <>
                    <CounterGraph counterData={counterData} />
                    <CounterLinks counterData={counterData} />
                </>
            )}
            <Footer />
        </>
    );
}

export default App;
