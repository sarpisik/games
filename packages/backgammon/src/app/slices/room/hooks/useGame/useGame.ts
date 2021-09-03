import { GameClient } from 'types/lib/backgammon';
import { useRoom } from '../useRoom';

export default function useGame(gameId: GameClient['id']) {
    const room = useRoom();
    const game = room.games.find((_game) => _game.id === gameId);

    return game;
}
