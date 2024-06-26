import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import axios from "axios";
import httpConfig from "../../config.json";
import history from "../../utils/history";
import { Fragment } from "react";
import LeftSide_Login from '../../Layout/LeftSide_Login';
import TopNavBar_Login from '../../Layout/TopNavBar_Login';
import Footer from '../../Layout/Footer';
class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            emailSent: false,
            emailSentMessage: "",
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    onSubmit(e) {
        e.preventDefault();
        // if (!CommonFunctions.ValidateEmail(this.state.email)) {
        // 	return this.setState({ error: "Email is invalid" });
        // }

        axios
            .post(`${httpConfig.api}Account/forgotpassword?email=${this.state.email}`, httpConfig.api)
            .then((res) => {
                if (res.status === 200) {
                    if (res.data.successFlag)
                        this.setState({ emailSent: true, emailSentMessage: "" });
                    else {
                        console.log(res.data.activityInfo);
                        this.setState({ emailSent: false, emailSentMessage: "Missing SMTP" });
                    }
                }
            });
    }

    render() {
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
                    <LeftSide_Login />
                    <main className="page-content">
                        <TopNavBar_Login />
                        <div className="container-fluid main-page-content">
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-xl-10 col-lg-12 col-md-9">
                                        <div className="card o-hidden border-0 shadow-lg my-5 mx-5">
                                            <div className="card-body p-0">
                                                <div className="row">
                                                    <div className="col-lg-5 d-none d-lg-block">
                                                        <img style={{ height: '100%', width: '70%', objectFit: 'fill', borderRadius: '30px' }} src={process.env.PUBLIC_URL + "/assets/img/login4.png"} />
                                                    </div>
                                                    <div className="col-lg-7">
                                                        {/* <div className="container bg-light rounded-bottom d-block">
                                                            <div className="row justify-content-center"> */}

                                                        <div id="authForm2">
                                                            <form onSubmit={this.onSubmit}>
                                                                <div id="authInner">
                                                                    <div className="form-group mt-4 ">
                                                                        <button onClick={() => history.push("/")} className="fa fa-arrow-left btn btn-sm btn-danger">
                                                                            &nbsp;&nbsp;Back to Login
											                            </button>
                                                                    </div>
                                                                    <h3>Forgot Password</h3>
                                                                    <p className="forgot-one">
                                                                        Enter the email address you used when you joined and we’ll
                                                                        send you instructions to reset your password.
										</p>
                                                                    <p className="forgot2">
                                                                        For security reasons, we do NOT store your password. So
                                                                        rest assured that we will never send your password via
                                                                        email.
										</p>
                                                                    <div id="formHeader">

                                                                        {this.state.emailSent ? (<h2 className="text-danger">Email is sent to your email address.</h2>) : (<h2 className="text-danger">{this.state.emailSentMessage}</h2>)}
                                                                        <div className="form-group ">
                                                                            <input
                                                                                // type="email"
                                                                                name="email"
                                                                                className="form-control"
                                                                                placeholder="Email"
                                                                                onChange={this.onChange}
                                                                            />
                                                                        </div>

                                                                        <div className="form-group ">
                                                                            <button type="submit" className="btn btn-info">
                                                                                Send Reset Instructions
												</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </div>
                                                        {/* </div>
                                                        </div> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                        <Footer />
                    </main>
                    <a className="scroll-to-top rounded" href="#page-top">
                        <i className="fas fa-angle-up"></i>
                    </a>

                </div>
            </Fragment>
        );
    }
}


export default withRouter(ForgotPassword);
