import React from 'react';
import Button from 'react-bootstrap/Button';
import FormB from 'react-bootstrap/Form';
import { PLAYERS } from 'types/lib/backgammon';
import { Room } from '../../../../../../../../app/slices/room/room';
import { useFormState } from './hooks';
import { generateInitialState } from './utils';

interface FormProps {
    game: Room['games'][number];
}

export default function Form(props: FormProps): React.ReactElement {
    const { game, onChange, onSubmit } = useFormState(
        generateInitialState(props.game)
    );

    return (
        <FormB onSubmit={onSubmit}>
            <FormB.Group controlId="exampleForm.ControlInput1">
                <FormB.Label>Stages</FormB.Label>
                <FormB.Control
                    name="stages"
                    type="number"
                    value={game.stages}
                    onChange={onChange}
                />
            </FormB.Group>
            <FormB.Group controlId="exampleForm.ControlInput2">
                <FormB.Label>Duration</FormB.Label>
                <FormB.Control
                    name="duration"
                    type="number"
                    value={game.duration}
                    onChange={onChange}
                />
            </FormB.Group>
            <FormB.Group controlId="exampleForm.ControlSelect1">
                <FormB.Label>Color</FormB.Label>
                <FormB.Control
                    name="color"
                    as="select"
                    value={game.color}
                    onChange={onChange}
                >
                    <option value={PLAYERS[PLAYERS.BLACK]}>
                        {PLAYERS[PLAYERS.BLACK]}
                    </option>
                    <option value={PLAYERS[PLAYERS.WHITE]}>
                        {PLAYERS[PLAYERS.WHITE]}
                    </option>
                </FormB.Control>
            </FormB.Group>
            <Button type="submit" variant="primary">
                Create Game
            </Button>
        </FormB>
    );
}
