import axios from 'axios';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { CreateGame, PLAYERS } from 'types/lib/backgammon';
import { useUser } from '../../../../../../app/slices';

export default function Form(): React.ReactElement {
    const [value, setValue] = React.useState(0);
    const { user } = useUser();
    const history = useHistory();

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(parseInt(event.target.value || '0'));
    };

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const createGame: CreateGame = {
            players: { [PLAYERS.WHITE]: user.id, [PLAYERS.BLACK]: -1 },
            stages: value,
        };
        axios
            .post('/api/backgammon/games', createGame)
            .then(parseGameId)
            .then(history.push)
            .catch(console.error);
    };

    return (
        <React.Fragment>
            <form onSubmit={onSubmit}>
                <input type="number" onChange={onChange} value={value} />
                <button type="submit">Create Game</button>
            </form>
        </React.Fragment>
    );
}

function parseGameId(response: { data: { id: number } }) {
    return '/' + response?.data?.id;
}
