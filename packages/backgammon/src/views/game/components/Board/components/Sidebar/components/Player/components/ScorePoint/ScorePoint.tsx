import React from 'react';
import { Round } from 'types/lib/backgammon';
import { User } from 'types/lib/user';
import { useGame } from '../../../../../../../../../../app/slices';
import { SIDEBAR_HIGHSCORE_FONT_SIZE } from '../../../../../../../../../../configs';
import { BoldLabel } from '../../../../../shared';
import { Props, withUnitMeasure } from '../../../withUnitMeasure';

interface HighscoreProps extends Props {
    player: Round['player'];
    scoreKey: keyof Omit<User['backgammon'], 'score'>;
}

export default withUnitMeasure<HighscoreProps>(function Highscore(_props) {
    const { player, scoreKey, ...props } = _props;
    const { game } = useGame();
    const scorePoint = game.players[player]?.backgammon[scoreKey] ?? '';

    return (
        <BoldLabel
            fill="#FFFFFF"
            align="center"
            verticalAlign="top"
            text={scorePoint.toString()}
            fontSize={SIDEBAR_HIGHSCORE_FONT_SIZE}
            {...props}
        />
    );
});
