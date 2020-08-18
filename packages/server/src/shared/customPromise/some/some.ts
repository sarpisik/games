export default function customPromiseSome<Item>(
    items: Item[],
    cb: (item: Item) => boolean
) {
    return new Promise<boolean>((resolve, reject) => {
        recursivelyCustomPromiseSome({ items, cb, resolve }).catch(reject);
    });
}

interface ParamsSome<Item> {
    items: Item[];
    cb: (item: Item) => boolean;
    resolve: (result: boolean) => void;
    i?: number;
}

async function recursivelyCustomPromiseSome<Item>(params: ParamsSome<Item>) {
    const { items, cb, resolve, i = 0 } = params;

    if (i >= items.length) {
        resolve(false);
    } else {
        const item = items[i];

        const shouldResolved = cb(item);

        if (shouldResolved) {
            resolve(true);
        } else {
            params.i = i + 1;

            setImmediate(() => {
                recursivelyCustomPromiseSome(params);
            });
        }
    }
}
