import React, { Component } from "react";
import { connect } from "react-redux";
import { Popup, ToolbarItem } from "devextreme-react/popup";
import { Fragment } from "react";
import SelectBox from "devextreme-react/select-box";
import TextBox from "devextreme-react/text-box";
import DateBox from "devextreme-react/date-box";
import RadioGroup from "devextreme-react/radio-group";
import CheckBox from "devextreme-react/check-box";
import NumberBox from "devextreme-react/number-box";
import ScrollView from "devextreme-react/scroll-view";
import session from "../../../../utils/session";
import "../style.css";
import common from "../../../../utils/common";
import {
  getLookupGender,
  getAllLookupPatients,
} from "../../../Common/actions/index";
import { updatePatient } from "../actions/index";
import { getLookupLocality } from "../../../Common/actions/index";

import {
  FormItem,
  EmailRule,
  RequiredRule,
  PatternRule,
  StringLengthRule,
  ValidationRule
} from 'devextreme-react/data-grid';


class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPatient: props.currentPatient,
      currentIDMStatusId: 2,
      popupVisible: props.popupVisible,
      lookupGender: [],
      lookupSite: [],
      lookupSiteSub: [],
      lookupSiteSubFilter: [],
      lookupPreviouslyTreated: [],
      lookupInvestigation0Month: [],
      lookupInvestigation0MonthSub: [],
      lookupInvestigationFilter: [],
      lookupRegimen: [],
      lookupDST: [],
      lookupOutcome: [],
      lookupLocality: [],
      lookupLocalityFilter: [],
      lookupDistrict: [],
      disableButton: false,
      disabledForm: false,
      disabledCommonDcDtc: false,
      disabledDc: false,
      disabledDtc: false,
      disableArea: true,
      lookupRadioGroup: [
        { id: 1, text: "Notified" },
        { id: 2, text: "Referback to DC/DTC" },
      ],
    };
    this.buttonOptions = {
      text: "Submit",
      onClick: this.customButtonClick.bind(this),
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  customButtonClick() {
    this.setState({ disableButton: true });
    var data = this.state.currentPatient;
    data.ReferedToDcDtc =
      common.empty(data.ReferedToDcDtc) || !data.ReferedToDcDtc ? null : 1;
    data.Verified = common.empty(data.Verified) || !data.Verified ? null : 1;
    data.NotifyInIdm =
      common.empty(data.NotifyInIdm) || !data.NotifyInIdm ? null : 1;
    data.Notified = common.empty(data.Notified) || !data.Notified ? null : 1;
    data.ReferBackTo =
      common.empty(data.ReferBackTo) || !data.ReferBackTo ? null : 1;
    data.ReferBackToDc =
      common.empty(data.ReferBackToDc) || !data.ReferBackToDc ? null : 1;
    data.ReferBackToDtc =
      common.empty(data.ReferBackToDtc) || !data.ReferBackToDtc ? null : 1;
    updatePatient(data.Id, data, (res) => {
      this.props.hidePopup();
      this.setState({ popupVisible: false, disableButton: false });
    });
  }
  handleInputChange = (event) => {
    debugger;
    var locality = this.state.lookupLocalityFilter;
    var changedPatientState = this.state.currentPatient;
    var filter0month = this.state.lookupInvestigationFilter;
    var subSite = this.state.lookupSiteSub;
    const component = event.component.NAME; //dxCheckBox//dxTextBox//dxDateBox/dxSelectBox//dxNumberBox//dxRadioGroup
    const name = event.element.id;
    var value =
      component === "dxDateBox"
        ? common.ConverDateToSQLFormat(event.value, "-")
        : event.value;
    if (name === "NotifyInIdm") {
      value = event.value.id;
      if (value == "1") {
        changedPatientState.Notified = true;
        changedPatientState.ReferBackTo = false;
        changedPatientState.ReferBackToRemarks = "";
      } else if (value == "2") {
        changedPatientState.Notified = false;
        changedPatientState.ReferBackTo = true;
        changedPatientState.ReferBackToRemarks = "";
      } else {
        changedPatientState.Notified = false;
        changedPatientState.ReferBackTo = false;
        changedPatientState.ReferBackToRemarks = "";
      }
    }
    if (name === "Investigation0MonthId") {
      if (value === 21) {
        changedPatientState.Investigation0MonthSubId = 0;
        filter0month = this.state.lookupInvestigation0MonthSub.filter(
          (x) => x.LookupCategoryId === "9"
        );
      } else if (value === 23) {
        changedPatientState.Investigation0MonthSubId = 0;
        filter0month = this.state.lookupInvestigation0MonthSub.filter(
          (x) => x.LookupCategoryId === "10"
        );
      } else {
        changedPatientState.Investigation0MonthSubId = 0;
        filter0month = [];
      }
    }
    if (name === "Investigation0MonthSubId") {
      value = event.value.id;
    }
    if (name === "SiteId") {
      if (value == "16") {
        changedPatientState.SiteSubId = 0;
        subSite = [];
      }
    }
    if (name === "SiteSubId") {
      value = event.value.id;
    }
    if (name === "DistrictId") {
      locality = this.state.lookupLocality.filter((x) => x.ParentId == value);
    }
    changedPatientState[name] = value;
    this.setState({
      currentPatient: changedPatientState,
      lookupInvestigationFilter: filter0month,
      lookupSiteSubFilter: subSite,
      lookupLocalityFilter: locality,
    });
  };
  componentDidMount() {
    switch (Number(session.get("user").DesignationId)) {
      case 4:
        var ApprovedByDC =
          this.props.currentPatient.ApprovedByDC !== 0 ? true : false;
        this.setState({
          disabledForm: ApprovedByDC,
          disabledCommonDcDtc: true,
          disabledDc: true,
        });
        break;
      case 5:
        var ApprovedByDTC =
          this.props.currentPatient.ApprovedByDTC !== 0 ? true : false;
        this.setState({
          disabledForm: ApprovedByDTC,
          disabledCommonDcDtc: true,
          disabledDtc: true,
        });
        break;
      case 7:
      case 1:
        this.setState({ disableArea: false });
        break;
    }
    getLookupGender((data) => {
      this.setState({ lookupGender: data });
      getAllLookupPatients((data) => {
        this.setState({
          lookupSite: data.filter((x) => x.LookupCategoryId === "6"),
          lookupSiteSub: data
            .filter((x) => x.LookupCategoryId === "14")
            .map((x) => {
              return {
                LookupCategoryId: x.LookupCategoryId,
                id: x.Id,
                text: x.Name,
              };
            }),
          lookupSiteSubFilter:
            this.state.currentPatient.SiteId == 14 ||
            this.state.currentPatient.SiteId == 15
              ? data
                  .filter((x) => x.LookupCategoryId === "14")
                  .map((x) => {
                    return {
                      LookupCategoryId: x.LookupCategoryId,
                      id: x.Id,
                      text: x.Name,
                    };
                  })
              : [],
          lookupPreviouslyTreated: data.filter(
            (x) => x.LookupCategoryId === "7"
          ),
          lookupInvestigation0Month: data.filter(
            (x) => x.LookupCategoryId === "8"
          ),
          lookupInvestigation0MonthSub: data
            .filter(
              (x) => x.LookupCategoryId === "9" || x.LookupCategoryId === "10"
            )
            .map((x) => {
              return {
                LookupCategoryId: x.LookupCategoryId,
                id: x.Id,
                text: x.Name,
              };
            }),
          lookupInvestigationFilter:
            this.state.currentPatient.Investigation0MonthId == 21
              ? data
                  .filter((x) => x.LookupCategoryId === "9")
                  .map((x) => {
                    return {
                      LookupCategoryId: x.LookupCategoryId,
                      id: x.Id,
                      text: x.Name,
                    };
                  })
              : this.state.currentPatient.Investigation0MonthId == 23
              ? data
                  .filter((x) => x.LookupCategoryId === "10")
                  .map((x) => {
                    return {
                      LookupCategoryId: x.LookupCategoryId,
                      id: x.Id,
                      text: x.Name,
                    };
                  })
              : [],
          lookupRegimen: data.filter((x) => x.LookupCategoryId === "11"),
          lookupDST: data.filter((x) => x.LookupCategoryId === "12"),
          lookupOutcome: data.filter((x) => x.LookupCategoryId === "13"),
        });
        getLookupLocality((data) => {
          const result = [];
          const map = new Map();
          for (const item of data) {
            if (!map.has(item.LocalityId)) {
              map.set(item.LocalityId, true); // set any value to Map
              result.push({
                Id: item.LocalityId,
                Name: item.LocalityName,
                ParentId: item.DistrictId,
              });
            }
          }
          const district = [];
          const map1 = new Map();
          for (const item of data) {
            if (!map1.has(item.DistrictId)) {
              map1.set(item.DistrictId, true); // set any value to Map
              district.push({
                Id: item.DistrictId,
                Name: item.DistrictName,
              });
            }
          }
          console.log(result);
          console.log(district);
          this.setState({
            lookupLocality: result,
            lookupLocalityFilter: result.filter(
              (x) => x.ParentId == this.state.currentPatient.DistrictId
            ),
            lookupDistrict: district,
          });
        });
      });
    });
  }
  render() {
    return (
      <Fragment>
        <Popup
          visible={this.state.popupVisible}
          onHiding={this.props.hidePopup}
          dragEnabled={false}
          closeOnOutsideClick={true}
          showTitle={true}
          // disabled={this.state.disabledForm}
          title="Update Patient Information"
          width="90%"
          height="90%"
        >
          <ToolbarItem
            disabled={this.state.disabledForm}
            options={this.buttonOptions}
            widget="dxButton"
            // disabled={this.state.disableButton}
            location="after"
            toolbar="bottom"
          />
          <ScrollView width="100%" height="100%">
            <form>
              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Date of Registration
                </label>
                <div className="col-sm-4">
                  <DateBox
                    id="AddedDate"
                    disabled={this.state.disabledDtc}
                    type="date"
                    defaultValue={this.state.currentPatient.AddedDate}
                    onValueChanged={(e) => this.handleInputChange(e)}
                  />
                </div>
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Patient Name
                </label>
                <div className="col-sm-4">
                  <TextBox
                    className=""
                    id="Name"
                    disabled={this.state.disabledDtc}
                    defaultValue={this.state.currentPatient.Name}
                    placeholder=""
                    showClearButton={true}
                    onValueChanged={(e) => this.handleInputChange(e)}
                  />
                </div>
              </div>

              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Locality:</label>
                <div className="col-sm-4">
              
                    <SelectBox
                    dataSource={this.state.lookupDistrict}
                    displayExpr="Name"
                    searchEnabled={true}
                    valueExpr="Id"
                    defaultValue={this.state.currentPatient.Locality}
                    id="Locality"
                    placeholder=""
                    searchMode={"contains"}
                    onValueChanged={(e) => this.handleInputChange(e)}
                    searchExpr={"Name"}
                        >
                        <RequiredRule message="Locality is required" />
                        <ValidationRule />
                    </SelectBox>
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Gender
                </label>
                <div className="col-sm-4">
                  <SelectBox
                    dataSource={this.state.lookupGender}
                    displayExpr="Name"
                    searchEnabled={true}
                    valueExpr="Id"
                    disabled={this.state.disabledDtc}
                    defaultValue={this.state.currentPatient.Gender}
                    id="Gender"
                    placeholder=""
                    searchMode={"contains"}
                    onValueChanged={(e) => this.handleInputChange(e)}
                    searchExpr={"Name"}
                  />
                </div>
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Age
                </label>
                <div className="col-sm-4">
                  <NumberBox
                    id="Age"
                    disabled={this.state.disabledDtc}
                    defaultValue={this.state.currentPatient.Age}
                    showSpinButtons={true}
                    showClearButton={true}
                    placeholder=""
                    onValueChanged={(e) => this.handleInputChange(e)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  CNIC
                </label>
                <div className="col-sm-4">
                  <TextBox
                    className=""
                    disabled={this.state.disabledDtc}
                    id="Cnic"
                    defaultValue={this.state.currentPatient.Cnic}
                    placeholder=""
                    showClearButton={true}
                    onValueChanged={(e) => this.handleInputChange(e)}
                  />
                </div>
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Address
                </label>
                <div className="col-sm-4">
                  <TextBox
                    className=""
                    disabled={this.state.disabledDtc}
                    id="Address"
                    defaultValue={this.state.currentPatient.Address}
                    placeholder=""
                    showClearButton={true}
                    onValueChanged={(e) => this.handleInputChange(e)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Contact #
                </label>
                <div className="col-sm-4">
                  <TextBox
                    className=""
                    disabled={this.state.disabledDtc}
                    id="MobileNumber"
                    defaultValue={this.state.currentPatient.MobileNumber}
                    placeholder=""
                    showClearButton={true}
                    onValueChanged={(e) => this.handleInputChange(e)}
                  />
                </div>
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Treatment Start Date
                </label>
                <div className="col-sm-4">
                  <DateBox
                    id="TreatmentStartDate"
                    disabled={this.state.disabledDtc}
                    defaultValue={this.state.currentPatient.TreatmentStartDate}
                    type="date"
                    onValueChanged={(e) => this.handleInputChange(e)}
                  />
                </div>
              </div>
            </form>
          </ScrollView>
        </Popup>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  patient: state.patient.data,
});
export default connect(mapStateToProps)(index);
