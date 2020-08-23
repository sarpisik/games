import axios from 'axios';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { CreateGame, PLAYERS } from 'types/lib/backgammon';
import { useUser } from '../../../../../../app/slices';

export default function Form(): React.ReactElement {
    const [stages, setStages] = React.useState(1);
    const [duration, setDuration] = React.useState(1);
    const { user } = useUser();
    const history = useHistory();

    const onChangeStages = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStages(parseInt(event.target.value || '0'));
    };

    const onChangeDuration = (event: React.ChangeEvent<HTMLInputElement>) => {
        const _value = parseInt(event.target.value || '0');

        // Min = 1, Max =3.
        const _duration = _value < 1 ? 1 : _value > 3 ? 3 : _value;

        setDuration(_duration);
    };

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const createGame: CreateGame = {
            players: { [PLAYERS.WHITE]: user.id, [PLAYERS.BLACK]: -1 },
            stages,
            duration: duration * 60,
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
                <label htmlFor="stages">Stages</label>
                <input
                    id="stages"
                    type="number"
                    onChange={onChangeStages}
                    value={stages}
                />
                <label htmlFor="duration">Duration (minute)</label>
                <input
                    id="duration"
                    type="number"
                    onChange={onChangeDuration}
                    value={duration}
                />
                <button type="submit">Create Game</button>
            </form>
        </React.Fragment>
    );
}

function parseGameId(response: { data: { id: number } }) {
    console.log(response);

    return '/' + response?.data?.id;
}
