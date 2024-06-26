import axios from 'axios';
import notify from 'devextreme/ui/notify';
import config from '../../../config.json';
import session from '../../../utils/session';
import history from '../../../utils/history';
import common from '../../../utils/common';

export const getKpi = (callback) => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    let id = session.get('user').id;
    axios.get(`${config.api}Home/GetKPI`, {
        headers: {
            'Authorization': `Bearer ${session.get('token')}`,
            cancelToken: source.token
        }
    }).then(resp => {
        if (resp.data.successFlag) {
            callback(resp.data.data)
        }
        else {
            debugger
            if (resp.data.activityInfo == "0") {
                session.clear();
                history.push("/")
            }
            notify('Data is Incorrect', 'error', 600);
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
export const getPharmaciesTargetAchieved = (callback) => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    let id = session.get('user').id;
    axios.get(`${config.api}Home/GetPharmaciesTargetAchieved`, {
        headers: {
            'Authorization': `Bearer ${session.get('token')}`,
            cancelToken: source.token
        }
    }).then(resp => {
        if (resp.data.successFlag) {
            callback(resp.data.data)
        }
        else {
            if (resp.data.activityInfo == "0") {
                session.clear();
                history.push("/")
            }
            notify('Data is Incorrect', 'error', 600);
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