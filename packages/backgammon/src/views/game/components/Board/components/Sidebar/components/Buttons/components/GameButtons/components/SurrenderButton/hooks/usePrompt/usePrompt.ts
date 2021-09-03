import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { GAME_EVENTS } from 'types/lib/game';
import { getOpponent } from '../../../../../../../../../../../../../../app/middlewares/socket/thunks/shared/helpers';
import { useNotification } from '../../../../../../../../../../../../../../app/slices';
import { useDispatchSurrender } from '../useDispatchSurrender';

export default function usePrompt(
    dispatchSurrender: ReturnType<typeof useDispatchSurrender>,
    statusSurrender: boolean,
    opponent: ReturnType<typeof getOpponent>
) {
    const localizedQuestion = useLocalizedQuestion(
        opponent?.name,
        useTranslation()
    );
    const shouldPrompt = checkShouldPrompt(useNotification(), statusSurrender);

    useEffect(() => {
        if (shouldPrompt) {
            const accept = window.confirm(localizedQuestion);

            dispatchSurrender(accept ? 'ACCEPT' : 'REJECT')();
        }

        // skip dispatchSurrender
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [localizedQuestion, shouldPrompt]);
}

function useLocalizedQuestion(
    name: string | undefined,
    translation: ReturnType<typeof useTranslation>
) {
    return translation.t('notifications.game.surrender.request.answerer', {
        name,
    });
}

function checkShouldPrompt(
    notification: ReturnType<typeof useNotification>,
    statusSurrender: boolean
) {
    const nSurrender = notification.type === GAME_EVENTS.SURRENDER;
    const shouldPrompt = nSurrender && statusSurrender;

    return shouldPrompt;
}
