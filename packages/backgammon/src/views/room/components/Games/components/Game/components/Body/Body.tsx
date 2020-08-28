import React from 'react';
import { Info, User } from './components';
import { PLAYERS } from 'types/lib/backgammon';

interface Props {}

export default function Body(props: Props): React.ReactElement {
    return (
        <React.Fragment>
            <User color="BLACK" name="test user1" />
            <Info
                stages={5}
                score={{ [PLAYERS.BLACK]: 3, [PLAYERS.WHITE]: 1 }}
            />
            <User color="WHITE" name="test user 2" />
        </React.Fragment>
    );
}
