import React from 'react';
import { GameClientMessage } from 'types/lib/backgammon';
import styles from './Message.module.css';

export default function Message(props: GameClientMessage): React.ReactElement {
    const { name, message, time } = props,
        key = name + message + time;

    return (
        <div key={key} className={styles.message}>
            <p className="mb-1 font-weight-bold">
                {name}&nbsp;-&nbsp;
                <span className="text-muted font-italic">{time}</span>
            </p>
            <p>{message}</p>
        </div>
    );
}
