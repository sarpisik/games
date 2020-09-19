import React from 'react';
import { useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { GameClient } from 'types/lib/backgammon';
import { generatePlayers } from 'types/lib/helpers';
import { addRound, editGame } from '../../app/slices';
import { PLAYERS } from '../game/components/Board/constants';
import { Game } from '../game/Game';
import { useDynamicLayout, useResetGame } from '../game/hooks';
import { layout } from './constants/layout';

export default function GameDemo(_props: RouteComponentProps) {
    const dispatch = useDispatch();
    useResetGame();
    useDynamicLayout();
    React.useEffect(() => {
        const round: GameClient['rounds'][number] = {
            id: Date.now(),
            availableTriangles: [],
            loading: false,
            attempt: 0,
            turn: 1,
            brokens: generatePlayers(0, 0),
            collected: generatePlayers(8, 8),
            player: PLAYERS.WHITE,
            layout,
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
                        backgammon: {
                            score: 10300,
                            wins: 10,
                            loses: 5,
                            escapes: 4,
                        },
                    },
                    {
                        name: 'white player white player',
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
