import { GameClient, PLAYERS } from 'types/lib/backgammon';
import { GAME_EVENTS } from 'types/lib/game';
import { User } from 'types/lib/user';
import { setNotification } from '../../../../slices/notification';

export function checkIsPlayer(
    players: GameClient['players'],
    userId: User['id']
) {
    return (
        players?.[PLAYERS.BLACK]?.id === userId ||
        players?.[PLAYERS.WHITE]?.id === userId
    );
}

export function getOpponent(
    players: GameClient['players'],
    userId: User['id']
) {
    const player =
        players?.[PLAYERS.BLACK]?.id === userId
            ? players?.[PLAYERS.WHITE]
            : players?.[PLAYERS.BLACK];

    return player;
}

export function actionNotification(
    message: string,
    type: Parameters<
        typeof setNotification
    >[0]['type'] = GAME_EVENTS.NOTIFICATION
) {
    return setNotification({ message, type });
}
