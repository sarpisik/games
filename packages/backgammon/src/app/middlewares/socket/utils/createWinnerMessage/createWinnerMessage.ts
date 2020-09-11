import {
    EmitGameOver,
    EmitStageOver,
    Game,
    PLAYERS,
    User,
} from 'types/lib/backgammon';

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
    if (userIsPlayer)
        return shouldWinner ? 'Congratulations! You won!' : 'You lose!';

    // User is a guest.
    return `Game Over.\nThe winner is ${PLAYERS[winner]} player.`;
}
