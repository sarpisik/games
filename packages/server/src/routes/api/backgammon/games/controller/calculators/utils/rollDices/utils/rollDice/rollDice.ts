export default function rollDice(max = 6) {
    return new Promise<number>((resolve) => {
        setImmediate(() => {
            // resolve(1 + Math.floor(Math.random() * max));
            resolve(1);
        });
    });
}
