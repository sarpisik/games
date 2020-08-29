import React, { ReactElement } from 'react';
import { FaRegUser, FaUser } from 'react-icons/fa';
import { PLAYERS } from 'types/lib/backgammon';
import { Sit } from './components';

interface UserProps extends React.ComponentProps<typeof Sit> {
    name: string | null;
}

const ICONS_MAP = {
    [PLAYERS[PLAYERS.BLACK]]: FaUser,
    [PLAYERS[PLAYERS.WHITE]]: FaRegUser,
};

export default function User(props: UserProps): ReactElement {
    const { name, ...sitProps } = props;
    const Icon = ICONS_MAP[sitProps.color];
    const children =
        typeof name === 'string' ? <p>{name}</p> : <Sit {...sitProps} />;

    return (
        <div className="text-center">
            <Icon />
            {children}
        </div>
    );
}
