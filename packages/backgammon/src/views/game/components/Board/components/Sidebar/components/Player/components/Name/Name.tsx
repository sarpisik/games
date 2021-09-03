import React from 'react';
import { Round } from 'types/lib/backgammon';
import { useGame } from '../../../../../../../../../../app/slices';
import { SIDEBAR_FONT_SIZE } from '../../../../../../../../../../configs';
import { shortenString } from '../../../../../../../../../../utils';
import { BoldLabel } from '../../../../../shared';
import { Props, withUnitMeasure } from '../../../withUnitMeasure';
import * as Helpers from './helpers';

interface NameProps extends Props {
    player: Round['player'];
}

export default withUnitMeasure<NameProps>(function Name(_props) {
    const { player, ...props } = _props;
    const { game } = useGame();

    return (
        <BoldLabel
            align="left"
            verticalAlign="top"
            text={shortenString(game.players[player]?.name ?? '', 11)}
            fontSize={SIDEBAR_FONT_SIZE}
            fill={Helpers.setFontColor(
                Helpers.checkIsRoundPlayer(
                    player,
                    Helpers.getCurrentRound(game.rounds)
                )
            )}
            {...props}
        />
    );
});
