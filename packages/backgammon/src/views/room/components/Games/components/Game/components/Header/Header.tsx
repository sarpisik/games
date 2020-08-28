import React, { ReactElement } from 'react';
import { AiTwotoneSetting } from 'react-icons/ai';
import { Link } from 'react-router-dom';

interface Props {
    url: string;
    title: React.ReactNode;
}

export default function Header(props: Props): ReactElement {
    const { url, title } = props;

    return (
        <React.Fragment>
            <Link to={url}>{title}</Link>
            <AiTwotoneSetting />
        </React.Fragment>
    );
}
