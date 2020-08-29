import React from 'react';
import Row from 'react-bootstrap/Row';
import { Game, Modal } from './components';
import { ModalProvider } from './contexts/Modal';
import { useGames } from './hooks';

export default function Games(): React.ReactElement {
    const games = useGames();

    return (
        <ModalProvider>
            <Modal />
            <Row xs={1} sm={2} md={3} className="h-100">
                {games.map(Game)}
            </Row>
        </ModalProvider>
    );
}
