import React from 'react';
import Button from 'react-bootstrap/Button';
import { useUser } from '../../../../app/slices';
import { checkUser } from '../../../../utils';
import { useTranslation, Trans } from 'react-i18next';

export default function User(): React.ReactElement {
    const { t } = useTranslation();
    const { user, signIn, signOut } = useUser();
    const userSignedIn = checkUser(user);

    return userSignedIn ? (
        <Button
            className="text-capitalize"
            variant="outline-primary"
            onClick={signOut}
        >
            <Trans i18nKey="links.signOut" />
        </Button>
    ) : (
        <Button className="text-capitalize" variant="primary" onClick={signIn}>
            <Trans i18nKey="links.signIn" />
        </Button>
    );
}
