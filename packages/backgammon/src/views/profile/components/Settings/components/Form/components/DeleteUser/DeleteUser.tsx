import React from 'react';
import Button from 'react-bootstrap/Button';
import { useUser } from '../../../../../../../../app/slices';

export default function DeleteUser(): React.ReactElement {
    const { deleteUser } = useUser();
    const onDeleteUser = () => {
        const shouldDelete = window.confirm(
            'Are you sure you want to delete your account?'
        );
        shouldDelete && deleteUser();
    };
    return (
        <Button onClick={onDeleteUser} variant="danger">
            Delete
        </Button>
    );
}
