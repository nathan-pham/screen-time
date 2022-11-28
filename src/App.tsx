import useCounterData from "./hooks/useCounterData";

import CounterGraph from "./components/CounterGraph";
import Header from "./components/Header";
import CounterLinks from "./components/CounterLinks";

function App() {
    const counterData = useCounterData();

    return (
        <>
            <Header />
            <CounterGraph counterData={counterData} />
            <CounterLinks counterData={counterData} />
        </>
    );
}

export default App;
