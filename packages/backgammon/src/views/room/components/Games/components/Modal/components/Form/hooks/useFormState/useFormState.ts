import { useState } from 'react';
import { FormControlProps } from 'react-bootstrap/FormControl';
import { PLAYERS } from 'types/lib/backgammon';
import { generatePlayers } from 'types/lib/helpers';
import { useUser } from '../../../../../../../../../../app/slices';
import { Room } from '../../../../../../../../../../app/slices/room/room';
import { useEditGame } from '../../../../../shared/hooks';
import { valueReducer } from './utils';

export type Game = Room['games'][number];

export interface InitialState extends Pick<Game, 'id' | 'stages' | 'duration'> {
    color: Exclude<keyof typeof PLAYERS, 'NONE'>;
}

export default function useFormState(initialState: InitialState) {
    const { user } = useUser();
    const { editGame } = useEditGame(initialState.id);
    const [game, setGame] = useState(initialState);

    const onSubmit = (event: React.FormEvent<HTMLElement>) => {
        event.preventDefault();

        const players =
            game.color === 'BLACK'
                ? generatePlayers(user, null)
                : generatePlayers(null, user);
        const duration = game.duration * 60;
        const timer = generatePlayers(duration, duration);
        const payload = {
            id: game.id,
            duration,
            timer,
            stages: game.stages,
            players,
        };

        editGame(payload);
    };

    const onChange: FormControlProps['onChange'] = (event) => {
        const { name, value } = event.target;

        const _value = valueReducer(name, value);
        setGame((_game) => ({ ..._game, [name]: _value }));
    };

    return { game, onChange, onSubmit };
}
