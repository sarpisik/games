import React from 'react';
import { Round } from 'types/lib/backgammon';
import { useGame } from '../../../../../../../../../../app/slices';
import {
    OFFSETS,
    SIDEBAR_FONT_SIZE,
} from '../../../../../../../../../../configs';
import { shortenString } from '../../../../../../../../../../utils';
import { BoldLabel } from '../../../../../shared';
import { withUnitMeasure } from '../../../withUnitMeasure';
import * as Helpers from './helpers';

interface Props {
    player: Round['player'];
}

// @ts-ignore
const EnhancedLabel = withUnitMeasure<React.ComponentProps<typeof BoldLabel>>(
    (props) => <BoldLabel align="left" verticalAlign="top" {...props} />
);

export default function Name(props: Props): React.ReactElement {
    const { player } = props;
    const { game } = useGame();
    const _name = game.players[player]?.name ?? '';
    const name = shortenString(_name, 11);

    return (
        <EnhancedLabel
            text={name}
            fontSize={SIDEBAR_FONT_SIZE}
            fill={Helpers.setFontColor(
                Helpers.checkIsRoundPlayer(
                    player,
                    Helpers.getCurrentRound(game.rounds)
                )
            )}
            {...OFFSETS.PLAYER_LABELS[player].NAME}
        />
    );
}
