import React from 'react';
import { Trans } from 'react-i18next';
import { Link, RouteComponentProps } from 'react-router-dom';
import { withLocaleGuard } from '../../components';
import { ROUTES } from '../../configs';
import { User } from './components';

export default withLocaleGuard(Home);

function Home(props: RouteComponentProps): React.ReactElement {
    const {
        match: { url },
    } = props;

    return (
        <ul className="p-0 m-0 text-capitalize">
            <li>
                <Link className="mr-3" to={`${url}${ROUTES.ROOMS}`}>
                    <Trans i18nKey="links.rooms" />
                </Link>
            </li>
            <li>
                <Link className="mr-3" to={`${url}${ROUTES.PROFILE}`}>
                    <Trans i18nKey="links.profile" />
                </Link>
            </li>
            <User />
        </ul>
    );
}
