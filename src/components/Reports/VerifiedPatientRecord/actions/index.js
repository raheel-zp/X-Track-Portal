import axios from 'axios';
import notify from 'devextreme/ui/notify';
import config from '../../../../config.json';
import session from '../../../../utils/session';
import history from '../../../../utils/history';
import common from '../../../../utils/common';

export const getPatient = (obj, callback) => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    let id = session.get('user').id;
    axios.post(`${config.api}Patient/PatientList_P`, obj, {
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
export const getProduct = (callback) => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    let id = session.get('user').id;
    axios.get(`${config.api}Product/GetProduct`, {
        headers: {
            'Authorization': `Bearer ${session.get('token')}`,
            cancelToken: source.token
        }
    }).then(resp => {

        if (resp.data.successFlag) {
            callback(resp.data.data)
        }
        else {
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
export const getPatientPerscription = (patientId, callback) => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    axios.get(`${config.api}Patient/GetPatientPrescriptions?patientId=${patientId}`, {
        headers: {
            'Authorization': `Bearer ${session.get('token')}`,
            cancelToken: source.token
        }
    }).then(resp => {

        if (resp.data.successFlag) {
            callback(resp.data.data)
        }
        else {
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

export const updatePatientPerscriptionStatus = (obj, callback) => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    
    axios.post(`${config.api}Patient/UpdatePatientPrescriptionStatus`, obj, {
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
         } /*else {
             if (err.response.status === 401) {
                 session.clear();
                 window.location.reload(false);
             }
         }*/
     });
    source.cancel('Operation canceled by the user.');
}

export const updatePatientIncentiveGivenStatus = (obj, callback) => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    
    axios.post(`${config.api}Patient/UpdatePatientIncentiveGivenStatus`, obj, {
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
         } /*else {
             if (err.response.status === 401) {
                 session.clear();
                 window.location.reload(false);
             }
         }*/
     });
    source.cancel('Operation canceled by the user.');
}

export const updatePatient = (Id, obj, callback) => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    obj.EditBy = session.get('user').UserId;

    switch (Number(session.get('user').DesignationId)) {
        case 4:
            obj.ApprovedByDC = Number(obj.EditBy);
            break;
        case 5:
            obj.ApprovedByDTC = Number(obj.EditBy);
            break;
        case 7:
            obj.ApprovedByCC = Number(obj.EditBy);
            break;
        default:
            obj.ApprovedByOther = Number(obj.EditBy);
    }
    axios.post(`${config.api}Patient/UpdatePatient_P?id=${Id}`, obj, {
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

export const getPatientPrescriptionVoice = (patientId, callback) => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    axios.get(`${config.api}Patient/GetPatientPrescriptionVoice?patientId=${patientId}`, {
        headers: {
            'Authorization': `Bearer ${session.get('token')}`,
            cancelToken: source.token
        }
    }).then(resp => {

        if (resp.data.successFlag) {
            callback(resp.data.data)
        }
        else {
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
export const GetPatientPrescriptionsMedication = (patientId, callback) => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    axios.get(`${config.api}Transaction/GetPatientPrescriptionsMedication?patientId=${patientId}`, {
        headers: {
            'Authorization': `Bearer ${session.get('token')}`,
            cancelToken: source.token
        }
    }).then(resp => {

        if (resp.data.successFlag) {
            callback(resp.data.data)
        }
        else {
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

export const GetPharmacyBankDetails = (pharmacyId, callback) => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    axios.get(`${config.api}Transaction/GetPatientPrescriptionsMedication?patientId=${pharmacyId}`, {
        headers: {
            'Authorization': `Bearer ${session.get('token')}`,
            cancelToken: source.token
        }
    }).then(resp => {

        if (resp.data.successFlag) {
            callback(resp.data.data)
        }
        else {
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

export const updateTransaction = (Id, obj, callback) => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    obj.EditBy = session.get('user').UserId;
    axios.post(`${config.api}Transaction/UpdateTransaction?id=${Id}`, obj, {
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
export const updatePImage = (Id, obj, callback) => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    axios.post(`${config.api}Transaction/UpdatePImage?id=${Id}`, obj, {
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
export const deleteTransaction = (Id, callback) => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    axios.delete(`${config.api}Transaction/DeleteTransaction/${Id}`, {
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
export const deletePImage = (Id, callback) => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    debugger
    axios.delete(`${config.api}Transaction/DeletePImage/${Id}`, {
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
export const deletePatient = (Id, callback) => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    axios.delete(`${config.api}Patient/RemovePatient/${Id}`, {
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