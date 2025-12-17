export const throttle = <T, A extends Array<T>>(
    fn: (...args: A) => unknown,
    delayMs: number
) => {
    let timeout: number | null = null;
    let lastArgs: A | null = null;

    const wrapper = (...args: A) => {
        if (timeout) {
            lastArgs = args;

            return;
        }

        fn(...args);

        timeout = setTimeout(function () {
            timeout = null;

            if (!lastArgs) return;

            wrapper(...lastArgs);

            lastArgs = null;
        }, delayMs);
    };

    return wrapper;
};