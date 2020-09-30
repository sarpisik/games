import { PLAYERS, GameClient } from 'types/lib/backgammon';
import i18n from '../../../../../../../i18n';
import { editGame, setConnectionStatus } from '../../../../../../slices';
import { CONNECTION_STATUS } from '../../../../../../slices/connection/connection';
import { store } from '../../../../../../store';
import {
    actionNotification,
    checkIsPlayer,
} from '../../../../thunks/shared/helpers';
import { calculateIsRoundPlayer } from '../../../../utils';

export default function onJoinGame(s: typeof store) {
    return function joinGame(payload: GameClient) {
        const state = s.getState();
        const { user } = state;
        const { _status, players } = payload;

        const playersFull = Object.values(players).every(Boolean);
        const isBlackPlayer = players?.[PLAYERS.BLACK]?.id === user.id;
        const isPlayer = checkIsPlayer(players, user.id);

        // Handle notification
        if (isPlayer) {
            let message: string;
            const localeKey = playersFull ? 'full' : 'empty';

            switch (_status) {
                case 'UNINITIALIZED':
                    message = i18n.t(
                        `notifications.game.uninitialized.${localeKey}`
                    );
                    break;

                case 'START':
                    message = i18n.t(`notifications.game.start.${localeKey}`);
                    break;

                case 'INITIALIZED':
                    message = i18n.t(
                        'notifications.game.initialized.disconnected'
                    );
                    break;

                default:
                    message = '';
                    break;
            }

            message && s.dispatch(actionNotification(message));
        }

        // Handle in case of player reconnected.
        const initialized = _status === 'INITIALIZED';
        const shouldResume = initialized && playersFull && isPlayer;
        if (shouldResume) {
            payload.isRoundPlayer = calculateIsRoundPlayer(
                user.id,
                players,
                isBlackPlayer ? PLAYERS.BLACK : PLAYERS.WHITE
            );
        }

        s.dispatch(editGame(payload));
        s.dispatch(setConnectionStatus(CONNECTION_STATUS.CONNECTED));
    };
}
