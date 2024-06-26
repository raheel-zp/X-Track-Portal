import React, { Fragment, useEffect, useState } from "react";
import session from "../utils/session";
import axios from "axios";
import history from "../../src/utils/history";

import config from "../config.json";
import { Popup, ToolbarItem } from "devextreme-react/popup";
import "./style.css";
import ScrollView from "devextreme-react/scroll-view";


function TopNavBar(props) {
  const [Permission, setPermission] = useState(session.get("role"));
  const [Notification, setNotification] = useState([]);
  const [PopupVisible, setPopupVisible] = useState(false);
  const [PopupMessage, setPopupMessage] = useState("");
  const hidePopup = () => {
    setPopupVisible(false);
  };
  const updateNotifications = (id, message) => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    axios
      .put(`${config.api}Employee/UpdateEmployeeFollowUp_P?id=${id}`, null, {
        headers: {
          Authorization: `Bearer ${session.get("token")}`,
          cancelToken: source.token,
        },
      })
      .then((resp) => {
        if (resp.data.successFlag) {
          setPopupVisible(true);
          setPopupMessage(message);
        }
        // else {
        //     notify(resp.data.activityInfo, 'error', 600);
        // }
      })
      .catch((err) => {
          debugger
        if (axios.isCancel(err)) {
          console.log("Request canceled", err.message);
        } else {
          if (err.response.status === 401) {
            session.clear();
            window.location.reload(false);
          }
        }
      });
    source.cancel("Operation canceled by the user.");
  };
  const getNotifications = () => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    let id = session.get("user").UserId;
    axios
      .get(`${config.api}Employee/GetEmployeeFollowUp_P/${id}`, {
        headers: {
          Authorization: `Bearer ${session.get("token")}`,
          cancelToken: source.token,
        },
      })
      .then((resp) => {
        if (resp.data.successFlag) setNotification(resp.data.data);
      })
      .catch((err) => {
          debugger
        if (axios.isCancel(err)) {
          console.log("Request canceled", err.message);
        } else {
          if (err.response.status === 401) {
            session.clear();
            history.push("/");
          }
        }
      });
    source.cancel("Operation canceled by the user.");
  };
  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <Fragment>
      <Popup
        visible={PopupVisible}
        onHiding={hidePopup}
        dragEnabled={false}
        closeOnOutsideClick={true}
        showTitle={true}
        width="40%"
        height="25%"
      >
        <ScrollView width="100%" height="100%">
          <div className="container">{PopupMessage}</div>
        </ScrollView>
      </Popup>
      <div className="top-header">
        <nav className="navbar navbar-expand navbar-light topbar  text-light static-top">

          
          {Permission.NOTIFICATION && (
            <ul className="navbar-nav ml-auto">
              <li className="dropdown">
                <a
                  className="dropdown-toggle text-light"
                  data-toggle="dropdown"
                >
                  {" "}
                  Notifiction (
                  <span id="countNotify">{Notification.length}</span>){" "}
                  <span className="caret"></span>
                </a>
                <ul
                  className="dropdown-menu"
                  style={{ width: "450px", fontSize: "smaller" }}
                  id="myNotifyList"
                >
                  {Notification.map((x, i) => {
                    return (
                      <Fragment key={i}>
                        <li className="pt-2">
                          <div className="col-md-12">
                            <div className="col-md-8">
                              <span>
                                {x.Message.substr(
                                  x.Message.indexOf("Patient Name:"),
                                  20
                                )}
                              </span>
                            </div>
                            <div className="col-md-4">
                              <a
                                href="javascript:;"
                                id={x.Id}
                                type="button"
                                onClick={() =>
                                  updateNotifications(x.Id, x.Message)
                                }
                              >
                                View
                              </a>
                            </div>
                          </div>
                        </li>
                      </Fragment>
                    );
                  })}
                </ul>
              </li>
            </ul>
          )}
          <ul className="navbar-nav ml-auto">
            <div className="topbar-divider d-none d-sm-block"></div>
            <li className="nav-item dropdown no-arrow">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="userDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {/* // <span className="mr-2 d-none d-lg-inline text-gray-600 small">{session.get('user').Username}</span>
                                // <img className="img-profile rounded-circle" src={process.env.PUBLIC_URL + '/assets/img/undraw_profile.svg'} /> */}
                <div className="account-info-wrapper text-light">
                  <span>
                    {session.get("user").Username &&
                      session.get("user").Username.toUpperCase()}
                  </span>
                  <i className="bi bi-person-circle"></i>
                </div>
              </a>
              <div
                className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                aria-labelledby="userDropdown"
              >
                <a
                  className="dropdown-item"
                  href="#"
                  data-toggle="modal"
                  data-target="#logoutModal"
                >
                  <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                  Logout
                </a>
              </div>
            </li>
          </ul>
        </nav>

      </div>
    </Fragment>
  );
}

export default TopNavBar;
