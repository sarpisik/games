import { GameClient } from 'types/lib/backgammon';
import { EmitSurrender, GAME_EVENTS } from 'types/lib/game';
import { editGame } from '../../../../slices';
import { AppThunk } from '../../../../store';
import {
    actionNotification,
    checkIsPlayer,
    getOpponent,
} from '../shared/helpers';

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

            message = shouldAsker
                ? 'Waiting opponent to confirm your request to surrender.'
                : `${opponentPlayer?.name} requests to surrender.`;
            break;
        }
        case 'ACCEPT':
            message = `${opponentPlayer?.name} has `.concat(
                shouldAsker
                    ? 'surrended. You win.'
                    : shouldAnswerer
                    ? 'accepted your surrender.'
                    : 'accepted the surrender.'
            );
            break;

        case 'REJECT':
            message = (shouldAsker
                ? `You have rejected the ${opponentPlayer?.name}'s surrender.`
                : shouldAnswerer
                ? `${opponentPlayer?.name} has rejected your surrender.`
                : `${opponentPlayer?.name} has rejected the surrender.`
            ).concat(' Game will continue.');

            // Continue game
            _status = 'INITIALIZED';
            break;

        default:
            console.error(`invalid type of surrender. Received ${type}`);
    }

    // Display notification.
    message && dispatch(actionNotification(message, action));

    // Prompt/toggle buttons.
    dispatch(editGame({ _status }));
};

export default onSurrender;
