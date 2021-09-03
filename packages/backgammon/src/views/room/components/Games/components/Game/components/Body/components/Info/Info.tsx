import React from 'react';
import { GameClient, PLAYERS } from 'types/lib/backgammon';

interface InfoProps extends Pick<GameClient, 'stages'> {
    score?: GameClient['score'];
}

export default function Info(props: InfoProps): React.ReactElement {
    const { score, stages } = props;
    const scores = score
        ? `${score[PLAYERS.BLACK]} - ${score[PLAYERS.WHITE]}`
        : '-';

    return (
        <div className="text-center">
            <p className="m-0">{stages}</p>
            <hr className="m-1" />
            <p className="m-0">{scores}</p>
        </div>
    );
}
