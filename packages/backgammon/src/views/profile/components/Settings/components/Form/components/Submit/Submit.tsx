import React from 'react';
import Button from 'react-bootstrap/Button';

export default function Submit(
    props: React.ComponentProps<typeof Button>
): React.ReactElement {
    return (
        <Button type="submit" variant="primary" {...props}>
            Save
        </Button>
    );
}
