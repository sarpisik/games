import React from 'react';
import { User } from './components';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../configs';

export default function Home(): React.ReactElement {
    return (
        <ul className="p-0 m-0">
            <Link className="mr-3" to={ROUTES.ROOMS}>
                Rooms
            </Link>
            <Link className="mr-3" to={ROUTES.PROFILE}>
                Profile
            </Link>
            <User />
        </ul>
    );
}
