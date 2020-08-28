import React from 'react';
import { FaRegUser, FaUser } from 'react-icons/fa';

interface Props {}

export default function Body(props: Props): React.ReactElement {
    return (
        <React.Fragment>
            <FaUser />
            -
            <FaRegUser />
        </React.Fragment>
    );
}
