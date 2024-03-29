import React from 'react';
import { useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { GameClient } from 'types/lib/backgammon';
import { generatePlayers } from 'types/lib/helpers';
import { addRound, editGame } from '../../app/slices';
import { withLocaleSwitch } from '../../components';
import { PLAYERS } from '../game/components/Board/constants';
import { Game } from '../game/Game';
import { layout } from './constants/layout';

export default withLocaleSwitch(GameDemo);

function GameDemo(_props: RouteComponentProps) {
    const dispatch = useDispatch();
    React.useEffect(() => {
        const round: GameClient['rounds'][number] = {
            id: Date.now(),
            availableTriangles: [],
            loading: false,
            attempt: 0,
            turn: 1,
            brokens: generatePlayers(0, 0),
            collected: generatePlayers(8, 8),
            player: PLAYERS.BLACK,
            layout: layout.reverse(),
            // layout,
            dice: [1, 5],
        };
        dispatch(addRound(round));
        dispatch(
            editGame({
                isRoundPlayer: true,
                // @ts-ignore
                players: generatePlayers(
                    {
                        name: 'black player',
                        id: '117592233792384240779',
                        backgammon: {
                            score: 10300,
                            wins: 10,
                            loses: 5,
                            escapes: 4,
                        },
                    },
                    {
                        name: 'white player white player',
                        id: '12345',
                        backgammon: {
                            score: 11700,
                            wins: 10,
                            loses: 5,
                            escapes: 4,
                        },
                    }
                ),
            })
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // @ts-ignore
    return <Game />;
}
