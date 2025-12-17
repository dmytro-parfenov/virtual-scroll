import './App.css'
import {VirtualScroll} from "./VirtualScroll/VirtualScroll.tsx";
import {memo} from "react";

const items = Array.from({length: 1000000}).map((_, index) => ({
    key: index.toString(),
    value: `Item ${index}`
}));


const Item = memo<typeof items[0]>(({value}) => {
    return <div>{value}</div>
})

function App() {
    return (
        <div>
            <VirtualScroll items={items}
                           containerHeight={400}
                           itemHeight={50}
                           bufferSize={2}
                           ItemComponent={Item}/>
        </div>
    )
}

export default App
