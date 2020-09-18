import React from 'react';
import { Round } from 'types/lib/backgammon';
import { useGame } from '../../../../../../../../../../app/slices';
import { Label } from '../../../../../Label';
import { withUnitMeasure } from '../../../withUnitMeasure';

interface Props {
    player: Round['player'];
    x: number;
    y: number;
    width: number;
    height: number;
}

export default withUnitMeasure(Score);

function Score(_props: Props): React.ReactElement {
    const { player, ...props } = _props;
    const { game } = useGame();

    return (
        <Label
            fill="#000000"
            align="center"
            verticalAlign="middle"
            text={game.score[player].toString()}
            {...props}
        />
    );
}
