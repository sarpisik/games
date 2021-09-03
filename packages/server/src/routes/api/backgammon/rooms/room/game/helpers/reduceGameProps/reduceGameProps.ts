import { EmitGame } from '@shared-types/game';
import BackgammonGame from '../../game';

const EMIT_GAME_KEYS: (keyof EmitGame)[] = [
    'duration',
    'id',
    'players',
    'rounds',
    'score',
    'stages',
    'timer',
    '_status',
];

type Keys = typeof EMIT_GAME_KEYS;
type RecordGame = Record<Keys[number], BackgammonGame[Keys[number]]>;

export default function reduceGameProps<O extends RecordGame>(
    _game: O,
    keys = EMIT_GAME_KEYS
) {
    return keys.reduce(setGameProps(_game), {} as O);
}

function setGameProps<O extends RecordGame>(_game: O) {
    return function gameProps(game: O, key: keyof O) {
        copyObjects(game, _game, key);
        return game;
    };
}

function copyObjects<O extends Record<string, unknown>>(
    obj1: O,
    obj2: O,
    key: keyof O
) {
    obj1[key] = obj2[key];
}
