import React from 'react';
import { Route, Router, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import Login from '../components/Login';
import LeftSide from './LeftSide';
import LeftSide_Login from './LeftSide_Login';
import Footer from './Footer';
import Logout from './Logout';
import TopNavBar from './TopNavBar';
import TopNavBar_Login from './TopNavBar_Login';
import $ from 'jquery';
import history from '../utils/history';
import Dashboard from '../components/Dashboard/index';
import RegisteredPharmaciesReport from '../components/Reports/RegisteredPharmacies/index';
import PatientRecordReport from '../components/Reports/PatientRecord/index';
import VerifiedPatientRecord from '../components/Reports/VerifiedPatientRecord/index';
import StockRecordReport from '../components/Reports/StockRecord/index';
import UserForm from '../components/User/index';
import Chemist from '../components/Chemist/index';
import ForgotPassword from '../components/User/forgotPassword';
import ResetPassword from '../components/User/resetPassword';
import StockFormUploader from '../components/Uploader/Stock/index';
import ContactUs from '../components/ContactUs/form';
import ContactUsList from '../components/ContactUs/index';
import session from '../utils/session';
import { Fragment } from 'react';
function Layout(props) {
    // const toggle = () => {
    //     $("body").toggleClass("sidebar-toggled");
    //     $(".sidebar").toggleClass("toggled");
    //     if ($(".sidebar").hasClass("toggled")) {
    //         $('.sidebar .collapse').collapse('hide');
    //     };
    // }
    const DefaultContainer = () => {
        return (
            <Fragment>
                <svg width="100%" height="100vh" viewBox="0 0 175 230" preserveAspectRatio="xMidYMin slice" style={{ position: 'absolute' }}>
                    <defs>
                        <linearGradient id="grad" x2="0" y2="1">
                            <stop offset="0" stopColor="#ffff"></stop>
                            <stop offset="1" stopColor="#fff"></stop>
                        </linearGradient>
                    </defs>
                    <path stroke="#d92323" strokeWidth="3" fill="url('#grad')" d="M-10,43
           Q7,40 18,30
           T42,41 T65,64 T92,32 T133,31 T167,17 T218,61 
           V240 H-180 Z"></path>
                </svg>
                <div className="page-wrapper chiller-theme toggled">
                    <LeftSide />
                    <main className="page-content">
                        <TopNavBar />
                        <div className="container-fluid main-page-content">
                            <div className="custom-container">
                                <div className="row">
                                    {(() => {
                                        let permission = session.get('role');
                                        return (
                                            <Fragment>
                                                {permission.DASHBOARD && <Route exact path='/home' render={() => <Dashboard />} />}
                                                {permission.REPORT_PHARMACIES && <Route exact path='/pharmaciesReport' render={() => <RegisteredPharmaciesReport />} />}
                                                {permission.REPORT_PATIENTS && <Route exact path='/patientsReport' render={() => <PatientRecordReport />} />}
                                                {permission.REPORT_PATIENTS && <Route exact path='/verifiedPatientsReport' render={() => <VerifiedPatientRecord />} />}
                                                {permission.REPORT_STOCK && <Route exact path='/stocksReport' render={() => <StockRecordReport />} />}
                                                {permission.FORM_USER && <Route exact path='/user' render={() => <UserForm />} />}
                                                {permission.FORM_USER && <Route exact path='/addChemist' render={() => <Chemist />} />}
                                                {permission.FORM_STOCK && <Route exact path='/bulkStock' render={() => <StockFormUploader />} />}
                                                {permission.CONTACT_US && <Route exact path='/contact' render={() => <ContactUs />} />}
                                                {permission.CONTACT_LIST && <Route exact path='/contactRequest' render={() => <ContactUsList />} />}
                                            </Fragment>
                                        )
                                    })()}
                                </div>
                            </div>
                        </div>
                        
                    </main>

                    <a className="scroll-to-top rounded" href="#page-top">
                        <i className="fas fa-angle-up"></i>
                    </a>
                    <Logout />
                </div>
            </Fragment >
        )
    }
    const LoginContainer = () => (
        <Fragment>
            <svg width="100%" height="100vh" viewBox="0 0 175 230" preserveAspectRatio="xMidYMin slice" style={{ position: 'absolute' }}>
                <defs>
                    <linearGradient id="grad" x2="0" y2="1">
                        <stop offset="0" stopColor="#ffff"></stop>
                        <stop offset="1" stopColor="#fff"></stop>
                    </linearGradient>
                </defs>
                <path stroke="#d92323" strokeWidth="3" fill="url('#grad')" d="M-10,43
   Q7,40 18,30
   T42,41 T65,64 T92,32 T133,31 T167,17 T218,61 
   V240 H-180 Z"></path>
            </svg>
            <div className="page-wrapper chiller-theme toggled">
                <LeftSide_Login />
                <main className="page-content">
                    <TopNavBar_Login />
                    <div className="container-fluid main-page-content">
                        <div className="container">
                                <Route exact path="/" render={() => <Redirect to="/" />} />
                                <Route path="/" render={() => <Login />} />
                        </div>
                    </div>
                    
                </main>

                <a className="scroll-to-top rounded" href="#page-top">
                    <i className="fas fa-angle-up"></i>
                </a>
                <Logout />
            </div>
        </Fragment >
    )

    return (
        <div className="row">
            <Router history={history}>
                <Switch>
                    <Route exact path='/' component={LoginContainer} />
                    <Route exact path='/resetPassword' component={ResetPassword} />
                    <Route exact path='/forgotpassword' component={ForgotPassword} />
                    <Route component={DefaultContainer} />
                </Switch>
            </Router>
        </div>
    );
}
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps)(Layout);