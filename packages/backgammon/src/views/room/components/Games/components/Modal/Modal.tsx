import React from 'react';
import Button from 'react-bootstrap/Button';
import ModalB from 'react-bootstrap/Modal';
import { ModalContext } from '../../contexts/Modal';

interface Props {}

export default function Modal(props: Props): React.ReactElement {
    const context = React.useContext(ModalContext);
    const { open, setClose } = context;

    return (
        <ModalB
            show={open}
            onHide={setClose}
            backdrop="static"
            keyboard={false}
            centered
        >
            <ModalB.Header closeButton>
                <ModalB.Title>ModalB title</ModalB.Title>
            </ModalB.Header>
            <ModalB.Body>
                I will not close if you click outside me. Don't even try to
                press escape key.
            </ModalB.Body>
            <ModalB.Footer>
                <Button variant="primary">Understood</Button>
            </ModalB.Footer>
        </ModalB>
    );
}
