import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useDynamicLayout, useResetGame } from '../game/hooks';
import {
    Board,
    Buttons,
    RoundBoard,
    ScoreBoard,
    Sidebar,
    Timer,
    Undo,
} from '../game/components';
import { GameClient } from 'types/lib/backgammon';
import { generatePlayers } from 'types/lib/helpers';
import { PLAYERS } from '../game/components/Board/constants';
import { layout } from './constants/layout';
import { useDispatch } from 'react-redux';
import { addRound, editGame } from '../../app/slices';

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
            collected: generatePlayers(15, 0),
            player: PLAYERS.WHITE,
            layout,
            dice: [3, 5],
        };
        dispatch(addRound(round));
        dispatch(
            editGame({
                isRoundPlayer: true,
                // @ts-ignore
                players: generatePlayers(
                    { name: 'black player' },
                    { name: 'white player white player' }
                ),
            })
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="Game">
            <Board />
            <Sidebar>
                <ScoreBoard />
                <hr />
                <RoundBoard />
                <hr />
                <Timer />
                <hr />
                <Undo />
                <hr />
                <Buttons />
            </Sidebar>
        </div>
    );
}
