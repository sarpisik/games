import React from 'react';

interface DiceProps {
    dice: number[];
}

export default function Dice(props: DiceProps): React.ReactElement {
    const { dice = [] } = props;

    return <p>Dice:&nbsp;{dice.join(' - ')}</p>;
}
