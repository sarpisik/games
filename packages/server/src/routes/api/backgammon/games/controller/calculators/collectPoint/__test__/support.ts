import { EVENTS, Round } from '@shared-types/backgammon';

export const createEvent = (round: Round) => ({
    event: EVENTS.COLLECT_POINT_ROUND,
    round,
});
