import { EmitError, EmitScore } from 'types/lib/backgammon';
import { GAME_EVENTS } from 'types/lib/game';
import i18n from '../../../../../i18n';
import { setNotification } from '../../../../slices';
import { store } from '../../../../store';
import { createWinnerMessage } from './utils';

const withNotification = <S extends typeof store, P>(
    type: GAME_EVENTS,
    wrappedFunction?: (s: typeof store) => (payload: P) => void
) => (s: S) => (payload: P) => {
    switch (type) {
        case GAME_EVENTS.SKIP_ROUND:
            s.dispatch(
                setNotification({
                    type,
                    message: i18n.t('notifications.game.skipRound'),
                })
            );
            break;

        case GAME_EVENTS.DISCONNECT_FROM_SERVER:
            s.dispatch(
                setNotification({
                    type,
                    message: i18n.t('notifications.error.disconnected'),
                })
            );
            break;

        case GAME_EVENTS.NOTIFICATION:
            s.dispatch(setNotification({ type, message: '' }));
            break;

        case GAME_EVENTS.ERROR:
            s.dispatch(setNotification((payload as unknown) as EmitError));
            break;

        case GAME_EVENTS.STAGE_OVER: {
            const { game, user } = s.getState();
            const { winner } = (payload as unknown) as EmitScore;

            const localizedNextStage = i18n.t('notifications.game.nextStage');
            const message = createWinnerMessage(game, user, winner).concat(
                ` ${localizedNextStage}`
            );

            s.dispatch(
                setNotification({ type: GAME_EVENTS.STAGE_OVER, message })
            );
            break;
        }

        case GAME_EVENTS.GAME_OVER: {
            const { game, user } = s.getState();
            const { winner } = (payload as unknown) as EmitScore;

            const message = createWinnerMessage(game, user, winner);

            s.dispatch(
                setNotification({ type: GAME_EVENTS.GAME_OVER, message })
            );
            break;
        }

        default:
            console.warn(`Invalid notification type. Received ${type}`);
            break;
    }

    typeof wrappedFunction === 'function' && wrappedFunction(s)(payload);
};

export default withNotification;
