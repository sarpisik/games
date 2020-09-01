import React from 'react';

export default function Option(n: number): React.ReactElement {
    return (
        <option key={n} value={n}>
            {n}
        </option>
    );
}
