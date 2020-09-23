import {
    EmitGameOver,
    EmitStageOver,
    Game,
    PLAYERS,
} from 'types/lib/backgammon';
import { User } from 'types/lib/user';
import i18n from '../../../../../../../i18n';

export default function createWinnerMessage(
    game: Game,
    user: User,
    winner: (EmitStageOver | EmitGameOver)['winner']
): string {
    const { id } = user;
    const { players } = game;
    const playersList = Object.values(players) as Array<
        typeof players[keyof typeof players]
    >;
    const userIsPlayer = playersList.some((_p) => _p?.id === id);
    const shouldWinner = userIsPlayer && players[winner]?.id === id;

    // User is a player
    if (userIsPlayer) {
        const winner = shouldWinner ? 'self' : 'opponent';
        return i18n.t(`notifications.game.winner.${winner}`);
    }

    // User is a guest.
    return i18n.t('notifications.game.winner.guest', {
        winner: PLAYERS[winner],
    });
}
