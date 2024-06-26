import axios from 'axios';
import notify from 'devextreme/ui/notify';
import config from '../../../config.json';
import session from '../../../utils/session';

export const addChemist = (obj, callback) => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    // obj.AddedBy = session.get('user').UserId
    axios.post(`${config.api}Chemist/AddChemist`, obj, {
        headers: {
            'Authorization': `Bearer ${session.get('token')}`,
            cancelToken: source.token
        }
    }).then(resp => {
       callback(resp);
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

export const getChemistBankDetails = (chemistId,callback) => {
    
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    let id = session.get('user').id;
    axios.get(`${config.api}Chemist/GetChemistBankDetailsById?chemistId=${chemistId}`, {
        headers: {
            'Authorization': `Bearer ${session.get('token')}`,
            cancelToken: source.token
        }
    }).then(resp => {
        if (resp.data.successFlag) {
            callback(resp.data.data[0])
        }
        else {
            if (resp.data.activityInfo == "0") {
                session.clear();
                window.location.reload(false);
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

export const updateChemistBankDetails = (obj, callback) => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    // obj.AddedBy = session.get('user').UserId
    axios.post(`${config.api}Chemist/UpdateChemistBankDetails`, obj, {
        headers: {
            'Authorization': `Bearer ${session.get('token')}`,
            cancelToken: source.token
        }
    }).then(resp => {
       callback(resp);
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