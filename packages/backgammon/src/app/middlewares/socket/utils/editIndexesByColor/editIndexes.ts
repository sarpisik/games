import { default as INDEXES } from './indexes';

export default function editIndexes<P>(
    payload: { [K in keyof P]: P[K] },
    keys: (keyof P)[]
) {
    keys.forEach((key) => {
        // @ts-ignore
        payload[key] = mapOutIndex(payload[key]);
    });
    return payload;
}

function mapOutIndex(i: number) {
    return INDEXES[i];
}
