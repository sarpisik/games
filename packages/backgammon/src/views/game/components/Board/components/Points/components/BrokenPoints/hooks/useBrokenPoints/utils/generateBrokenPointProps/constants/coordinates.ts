import { OFFSETS } from '../../../../../../../../../../../../../config';
import { PLAYERS } from '../../../../../../../../../constants';

const { LEFT_CONTAINER_START_X } = OFFSETS;

const COORDINATES = {
    [PLAYERS.BLACK]: { x: LEFT_CONTAINER_START_X, y: 20 },
    [PLAYERS.WHITE]: { x: LEFT_CONTAINER_START_X, y: 26 },
};

export default COORDINATES;
