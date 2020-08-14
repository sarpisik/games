import { Game } from 'types/lib/backgammon';
import { history } from '../../../../../lib';
import { PLAYERS } from '../../../../../views/game/components/Board/constants';
import { AppThunk } from '../../../../store';
import { setNotification } from '../../../notification';
import { NOTIFICATION } from '../../../notification/notification';
import { setInitialGame } from '../../game';

const setGame: (game: Game) => AppThunk = (game) => (dispatch, getState) => {
    const state = getState();
    const { id, players } = game;
    const { user } = state;

    if (id > 0) {
        const userId = user.id;

        // Initialize game
        dispatch(setInitialGame(game));

        // Generate notification
        if (players[PLAYERS.WHITE] === userId) {
            dispatch(
                setNotification({
                    type: NOTIFICATION.WHITE_PLAYER,
                    message: `You can invite opponent by sending this link: ${window.location.href}`,
                })
            );
        } else if (players[PLAYERS.BLACK] === userId) {
            dispatch(
                setNotification({
                    type: NOTIFICATION.BLACK_PLAYER,
                    message: 'Starting the game...',
                })
            );
        } else if (!Object.values(players).includes(-1)) {
            alert('Logged in user does not exist in the game players.');

            history.replace('/');
        }
    }
};

export default setGame;