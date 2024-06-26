import React, { Component } from 'react';
import { Button } from 'devextreme-react/button';
import Uploader from '../../Common/uploader/index';
import { upload } from './actions/index';
import './style.css'
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
        };
    }
    AfterUploadCallback = (e) => {
        var resp = JSON.parse(e.request.response);
        if (resp.successFlag)
            upload(resp.data, (res) => {
                this.setState({ message: res.activityInfo })
            })
    }
    render() {
        return (
            <div className='container-fluid'>
                <div id="fileuploader">
                    <fieldset className="scheduler-border">
                        <legend className="scheduler-border">Weekly Stock</legend>
                        <div className='row'>
                            <div className="col-md-6">
                                <div className="">
                                    <a  href={process.env.PUBLIC_URL + '/assets/Samples/Product_Stock.xlsx'}>Download Samples</a>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="text-right">
                                    {this.state.message}
                                </div>
                            </div>
                        </div>
                        <div className="widget-container">
                            <Uploader AfterUploadCallback={this.AfterUploadCallback} />
                        </div>
                    </fieldset>
                </div>
            </div>
        );
    }
}

export default index;