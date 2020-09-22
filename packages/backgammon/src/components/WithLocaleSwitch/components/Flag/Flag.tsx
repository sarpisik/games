import React from 'react';
import { EnFlag, TrFlag } from '../../../shared';
import styles from './Flag.module.css';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../../../../configs';

interface Props {
    flag: string;
}

export default function Flag(props: Props): React.ReactElement {
    const { flag } = props;
    const history = useHistory();

    const navigateHome = () => {
        history.push(ROUTES.HOME);
    };

    const Component = flag === 'tr' ? TrFlag : EnFlag;

    return (
        <div className={styles.flag} onClick={navigateHome}>
            <Component />
        </div>
    );
}
