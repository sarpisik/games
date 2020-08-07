import { PLAYERS } from '../../../../components/Board/constants';

export type TrianglesLayout = number[][];

export default [
    // Top left.
    [PLAYERS.WHITE, 2],
    [PLAYERS.NONE, 0],
    [PLAYERS.NONE, 0],
    [PLAYERS.NONE, 0],
    [PLAYERS.NONE, 0],
    [PLAYERS.BLACK, 5],

    // Top right.

    [PLAYERS.NONE, 0],
    [PLAYERS.BLACK, 3],
    [PLAYERS.NONE, 0],
    [PLAYERS.NONE, 0],
    [PLAYERS.NONE, 0],
    [PLAYERS.WHITE, 5],

    // Bottom right.

    [PLAYERS.BLACK, 5],
    [PLAYERS.NONE, 0],
    [PLAYERS.NONE, 0],
    [PLAYERS.NONE, 0],
    [PLAYERS.WHITE, 3],
    [PLAYERS.NONE, 0],

    // Bottom left.

    [PLAYERS.WHITE, 5],
    [PLAYERS.NONE, 0],
    [PLAYERS.NONE, 0],
    [PLAYERS.NONE, 0],
    [PLAYERS.NONE, 0],
    [PLAYERS.BLACK, 2],
];
