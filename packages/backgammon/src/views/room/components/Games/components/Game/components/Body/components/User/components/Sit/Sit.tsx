import React from 'react';
import Button from 'react-bootstrap/Button';
import { PLAYERS, GameClient } from 'types/lib/backgammon';
import { useEditGame } from '../../../../../../../shared/hooks';
import { useUser } from '../../../../../../../../../../../../app/slices';

interface SitProps {
    gameId: GameClient['id'];
    color: keyof typeof PLAYERS;
}

export default function Sit(props: SitProps): React.ReactElement {
    const { gameId, color } = props;
    const { user } = useUser();
    const { game, editGame } = useEditGame(gameId);
    const setPlayer = () => {
        const players = Object.assign({}, game.players, {
            [PLAYERS[color]]: user.id,
        });
        const payload = Object.assign({}, game, { players });

        editGame(payload);
    };

    return (
        <Button onClick={setPlayer} block>
            Sit
        </Button>
    );
}
