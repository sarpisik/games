import { PLAYERS } from 'types/lib/backgammon';

export enum ROUTES {
    HOME = '/',
    ROOMS = '/rooms',
    SIGN_OUT = '/signout',
    PROFILE = '/profile',
    GAME_DEMO = '/game-demo',
}

export const MAX_WIDTH = 0.75;

export const SIDEBAR_FONT_SIZE = 0.038;
export const SIDEBAR_HIGHSCORE_FONT_SIZE = 0.03;

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

const TOP_BLOCK_START_Y = 1.5;
const LEFT_CONTAINER_START_X = 33.05;
const CONTAINER_HEIGHT = 18.5;
const CONTAINER_WIDTH = 2.45;
const BOTTOM_BLOCK_START_Y = 48.5;
const TRIANGLE_WIDTH = 2.5;
const TRIANGLE_HEIGHT = 18;
const RIGHT_BLOCK_TRIANGLE_END_X = 30.5 + TRIANGLE_WIDTH;
const LEFT_BLOCK_TRIANGLE_END_X = 13.5 + TRIANGLE_WIDTH;

// POINTS OFFSET
const POINT_TOP_START_Y = 0.8;
const POINT_BOTTOM_START_Y = 24.8;
const POINT_SIZE = TRIANGLE_WIDTH;

// SIDEBAR
const SIDEBAR_START_X = RIGHT_BLOCK_TRIANGLE_END_X + TRIANGLE_WIDTH * 2 - 0.5;
const SIDEBAR_WIDTH = 49 - SIDEBAR_START_X;
const SIDEBAR_SCORE_START_X = RIGHT_BLOCK_TRIANGLE_END_X + TRIANGLE_WIDTH + 2;
// name
const SIDEBAR_NAME_START_X = SIDEBAR_SCORE_START_X + 3.5;
const SIDEBAR_NAME_WIDTH = POINT_SIZE * 2.7;
const SIDEBAR_NAME_BLACK_START_Y = TOP_BLOCK_START_Y * 2.5;
const SIDEBAR_NAME_WHITE_START_Y = 33;
// highscore
const SIDEBAR_HIGHSCORE_WIDTH = POINT_SIZE * 2;
const SIDEBAR_HIGHSCORE_HEIGHT = TOP_BLOCK_START_Y + 0.7;
// score point
const SIDEBAR_SCORE_POINT_WIDTH = POINT_SIZE / 2.5;
const SIDEBAR_SCORE_POINT_BLACK_START_Y = SIDEBAR_NAME_BLACK_START_Y + 8.5;
const SIDEBAR_SCORE_POINT_WHITE_START_Y = SIDEBAR_NAME_WHITE_START_Y + 8.25;
// buttons
const SIDEBAR_BTN_WIDTH = 12.5;
// dice
const SIDEBAR_DICE_START_Y = POINT_TOP_START_Y * 14.5;
// timers
const SIDEBAR_TIMER_BLACK_START_X = SIDEBAR_SCORE_START_X + 0.75;
const SIDEBAR_TIMER_WHITE_START_X = SIDEBAR_SCORE_START_X + 6.15;
const SIDEBAR_TIMER_WIDTH = POINT_SIZE + 1;
// button
const SIDEBAR_BTN_START_X = RIGHT_BLOCK_TRIANGLE_END_X + TRIANGLE_WIDTH + 1;

const LEFT_BLOCK_START_X = 1;
const RIGHT_BLOCK_START_X = 17;
const TOP_LEFT_TRIANGLES_START = LEFT_BLOCK_START_X + 1 + POINT_SIZE;
const TOP_RIGHT_TRIANGLES_START = RIGHT_BLOCK_START_X + 1 + POINT_SIZE;
const BOTTOM_RIGHT_TRIANGLES_START = RIGHT_BLOCK_TRIANGLE_END_X; // negative direction.
const BOTTOM_LEFT_TRIANGLES_START = LEFT_BLOCK_TRIANGLE_END_X + 1; // negative direction.
export const OFFSETS = {
    /*
     *
     * OFFSETS
     *
     */

    // Y offet
    TOP_CONTAINER_START_Y: TOP_BLOCK_START_Y,
    BOTTOM_CONTAINER_START_Y: 48.5,
    BOTTOM_BLOCK_START_Y,

    // X offset
    LEFT_CONTAINER_START_X,
    RIGHT_CONTAINER_START_X: 46,
    RIGHT_BLOCK_END_X: 29.5,
    RIGHT_BLOCK_TRIANGLE_END_X,
    LEFT_BLOCK_TRIANGLE_END_X,

    /*
     *
     * SIZES
     *
     */

    LEFT_BLOCK_START_X,
    TOP_BLOCK_START_Y,

    // NOTIFICATION
    NOTIFICATION: {
        x: 0,
        y: 0,
        width: 49 - SIDEBAR_BTN_WIDTH,
        height: 50,
    },

    // container
    CONTAINER_HEIGHT,
    CONTAINER_WIDTH,

    // triangle
    TRIANGLE_WIDTH,
    TRIANGLE_HEIGHT,
    TOP_LEFT_TRIANGLES_START,
    TOP_RIGHT_TRIANGLES_START,
    BOTTOM_RIGHT_TRIANGLES_START,
    BOTTOM_LEFT_TRIANGLES_START,

    // point
    TOP_LEFT_POINTS_START_X: TOP_LEFT_TRIANGLES_START,
    TOP_RIGHT_POINTS_START_X: TOP_RIGHT_TRIANGLES_START,
    BOTTOM_LEFT_POINTS_START_X: BOTTOM_LEFT_TRIANGLES_START + POINT_SIZE,
    BOTTOM_RIGHT_POINTS_START_X: BOTTOM_RIGHT_TRIANGLES_START + POINT_SIZE,
    POINT_SIZE,
    POINT_BOTTOM_START_Y,
    POINT_TOP_START_Y,

    // sidebar
    SIDEBAR_HEIGHT: 48,
    SIDEBAR_START_Y: TOP_BLOCK_START_Y,
    SIDEBAR_START_X,
    SIDEBAR_WIDTH,

    BTN: {
        1: {
            bg: {
                x: SIDEBAR_BTN_START_X,
                y: 44,
                width: SIDEBAR_BTN_WIDTH,
                height: TOP_BLOCK_START_Y * 3,
            },
            icon: {
                x: SIDEBAR_BTN_START_X + SIDEBAR_BTN_WIDTH / 2 - 0.5,
                y: 25.25,
                width: 1.5,
            },
        },
        2: {
            bg: {
                x: SIDEBAR_BTN_START_X,
                y: 44,
                width: SIDEBAR_BTN_WIDTH / 2,
                height: TOP_BLOCK_START_Y * 3,
            },
            icon: {
                x: SIDEBAR_BTN_START_X + SIDEBAR_BTN_WIDTH / 4 - 0.5,
                y: 25.25,
                width: 1.5,
            },
        },
        3: {
            bg: {
                x: SIDEBAR_BTN_START_X + SIDEBAR_BTN_WIDTH / 2,
                y: 44,
                width: SIDEBAR_BTN_WIDTH / 2,
                height: TOP_BLOCK_START_Y * 3,
            },
            icon: {
                x: SIDEBAR_BTN_START_X + (SIDEBAR_BTN_WIDTH / 4) * 3 - 0.5,
                y: 25.25,
                width: 1.5,
            },
        },
    },

    // dices
    DICES: {
        1: [
            {
                x: SIDEBAR_START_X + 4,
                y: SIDEBAR_DICE_START_Y,
                width: POINT_SIZE,
            },
        ],
        2: [
            {
                x: SIDEBAR_START_X + 2.5,
                y: SIDEBAR_DICE_START_Y,
                width: POINT_SIZE,
            },
            {
                x: SIDEBAR_START_X + 5.5,
                y: SIDEBAR_DICE_START_Y,
                width: POINT_SIZE,
            },
        ],
        3: [
            {
                x: SIDEBAR_START_X + 1,
                y: SIDEBAR_DICE_START_Y,
                width: POINT_SIZE,
            },
            {
                x: SIDEBAR_START_X + 4,
                y: SIDEBAR_DICE_START_Y,
                width: POINT_SIZE,
            },
            {
                x: SIDEBAR_START_X + 7,
                y: SIDEBAR_DICE_START_Y,
                width: POINT_SIZE,
            },
        ],
        4: [
            {
                x: SIDEBAR_START_X - 0.5,
                y: SIDEBAR_DICE_START_Y,
                width: POINT_SIZE,
            },
            {
                x: SIDEBAR_START_X + 2.5,
                y: SIDEBAR_DICE_START_Y,
                width: POINT_SIZE,
            },
            {
                x: SIDEBAR_START_X + 5.5,
                y: SIDEBAR_DICE_START_Y,
                width: POINT_SIZE,
            },
            {
                x: SIDEBAR_START_X + 8.5,
                y: SIDEBAR_DICE_START_Y,
                width: POINT_SIZE,
            },
        ],
    },
    // player label
    PLAYER_LABELS: {
        [PLAYERS.BLACK]: {
            HIGHSCORE: {
                height: SIDEBAR_HIGHSCORE_HEIGHT,
                width: SIDEBAR_HIGHSCORE_WIDTH,
                x: SIDEBAR_NAME_START_X,
                y: SIDEBAR_NAME_BLACK_START_Y + 2.7,
            },
            SCORE_POINTS: {
                wins: {
                    height: SIDEBAR_HIGHSCORE_HEIGHT,
                    width: SIDEBAR_SCORE_POINT_WIDTH,
                    x: SIDEBAR_NAME_START_X,
                    y: SIDEBAR_SCORE_POINT_BLACK_START_Y,
                },
                loses: {
                    height: SIDEBAR_HIGHSCORE_HEIGHT,
                    width: SIDEBAR_SCORE_POINT_WIDTH,
                    x: SIDEBAR_NAME_START_X + SIDEBAR_SCORE_POINT_WIDTH * 2,
                    y: SIDEBAR_SCORE_POINT_BLACK_START_Y,
                },
                escapes: {
                    height: SIDEBAR_HIGHSCORE_HEIGHT,
                    width: SIDEBAR_SCORE_POINT_WIDTH,
                    x: SIDEBAR_NAME_START_X + SIDEBAR_SCORE_POINT_WIDTH * 4,
                    y: SIDEBAR_SCORE_POINT_BLACK_START_Y,
                },
            },
            NAME: {
                height: TOP_BLOCK_START_Y * 2,
                width: SIDEBAR_NAME_WIDTH,
                x: SIDEBAR_NAME_START_X,
                y: SIDEBAR_NAME_BLACK_START_Y,
            },
            POINT: {
                width: POINT_SIZE,
                x: SIDEBAR_START_X,
                y: POINT_TOP_START_Y * 2,
            },
            SCORE: {
                height: TOP_BLOCK_START_Y * 2,
                width: POINT_SIZE,
                x: SIDEBAR_SCORE_START_X,
                y: TOP_BLOCK_START_Y * 7,
            },
            SHORT_TIMER: {
                height: TOP_BLOCK_START_Y * 2,
                width: POINT_SIZE,
                x: SIDEBAR_TIMER_BLACK_START_X + 4,
                y: TOP_BLOCK_START_Y * 10.7,
            },
            TIMER: {
                height: TOP_BLOCK_START_Y * 2,
                width: SIDEBAR_TIMER_WIDTH,
                x: SIDEBAR_SCORE_START_X + 0.75,
                y: TOP_BLOCK_START_Y * 10.7,
            },
        },
        [PLAYERS.WHITE]: {
            HIGHSCORE: {
                height: SIDEBAR_HIGHSCORE_HEIGHT,
                width: SIDEBAR_HIGHSCORE_WIDTH,
                x: SIDEBAR_NAME_START_X,
                y: SIDEBAR_NAME_WHITE_START_Y + 2.5,
            },
            SCORE_POINTS: {
                wins: {
                    height: SIDEBAR_HIGHSCORE_HEIGHT,
                    width: SIDEBAR_SCORE_POINT_WIDTH,
                    x: SIDEBAR_NAME_START_X,
                    y: SIDEBAR_SCORE_POINT_WHITE_START_Y,
                },
                loses: {
                    height: SIDEBAR_HIGHSCORE_HEIGHT,
                    width: SIDEBAR_SCORE_POINT_WIDTH,
                    x: SIDEBAR_NAME_START_X + SIDEBAR_SCORE_POINT_WIDTH * 2,
                    y: SIDEBAR_SCORE_POINT_WHITE_START_Y,
                },
                escapes: {
                    height: SIDEBAR_HIGHSCORE_HEIGHT,
                    width: SIDEBAR_SCORE_POINT_WIDTH,
                    x: SIDEBAR_NAME_START_X + SIDEBAR_SCORE_POINT_WIDTH * 4,
                    y: SIDEBAR_SCORE_POINT_WHITE_START_Y,
                },
            },
            NAME: {
                height: TOP_BLOCK_START_Y * 2,
                width: SIDEBAR_NAME_WIDTH,
                x: SIDEBAR_NAME_START_X,
                y: SIDEBAR_NAME_WHITE_START_Y,
            },
            POINT: {
                width: POINT_SIZE,
                x: SIDEBAR_START_X,
                y: POINT_BOTTOM_START_Y - POINT_SIZE * 3 + 0.75,
            },
            SCORE: {
                height: TOP_BLOCK_START_Y * 2,
                width: POINT_SIZE,
                x: SIDEBAR_SCORE_START_X,
                y: 39.4,
            },
            SHORT_TIMER: {
                height: TOP_BLOCK_START_Y * 2,
                width: POINT_SIZE,
                x: SIDEBAR_TIMER_WHITE_START_X - 3,
                y: 26.5,
            },
            TIMER: {
                height: TOP_BLOCK_START_Y * 2,
                width: SIDEBAR_TIMER_WIDTH,
                x: SIDEBAR_TIMER_WHITE_START_X,
                y: 26.5,
            },
        },
    },
};
