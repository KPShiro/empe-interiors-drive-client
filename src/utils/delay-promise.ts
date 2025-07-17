export function delayPromise<T>(value: T, ms: number = 1_000): Promise<T> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(value);
        }, ms);
    });
}
