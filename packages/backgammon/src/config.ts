import { PLAYERS } from 'types/lib/backgammon';

export enum ROUTES {
    HOME = '/',
    ROOMS = '/rooms',
    SIGN_OUT = '/signout',
    PROFILE = '/profile',
    GAME_DEMO = '/game-demo',
}

export const MAX_WIDTH = 0.75;

export const COLORS = {
    // frame
    BOARD_BORDER: '#663300',
    BOARD_INNER: '#B88A00',
    SIDEBAR_PLAYERS_LABEL_COLOR: '#006a4e',
    SIDEBAR_COL_1: '#ffc107',

    // triangle
    HIGHLIGHT: 'yellow',
    EVEN: '#ADAD85',
    ODD: '#FF471A',
    BORDER: '#444',
};

export const PIXEL = 0.02; // 1 square = 2 unit.

const TOP_BLOCK_START_Y = 1;
const LEFT_CONTAINER_START_X = 1;
const BOTTOM_BLOCK_START_Y = 49;
const CONTAINER_HEIGHT = 17;
const CONTAINER_WIDTH = 3;
const TRIANGLE_WIDTH = 3;
const TRIANGLE_HEIGHT = 20;
const RIGHT_BLOCK_TRIANGLE_END_X = 39 + TRIANGLE_WIDTH;
const LEFT_BLOCK_TRIANGLE_END_X = 20 + TRIANGLE_WIDTH;
const SIDEBAR_START_X = RIGHT_BLOCK_TRIANGLE_END_X + 1;
const SIDEBAR_WIDTH = 49 - SIDEBAR_START_X;
const PLAYERS_LABEL_HEIGHT = 6;
const PLAYERS_LABEL_POINT_HEIGHT = PLAYERS_LABEL_HEIGHT / 3;
const LEFT_BLOCK_START_X = 5;
const LEFT_BLOCK_END_X = 20;
const BLOCK_WIDTH = 18;
const BLOCK_HEIGHT = 48;
const RIGHT_BLOCK_START_X = 24;
export const OFFSETS = {
    /*
     *
     * OFFSETS
     *
     */

    // Y offet
    TOP_CONTAINER_START_Y: TOP_BLOCK_START_Y,
    BOTTOM_CONTAINER_START_Y: 49,
    BOTTOM_BLOCK_START_Y,

    // X offset
    LEFT_CONTAINER_START_X,
    RIGHT_CONTAINER_START_X: 46,
    RIGHT_BLOCK_END_X: 39,
    RIGHT_BLOCK_TRIANGLE_END_X,
    LEFT_BLOCK_TRIANGLE_END_X,

    /*
     *
     * SIZES
     *
     */

    // block
    BLOCKS: Array(2)
        .fill({
            x: LEFT_BLOCK_START_X,
            y: TOP_BLOCK_START_Y,
            height: BLOCK_HEIGHT,
            width: BLOCK_WIDTH,
            shadowColor: 'black',
            shadowBlur: 10,
            cornerRadius: 10,
            color: COLORS.BOARD_INNER,
        })
        .map((container, i) => ({
            ...container,
            x: i > 0 ? RIGHT_BLOCK_START_X : container.x,
        })),
    LEFT_BLOCK_END_X,
    LEFT_BLOCK_START_X,
    RIGHT_BLOCK_START_X,
    TOP_BLOCK_START_Y,

    // container
    CONTAINER_HEIGHT,
    CONTAINER_WIDTH,

    // triangle
    TRIANGLE_WIDTH,
    TRIANGLE_HEIGHT,

    // point
    POINT_SIZE: TRIANGLE_WIDTH / 2,

    // sidebar
    SIDEBAR_HEIGHT: 48,
    SIDEBAR_START_Y: TOP_BLOCK_START_Y,
    SIDEBAR_START_X,
    SIDEBAR_WIDTH,

    // player label
    PLAYER_LABELS: {
        [PLAYERS.BLACK]: {
            CONTAINER: {
                color: COLORS.SIDEBAR_PLAYERS_LABEL_COLOR,
                x: SIDEBAR_START_X,
                y: TOP_BLOCK_START_Y,
                width: SIDEBAR_WIDTH,
                height: PLAYERS_LABEL_HEIGHT,
                cornerRadius: [10, 10, 0, 0],
            },
            COL_1: {
                color: COLORS.SIDEBAR_COL_1,
                x: SIDEBAR_START_X,
                y: TOP_BLOCK_START_Y,
                width: PLAYERS_LABEL_POINT_HEIGHT,
                height: PLAYERS_LABEL_HEIGHT,
                cornerRadius: [10, 0, 0, 0],
            },
            POINT: {
                x: SIDEBAR_START_X + 0.1,
                y: TOP_BLOCK_START_Y + 0.5,
                height: PLAYERS_LABEL_POINT_HEIGHT * 0.8,
            },
            SCORE: {
                x: SIDEBAR_START_X,
                y: TOP_BLOCK_START_Y + PLAYERS_LABEL_POINT_HEIGHT,
                width: PLAYERS_LABEL_POINT_HEIGHT,
                height: PLAYERS_LABEL_HEIGHT - PLAYERS_LABEL_POINT_HEIGHT,
            },
            NAME: {
                offsetY: TOP_BLOCK_START_Y * -1,
                x: SIDEBAR_START_X + PLAYERS_LABEL_POINT_HEIGHT,
                y: TOP_BLOCK_START_Y,
                height: PLAYERS_LABEL_HEIGHT,
            },
        },
        [PLAYERS.WHITE]: {
            CONTAINER: {
                color: COLORS.SIDEBAR_PLAYERS_LABEL_COLOR,
                x: SIDEBAR_START_X,
                y:
                    PLAYERS_LABEL_HEIGHT +
                    (BOTTOM_BLOCK_START_Y - PLAYERS_LABEL_HEIGHT * 2),
                width: SIDEBAR_WIDTH,
                height: PLAYERS_LABEL_HEIGHT,
                cornerRadius: [0, 0, 10, 10],
            },
            COL_1: {
                color: COLORS.SIDEBAR_COL_1,
                x: SIDEBAR_START_X,
                y:
                    PLAYERS_LABEL_HEIGHT +
                    (BOTTOM_BLOCK_START_Y - PLAYERS_LABEL_HEIGHT * 2),
                width: PLAYERS_LABEL_POINT_HEIGHT,
                height: PLAYERS_LABEL_HEIGHT,
                cornerRadius: [0, 0, 0, 10],
            },
            POINT: {
                x: SIDEBAR_START_X + 0.1,
                y: BOTTOM_BLOCK_START_Y - PLAYERS_LABEL_POINT_HEIGHT * 3 + 0.5,
                height: PLAYERS_LABEL_POINT_HEIGHT * 0.8,
            },
            SCORE: {
                x: SIDEBAR_START_X,
                y:
                    BOTTOM_BLOCK_START_Y -
                    (PLAYERS_LABEL_HEIGHT - PLAYERS_LABEL_POINT_HEIGHT),
                width: PLAYERS_LABEL_POINT_HEIGHT,
                height: PLAYERS_LABEL_HEIGHT - PLAYERS_LABEL_POINT_HEIGHT,
            },
            NAME: {
                offsetY: TOP_BLOCK_START_Y,
                x: SIDEBAR_START_X + PLAYERS_LABEL_POINT_HEIGHT,
                y:
                    BOTTOM_BLOCK_START_Y -
                    (PLAYERS_LABEL_HEIGHT - PLAYERS_LABEL_POINT_HEIGHT),
                height: PLAYERS_LABEL_POINT_HEIGHT,
            },
        },
    },
};
