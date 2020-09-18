import React from 'react';
import { useRound } from '../../../../../../../../app/slices';
import { OFFSETS } from '../../../../../../../../configs';
import { Dice } from './components';

type Image = React.ComponentProps<typeof Dice>['image'];

interface Props {
    images: Array<Image>;
}

const { DICES } = OFFSETS;

export default function Dices(props: Props): React.ReactElement {
    const round = useRound();

    // @ts-ignore
    if (!round) return null;
    const { dice } = round;

    const diceImages = props.images.filter((_, i) =>
        dice.includes(i + 1)
    ) as Array<Exclude<Image, undefined>>;

    const coordinates = DICES[dice.length as keyof typeof DICES];
    const double = dice[0] === dice[1];
    const shouldDiff = coordinates.length === 2 && !double;

    const dices = coordinates.map((coor, i) =>
        Object.assign({}, coor, { image: diceImages[shouldDiff ? i : 0] })
    );

    // @ts-ignore
    return dices.map(Dice);
}
