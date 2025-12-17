import {type FC, type Key, type ReactNode, type UIEventHandler, useMemo, useState} from "react";
import './VirtualScroll.css'
import {throttle} from "../throttle.ts";

const MIN_ITEMS_COUNT = 1;
const MIN_CONTAINER_HEIGHT = 100;
const MIN_ITEM_HEIGHT = 20;
const MIN_BUFFER_SIZE = 1;
const MIN_THROTTLE_DELAY_MS = 0;

type Props = {
    itemsCount: number;
    containerHeight: number;
    itemHeight: number;
    itemKey: (index: number) => Key;
    renderItem: (index: number) => ReactNode;
    bufferSize?: number;
    throttleDelayMs?: number;
};

export const VirtualScroll: FC<Props> = ({
                                             itemsCount,
                                             containerHeight,
                                             itemHeight,
                                             itemKey,
                                             renderItem,
                                             bufferSize = MIN_BUFFER_SIZE,
                                             throttleDelayMs = MIN_THROTTLE_DELAY_MS,
                                         }) => {
    itemsCount = Math.max(MIN_ITEMS_COUNT, itemsCount);
    containerHeight = Math.max(MIN_CONTAINER_HEIGHT, containerHeight);
    itemHeight = Math.max(MIN_ITEM_HEIGHT, Math.min(itemHeight, containerHeight));
    bufferSize = Math.max(MIN_BUFFER_SIZE, bufferSize);
    throttleDelayMs = Math.max(MIN_THROTTLE_DELAY_MS, throttleDelayMs);

    const scrollHeight = itemsCount * itemHeight;

    const [scrollTop, setScrollTop] = useState(0);

    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - bufferSize);
    const endIndex = Math.min(itemsCount - 1, Math.floor((scrollTop + containerHeight) / itemHeight) + bufferSize);

    const items = useMemo(() => Array.from({length: itemsCount}).slice(startIndex, endIndex + 1), [itemsCount, startIndex, endIndex]);

    const handleScroll = useMemo<UIEventHandler<HTMLDivElement>>(() => throttle((event) => {
        setScrollTop((event.target as HTMLDivElement).scrollTop);
    }, throttleDelayMs), [throttleDelayMs]);

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