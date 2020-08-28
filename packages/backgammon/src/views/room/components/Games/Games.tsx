import React from 'react';
import Row from 'react-bootstrap/Row';
import { useRoom } from '../../../../app/slices';
import { Game, Modal } from './components';
import { ModalProvider } from './contexts/Modal';

export default function Games(): React.ReactElement {
    const room = useRoom();
    const { id, games } = room;
    const gamesProps: React.ComponentProps<typeof Game>[] = games.map(
        (game) => ({
            url: `/${id}/${game.id.toString()}`,
            children: `Game ${game.id}`,
        })
    );

    return (
        <ModalProvider>
            <Modal />
            <Row xs={1} sm={2} md={3} className="h-100">
                {gamesProps.map(Game)}
            </Row>
        </ModalProvider>
    );
}
