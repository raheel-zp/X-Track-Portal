import React, { Fragment } from 'react';
import session from '../utils/session';
function TopNavBar_Login(props) {
    return (
        <Fragment>
            <div className="top-header d-block">
                <div className='justify-content-center text-center mt-4'>
                    <h2>Welcome Back!</h2>
                </div>
                {/* <nav className="navbar navbar-expand navbar-light topbar  text-light static-top">
                    <div className='justify-content-center text-center'>
                        <h3>Welcome Back!</h3>
                    </div>
                </nav> */}
            </div>

        </Fragment>
    );
}

export default TopNavBar_Login;