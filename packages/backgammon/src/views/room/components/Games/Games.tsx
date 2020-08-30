import React from 'react';
import Row from 'react-bootstrap/Row';
import { Game, Modal } from './components';
import { ModalProvider } from './contexts/Modal';
import { useGames } from './hooks';

interface Props {
    url: string;
}

export default function Games(props: Props): React.ReactElement {
    const games = useGames(props.url);

    return (
        <ModalProvider>
            <Modal />
            <Row xs={1} sm={2} md={3} className="h-100">
                {games.map(Game)}
            </Row>
        </ModalProvider>
    );
}
