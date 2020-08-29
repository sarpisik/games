import React from 'react';
import { GameClient, PLAYERS } from 'types/lib/backgammon';
import { Info, User } from './components';

type UserProps = React.ComponentProps<typeof User>;

interface Props
    extends Pick<GameClient, 'score' | 'stages'>,
        Pick<UserProps, 'gameId'> {
    players: Record<keyof GameClient['players'], UserProps['name']>;
}

export default function Body(props: Props): React.ReactElement {
    const { players, score, stages, gameId } = props;

    return (
        <React.Fragment>
            <User color="BLACK" name={players[PLAYERS.BLACK]} gameId={gameId} />
            <Info stages={stages} score={score} />
            <User color="WHITE" name={players[PLAYERS.WHITE]} gameId={gameId} />
        </React.Fragment>
    );
}
