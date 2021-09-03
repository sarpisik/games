import React from 'react';
import { GameClient, PLAYERS } from 'types/lib/backgammon';
import { Info, User } from './components';

type UserProps = React.ComponentProps<typeof User>;
type _Player = GameClient['players'][keyof GameClient['players']];
type Players = _Player & { disabled: boolean };

export interface BodyProps
    extends Pick<GameClient, 'score' | 'stages'>,
        Pick<UserProps, 'gameId'> {
    players: { [key in keyof GameClient['players']]: Players | null };
}

export default function Body(props: BodyProps): React.ReactElement {
    const { players, score, stages, gameId } = props;

    const blackPlayer = players[PLAYERS.BLACK];
    const whitePlayer = players[PLAYERS.WHITE];

    return (
        <React.Fragment>
            <User
                color="BLACK"
                name={blackPlayer?.name}
                disabled={blackPlayer?.disabled}
                gameId={gameId}
            />
            <Info stages={stages} score={score} />
            <User
                color="WHITE"
                name={whitePlayer?.name}
                disabled={whitePlayer?.disabled}
                gameId={gameId}
            />
        </React.Fragment>
    );
}
