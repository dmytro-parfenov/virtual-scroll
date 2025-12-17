import {type FC, type Key, type ReactNode, type UIEventHandler, useCallback, useMemo, useState} from "react";
import './VirtualScroll.css'

type Props = {
    itemsCount: number;
    containerHeight: number;
    itemHeight: number;
    bufferSize: number;
    itemKey: (index: number) => Key;
    renderItem: (index: number) => ReactNode;
};

export const VirtualScroll: FC<Props> = ({
                                             itemsCount,
                                             containerHeight,
                                             itemHeight,
                                             bufferSize,
                                             itemKey,
                                             renderItem
                                         }) => {
    const scrollHeight = itemsCount * itemHeight;

    const [scrollTop, setScrollTop] = useState(0);

    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - bufferSize);

    const endIndex = Math.min(itemsCount - 1, Math.floor((scrollTop + containerHeight) / itemHeight) + bufferSize);

    const items = useMemo(() => Array.from({length: itemsCount}).slice(startIndex, endIndex + 1), [itemsCount, startIndex, endIndex]);

    const handleScroll = useCallback<UIEventHandler<HTMLDivElement>>((event) => {
        const top = event.currentTarget.scrollTop;

        requestAnimationFrame(() => setScrollTop(top))
    }, []);

    return <div className="scroll-container"
                style={{height: `${containerHeight}px`}}
                onScroll={handleScroll}>
        <div className="spacer"
             style={{height: `${scrollHeight}px`}}>
            {items.map((_, index) => {
                const itemIndex = startIndex + index;
                const top = itemIndex * itemHeight;

                return <div className="item"
                            key={itemKey(itemIndex)}
                            style={{height: itemHeight, transform: `translateY(${top}px)`}}>
                    {renderItem(itemIndex)}
                </div>
            })}
        </div>
    </div>
}