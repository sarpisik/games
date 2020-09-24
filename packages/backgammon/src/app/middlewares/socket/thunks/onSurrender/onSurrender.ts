import { GameClient } from 'types/lib/backgammon';
import { EmitSurrender, GAME_EVENTS } from 'types/lib/game';
import { editGame } from '../../../../slices';
import { AppThunk } from '../../../../store';
import {
    actionNotification,
    checkIsPlayer,
    getOpponent,
} from '../shared/helpers';
import i18n from '../../../../../i18n';

const onSurrender: AppThunk<(payload: EmitSurrender) => void> = (
    dispatch,
    getState
) => (data) => {
    const state = getState();
    const { user, game } = state;

    const { id } = user;
    const { players } = game;
    const { payload, type } = data;

    const shouldAsker = payload.id === id;
    const shouldAnswerer = checkIsPlayer(players, id);
    const opponentPlayer = getOpponent(players, id);

    let message: string = '',
        action: GAME_EVENTS | undefined,
        _status: GameClient['_status'] = 'SURRENDER';

    switch (type) {
        case 'REQUEST': {
            // If we need to confirm the surrender,
            // inform the UI element to prompt.
            if (!shouldAsker && shouldAnswerer) action = GAME_EVENTS.SURRENDER;

            const key = 'notifications.game.surrender.request.'.concat(
                shouldAsker ? 'asker' : 'answerer'
            );
            message = shouldAsker
                ? i18n.t(key)
                : i18n.t(key, {
                      name: opponentPlayer?.name,
                  });
            break;
        }
        case 'ACCEPT': {
            const key = shouldAsker
                ? 'answerer'
                : shouldAnswerer
                ? 'asker'
                : 'guest';
            message = i18n.t(`notifications.game.surrender.accept.${key}`, {
                name: opponentPlayer?.name,
            });
            break;
        }

        case 'REJECT': {
            const key = 'notifications.game.surrender.reject.'.concat(
                shouldAsker ? 'answerer' : shouldAnswerer ? 'asker' : 'guest'
            );
            message = shouldAsker
                ? i18n.t(key)
                : i18n.t(key, { name: opponentPlayer?.name });

            // Continue game
            _status = 'INITIALIZED';
            break;
        }

        default:
            console.error(`invalid type of surrender. Received ${type}`);
    }

    // Display notification.
    message && dispatch(actionNotification(message, action));

    // Prompt/toggle buttons.
    dispatch(editGame({ _status }));
};

export default onSurrender;
