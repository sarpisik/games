export default function customPromiseMap<Item, ResolveItem = unknown>(
    items: Item[],
    cb: (item: Item) => ResolveItem
) {
    const newItems: ResolveItem[] = [];

    return new Promise<ResolveItem[]>((resolve, reject) => {
        recursivelyCustomPromiseMap({ items, newItems, cb, resolve }).catch(
            reject
        );
    });
}

interface ParamsMap<Item, ResolveItem> {
    items: Item[];
    newItems: ResolveItem[];
    cb: (item: Item) => ResolveItem;
    resolve: (newItems: ResolveItem[]) => void;
    i?: number;
}

async function recursivelyCustomPromiseMap<Item, ResolveItem>(
    params: ParamsMap<Item, ResolveItem>
) {
    const { items, newItems, cb, resolve, i = 0 } = params;

    if (i >= items.length) {
        resolve(newItems);
    } else {
        const item = items[i];
        newItems.push(cb(item));
        params.i = i + 1;

        setImmediate(() => {
            recursivelyCustomPromiseMap(params);
        });
    }
}
