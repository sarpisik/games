import { EmitError, EmitScore } from 'types/lib/backgammon';
import { GAME_EVENTS } from 'types/lib/game';
import i18n from '../../../../../i18n';
import { store } from '../../../../store';
import { actionNotification } from '../../thunks/shared/helpers';
import { createWinnerMessage } from './utils';

const withNotification = <S extends typeof store, P>(
    type: GAME_EVENTS,
    wrappedFunction?: (s: typeof store) => (payload: P) => void
) => (s: S) => (payload: P) => {
    switch (type) {
        case GAME_EVENTS.SKIP_ROUND:
            s.dispatch(
                actionNotification(i18n.t('notifications.game.skipRound'), type)
            );
            break;

        case GAME_EVENTS.DISCONNECT_FROM_SERVER:
            s.dispatch(
                actionNotification(
                    i18n.t('notifications.error.disconnected'),
                    type
                )
            );
            break;

        case GAME_EVENTS.NOTIFICATION:
            s.dispatch(actionNotification('', type));
            break;

        case GAME_EVENTS.ERROR: {
            const { message, type } = (payload as unknown) as EmitError;
            s.dispatch(
                actionNotification(message, (type as unknown) as GAME_EVENTS)
            );
            break;
        }

        case GAME_EVENTS.STAGE_OVER: {
            const { game, user } = s.getState();
            const { winner } = (payload as unknown) as EmitScore;

            const localizedNextStage = i18n.t('notifications.game.nextStage');
            const message = createWinnerMessage(game, user, winner).concat(
                ` ${localizedNextStage}`
            );

            s.dispatch(actionNotification(message, type));
            break;
        }

        case GAME_EVENTS.GAME_OVER: {
            const { game, user } = s.getState();
            const { winner } = (payload as unknown) as EmitScore;

            s.dispatch(
                actionNotification(
                    createWinnerMessage(game, user, winner),
                    type
                )
            );
            break;
        }

        case GAME_EVENTS.ROUND:
        case GAME_EVENTS.BROKEN_POINT_ROUND:
        case GAME_EVENTS.COLLECT_POINT_ROUND:
        case GAME_EVENTS.UNDO_ROUND:
        case GAME_EVENTS.SURRENDER:
            s.dispatch(actionNotification(type, 'LARGE_OVERLAY'));
            break;

        default:
            console.warn(`Invalid notification type. Received ${type}`);
            break;
    }

    typeof wrappedFunction === 'function' && wrappedFunction(s)(payload);
};

export default withNotification;
