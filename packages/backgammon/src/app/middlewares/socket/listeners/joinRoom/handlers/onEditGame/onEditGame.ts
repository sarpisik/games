import { OnEditGame } from 'types/lib/room';
import { User } from 'types/lib/user';
import { history } from '../../../../../../../lib';
import {
    FEEDBACK_STATUS,
    setFeedback,
} from '../../../../../../slices/feedbacks/feedbacks';
import { setRoomGame } from '../../../../../../slices/room/room';
import { store } from '../../../../../../store';

export default function onEditGame(s: typeof store) {
    return function editGame(payload: OnEditGame) {
        const user = s.getState().user;
        const { id } = user;
        const { roomId, ..._payload } = payload;

        // If we edit the game, navigate to game page.
        if (
            (Object.values(payload.players) as (User | null)[]).some(
                (player) => player?.id === id
            )
        ) {
            s.dispatch(
                setFeedback({
                    editRoomGame: { status: FEEDBACK_STATUS.SUCCESS },
                })
            );
            const path = `${roomId}/${_payload.id}`;
            history.push(path);
        }

        s.dispatch(setRoomGame(_payload));
    };
}
