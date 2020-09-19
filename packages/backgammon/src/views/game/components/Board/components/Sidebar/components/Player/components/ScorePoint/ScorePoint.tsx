import React from 'react';
import { Round } from 'types/lib/backgammon';
import { User } from 'types/lib/user';
import { useGame } from '../../../../../../../../../../app/slices';
import {
    OFFSETS,
    SIDEBAR_HIGHSCORE_FONT_SIZE,
} from '../../../../../../../../../../configs';
import { Label } from '../../../../../Label';
import { withUnitMeasure } from '../../../withUnitMeasure';

interface Props {
    player: Round['player'];
    scoreKey: keyof Omit<User['backgammon'], 'score'>;
}

// @ts-ignore
const EnhancedLabel = withUnitMeasure<React.ComponentProps<typeof Label>>(
    (props) => (
        <Label
            fill="#FFFFFF"
            align="center"
            verticalAlign="top"
            fontStyle="bold"
            {...props}
        />
    )
);

export default function Highscore(_props: Props): React.ReactElement {
    const { player, scoreKey } = _props;
    const { game } = useGame();
    const scorePoint = game.players[player]?.backgammon[scoreKey] ?? '';

    return (
        <EnhancedLabel
            text={scorePoint.toString()}
            fontSize={SIDEBAR_HIGHSCORE_FONT_SIZE}
            {...OFFSETS.PLAYER_LABELS[player].SCORE_POINTS[scoreKey]}
        />
    );
}
