import React, { ReactElement } from 'react';
import { FaRegUser, FaUser } from 'react-icons/fa';
import { PLAYERS } from 'types/lib/backgammon';

interface UserProps {
    color: keyof typeof PLAYERS;
    name: string;
}

const ICONS_MAP = {
    [PLAYERS[PLAYERS.BLACK]]: FaUser,
    [PLAYERS[PLAYERS.WHITE]]: FaRegUser,
};

export default function User(props: UserProps): ReactElement {
    const { color, name } = props;
    const Icon = ICONS_MAP[color];

    return (
        <div className="text-center">
            <Icon />
            <p>{name}</p>
        </div>
    );
}
