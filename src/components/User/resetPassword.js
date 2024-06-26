import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import axios from "axios";
import notify from 'devextreme/ui/notify';
import httpConfig from "../../config.json";
import history from "../../utils/history";
import { Fragment } from "react";
import LeftSide_Login from '../../Layout/LeftSide_Login';
import TopNavBar_Login from '../../Layout/TopNavBar_Login';
import Footer from '../../Layout/Footer';
class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            confirmPassword: "",
            passwordUpdated: false,
            error: ""
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    onSubmit(e) {
        e.preventDefault();
        if (!this.state.password) {
            return this.setState({ error: "Password is required" });
        }
        if (this.state.password !== this.state.confirmPassword) {
            return this.setState({ error: "Password did not matched." });
        }
        const urlParams = new URLSearchParams(this.props.history.location.search);
        const code = urlParams.get("code");
        var newCode = encodeURIComponent(code);
        const email = urlParams.get("email");
        axios
            .post(
                `${httpConfig.api}Account/resetpassword?email=${email}&code=${newCode}&password=${this.state.password}`,
                httpConfig.api
            )
            .then((res) => {
                if (res.status === 200) {
                    if (res.data.successFlag) {
                        this.setState({ passwordUpdated: true });
                        history.push("/");
                        notify('Password is changed successfully', 'success', 600);
                    }
                    else
                        this.setState({ passwordUpdated: false });
                }
            })
            .catch((err) => {
                this.setState({ passwordUpdated: false });
                console.log(err);
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
                                                        <div id="authForm2">
                                                            <form onSubmit={this.onSubmit}>
                                                                <div id="authInner">
                                                                    <div className="form-group mt-4">
                                                                        <button onClick={() => history.push("/")} className="fa fa-arrow-left btn btn-sm btn-danger">
                                                                            &nbsp;&nbsp;Back to Login
												</button>
                                                                    </div>
                                                                    <h3>Reset your Password</h3>
                                                                    <div id="formHeader">
                                                                        {this.state.passwordUpdated ? (
                                                                            <h2 className="text-success">
                                                                                Password is changed successfully.
                                                                            </h2>
                                                                        ) : (
                                                                            ""
                                                                        )}
                                                                        {this.state.error && (
                                                                            <h4 className="text-danger">{this.state.error}</h4>
                                                                        )}
                                                                        <div className="form-group ">
                                                                            <input
                                                                                type="password"
                                                                                name="password"
                                                                                className="form-control"
                                                                                placeholder="Password"
                                                                                onChange={this.onChange}
                                                                            />
                                                                        </div>
                                                                        <div className="form-group ">
                                                                            <input
                                                                                type="password"
                                                                                name="confirmPassword"
                                                                                className="form-control"
                                                                                placeholder="Confirm Password"
                                                                                onChange={this.onChange}
                                                                            />
                                                                        </div>

                                                                        <div className="form-group ">
                                                                            <button type="submit" className="btn btn-info">
                                                                                Reset Password
												</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </div>
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

                </div>  </Fragment>
        );
    }
}

export default withRouter(ResetPassword);
