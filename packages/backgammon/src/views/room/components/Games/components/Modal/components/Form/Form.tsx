import React from 'react';
import Button from 'react-bootstrap/Button';
import FormB from 'react-bootstrap/Form';
import { PLAYERS } from 'types/lib/backgammon';
import { Room } from '../../../../../../../../app/slices/room/room';
import { Option } from './components';
import { useDisabled, useFormState } from './hooks';
import { generateInitialState } from './utils';
import { Trans, useTranslation } from 'react-i18next';

interface FormProps {
    game: Room['games'][number];
}

const OPTIONS = Array(10)
    .fill(1)
    .map((n, i) => n + i);

export default function Form(props: FormProps): React.ReactElement {
    const { t } = useTranslation();
    const localizedBlack = t('gameSettings.black');
    const localizedWhite = t('gameSettings.white');

    const { game, onChange, onSubmit } = useFormState(
        generateInitialState(props.game)
    );
    const disabled = useDisabled();

    return (
        <FormB onSubmit={onSubmit}>
            <FormB.Group controlId="exampleForm.ControlInput1">
                <FormB.Label className="text-capitalize">
                    <Trans i18nKey="gameSettings.stages" />
                </FormB.Label>
                <FormB.Control
                    disabled={disabled}
                    name="stages"
                    as="select"
                    value={game.stages}
                    onChange={onChange}
                >
                    {OPTIONS.map(Option)}
                </FormB.Control>
            </FormB.Group>
            <FormB.Group controlId="exampleForm.ControlInput2">
                <FormB.Label className="text-capitalize">
                    <Trans i18nKey="gameSettings.duration" />
                </FormB.Label>
                <FormB.Control
                    disabled={disabled}
                    name="duration"
                    as="select"
                    value={game.duration}
                    onChange={onChange}
                >
                    {OPTIONS.map(Option)}
                </FormB.Control>
            </FormB.Group>
            <FormB.Group controlId="exampleForm.ControlSelect1">
                <FormB.Label className="text-capitalize">
                    <Trans i18nKey="gameSettings.color" />
                </FormB.Label>
                <FormB.Control
                    disabled={disabled}
                    name="color"
                    as="select"
                    value={game.color}
                    onChange={onChange}
                >
                    <option value={PLAYERS[PLAYERS.BLACK]}>
                        {localizedBlack}
                    </option>
                    <option value={PLAYERS[PLAYERS.WHITE]}>
                        {localizedWhite}
                    </option>
                </FormB.Control>
            </FormB.Group>
            <Button
                className="text-capitalize"
                disabled={disabled}
                type="submit"
                variant="primary"
            >
                <Trans
                    i18nKey={
                        disabled ? 'profile.pleaseWait' : 'gameSettings.create'
                    }
                />
            </Button>
        </FormB>
    );
}
