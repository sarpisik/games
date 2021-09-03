import { BackgammonGame } from '../../game';

export default function parseGame(game: BackgammonGame) {
    return {
        id: game.id,
        stages: game.stages,
        duration: game.duration,
        players: game.players,
        score: game.score,
    };
}
