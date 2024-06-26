import { combineReducers } from "redux";
import authReducer from "../reducers/authReducer";
import patientReducer from "../reducers/patientReducer";


const rootReducer = combineReducers({
	auth: authReducer,
	patient: patientReducer
});

export default rootReducer;