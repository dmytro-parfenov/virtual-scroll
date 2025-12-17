import {type ComponentType, type UIEventHandler, useCallback, useMemo, useState} from "react";
import './VirtualScroll.css'

const MAX_SCROLL_HEIGHT = 1000000;

type WithKey = {
    key: string;
}

type Props<T extends WithKey> = {
    items: T[];
    containerHeight: number;
    itemHeight: number;
    bufferSize: number;
    ItemComponent: ComponentType<T>;
};

export const VirtualScroll = <T extends WithKey, >({
                                                       items,
                                                       containerHeight,
                                                       itemHeight,
                                                       bufferSize,
                                                       ItemComponent
                                                   }: Props<T>) => {
    const totalScrollHeight = items.length * itemHeight;

    const virtualScrollHeight = Math.min(MAX_SCROLL_HEIGHT, totalScrollHeight);

    const [virtualScrollTop, setVirtualScrollTop] = useState(0);

    const scrollScale = totalScrollHeight > virtualScrollHeight ? (totalScrollHeight - containerHeight) / (virtualScrollHeight - containerHeight) : 1;

    const startIndex = Math.max(0, Math.floor(virtualScrollTop / itemHeight) - bufferSize);

    const endIndex = Math.min(items.length - 1, Math.floor((virtualScrollTop + containerHeight) / itemHeight) + bufferSize);

    const visibleItems = useMemo(() => items.slice(startIndex, endIndex + 1), [items, startIndex, endIndex]);

    const handleScroll = useCallback<UIEventHandler<HTMLDivElement>>((event) => {
        const value = event.currentTarget.scrollTop;

        requestAnimationFrame(() => setVirtualScrollTop(value * scrollScale))
    }, [scrollScale]);

    return <div className="scroll-container"
                style={{height: `${containerHeight}px`}}
                onScroll={handleScroll}>
        <div className="spacer"
             style={{height: `${virtualScrollHeight}px`}}>
            {visibleItems.map((item, index) => {
                const virtualTop = (startIndex + index) * itemHeight;
                const top = virtualTop - (virtualScrollTop - (virtualScrollTop / scrollScale));

                return <div className="item"
                            id={item.key}
                            key={item.key}
                            style={{height: itemHeight, transform: `translateY(${top}px)`}}>
                    <ItemComponent {...item} key={item.key}/>
                </div>
            })}
        </div>
    </div>
}