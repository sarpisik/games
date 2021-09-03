import { useDispatch } from 'react-redux';
import { GameClient } from 'types/lib/backgammon';
import { ROOM_EVENTS } from 'types/lib/room';
import { useGame } from '../../../../../../../../app/slices/room';

export default function useEditGame(id: GameClient['id']) {
    const game = useGame(id);
    const dispatch = useDispatch();
    const editGame = <P>(payload: P) =>
        dispatch({ type: ROOM_EVENTS.EDIT_GAME, payload });

    return {
        game: game as Exclude<ReturnType<typeof useGame>, undefined>,
        editGame,
    };
}
