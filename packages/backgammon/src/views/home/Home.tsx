import React from 'react';
import { User } from './components';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../config';

export default function Home(): React.ReactElement {
    return (
        <React.Fragment>
            <Link to={ROUTES.ROOMS}>Rooms</Link>
            <User />
        </React.Fragment>
    );
}
