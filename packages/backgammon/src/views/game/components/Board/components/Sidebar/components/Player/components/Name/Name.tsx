import React from 'react';
import { Round } from 'types/lib/backgammon';
import { useGame } from '../../../../../../../../../../app/slices';
import { SIDEBAR_FONT_SIZE } from '../../../../../../../../../../configs';
import { shortenString } from '../../../../../../../../../../utils';
import { Label } from '../../../../../Label';
import { withUnitMeasure } from '../../../withUnitMeasure';

interface Props {
    player: Round['player'];
    x: number;
    y: number;
    width: number;
    height: number;
}

export default withUnitMeasure(Name);

function Name(_props: Props): React.ReactElement {
    const { player, ...props } = _props;
    const { game } = useGame();
    const _name = game.players[player]?.name || '';
    const name = shortenString(_name, 11);

    return (
        <Label
            fill="#ffffff"
            align="left"
            verticalAlign="top"
            text={name}
            fontSize={SIDEBAR_FONT_SIZE}
            {...props}
        />
    );
}
