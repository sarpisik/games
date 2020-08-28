import React from 'react';
import ModalB from 'react-bootstrap/Modal';
import { useGame } from '../../../../../../app/slices/room';
import { ModalContext } from '../../contexts/Modal';
import { Form } from './components';

export default function Modal(): React.ReactElement {
    const context = React.useContext(ModalContext);
    const { gameId, open, setClose } = context;
    const game = useGame(gameId);
    const body = validateGame(game) ? <Form game={game} /> : null;

    React.useEffect(
        function handleCLose() {
            body || setClose();
        },
        [body, setClose]
    );

    // If the game is valid, render form.
    // Else, close modal.
    return (
        <ModalB
            show={open}
            onHide={setClose}
            backdrop="static"
            keyboard={false}
            centered
        >
            <ModalB.Header closeButton>
                <ModalB.Title>Set Game</ModalB.Title>
            </ModalB.Header>
            <ModalB.Body>{body}</ModalB.Body>
        </ModalB>
    );
}

type Game = ReturnType<typeof useGame>;
function validateGame(tested: Game): tested is Exclude<Game, undefined> {
    return tested !== undefined;
}
