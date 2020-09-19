import React from 'react';
import { Round } from 'types/lib/backgammon';
import { useGame } from '../../../../../../../../../../app/slices';
import { SIDEBAR_HIGHSCORE_FONT_SIZE } from '../../../../../../../../../../configs';
import { Label } from '../../../../../Label';
import { withUnitMeasure } from '../../../withUnitMeasure';

interface Props {
    player: Round['player'];
    x: number;
    y: number;
    width: number;
    height: number;
}

export default withUnitMeasure(Highscore);

function Highscore(_props: Props): React.ReactElement {
    const { player, ...props } = _props;
    const { game } = useGame();
    const hightscore = game.players[player]?.backgammon.score ?? '';

    return (
        <Label
            fill="#000000"
            align="center"
            verticalAlign="middle"
            fontStyle="bold"
            text={hightscore.toString()}
            fontSize={SIDEBAR_HIGHSCORE_FONT_SIZE}
            letterSpacing={5}
            {...props}
        />
    );
}
