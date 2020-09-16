import { EmitSurrender, GAME_EVENTS } from 'types/lib/game';
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

    let message: string, action: GAME_EVENTS | undefined;

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

        default:
            message = (shouldAsker
                ? `You have rejected the ${opponentPlayer?.name}'s surrender.`
                : shouldAnswerer
                ? `${opponentPlayer?.name} has rejected your surrender.`
                : `${opponentPlayer?.name} has rejected the surrender.`
            ).concat(' Game will continue.');
            break;
    }

    // Display notification.
    message && dispatch(actionNotification(message, action));
};

export default onSurrender;
