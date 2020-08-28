import { Game, InitialState } from '../../hooks/useFormState/useFormState';

export default function generateInitialState(game: Game): InitialState {
    const { id, stages, duration } = game;

    return { id, stages, duration: duration / 60, color: 'BLACK' };
}
