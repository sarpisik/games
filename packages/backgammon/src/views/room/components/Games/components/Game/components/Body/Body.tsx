import React from 'react';
import { User } from './components';

interface Props {}

export default function Body(props: Props): React.ReactElement {
    return (
        <React.Fragment>
            <User color="BLACK" name="test user1" />
            -
            <User color="WHITE" name="test user 2" />
        </React.Fragment>
    );
}
