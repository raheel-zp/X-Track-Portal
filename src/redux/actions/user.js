import axios from "axios";
import config from "../../config.json";
import history from "../../utils/history";
import notify from "devextreme/ui/notify";
import session from "../../utils/session";
export const login =
  ({ username, password }) =>
  (dispatch) => {
    const data = {
      UserName: username,
      Password: password,
    };
    axios
      .post(`${config.api}Account/login_P`, data)
      .then((resp) => {
        if (resp.data.successFlag) {
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: resp.data.data,
          });
          notify("Login Successfuly", "success", 600);
          history.push("/home");
        } else {
          dispatch({
            type: "LOGIN_FAIL",
            payload: resp.data.activityInfo,
          });
          notify(resp.data.activityInfo, "error", 600);
        }
      })
      .catch((err) => {
        dispatch({
          type: "LOGIN_FAIL",
          payload: "Email or Password is incorrect",
        });
        notify("Email or Password is incorrect", "error", 600);
      });
  };
export const logout = () => (dispatch) => {
  axios
    .post(`${config.api}Account/logout`, null, {
      headers: {
        Authorization: `Bearer ${session.get("token")}`,
      },
    })
    .then((resp) => {
      if (resp.data.successFlag) {
        session.clear();
        dispatch({
          type: "LOGOUT",
          payload: "",
        });
        dispatch({
          type: "CLEAR_DROPDOWN",
          payload: "",
        });
        dispatch({
          type: "CLEAR_COMBO",
          payload: "",
        });
        dispatch({
          type: "CLEAR_PRODUCT_INFO",
          payload: "",
        });
        dispatch({
          type: "CLEAR_SVR",
          payload: "",
        });
        history.push("/");
      } else {
        notify(resp.data.activityInfo, "error", 600);
      }
    })
    .catch((err) => {
      console.log(err.toString());
    });
};
