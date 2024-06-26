import axios from 'axios';
import notify from 'devextreme/ui/notify';
import config from '../../../config.json';
import session from '../../../utils/session';
import common from '../../../utils/common';

export const getEmployee = (callback) => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    let id = session.get('user').id;
    axios.get(`${config.api}Employee/GetEmployee_P`, {
        headers: {
            'Authorization': `Bearer ${session.get('token')}`,
            cancelToken: source.token
        }
    }).then(resp => {
        if (resp.data.successFlag) {
            callback(resp.data.data)
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
export const addEmployee = (obj, callback) => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    obj.AddedBy = session.get('user').UserId
    axios.post(`${config.api}Employee/AddEmployee_P`, obj, {
        headers: {
            'Authorization': `Bearer ${session.get('token')}`,
            cancelToken: source.token
        }
    }).then(resp => {
        if (resp.data.successFlag) {
            notify(resp.data.activityInfo, 'success', 600);
            callback(resp.data)
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
export const updateEmployee = (Id, obj, callback) => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    obj.EditBy = session.get('user').UserId
    axios.put(`${config.api}Employee/UpdateEmployee_P?id=${Id}`, obj, {
        headers: {
            'Authorization': `Bearer ${session.get('token')}`,
            cancelToken: source.token
        }
    }).then(resp => {
        if (resp.data.successFlag) {
            notify(resp.data.activityInfo, 'success', 600);
            callback(resp.data)
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
export const deleteEmployee = (Id, callback) => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    axios.post(`${config.api}Employee/DeleteEmployee_P?id=${Id}`, {
        headers: {
            'Authorization': `Bearer ${session.get('token')}`,
            cancelToken: source.token
        }
    }).then(resp => {
        if (resp.data.successFlag) {
            notify(resp.data.activityInfo, 'success', 600);
            callback(resp.data)
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