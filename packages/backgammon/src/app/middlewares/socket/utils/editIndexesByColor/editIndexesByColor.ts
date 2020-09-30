import {
    EmitBrokenPointRound,
    EmitCollectPointRound,
    EmitRound,
} from 'types/lib/backgammon';
import editIndexes from './editIndexes';

type Payload = EmitRound | EmitBrokenPointRound | EmitCollectPointRound;

export default function editIndexesByColor(payload: Payload): Payload {
    if (payload.color !== 'BLACK') return payload;

    if (isEmitRound(payload))
        return editIndexes(payload, ['fromTriangleIndex', 'toTriangleIndex']);
    if (isEmitBrokenPointRound(payload))
        return editIndexes(payload, ['toTriangleIndex']);
    if (isEmitCollectPointRound(payload))
        return editIndexes(payload, ['fromTriangleIndex']);

    return payload;
}

function isEmitRound(payload: Payload): payload is EmitRound {
    return (
        checkKeyExist(payload, 'fromTriangleIndex') &&
        checkKeyExist(payload, 'toTriangleIndex')
    );
}
function isEmitBrokenPointRound(
    payload: Payload
): payload is EmitBrokenPointRound {
    return checkKeyExist(payload, 'toTriangleIndex');
}
function isEmitCollectPointRound(
    payload: Payload
): payload is EmitCollectPointRound {
    return checkKeyExist(payload, 'fromTriangleIndex');
}

function checkKeyExist<O extends Payload>(o: O, k: string) {
    return Object.prototype.hasOwnProperty.call(o, k);
}
