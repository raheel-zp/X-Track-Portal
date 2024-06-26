import React, { useEffect } from 'react';
import { Fragment } from 'react';
import Footer from './Footer';

function LeftSide_Login(props) {

    return (
        <Fragment>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <button className="navbar-toggler up" type="button" data-bs-toggle="collapse" data-bs-target="#sidebar"
                        aria-controls="sidebar" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="bi bi-list"></span>
                    </button>
                    <nav id="sidebar" className="sidebar-wrapper collapse navbar-collapse">
                        <div className="sidebar-content">
                            <div className="sidebar-brand">
                                <a href="#"><img src={process.env.PUBLIC_URL + '/assets_2/images/logo.png'} className="brand-logo" /></a>
                            </div>
                            <div className="sidebar-menu">
                                <Footer />
                            </div>
                        </div>
                    </nav>
                </div>
            </nav>
        </Fragment>
    );
}


export default LeftSide_Login;