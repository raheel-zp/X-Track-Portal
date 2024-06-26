import session from "../../utils/session";
import role from "../../utils/role";

const initialState = {
    token: session.get("token"),
    isAuthenticated: session.get("token") ? true : false,
    loading: false,
    user: session.get("user")
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {

        case "LOGIN_SUCCESS":
            session.set("token", payload.Token);
            session.set("user", payload);
            switch (Number(payload.DesignationId)) {
                case 1:
                    session.set("role", role.ADMIN);
                    break;
                case 2:
                    session.set("role", role.DOPASI);
                    break;
                case 3:
                    session.set("role", role.PTP);
                    break;
                case 4:
                    session.set("role", role.DC);
                    break;
                case 5:
                    session.set("role", role.DTC);
                    break;
                case 6:
                    session.set("role", role.DI);
                    break;
                case 7:
                    session.set("role", role.CC);
                case 8:
                    session.set("role", role.SR);
                case 9:
                    session.set("role", role.SR);
            }
            return {
                ...state,
                message: 'success',
                isAuthenticated: true
            };
        case "LOGIN_FAIL":
            return {
                ...state,
                message: payload,
                loading: false,
                isAuthenticated: false
            };
        case "LOGOUT":
            session.clear();
            return {
                ...state,
                message: '',
                token: null,
                isAuthenticated: false,
                loading: false
            };
        default:
            return state;
    }
}
