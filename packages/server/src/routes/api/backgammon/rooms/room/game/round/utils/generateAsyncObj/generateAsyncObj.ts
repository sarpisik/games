import { customPromise } from '@shared/customPromise';

export default function generateAsyncObj<B, D, L, C = any>(
    brokens: B,
    dice: D,
    layout: L,
    collected?: C
) {
    return customPromise(() =>
        Object.assign(collectedExist(collected) ? { collected } : {}, {
            brokens,
            dice,
            layout,
        })
    );
}

function collectedExist<C>(tested?: C): tested is C {
    return typeof tested !== undefined;
}
