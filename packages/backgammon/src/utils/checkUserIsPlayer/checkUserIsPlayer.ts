import { PLAYERS, Game } from 'types/lib/backgammon';

export default function checkUserIsPlayer(
    players: Game['players'],
    userId: string
): boolean {
    return (
        players?.[PLAYERS.BLACK]?.id === userId ||
        players?.[PLAYERS.WHITE]?.id === userId
    );
}
