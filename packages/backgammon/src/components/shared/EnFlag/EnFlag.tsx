import React from 'react';
import EN from '../../../assets/flag_en.png';

export default function EnFlag(
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
            src={EN}
            alt="UK flag"
            className="mw-100 d-block m-auto"
            {...props}
        />
    );
}
