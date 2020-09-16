import { GameClient, PLAYERS } from 'types/lib/backgammon';
import { editGame, setConnectionStatus } from '../../../../slices';
import { CONNECTION_STATUS } from '../../../../slices/connection/connection';
import { AppThunk } from '../../../../store';
import { calculateIsRoundPlayer } from '../../utils';
import { actionNotification, checkIsPlayer } from '../shared/helpers';

const onJoinGame: AppThunk<(payload: GameClient) => void> = (
    dispatch,
    getState
) => (payload) => {
    const state = getState();
    const { user } = state;
    const { _status, players } = payload;

    const playersFull = Object.values(players).every(Boolean);
    const isBlackPlayer = players?.[PLAYERS.BLACK]?.id === user.id;
    const isPlayer = checkIsPlayer(players, user.id);

    // Handle notification
    if (isPlayer) {
        let message: string;

        switch (_status) {
            case 'UNINITIALIZED':
                message = playersFull
                    ? 'You can click start button.'
                    : 'The opponent is expected to sit down.';

                break;
            case 'START':
                message = playersFull
                    ? 'Waiting both players to click start button.'
                    : 'Missing opposing player. Can not start game.';

                break;
            case 'INITIALIZED':
                message = 'Opposing player disconnected. Can not move.';
                break;

            default:
                message = '';
                break;
        }

        message && dispatch(actionNotification(message));
    }

    // Handle in case of player reconnected.
    const initialized = _status === 'INITIALIZED';
    const shouldResume = initialized && playersFull && isPlayer;
    if (shouldResume)
        payload.isRoundPlayer = calculateIsRoundPlayer(
            user.id,
            players,
            isBlackPlayer ? PLAYERS.BLACK : PLAYERS.WHITE
        );

    dispatch(editGame(payload));
    dispatch(setConnectionStatus(CONNECTION_STATUS.CONNECTED));
};

export default onJoinGame;
