import React from 'react';
import Button from 'react-bootstrap/Button';
import { useGame, useUser } from '../../../../../../app/slices';
import { useDispatchSurrender, usePrompt } from './hooks';

export default function SurrenderButton(): React.ReactElement {
    const { user } = useUser();
    const userId = user.id;
    const dispatchSurrender = useDispatchSurrender(userId);

    const { game } = useGame();
    const statusSurrender = game._status === 'SURRENDER';

    usePrompt(dispatchSurrender, statusSurrender, game.players, userId);

    return (
        <Button
            disabled={statusSurrender}
            onClick={dispatchSurrender('REQUEST')}
            variant="danger"
        >
            {statusSurrender ? 'Please wait...' : 'Surrender'}
        </Button>
    );
}
