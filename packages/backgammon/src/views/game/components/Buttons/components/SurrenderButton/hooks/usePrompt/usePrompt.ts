import { useEffect } from 'react';
import { GameClient } from 'types/lib/backgammon';
import { GAME_EVENTS } from 'types/lib/game';
import { getOpponent } from '../../../../../../../../app/middlewares/socket/thunks/shared/helpers';
import { useNotification } from '../../../../../../../../app/slices';
import { useDispatchSurrender } from '../useDispatchSurrender';

export default function usePrompt(
    dispatchSurrender: ReturnType<typeof useDispatchSurrender>,
    statusSurrender: boolean,
    players: GameClient['players'],
    userId: string
) {
    const notification = useNotification();
    const nSurrender = notification.type === GAME_EVENTS.SURRENDER;
    const shouldPrompt = nSurrender && statusSurrender;

    useEffect(() => {
        if (shouldPrompt) {
            const opponent = getOpponent(players, userId);

            const accept = window.prompt(
                `${opponent?.name} requests to surrender. Would you like to accept?`
            );

            dispatchSurrender(accept ? 'ACCEPT' : 'REJECT')();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [players, shouldPrompt, userId]);
}
