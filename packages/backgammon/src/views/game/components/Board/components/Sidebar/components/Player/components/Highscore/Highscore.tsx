import React from 'react';
import { Round } from 'types/lib/backgammon';
import { useGame } from '../../../../../../../../../../app/slices';
import { SIDEBAR_HIGHSCORE_FONT_SIZE } from '../../../../../../../../../../configs';
import { BoldLabel } from '../../../../../shared';
import { Props, withUnitMeasure } from '../../../withUnitMeasure';

interface HighscoreProps extends Props {
    player: Round['player'];
}

export default withUnitMeasure<HighscoreProps>(function Highscore(_props) {
    const { player, ...props } = _props;
    const { game } = useGame();
    const hightscore = game.players[player]?.backgammon.score ?? '';

    return (
        <BoldLabel
            text={hightscore.toString()}
            fontSize={SIDEBAR_HIGHSCORE_FONT_SIZE}
            fill="#000000"
            align="center"
            verticalAlign="middle"
            letterSpacing={5}
            {...props}
        />
    );
});
