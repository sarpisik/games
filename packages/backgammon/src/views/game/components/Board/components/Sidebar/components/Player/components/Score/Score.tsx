import React from 'react';
import { Round } from 'types/lib/backgammon';
import { useGame } from '../../../../../../../../../../app/slices';
import { BoldLabel } from '../../../../../shared';
import { Props, withUnitMeasure } from '../../../withUnitMeasure';

interface ScoreProps extends Props {
    player: Round['player'];
}

export default withUnitMeasure<ScoreProps>(function Score(_props) {
    const { player, ...props } = _props;
    const { game } = useGame();

    return (
        <BoldLabel
            text={game.score[player].toString()}
            fill="#000000"
            align="center"
            verticalAlign="middle"
            {...props}
        />
    );
});
