import React from 'react';
import { Round } from 'types/lib/backgammon';
import { useGame } from '../../../../../../../../../../app/slices';
import { OFFSETS } from '../../../../../../../../../../configs';
import { BoldLabel } from '../../../../../shared';
import { withUnitMeasure } from '../../../withUnitMeasure';

interface Props {
    player: Round['player'];
}

// @ts-ignore
const EnhancedLabel = withUnitMeasure<React.ComponentProps<typeof BoldLabel>>(
    (props) => (
        <BoldLabel
            fill="#000000"
            align="center"
            verticalAlign="middle"
            {...props}
        />
    )
);

export default function Score(props: Props): React.ReactElement {
    const { player } = props;
    const { game } = useGame();

    return (
        <EnhancedLabel
            text={game.score[player].toString()}
            {...OFFSETS.PLAYER_LABELS[player].SCORE}
        />
    );
}
