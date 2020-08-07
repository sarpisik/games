import { PLAYERS } from '../../../../components/Board/constants';

const NEXT_PLAYER = {
    [PLAYERS.WHITE]: PLAYERS.BLACK,
    [PLAYERS.BLACK]: PLAYERS.WHITE,
} as const;

export default NEXT_PLAYER;
