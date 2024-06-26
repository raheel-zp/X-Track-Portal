const initialState = {
    message: '', data: ''
};
export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {

        case "ALL_PATIENT_INFO":
            state.message = payload.message;
            state.data = payload.data;
            return {
                ...state,
            };
        case "CLEAR_ALL_PATIENT_INFO":
            state.message = '';
            state.data = {};
            return {
                ...state,
            };
        default:
            return state;
    }
}
