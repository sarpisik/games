import React from 'react';
import { PLAYERS } from '../Board/constants';
import { Player, Dice } from './components';
import styles from './ScoreBoard.module.css';
import { useRound } from '../../../../app/slices';

type PlayerProps = React.ComponentProps<typeof Player>;

export default function ScoreBoard(): React.ReactElement {
    const round = useRound();

    return (
        <div className={styles.scoreboard}>
            <Player player={PLAYERS[round?.player] as PlayerProps['player']} />
            <Dice dice={round?.dice} />
        </div>
    );
}
