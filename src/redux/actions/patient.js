import axios from 'axios';
import notify from 'devextreme/ui/notify';
import config from '../../config.json';
import session from '../../utils/session'
export const getPatientForStore = () => (dispatch) => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    let id = session.get('user').id;
    axios.get(`${config.api}Patient/GetPatient27DaysAbove_P`, {
        headers: {
            'Authorization': `Bearer ${session.get('token')}`,
            cancelToken: source.token
        }
    }).then(resp => {
        if (resp.data.successFlag) {
            dispatch({
                type: "ALL_PATIENT_INFO",
                payload: {
                    message: resp.data.activityInfo,
                    data: resp.data.data
                }
            });
        }
        else {
            notify(resp.data.activityInfo, 'error', 600);
        }
    }).catch(err => {
        if (axios.isCancel(err)) {
            console.log('Request canceled', err.message);
        } else {
            if (err.response.status === 401) {
                session.clear();
                window.location.reload(false);
            }
        }
    });
    source.cancel('Operation canceled by the user.');
}
