import { store } from '../../../../store';

export default function queryByUserId(
    state: ReturnType<typeof store['getState']>
) {
    return setQuery(state.user?.id);
}

function setQuery(userId: string) {
    return { query: { userId } };
}
