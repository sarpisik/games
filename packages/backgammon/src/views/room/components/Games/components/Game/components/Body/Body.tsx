import React from 'react';
import { GameClient, PLAYERS } from 'types/lib/backgammon';
import { Info, User } from './components';

type UserProps = React.ComponentProps<typeof User>;

interface Props
    extends Pick<GameClient, 'score' | 'stages' | 'players'>,
        Pick<UserProps, 'gameId'> {}

export default function Body(props: Props): React.ReactElement {
    const { players, score, stages, gameId } = props;

    return (
        <React.Fragment>
            <User
                color="BLACK"
                name={players[PLAYERS.BLACK]?.name}
                gameId={gameId}
            />
            <Info stages={stages} score={score} />
            <User
                color="WHITE"
                name={players[PLAYERS.WHITE]?.name}
                gameId={gameId}
            />
        </React.Fragment>
    );
}
