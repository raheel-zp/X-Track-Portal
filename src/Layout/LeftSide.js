import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from "react-redux";
import session from '../utils/session';
import { logout } from '../redux/actions/user';
import { Fragment } from 'react';
import Footer from './Footer';

function LeftSide(props) {
    useEffect(() => {
        if (!session.get("token"))
            props.logout();
    }, []);

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
                                <ul>
                                    <li>
                                        <NavLink to="/home">
                                            <i className="fas fa-fw fa-tachometer-alt"></i>
                                            <span>Dashboard</span>
                                        </NavLink>
                                    </li>

                                    {(() => {
                                        let permission = session.get('role');
                                        return (
                                            <Fragment>
                                                <li>
                                                    <a href="#" className="collapsed" data-bs-toggle="collapse"
                                                        data-bs-target="#orders-collapse" aria-expanded="false">
                                                        <i className="bi bi-file-earmark-bar-graph-fill"></i>
                                                        <span>Reports</span>
                                                        <i className="bi bi-chevron-down"></i>
                                                    </a>
                                                    <div className="collapse" id="orders-collapse">
                                                        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                                            {permission.REPORT_PHARMACIES && <NavLink to="/pharmaciesReport">
                                                                <i className="bi bi-file-earmark-text"></i>
                                                                <span>Registered Pharmacies</span>
                                                            </NavLink>}
                                                            {permission.REPORT_PATIENTS && <NavLink to="/patientsReport">
                                                                <i className="bi bi-file-earmark-person-fill"></i>
                                                                <span>Registered Patients</span>
                                                            </NavLink>}
                                                            {permission.REPORT_PATIENTS && <NavLink to="/verifiedPatientsReport">
                                                                <i className="bi bi-file-earmark-person-fill"></i>
                                                                <span>Verified Registered Patients</span>
                                                            </NavLink>}
                                                           

                                                        </ul>
                                                    </div>
                                                </li>
                                                {(() => {
                                                    if (permission.FORM_USER)
                                                        return (
                                                            <Fragment>
                                                                <li>
                                                                    <a href="#" className="collapsed" data-bs-toggle="collapse"
                                                                        data-bs-target="#user-collapse" aria-expanded="false">
                                                                        <i className="fas fa-users"></i>
                                                                        <span>User Management</span>
                                                                        <i className="bi bi-chevron-down"></i>
                                                                    </a>
                                                                    <div className="collapse" id="user-collapse">
                                                                        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                                                            <NavLink to="/user">
                                                                                <i className="fas fa-user"></i>
                                                                                <span>User</span></NavLink>
                                                                            
                                                                        </ul>
                                                                    </div>
                                                                </li>
                                                            </Fragment>
                                                        )
                                                })()}
                                                
                                                {(() => {
                                                    if (permission.CONTACT_US)
                                                        return (
                                                            <Fragment>
                                                                <li>
                                                                    <NavLink className="dropdown-item" to="/contact">
                                                                        <i className="fas fa-phone fa-flip-horizontal"></i>
                                                                        <span>Contact Us</span></NavLink>
                                                                </li>
                                                            </Fragment>
                                                        )
                                                })()}
                                               
                                            </Fragment>
                                        )
                                    })()}

                                </ul>
                            </div>

                            <Footer />
                        </div>
                    </nav>
                </div>

            </nav>
        </Fragment>
    );
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { logout })(LeftSide);