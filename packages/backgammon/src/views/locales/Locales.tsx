import React from 'react';
import { Link } from 'react-router-dom';
import EN from '../../assets/flag_en.png';
import TR from '../../assets/flag_tr.png';

export default function Locales(): React.ReactElement {
    return (
        <div className="container-fluid h-100 d-flex flex-column justify-content-center">
            <div className="row mb-5">
                <div className="col-sm-12 col-md-3">
                    <Link className="mr-3" to="tr">
                        <img
                            src={TR}
                            alt="Turkish flag"
                            className="mw-100 d-block m-auto"
                        />
                    </Link>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12 col-md-3">
                    <Link className="mr-3" to="en">
                        <img
                            src={EN}
                            alt="English flag"
                            className="mw-100 d-block m-auto"
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
}
