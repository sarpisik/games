export default function customPromiseIncludes<Item>(
    items: Params<Item>['items'],
    cb: Params<Item>['cb']
) {
    return new Promise<boolean>((resolve, reject) => {
        recursivelyCustomPromiseIncludes({ items, cb, resolve }).catch(reject);
    });
}

interface Params<Item> {
    items: Item[];
    cb: Item | ((item: Item) => boolean);
    resolve: (index: boolean) => void;
    i?: number;
}

async function recursivelyCustomPromiseIncludes<Item>(params: Params<Item>) {
    const { items, cb, resolve, i = 0 } = params;

    if (i >= items.length) {
        resolve(false);
    } else {
        const item = items[i];

        const include = functionType(cb) ? cb(item) : item === cb;

        if (include) {
            resolve(true);
        } else {
            params.i = i + 1;

            setImmediate(() => {
                recursivelyCustomPromiseIncludes(params);
            });
        }
    }
}

function functionType<Item>(
    tested: Params<Item>['cb']
): tested is (item: Item) => boolean {
    return typeof tested === 'function';
}
