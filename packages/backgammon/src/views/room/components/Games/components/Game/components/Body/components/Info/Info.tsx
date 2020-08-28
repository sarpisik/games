import React, { ReactElement } from 'react';
import { GameClient, PLAYERS } from 'types/lib/backgammon';

type InfoProps = Pick<GameClient, 'score' | 'stages'>;

export default function Info(props: InfoProps): ReactElement {
    const { score, stages } = props;

    return (
        <div className="text-center">
            <p className="m-0">{stages}</p>
            <hr className="m-1" />
            <p className="m-0">
                {score[PLAYERS.BLACK]} - {score[PLAYERS.WHITE]}
            </p>
        </div>
    );
}
