import React from 'react';
import TR from '../../../assets/flag_tr.png';

export default function TrFlag(
    props: Omit<
        React.DetailedHTMLProps<
            React.ImgHTMLAttributes<HTMLImageElement>,
            HTMLImageElement
        >,
        'src' | 'alt' | 'className'
    >
): React.ReactElement {
    return (
        <img
            src={TR}
            alt="Turkish flag"
            className="mw-100 d-block m-auto"
            {...props}
        />
    );
}
