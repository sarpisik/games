import React from 'react';
import { GameClient } from 'types/lib/backgammon';
import Button from 'react-bootstrap/Button';

interface FormProps {
    gameId: GameClient['id'];
}

export default function Form(props: FormProps): React.ReactElement {
    return (
        <form>
            {props.gameId}

            <Button type="submit" variant="primary">
                Understood
            </Button>
        </form>
    );
}
