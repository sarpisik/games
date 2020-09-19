import React from 'react';
import { Round } from 'types/lib/backgammon';
import { useGame } from '../../../../../../../../../../app/slices';
import {
    OFFSETS,
    SIDEBAR_HIGHSCORE_FONT_SIZE,
} from '../../../../../../../../../../configs';
import { Label } from '../../../../../Label';
import { withUnitMeasure } from '../../../withUnitMeasure';

interface Props {
    player: Round['player'];
}

// @ts-ignore
const EnhancedLabel = withUnitMeasure<React.ComponentProps<typeof Label>>(
    (props) => (
        <Label
            fill="#000000"
            align="center"
            verticalAlign="middle"
            fontStyle="bold"
            letterSpacing={5}
            {...props}
        />
    )
);

export default function Highscore(props: Props): React.ReactElement {
    const { player } = props;
    const { game } = useGame();
    const hightscore = game.players[player]?.backgammon.score ?? '';

    return (
        <EnhancedLabel
            text={hightscore.toString()}
            fontSize={SIDEBAR_HIGHSCORE_FONT_SIZE}
            {...OFFSETS.PLAYER_LABELS[player].HIGHSCORE}
        />
    );
}
