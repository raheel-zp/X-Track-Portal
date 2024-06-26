import axios from 'axios';
import notify from 'devextreme/ui/notify';
import config from '../../../../config.json';
import session from '../../../../utils/session';
import common from '../../../../utils/common';

export const upload = (path, callback) => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    let id = session.get('user').UserId;
    const data = {
        UserId: Number(session.get('user').UserId),
        Path: path
    }
    axios.post(`${config.api}Uploader/ProductStock`, data, {
        headers: {
            'Authorization': `Bearer ${session.get('token')}`,
            cancelToken: source.token
        }
    }).then(resp => {
        if (resp.data.successFlag) {
            callback(resp.data)
        }
        else {
            notify(resp.data.activityInfo, 'error', 600);
            callback(resp.data)
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