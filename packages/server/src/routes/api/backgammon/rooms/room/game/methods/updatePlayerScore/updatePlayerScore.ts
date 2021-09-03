import { User } from '@shared-backgammon/src/types/user';
import logger from '@shared/Logger';
import BackgammonGame from '../../game';

type ACTION = 'WIN' | 'LOSE' | 'ESCAPE';

export interface Params {
    action: ACTION;
    playerId: User['id'];
    _score: number;
}

// Export itself for testing
export default async function updatePlayerScore(
    this: BackgammonGame,
    params: Params
) {
    try {
        const { action, playerId, _score } = params;
        const response = await this._userApi.fetchUser(playerId);
        const user = response.data?.getUser;

        if (!user) throw new Error(`User not found by id: ${playerId}`);
        const { backgammon, id } = user;

        switch (action) {
            case 'WIN':
                backgammon.score += _score;
                backgammon.wins += 1;
                break;
            case 'LOSE':
                backgammon.score += _score;
                backgammon.loses += 1;
                break;
            case 'ESCAPE':
                backgammon.score += _score;
                backgammon.escapes += 1;
                break;

            default:
                throw new Error(`Invalid action type: ${action}`);
        }

        const r = await this._userApi.updateUser({ id, backgammon });

        if (r.errors) {
            console.error(r.errors);
            throw new Error(`User update failed by id: ${id}`);
        }
    } catch (error) {
        // TODO: write error to db.
        logger.error(error);
    }
}
