import React, { Component, Fragment } from 'react';
import { Popup, ToolbarItem } from 'devextreme-react/popup';
import ScrollView from 'devextreme-react/scroll-view';
import TextBox from 'devextreme-react/text-box';
import TextArea from 'devextreme-react/text-area';
import { Button } from 'devextreme-react/button';
import notify from 'devextreme/ui/notify';
import common from '../../../utils/common';

import { getChemistBankDetails,updateChemistBankDetails } from '../actions/index';


class BankDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPharmacy: props.currentPharmacy,
            accountDetailPopupVisible: props.accountDetailPopupVisible,
            currentData: {
                Id: props.currentPharmacy.ChemistId,
                AccountTitle: props.currentPharmacy.AccountTitle,
                AccountNumber: props.currentPharmacy.AccountNumber,
                BankName: props.currentPharmacy.BankName
            },
            formDisable: false,
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Event handler for input changes
    handleInputChange = event => {
        var changedState = this.state.currentData;
        const component = event.component.NAME;//dxCheckBox//dxTextBox//dxDateBox/dxSelectBox//dxNumberBox//dxRadioGroup
        const name = event.element.id;
        var value = (component === "dxDateBox") ? common.ConverDateToSQLFormat(event.value, "-") : event.value;
        changedState[name] = value;
        this.setState({
            currentData: changedState,
        });
        
        console.log(this.state.currentData);
    }
    // Event handler for form submission
    handleSubmit = (event) => {

        

        if (common.empty(this.state.currentData.AccountTitle))
            return notify("Enter Account Title", 'error', 600);
        if (common.empty(this.state.currentData.AccountNumber))
            return notify("Enter Account Number", 'error', 600);
        if (common.empty(this.state.currentData.BankName))
            return notify("Enter Bank Name", 'error', 600);

         this.setState({ formDisable: true });

        updateChemistBankDetails(this.state.currentData, (res) => {
            
            this.props.hideAccountDetailPopup(this.state.currentData);

            this.setState({
                formDisable: false,
                currentData: {
                    AccountTitle: '',
                    AccountNumber: '',
                    AccountNumber: ''
                }
            });

            if (res.data.successFlag) {
                notify('You have submitted the form', 'success', 3000);
            }
            else {
                notify(res.data.activityInfo, 'error', 600);
            }
            
            
        })

        // Access the input values from this.state
    };

    hideModel(id) {
        var modal = document.getElementById("myModal");
        modal.style.display = "none";
    }

    /*componentDidMount() {
        getChemistBankDetails(this.state.currentPharmacy.ChemistId, (data) => {
            console.log('Chemist Bank Details', data);
            this.setState({ currentData: data })
        });
    }*/

    render() {
        return (
            <Fragment>
            <Popup
                    visible={this.state.accountDetailPopupVisible}
                    onHiding={this.props.hideAccountDetailPopup}
                    dragEnabled={false}
                    closeOnOutsideClick={true}
                    showTitle={true}
                    title={(`Bank details of ${this.state.currentPharmacy.ChemistName}`)}
                    width='50%'
                    height='50%'>
                    <ScrollView width='100%' height='100%'>

                        <div className="form-group row">
                            <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Account Title</label>
                            <div className="col-sm-4">
                                <TextBox 
                                className="form-control mb-4 form-control-lg"
                                    id="AccountTitle"
                                    name="AccountTitle"
                                    defaultValue={this.state.currentPharmacy.AccountTitle} 
                                    placeholder="Account Title" 
                                    showClearButton={true}
                                    onValueChanged={e => this.handleInputChange(e)}
                                    />
                            </div>
                            <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Account Number</label>
                            <div className="col-sm-4">
                                <TextBox
                                    className="form-control mb-4 form-control-lg"
                                    id="AccountNumber" 
                                    name="AccountNumber"
                                    defaultValue={this.state.currentPharmacy.AccountNumber} 
                                    placeholder="Account Number" 
                                    showClearButton={true}
                                    onValueChanged={e => this.handleInputChange(e)} />
                            </div>
                        </div>
                        
                        <div className="form-group row">
                            <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Bank Name</label>
                            <div className="col-sm-4">
                                <TextBox 
                                    className="form-control mb-4 form-control-lg"
                                    id="BankName" 
                                    name="BankName"
                                    defaultValue={this.state.currentPharmacy.BankName} 
                                    placeholder="Bank Name" 
                                    showClearButton={true}
                                    onValueChanged={e => this.handleInputChange(e)} />
                            </div>
                            <div style={{ marginLeft: '15%' }} className="col-sm-4 text-center">
                                <Button
                                    id="myButton"
                                    width={120}
                                    className="form-control mb-4 form-control-lg"
                                    text="Submit"
                                    disabled={this.state.formDisable}
                                    style={{ backgroundColor: "lightblue !important" }}
                                    onClick={e => this.handleSubmit(e)}
                                />
                            </div>
                        </div>

                        <div id="myModal" className="modal-local">
                            <span className="close" onClick={this.hideModel}>&times;</span>
                            <img className="modal-content-local" id="img01" />
                            <div id="caption"></div>
                        </div>
                    </ScrollView>
                </Popup>
            </Fragment>
     )};
}



export default BankDetails;


