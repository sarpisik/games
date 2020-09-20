import React from 'react';
import Button from 'react-bootstrap/Button';
import { useUser } from '../../../../../../../../app/slices';
import { Trans } from 'react-i18next';

export default function DeleteUser(
    props: React.ComponentProps<typeof Button>
): React.ReactElement {
    const { deleteUser } = useUser();
    const onDeleteUser = () => {
        const shouldDelete = window.confirm(
            'Are you sure you want to delete your account?'
        );
        shouldDelete && deleteUser();
    };
    return (
        <Button
            className="text-capitalize"
            onClick={onDeleteUser}
            variant="danger"
            {...props}
        >
            <Trans i18nKey="profile.delete" />
        </Button>
    );
}
