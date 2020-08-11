import { Game } from 'types/lib/backgammon';
import { history } from '../../../../../lib';
import { AppThunk } from '../../../../store';
import { setNotification } from '../../../notification';
import { NOTIFICATION } from '../../../notification/notification';
import { setInitialGame } from '../../game';

const setGame: (game: Game) => AppThunk = (game) => (dispatch, getState) => {
    const state = getState();
    const { user } = state;

    if (game.id > 0) {
        const player = playerList(game.players).find(
            (key) => game.players[key] === user.id
        );

        // Initialize game
        dispatch(setInitialGame(game));

        if (player === 'white') {
            dispatch(
                setNotification({
                    type: NOTIFICATION.WHITE_PLAYER,
                    message: `You can invite opponent by sending this link: ${window.location.href}`,
                })
            );
        } else if (player === 'black') {
            dispatch(
                setNotification({
                    type: NOTIFICATION.BLACK_PLAYER,
                    message: 'Starting the game...',
                })
            );
        } else if (!Object.values(game.players).includes(-1)) {
            alert('Logged in user does not exist in the game players.');

            history.replace('/');
        }
    }
};

export default setGame;

function playerList(players: Game['players']) {
    return Object.keys(players) as (keyof typeof players)[];
}
