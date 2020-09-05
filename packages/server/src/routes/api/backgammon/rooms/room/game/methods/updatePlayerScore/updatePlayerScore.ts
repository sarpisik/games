import BackgammonGame from '../../game';
import { User } from '@shared-backgammon/src/types/user';
import logger from '@shared/Logger';

type ACTION = 'WIN' | 'LOSE' | 'ESCAPE';

export default async function updatePlayerScore(
    this: BackgammonGame,
    action: ACTION,
    playerId: User['id'],
    _score: number
) {
    try {
        const response = await this._userApi.fetchUser(playerId);
        const user = response.data?.getUser;

        if (!user) throw new Error(`User not found by id: ${playerId}`);
        const { backgammon } = user;

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

        await this._userApi.updateUser(user);
    } catch (error) {
        // TODO: write error to db.
        logger.error(error);
    }
}
