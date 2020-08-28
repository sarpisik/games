import React from 'react';
import Button from 'react-bootstrap/Button';
import ModalB from 'react-bootstrap/Modal';
import { ModalContext } from '../../contexts/Modal';
import { Form } from './components';

export default function Modal(): React.ReactElement {
    const context = React.useContext(ModalContext);
    const { gameId, open, setClose } = context;

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
            <ModalB.Body>
                <Form gameId={gameId} />
            </ModalB.Body>
        </ModalB>
    );
}
