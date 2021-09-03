import React from 'react';
import { useRound } from '../../../../../../../../app/slices';
import { OFFSETS } from '../../../../../../../../configs';
import { Dice } from './components';
import { useDices } from './hooks';

type Image = React.ComponentProps<typeof Dice>['image'];

interface Props {
    images: Array<Image>;
}

const { DICES } = OFFSETS;

export default function Dices(props: Props): React.ReactElement {
    const _dices = useDices(useRound());

    // @ts-ignore
    if (!_dices) return null;

    const diceImages = props.images.filter((_, i) =>
        _dices.includes(i + 1)
    ) as Array<Exclude<Image, undefined>>;

    const coordinates = DICES[_dices.length as keyof typeof DICES];
    const double = _dices[0] === _dices[1];
    const shouldDiff = coordinates.length === 2 && !double;

    const dices = coordinates.map((coor, i) =>
        Object.assign({}, coor, { image: diceImages[shouldDiff ? i : 0] })
    );

    // @ts-ignore
    return dices.map(Dice);
}
