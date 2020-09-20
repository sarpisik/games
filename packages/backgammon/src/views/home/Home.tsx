import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../configs';
import { User } from './components';

export default function Home(): React.ReactElement {
    const { t } = useTranslation();

    return (
        <ul className="p-0 m-0 text-capitalize">
            <li>
                <Link className="mr-3" to={ROUTES.ROOMS}>
                    {t('rooms')}
                </Link>
            </li>
            <li>
                <Link className="mr-3" to={ROUTES.PROFILE}>
                    {t('profile')}
                </Link>
            </li>
            <User />
        </ul>
    );
}
