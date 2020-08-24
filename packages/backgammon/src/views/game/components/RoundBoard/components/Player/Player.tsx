import React from 'react';
import { PLAYERS } from '../../../Board/constants';

interface PlayerProps {
    player: keyof typeof PLAYERS;
}

export default function Player(props: PlayerProps): React.ReactElement {
    const { player } = props;

    return <p>Player:&nbsp;{player}</p>;
}
