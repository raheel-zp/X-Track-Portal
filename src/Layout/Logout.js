import React, { useEffect } from 'react';
import session from '../utils/session';
import { logout } from '../redux/actions/user';
import { connect } from "react-redux";
function Logout(props) {
    useEffect(() => {
        if (!session.get("token"))
            props.logout();
    }, []);
    return (
        <div className="modal fade" id="logoutModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                        <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary"  type="button" data-dismiss="modal">Cancel</button>
                        <a className="btn btn-primary" data-dismiss="modal" onClick={props.logout} href='#'>Logout</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default connect(null, { logout })(Logout);