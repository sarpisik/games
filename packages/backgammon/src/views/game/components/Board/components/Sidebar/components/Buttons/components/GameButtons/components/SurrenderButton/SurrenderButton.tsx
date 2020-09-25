import React from 'react';
import { getOpponent } from '../../../../../../../../../../../../app/middlewares/socket/thunks/shared/helpers';
import {
    useGame,
    useUser,
} from '../../../../../../../../../../../../app/slices';
import { Button } from '../../../shared';
import { useDispatchSurrender, usePrompt } from './hooks';

export default function SurrenderButton(
    props: Omit<React.ComponentProps<typeof Button>, 'onClick'>
): React.ReactElement {
    const { user } = useUser();
    const userId = user.id;
    const dispatchSurrender = useDispatchSurrender(userId);

    const { game } = useGame();
    const statusSurrender = game._status === 'SURRENDER';

    usePrompt(
        dispatchSurrender,
        statusSurrender,
        getOpponent(game.players, userId)
    );

    return (
        <Button
            disabled={statusSurrender}
            onClick={dispatchSurrender('REQUEST')}
            {...props}
        />
    );
}
