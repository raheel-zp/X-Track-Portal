import React, { Component } from 'react';
import { Popup, ToolbarItem } from 'devextreme-react/popup';
import { Fragment } from 'react';
import ScrollView from 'devextreme-react/scroll-view';
import Multiselect from 'multiselect-react-dropdown';
import TextBox from 'devextreme-react/text-box';
import { addEmployee, updateEmployee } from './../actions/index';
import common from '../../../utils/common';
import { getLookupDesignation, getLookupGender, getLookupLocality } from '../../Common/actions/index';
import notify from 'devextreme/ui/notify';
import { TextArea, ValidationGroup } from 'devextreme-react';
import DateBox from 'devextreme-react/date-box';
import SelectBox from "devextreme-react/select-box";
import { Button } from 'devextreme-react/button';

import {
    FormItem,
    EmailRule,
    RequiredRule,
    PatternRule,
    StringLengthRule,
    ValidationRule
} from 'devextreme-react/data-grid';

class UserForm extends Component {
  constructor(props) {
    super(props);

    console.log('Edit user:', props.currentUser);

    this.state = {

      multiSelect: true,
      hideLocality: false,
      desginationId: 0,
      lookupDesignation: props.lookupDesignation,
      lookupGender: props.lookupGender,
      lookupLocality: props.lookupLocality,
      lookupDistrict: props.lookupDistrict,
      lookupAllLocality: props.lookupAllLocality,
      lookupProvince: props.lookupProvince,
      CRUDstate: false,
      selectedValue: null,
        employeeData: {
            Fullname: props.currentUser.Fullname,
            Email: props.currentUser.Email,
            Password: props.currentUser.Password,
            DesignationId: props.currentUser.DesignationId,
            GenderId: 1,
            LocalityId: (props.currentUser.DesignationId == 3) ? parseInt(props.currentUser.LocalityId) : props.currentUser.LocalityId,
            MobileNumber: props.currentUser.MobileNumber,
            MobileNumber2: props.currentUser.MobileNumber2,
            JoiningDate: props.currentUser.JoiningDate,
            Remarks: props.currentUser.Remarks,
            UserId: props.UserId
        },
        selectedValues : [],
        isVisible: false,
        formDisable: false,

    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onSelect = this.onSelect.bind(this);
    
  }

  handleInputChange = (event) => {

        var changedState = this.state.employeeData;
        const component = event.component.NAME;//dxCheckBox//dxTextBox//dxDateBox/dxSelectBox//dxNumberBox//dxRadioGroup
        const name = event.element.id;
        var value = (component === "dxDateBox") ? common.ConverDateToSQLFormat(event.value, "-") : event.value;

        changedState[name] = value;
        this.setState({
            currentData: changedState,
        });

        if (name === "DesignationId") {

            if (Number(value) === 3) {

                const updateLocality = {
                    ...this.state.employeeData,
                    LocalityId: ''
                };

                this.setState({ employeeData: updateLocality });

            } else{

                const updateLocality = {
                    ...this.state.employeeData,
                    LocalityId: []
                };

                this.setState({ employeeData: updateLocality });
            }

            if (Number(value) === 3) {
                this.setState({ lookupAllLocality: this.state.lookupProvince, desginationId: Number(value) });
            } else{
                var locality = (Number(value) === 1 || Number(value) === 4 || Number(value) === 5 || Number(value) === 8  || Number(value) === 9) ? this.state.lookupDistrict : (Number(value) === 6) ? this.state.lookupLocality : [];
                this.setState({ lookupAllLocality: locality, desginationId: Number(value) });
            }
        }

  }

    onSelect(selectedList, selectedItem) {

        const selectedLocalities = [];

        selectedList.forEach(element => {
            selectedLocalities.push(element.Id);
        });

         const updateLocality = {
            ...this.state.employeeData,
            LocalityId: selectedLocalities
        };

        this.setState({ employeeData: updateLocality });
    }

    handleSubmit = (e) => {
    
        if (common.empty(this.state.employeeData.Fullname))
            return notify("Please enter user name", 'error', 600);

        if (common.empty(this.state.employeeData.Email))
            return notify("Please enter email", 'error', 600);
        
        if (!common.validateEmail(this.state.employeeData.Email)) {
            return notify("Please enter valid email", 'error', 600);
        }

        if (common.empty(this.state.employeeData.Password))
            return notify("Please enter password", 'error', 600);
        else if (common.passwordValidate(this.state.employeeData.Password))
            return notify("Password must be atleast 6 characters", 'error', 600);
        
        if (common.empty(this.state.employeeData.DesignationId))
            return notify("Please select designation", 'error', 600);


        if ( this.state.employeeData.DesignationId == 3) {
            if (common.empty(this.state.employeeData.LocalityId))
                return notify("Please select locality", 'error', 600);
        }
        else{
            if (common.empty(this.state.employeeData.LocalityId))
                return notify("Please select locality", 'error', 600);
        }


        if (common.empty(this.state.employeeData.GenderId))
            return notify("Please select gender", 'error', 600);

        if (common.empty(this.state.employeeData.MobileNumber))
            return notify("Please enter mobile number", 'error', 600);

        if (common.mobileNumberLengthValidate(this.state.employeeData.MobileNumber))
            return notify("Please enter proper 11 digit mobile number", 'error', 600);

        
        //if ( this.state.employeeData.DesignationId != 3) {

           const newLocalityIds = this.state.employeeData.LocalityId.toString();

            const updateLocality = {
                ...this.state.employeeData,
                LocalityId: newLocalityIds
            };

            this.setState({ employeeData: updateLocality });
        //}
       

        this.setState({ formDisable: true });

        if (this.props.currentUser.hasOwnProperty('ReferenceId') && this.props.currentUser.ReferenceId != null){

            updateEmployee(this.props.currentUser.Id, this.state.employeeData, (res) => {

                this.props.hidePopup(this.state.employeeData);
        
                if (res.data.successFlag) {
                    notify('You have submitted the form', 'success', 3000);
                }
                else {
                    notify(res.data.activityInfo, 'error', 600);
                }

            });

        } else{
            addEmployee(this.state.employeeData, (res) => {
            
                this.props.hidePopup(this.state.employeeData);
        
                if (res.data.successFlag) {
                    notify('You have submitted the form', 'success', 3000);
                }
                else {
                    notify(res.data.activityInfo, 'error', 600);
                }
            });
        }


    };

  componentDidMount() {
      
    if ( this.state.employeeData.DesignationId){

        const designationId = this.state.employeeData.DesignationId;

        if (Number(designationId) === 3) {
            this.setState({ lookupAllLocality: this.state.lookupProvince, desginationId: Number(designationId) });
        } else{
            var locality = (Number(designationId) === 1 || Number(designationId) === 4 || Number(designationId) === 5 || Number(designationId) === 8  || Number(designationId) === 9) ? this.state.lookupDistrict : (Number(designationId) === 6) ? this.state.lookupLocality : [];
            this.setState({ lookupAllLocality: locality, desginationId: Number(designationId) });

            const selectedLocalitiesList = [];

            if (this.state.employeeData.LocalityId){

                if (this.state.employeeData.LocalityId.includes(',')){

                    const selectedItems = this.state.employeeData.LocalityId.split(',');
    
                    const selectedItemsArray = selectedItems.map( item => parseInt(item)); // Convert each substring to an integer
    
                    const commonElements = locality.filter(item => selectedItemsArray.includes(item.Id));
    
                    this.setState({selectedValues: commonElements});
    
                }
                else {
    
                    const foundItem = locality.find(item => item.Id == parseInt(this.state.employeeData.LocalityId));
    
                    this.setState({selectedValues: foundItem});
    
                }
    
            }

        }

    }

}

  render() {
    return (
      <Fragment>
                <Popup
                    visible={this.props.popupVisible}
                    onHiding={this.props.hidePopup}
                    dragEnabled={false}
                    closeOnOutsideClick={true}
                    showTitle={true}
                    title="User Information"
                    width='75%'
                    height='75%'>
                    <ScrollView width='100%' height='100%'>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Employee Name: *</label>
                                <div className="col-sm-4">
                                    <TextBox 
                                        className="" 
                                        id="Fullname" 
                                        defaultValue={this.state.employeeData.Fullname} 
                                        placeholder="" 
                                        onValueChanged={(e) => this.handleInputChange(e)} 
                                        showClearButton={true} >
                                        <RequiredRule message="First Name is required" />
                                    </TextBox>
                                </div>
                                <label className="col-sm-2 col-form-label">Email: *</label>
                                <div className="col-sm-4">
                                    <TextBox 
                                        className="" 
                                        id="Email"
                                        defaultValue={this.state.employeeData.Email} 
                                        placeholder="" 
                                        onValueChanged={(e) => this.handleInputChange(e)} 
                                        showClearButton={true} >
                                        <RequiredRule message="Email is required" />
                                        <EmailRule message="Invalid email format" />
                                    </TextBox>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Password: *</label>
                                <div className="col-sm-4">
                                    <TextBox 
                                        className="" 
                                        id="Password" 
                                        mode="password" // Set the mode to "password"
                                        defaultValue={this.state.employeeData.Password} 
                                        placeholder="" 
                                        onValueChanged={(e) => this.handleInputChange(e)} 
                                        showClearButton={true} >
                                        <FormItem visible={true} />
                                        <RequiredRule />
                                    </TextBox>
                                </div>
                                <label className="col-sm-2 col-form-label">Designation: *</label>
                                <div className="col-sm-4">
                                    <SelectBox
                                        dataSource={this.state.lookupDesignation}
                                        displayExpr="Name"
                                        searchEnabled={true}
                                        valueExpr="Id"
                                        defaultValue={this.state.employeeData.DesignationId}
                                        id="DesignationId"
                                        placeholder=""
                                        searchMode={"contains"}
                                        onValueChanged={(e) => this.handleInputChange(e)}
                                        searchExpr={"Name"}
                                            >
                                            <RequiredRule message="Designation is required" />
                                            <ValidationRule />
                                    </SelectBox>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Locality:</label>
                                <div className="col-sm-4">
                                { (this.state.employeeData.DesignationId == 3) ?

                                    <SelectBox
                                    dataSource={this.state.lookupAllLocality}
                                    displayExpr="Name"
                                    searchEnabled={true}
                                    valueExpr="Id"
                                    defaultValue={this.state.employeeData.LocalityId}
                                    id="LocalityId"
                                    placeholder=""
                                    searchMode={"contains"}
                                    onValueChanged={(e) => this.handleInputChange(e)}
                                    searchExpr={"Name"}
                                        >
                                        <RequiredRule message="Locality is required" />
                                        <ValidationRule />
                                    </SelectBox>

                                        : 
                                        <Multiselect
                                        options={this.state.lookupAllLocality} // Options to display in the dropdown
                                        onSelect={this.onSelect} // Function will trigger on select event
                                        onRemove={this.onSelect} // Function will trigger on remove event
                                        displayValue="Name" // Property name to display in the dropdown options
                                        id="Id"
                                        selectionLimit={5}
                                        selectedValues={this.state.selectedValues}
                                        /> 
                                    }
                                </div>
                                <label className="col-sm-2 col-form-label">Gender: *</label>
                                <div className="col-sm-4">
                                <SelectBox
                                    dataSource={this.state.lookupGender}
                                    displayExpr="Name"
                                    searchEnabled={true}
                                    valueExpr="Id"
                                    defaultValue={this.state.employeeData.GenderId}
                                    id="GenderId"
                                    placeholder=""
                                    searchMode={"contains"}
                                    onValueChanged={(e) => this.handleInputChange(e)}
                                    searchExpr={"Name"}
                                    >
                                    <RequiredRule message="Gender is required" />
                                    <ValidationRule />
                                </SelectBox>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Mobile Number: *</label>
                                <div className="col-sm-4">
                                    <TextBox 
                                        className="" 
                                        id="MobileNumber" 
                                        defaultValue={this.state.employeeData.MobileNumber} 
                                        onValueChanged={(e) => this.handleInputChange(e)} 
                                        placeholder="" 
                                        showClearButton={true} >
                                        <RequiredRule />
                                        <StringLengthRule
                                            min={11}
                                            max={11}
                                            message="Mobile Number must have at least 11 symbols"
                                        />
                                        <PatternRule
                                            message={'Do not use alphabets in the Name.'}
                                            pattern={/^[0-9]*$/}
                                        />
                                    </TextBox>    
                                </div>
                                <label className="col-sm-2 col-form-label">Mobile Number 2:</label>
                                <div className="col-sm-4">
                                    <TextBox className="" id="MobileNumber2" defaultValue={this.state.employeeData.MobileNumber2} onValueChanged={(e) => this.handleInputChange(e)} placeholder="" showClearButton={true} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Joining Date:</label>
                                <div className="col-sm-4">
                                    <DateBox
                                            id="JoiningDate"
                                            type="date"
                                            defaultValue={this.state.employeeData.JoiningDate}
                                            onValueChanged={(e) => this.handleInputChange(e)}
                                        />
                                </div>
                                <label className="col-sm-2 col-form-label">Remarks:</label>
                                <div className="col-sm-4">
                                    <TextArea 
                                        className="" 
                                        id="Remarks" 
                                        defaultValue={this.state.employeeData.Remarks} 
                                        placeholder="" 
                                        showClearButton={true} />
                                </div>
                            </div>

                            <div className="form-group row">

                            <div className="col-sm-3 text-center">
                                    <Button
                                        id="myButton"
                                        width={120}
                                        className="form-control mb-4 form-control-lg"
                                        text="Save"
                                        disabled={this.state.formDisable}
                                        style={{ backgroundColor: "lightblue !important" }}
                                        onClick={(e) =>this.handleSubmit(e)}
                                    />
                                </div>
                            </div>
                      </ScrollView>
                </Popup>

            </Fragment>


    );
  }
}

export default UserForm;
