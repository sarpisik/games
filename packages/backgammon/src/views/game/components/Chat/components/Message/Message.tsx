import React from 'react';
import styles from './Message.module.css';
import { dateToHours } from './utils';

interface Props {
    name: string;
    message: string;
    time: number;
}

export default function Message(props: Props): React.ReactElement {
    return (
        <div className={styles.message}>
            <p className="mb-1 font-weight-bold">
                {props.name}&nbsp;-&nbsp;
                <span className="text-muted font-italic">
                    {dateToHours(props.time)}
                </span>
            </p>
            <p>{props.message}</p>
        </div>
    );
}
