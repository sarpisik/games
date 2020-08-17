export default function customPromiseEach<Item>(
    items: Item[],
    cb: (item: Item) => unknown
) {
    return new Promise((resolve, reject) => {
        recursivelyCustomPromiseEach({ items, cb, resolve }).catch(reject);
    });
}

interface Params<Item> {
    items: Item[];
    cb: (item: Item) => unknown;
    resolve: () => void;
    i?: number;
}

async function recursivelyCustomPromiseEach<Item>(params: Params<Item>) {
    const { items, cb, resolve, i = 0 } = params;

    if (i >= items.length) {
        resolve();
    } else {
        const item = items[i];
        cb(item);
        params.i = i + 1;
        setImmediate(() => {
            recursivelyCustomPromiseEach(params);
        });
    }
}
