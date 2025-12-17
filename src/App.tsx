import './App.css'
import {VirtualScroll} from "./VirtualScroll/VirtualScroll.tsx";
import {useCallback} from "react";

function App() {
    const itemKey = useCallback((index: number) => index, []);

    const renderItem = useCallback((index: number) => index, []);

    return (
        <div>
            <VirtualScroll itemsCount={1000}
                           containerHeight={400}
                           itemHeight={50}
                           itemKey={itemKey}
                           renderItem={renderItem}
                           bufferSize={2}
                           throttleDelayMs={100}/>
        </div>
    )
}

export default App
