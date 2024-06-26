import React, { Component, Fragment } from 'react';
import TextBox from 'devextreme-react/text-box';
import TextArea from 'devextreme-react/text-area';
import { Button } from 'devextreme-react/button';
import common from '../../utils/common';
import notify from 'devextreme/ui/notify';
import './style.css';
import { addContactUsInformation } from './actions/index';
class form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentData: {
                Name: '',
                ContactNo: '',
                Email: '',
                Detail: ''
            },
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }
    onClick(e) {
        if (common.empty(this.state.currentData.Name))
            return notify("Enter Name", 'error', 600);
        if (common.empty(this.state.currentData.ContactNo))
            return notify("Enter Contact No", 'error', 600);
        if (common.empty(this.state.currentData.Email))
            return notify("Enter Email", 'error', 600);
        if (common.empty(this.state.currentData.Detail))
            return notify("Enter Detail", 'error', 600);
        addContactUsInformation(this.state.currentData, (res) => {
            debugger
            this.setState({
                currentData: {
                    Name: '',
                    ContactNo: '',
                    Email: '',
                    Detail: ''
                }
            })
        })
    }
    handleInputChange = event => {
        var changedState = this.state.currentData;
        const component = event.component.NAME;//dxCheckBox//dxTextBox//dxDateBox/dxSelectBox//dxNumberBox//dxRadioGroup
        const name = event.element.id;
        var value = (component === "dxDateBox") ? common.ConverDateToSQLFormat(event.value, "-") : event.value;
        changedState[name] = value;
        this.setState({
            currentData: changedState,
        });
    }
    render() {
        return (
            <div className="container-fluid">
                <div className="row d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Contact Us</h1>
                </div>
                <div className="row">
                    <TextBox value={this.state.currentData.Name} className="form-control mb-4 form-control-lg" id="Name" placeholder="Name:" showClearButton={true} onValueChanged={e => this.handleInputChange(e)} />
                    <TextBox value={this.state.currentData.ContactNo} className="form-control mb-4 form-control-lg" id="ContactNo" placeholder="Contact No:" showClearButton={true} onValueChanged={e => this.handleInputChange(e)} />
                    <TextBox value={this.state.currentData.Email} className="form-control mb-4 form-control-lg" id="Email" placeholder="Email Address:" showClearButton={true} onValueChanged={e => this.handleInputChange(e)} />
                    <TextArea
                        id="Detail"
                        value={this.state.currentData.Detail} className="form-control mb-4 form-control-lg"
                        showClearButton={true} placeholder="Details/Message:"
                        height={100}
                        maxLength={500}
                        onValueChanged={e => this.handleInputChange(e)}
                    />
                    <div style={{ marginLeft: '15%' }} className="text-center">
                        {/* <button type="button" className="btn mb-4 btn-danger">Danger</button> */}
                        <Button
                            id="myButton"
                            width={120}
                            className="form-control mb-4 mt-4 form-control-lg"
                            text="Submit"
                            style={{ backgroundColor: "lightblue !important" }}
                            onClick={this.onClick}
                        />
                        <h3 className="text-muted mt-3 mb-2">For more information please call on our Free Helpline Number at</h3>
                        <h2 className="text-muted"><i className="fas fa-phone fa-flip-horizontal"></i><span> +92 800 55511</span></h2>
                    </div>
                </div>
            </div>
        );
    }
}

export default form;