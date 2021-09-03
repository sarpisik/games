export default function customPromiseSlice<Item>(
    items: Item[],
    start: number,
    end: number
) {
    return new Promise<Item[]>((resolve, reject) => {
        recursivelyCustomPromiseSlice({
            items,
            newItems: [],
            start,
            end,
            resolve,
        }).catch(reject);
    });
}

interface Params<Item> {
    items: Item[];
    newItems: Item[];
    start: number;
    end: number;
    resolve: (items: Item[]) => void;
}

async function recursivelyCustomPromiseSlice<Item>(params: Params<Item>) {
    const { items, newItems, start, end, resolve } = params;

    if (start >= end) {
        resolve(newItems);
    } else {
        const item = items[start];
        newItems.push(item);

        params.start = start + 1;

        setImmediate(() => {
            recursivelyCustomPromiseSlice(params);
        });
    }
}
