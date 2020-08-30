import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

export default function NotFound(): ReactElement {
    return (
        <div>
            <p>Page not found.</p>
            <Link to="/">Home</Link>
        </div>
    );
}
