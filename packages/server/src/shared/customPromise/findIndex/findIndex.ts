export default function customPromiseFindIndex<Item>(
    items: Item[],
    cb: (item: Item) => boolean
) {
    return new Promise<number>((resolve, reject) => {
        recursivelyCustomPromiseFindIndex({ items, cb, resolve }).catch(reject);
    });
}

interface Params<Item> {
    items: Item[];
    cb: (item: Item) => boolean;
    resolve: (index: number) => void;
    i?: number;
}

async function recursivelyCustomPromiseFindIndex<Item>(params: Params<Item>) {
    const { items, cb, resolve, i = 0 } = params;

    if (i >= items.length) {
        resolve(-1);
    } else {
        const item = items[i];

        const indexFound = cb(item);

        if (indexFound) {
            resolve(i);
        } else {
            params.i = i + 1;

            setImmediate(() => {
                recursivelyCustomPromiseFindIndex(params);
            });
        }
    }
}
