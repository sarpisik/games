export default function customPromise<Resolve = unknown>(cb: () => Resolve) {
    return new Promise<Resolve>((resolve, reject) => {
        setImmediate(() => {
            try {
                resolve(cb());
            } catch (error) {
                reject(error);
            }
        });
    });
}
