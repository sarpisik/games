import React from 'react';
import { FaRegUser, FaUser } from 'react-icons/fa';
import { PLAYERS } from 'types/lib/backgammon';
import { shortenString } from '../../../../../../../../../../utils';
import { Sit } from './components';

interface UserProps extends React.ComponentProps<typeof Sit> {
    name?: string;
    disabled?: boolean;
}

const ICONS_MAP = {
    [PLAYERS[PLAYERS.BLACK]]: FaUser,
    [PLAYERS[PLAYERS.WHITE]]: FaRegUser,
};

export default function User(props: UserProps): React.ReactElement {
    const { name, disabled, ...sitProps } = props;
    const Icon = ICONS_MAP[sitProps.color];
    const children =
        typeof name === 'string' ? (
            <p>{shortenString(name)}</p>
        ) : disabled ? null : (
            <Sit {...sitProps} />
        );

    return (
        <div className="text-center">
            <Icon />
            {children}
        </div>
    );
}
