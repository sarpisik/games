export default function customPromiseFilter<Item>(
    items: Params<Item>['items'],
    cb: Params<Item>['cb']
) {
    const newItems: Item[] = [];

    return new Promise<Item[]>((resolve, reject) => {
        const params: Params<Item> = { items, newItems, cb, resolve };

        recursivelyCustomPromiseFilter(params).catch(reject);
    });
}

interface Params<Item> {
    items: Item[];
    newItems: Item[];
    cb: (item: Item) => boolean;
    resolve: (newItems: Item[]) => void;
    i?: number;
}

async function recursivelyCustomPromiseFilter<Item>(params: Params<Item>) {
    const { items, newItems, cb, resolve, i = 0 } = params;

    if (i >= items.length) {
        resolve(newItems);
    } else {
        const item = items[i];

        const shouldKeep = cb(item);

        if (shouldKeep) newItems.push(item);

        params.i = i + 1;

        setImmediate(() => {
            recursivelyCustomPromiseFilter(params);
        });
    }
}
