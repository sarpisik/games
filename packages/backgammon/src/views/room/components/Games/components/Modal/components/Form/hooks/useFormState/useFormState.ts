import { useState } from 'react';
import { FormControlProps } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { PLAYERS } from 'types/lib/backgammon';
import { generatePlayers } from 'types/lib/helpers';
import { ROOM_EVENTS } from 'types/lib/room';
import { useUser } from '../../../../../../../../../../app/slices';
import { Room } from '../../../../../../../../../../app/slices/room/room';
import { valueReducer } from './utils';

export type Game = Room['games'][number];

export interface InitialState extends Pick<Game, 'id' | 'stages' | 'duration'> {
    color: Exclude<keyof typeof PLAYERS, 'NONE'>;
}

export default function useFormState(initialState: InitialState) {
    const { user } = useUser();
    const dispatch = useDispatch();
    const [game, setGame] = useState(initialState);

    const onSubmit = (event: React.FormEvent<HTMLElement>) => {
        event.preventDefault();

        const players =
            game.color === 'BLACK'
                ? generatePlayers(user.id, -1)
                : generatePlayers(-1, user.id);
        const payload = {
            id: game.id,
            duration: game.duration * 60,
            stages: game.stages,
            players,
        };

        dispatch({ type: ROOM_EVENTS.EDIT_GAME, payload });
    };

    const onChange: FormControlProps['onChange'] = (event) => {
        const { name, value } = event.target;

        const _value = valueReducer(name, value);
        setGame((_game) => ({ ..._game, [name]: _value }));
    };

    return { game, onChange, onSubmit };
}
