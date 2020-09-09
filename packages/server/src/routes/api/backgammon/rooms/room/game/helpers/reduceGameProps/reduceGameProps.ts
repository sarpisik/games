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

export default function reduceGameProps<
    O extends Record<Keys[number], BackgammonGame[Keys[number]]>
>(_game: O, keys = EMIT_GAME_KEYS) {
    return keys.reduce((game, key) => {
        game[key] = _game[key];
        return game;
    }, {} as O);
}
