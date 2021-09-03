import { GameClient } from 'types/lib/backgammon';
import { editGame } from '../../../../../../slices';
import { store } from '../../../../../../store';

export default function onPlayerDisconnect(s: typeof store) {
    return function playerDisconnect(players: GameClient['players']) {
        s.dispatch(editGame({ players }));
    };
}
