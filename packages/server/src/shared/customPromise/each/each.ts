export default function customPromiseEach<Item>(
    items: Params<Item>['items'],
    cb: Params<Item>['cb']
) {
    return new Promise((resolve, reject) => {
        recursivelyCustomPromiseEach({ items, cb, resolve }).catch(reject);
    });
}

interface Params<T> {
    items: T[];
    cb: (value: T, index: number, array: T[]) => void;
    resolve: () => void;
    i?: number;
}

async function recursivelyCustomPromiseEach<Item>(params: Params<Item>) {
    const { items, cb, resolve, i = 0 } = params;

    if (i >= items.length) {
        resolve();
    } else {
        const item = items[i];
        cb(item, i, items);
        params.i = i + 1;
        setImmediate(() => {
            recursivelyCustomPromiseEach(params);
        });
    }
}
