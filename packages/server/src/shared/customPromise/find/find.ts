export default function customPromiseFind<Item>(
    items: Item[],
    cb: (item: Item) => boolean
) {
    return new Promise<Item | undefined>((resolve, reject) => {
        recursivelyCustomPromiseFind({ items, cb, resolve }).catch(reject);
    });
}

interface ParamsFind<Item> {
    items: Item[];
    cb: (item: Item) => boolean;
    resolve: (item?: Item) => void;
    i?: number;
}

async function recursivelyCustomPromiseFind<Item>(params: ParamsFind<Item>) {
    const { items, cb, resolve, i = 0 } = params;

    if (i >= items.length) {
        resolve();
    } else {
        const item = items[i];

        const result = cb(item);

        if (result) {
            resolve(item);
        } else {
            params.i = i + 1;
            setImmediate(() => {
                recursivelyCustomPromiseFind(params);
            });
        }
    }
}
