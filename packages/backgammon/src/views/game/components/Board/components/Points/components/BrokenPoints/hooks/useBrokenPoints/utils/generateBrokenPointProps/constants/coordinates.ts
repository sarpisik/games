import { OFFSETS } from '../../../../../../../../../../../../../config';
import { PLAYERS } from '../../../../../../../../../constants';

const { LEFT_BLOCK_START_X } = OFFSETS;

const COORDINATES = {
    [PLAYERS.BLACK]: { x: LEFT_BLOCK_START_X, y: 11.4 },
    [PLAYERS.WHITE]: { x: LEFT_BLOCK_START_X, y: 14.1 },
};

export default COORDINATES;
