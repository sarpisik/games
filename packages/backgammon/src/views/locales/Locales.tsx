import React from 'react';
import { Link } from 'react-router-dom';
import { EnFlag, TrFlag } from '../../components';

export default function Locales(): React.ReactElement {
    return (
        <div className="container-fluid h-100 d-flex flex-column justify-content-center">
            <div className="row justify-content-center mb-5">
                <div className="col-sm-12 col-md-3">
                    <Link className="mr-3" to="tr">
                        <TrFlag />
                    </Link>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-sm-12 col-md-3">
                    <Link className="mr-3" to="en">
                        <EnFlag />
                    </Link>
                </div>
            </div>
        </div>
    );
}
