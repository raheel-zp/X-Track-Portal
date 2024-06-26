import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { login } from '../redux/actions/user';
import { connect } from "react-redux";
import Common from '../utils/common';
import session from '../utils/session';
import { Button } from 'devextreme-react/button';
import { LoadIndicator } from 'devextreme-react/load-indicator';
import '../Login.css';
import { Fragment } from 'react';
function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loadIndicatorVisible, setLoadIndicatorVisible] = useState(false);
    const [buttonText, setButtonText] = useState('Login');
    useEffect(() => {
        if (session.get("token"))
            props.history.push('/home');
    }, []);

    const handleLogin = e => {
        e.preventDefault();
        setLoadIndicatorVisible(true);
        setButtonText('logging');
        props.login({ username: username, password: password });
    }
    return (
        <Fragment>
            <div className="row justify-content-center">
                <div className="col-xl-10 col-lg-12 col-md-9">
                    <div className="card o-hidden border-0 shadow-lg my-5 mx-5">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col-lg-5 d-none d-lg-block">
                                    <img style={{ height: '100%', width: '70%', objectFit: 'fill', borderRadius: '30px' }} src={process.env.PUBLIC_URL + "/assets/img/login4.png"} />
                                </div>
                                <div className="col-lg-7">
                                    <div className="p-5">
                                        <div className="text-center ">
                                                {/* <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1> */}
                                            </div>
                                        <form className="user" onSubmit={e => handleLogin(e)}>
                                            <div className="form-group">
                                                <input className="form-control form-control-user"
                                                    required="required" aria-describedby="emailHelp"
                                                    placeholder="Enter User Name..."
                                                    value={username} onChange={e => setUsername(e.target.value)} />
                                            </div>
                                            <div className="form-group">
                                                <input type="password" className="form-control form-control-user"
                                                    value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
                                            </div>

                                            {(() => {
                                                if (!Common.empty(props.errorMessage)) {
                                                    if (loadIndicatorVisible) {
                                                        setButtonText('Login');
                                                        setLoadIndicatorVisible(false);
                                                    }
                                                    return <div style={{ borderRadius: '10rem' }} className="alert alert-danger">{props.errorMessage}</div>
                                                }

                                            })()}
                                            <Button id="button" className="btn-block " useSubmitBehavior={true}>
                                                <LoadIndicator className="button-indicator" visible={loadIndicatorVisible} />
                                                <span className="dx-button-text">{buttonText}</span>
                                            </Button>
                                            {/* <hr />
                                            <a href="#" className="btn btn-google btn-user btn-block">
                                                <i className="fab fa-google fa-fw"></i> Login with Google
                                            </a>
                                            <a href="#" className="btn btn-facebook btn-user btn-block">
                                                <i className="fab fa-facebook-f fa-fw"></i> Login with Facebook
                                            </a> */}
                                        </form>
                                        <hr />
                                        <div className="text-center">
                                            <Link className="small" to="/forgotpassword">
                                                Forgot Password?
														</Link>
                                            {/* <a className="small" href="#">Forgot Password?</a> */}
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </Fragment>
    );
}
const mapStateToProps = (state) => (
    {
        isAuthenticated: state.auth.isAuthenticated,
        errorMessage: state.auth.message
    }
);
export default withRouter(connect(mapStateToProps, { login })(Login));