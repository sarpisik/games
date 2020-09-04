import React from 'react';
import Button from 'react-bootstrap/Button';
import { useUser } from '../../../../../../../../app/slices';

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
        <Button onClick={onDeleteUser} variant="danger" {...props}>
            Delete
        </Button>
    );
}
