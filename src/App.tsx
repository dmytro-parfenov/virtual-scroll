import './App.css'
import {VirtualScroll} from "./VirtualScroll/VirtualScroll.tsx";
import {useCallback} from "react";

function App() {
    const itemKey = useCallback((index: number) => index, []);

    const renderItem = useCallback((index: number) => index, []);

    return (
        <div>
            <VirtualScroll itemsCount={100}
                           containerHeight={400}
                           itemHeight={50}
                           bufferSize={2}
                           itemKey={itemKey}
                           renderItem={renderItem}/>
        </div>
    )
}

export default App
