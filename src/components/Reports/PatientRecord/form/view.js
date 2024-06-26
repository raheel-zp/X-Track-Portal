import React, { Component } from 'react';
import { Popup, ToolbarItem } from 'devextreme-react/popup';
import { Fragment } from 'react';
import notify from 'devextreme/ui/notify';
import { Button } from 'devextreme-react/button';
import ScrollView from 'devextreme-react/scroll-view';
import SelectBox from 'devextreme-react/select-box';
import TextBox from 'devextreme-react/text-box';
import DateBox from 'devextreme-react/date-box';
import RadioGroup from 'devextreme-react/radio-group';
import CheckBox from 'devextreme-react/check-box';
import NumberBox from 'devextreme-react/number-box';
import common from '../../../../utils/common';
import '../style.css';
import { getPatientPerscription, getPatientPrescriptionVoice, updatePatientPerscriptionStatus } from '../actions/index';
import { getLookupGender, getAllLookupPatients } from '../../../Common/actions/index';
import { getLookupLocality } from '../../../Common/actions/index';
import { TextArea } from 'devextreme-react';
import ReactAudioPlayer from 'react-audio-player';

class index extends Component {
    constructor(props) {
        super(props);

        console.log(props);
        this.state = {
            currentPatient: props.currentPatient,
            popupVisible: props.popupVisible2,
            imagesData: [],
            patientRecordedAudio: [],
            currentIDMStatusId: 2,
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
            disabledForm: false,
            disabledCommonDcDtc: false,
            disabledDc: false,
            lookupRadioGroup: [{ id: 1, text: 'Notified' }, { id: 2, text: 'Referback to DC/DTC' }],
            prescriptionStatus: [
                { id: 1, text: "Verified" },
                { id: 0, text: "Not Verified" },
              ],

            prescriptionData: {
                IsVerified: props.currentPatient.IsVerified,
                Comments: props.currentPatient.Comments,
                Id: props.currentPatient.Id
            },
            isVisible: (props.currentPatient.IsVerified == 0) ? true : false,
            formDisable: false,

        };
        this.showModel = this.showModel.bind(this);
        this.hideModel = this.hideModel.bind(this);

    }
    showModel(id) {
        var modal = document.getElementById("myModal");
        var modalImg = document.getElementById("img01");
        var captionText = document.getElementById("caption");
        modal.style.display = "block";
        modalImg.src = id.target.src;
        captionText.innerHTML = id.target.alt;
    }
    hideModel(id) {
        var modal = document.getElementById("myModal");
        modal.style.display = "none";
    }

    playAudio = (audioLink) => {
        let audio = new Audio(audioLink);
        audio.play()
    }

    // Event handler for input changes
    handleInputChange = event => {

        console.log('event fired:', event);

        var changedState = this.state.prescriptionData;
        const component = event.component.NAME;//dxCheckBox//dxTextBox//dxDateBox/dxSelectBox//dxNumberBox//dxRadioGroup
        const name = event.element.id;
        var value = (component === "dxDateBox") ? common.ConverDateToSQLFormat(event.value, "-") : event.value;


        if (name === "IsVerified") {
            value = event.value.id;
        }

        changedState[name] = value;
        this.setState({
            currentData: changedState,
        });

        if(name == "IsVerified" && value == 0){
            this.setState({ isVisible: true });
        } else if(name == "IsVerified" && value == 1){
            this.setState({ isVisible: false });
        }
    }

    handleSubmit = (event) => {

        if (common.empty(this.state.prescriptionData.IsVerified))
            return notify("Select validation status", 'error', 600);

        if( this.state.prescriptionData.IsVerified == 0) {
            if (common.empty(this.state.prescriptionData.Comments))
            return notify("Enter some comments for not validation", 'error', 600);
        }
        
         this.setState({ formDisable: true });

         updatePatientPerscriptionStatus(this.state.prescriptionData, (res) => {
            
            this.props.hidePopup2(this.state.prescriptionData);

            if (res.data.successFlag) {
                notify('You have submitted the form', 'success', 3000);
            }
            else {
                notify(res.data.activityInfo, 'error', 600);
            }
        })

        // Access the input values from this.state
    };

    componentDidMount() {
        getPatientPerscription(this.state.currentPatient.Id, (data) => {
            this.setState({ imagesData: data })
        })

        getPatientPrescriptionVoice(this.state.currentPatient.Id, (data) => {
            this.setState({ patientRecordedAudio: data })
        })

        
        getLookupGender((data) => {
            this.setState({ lookupGender: data })
            getAllLookupPatients((data) => {
                this.setState({
                    lookupSite: data.filter(x => x.LookupCategoryId === "6"),
                    lookupSiteSub: data.filter(x => x.LookupCategoryId === "14").map(x => {
                        return {
                            LookupCategoryId: x.LookupCategoryId,
                            id: x.Id,
                            text: x.Name
                        }
                    }),
                    lookupSiteSubFilter: (this.state.currentPatient.SiteId == 14 || this.state.currentPatient.SiteId == 15) ? data.filter(x => x.LookupCategoryId === "14").map(x => {
                        return {
                            LookupCategoryId: x.LookupCategoryId,
                            id: x.Id,
                            text: x.Name
                        }
                    }) : [],
                    lookupPreviouslyTreated: data.filter(x => x.LookupCategoryId === "7"),
                    lookupInvestigation0Month: data.filter(x => x.LookupCategoryId === "8"),
                    lookupInvestigation0MonthSub: data.filter(x => x.LookupCategoryId === "9" || x.LookupCategoryId === "10").map(x => {
                        return {
                            LookupCategoryId: x.LookupCategoryId,
                            id: x.Id,
                            text: x.Name
                        }
                    }),
                    lookupInvestigationFilter: this.state.currentPatient.Investigation0MonthId == 21 ? data.filter(x => x.LookupCategoryId === "9").map(x => {
                        return {
                            LookupCategoryId: x.LookupCategoryId,
                            id: x.Id,
                            text: x.Name
                        }
                    }) : this.state.currentPatient.Investigation0MonthId == 23 ? data.filter(x => x.LookupCategoryId === "10").map(x => {
                        return {
                            LookupCategoryId: x.LookupCategoryId,
                            id: x.Id,
                            text: x.Name
                        }
                    }) : [],
                    lookupRegimen: data.filter(x => x.LookupCategoryId === "11"),
                    lookupDST: data.filter(x => x.LookupCategoryId === "12"),
                    lookupOutcome: data.filter(x => x.LookupCategoryId === "13"),
                })
                getLookupLocality((data) => {

                    const result = [];
                    const map = new Map();
                    for (const item of data) {
                        if (!map.has(item.LocalityId)) {
                            map.set(item.LocalityId, true);    // set any value to Map
                            result.push({
                                Id: item.LocalityId,
                                Name: item.LocalityName,
                                ParentId: item.DistrictId
                            });
                        }
                    }
                    const district = [];
                    const map1 = new Map();
                    for (const item of data) {
                        if (!map1.has(item.DistrictId)) {
                            map1.set(item.DistrictId, true);    // set any value to Map
                            district.push({
                                Id: item.DistrictId,
                                Name: item.DistrictName
                            });
                        }
                    }
                    console.log(result);
                    console.log(district);
                    this.setState({ lookupLocality: result, lookupLocalityFilter: result.filter(x => x.ParentId == this.state.currentPatient.DistrictId), lookupDistrict: district });
                })
            })
        })
    }
    render() {
        return (
            <Fragment>
                <Popup
                    visible={this.state.popupVisible}
                    onHiding={this.props.hidePopup2}
                    dragEnabled={false}
                    closeOnOutsideClick={true}
                    showTitle={true}
                    title="Patient Information"//{(`Perscription list of ${this.state.currentPatient.Name}`)}
                    width='75%'
                    height='75%'>
                    <ScrollView width='100%' height='100%'>
                        <h3>Patient Prescription List</h3>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th className="text-center font-weight-bold">Sr.#</th>
                                    <th>Patient Name</th>
                                    <th>Date</th>
                                    <th>Voice</th>
                                    <th className="text-right">Prescription Image</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.imagesData.map((item, i) => {
                                    return (
                                        <Fragment key={i}>
                                            <tr>
                                                <td className="text-center font-weight-bold">{i + 1}</td>
                                                <td>{this.state.currentPatient.Name}</td>
                                                <td>{item.Date}</td>
                                                <td>
                                                {this.state.patientRecordedAudio.length > 0 && this.state.patientRecordedAudio.map((item, i) => {
                                                    return (
                                                        <Fragment key={i}>
                                                            <ReactAudioPlayer
                                                                src={item.Voice}
                                                                controls
                                                                />
                                                        </Fragment>
                                                    )
                                                })}
                                                </td>
                                                <td className="text-right" style={{ cursor: 'pointer' }}><img id={i + "image"} onClick={this.showModel} className="w-3 shadow-1-strong rounded" width='50px' height='50px' src={item.Image} alt={item.PatientId} /></td>
                                            </tr>
                                        </Fragment>
                                    )
                                })}
                            </tbody>
                        </table>

                        <h3>Prescription Validation</h3>
                        <div className="form-group row">
                            <label className="col-sm-1 col-form-label">Validate</label>
                            <div className="col-sm-4">
                                <RadioGroup
                                        layout="horizontal"
                                        id="IsVerified"
                                        className=""
                                        items={this.state.prescriptionStatus}
                                        defaultValue={this.state.prescriptionStatus.find(
                                            (x) => x.id == this.state.prescriptionData.IsVerified
                                          )}
                                        onValueChanged={(e) => this.handleInputChange(e)}
                                        />
                            </div>
                            <label style={{ display: this.state.isVisible ? 'block' : 'none' }} className="col-sm-1 col-form-label">Comments</label>
                            <div style={{ display: this.state.isVisible ? 'block' : 'none' }} className="col-sm-4">
                                <TextBox className="" id="Comments" defaultValue={this.state.prescriptionData.Comments} placeholder="Comments" showClearButton={true} onValueChanged={(e) => this.handleInputChange(e)} />
                            </div>
                            <div className="col-sm-2">
                                <Button
                                        id="myButton"
                                        className="btn btn-success"
                                        text="Save"
                                        disabled={this.state.formDisable}
                                        onClick={e => this.handleSubmit(e)}
                                    />
                            </div>
                        </div>

                        <h3>Patient Other Info</h3>
                        <form>
                            <div className="form-group row">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Date of Registration</label>
                                <div className="col-sm-4">
                                    <DateBox id="AddedDate" disabled={true} type="date" defaultValue={this.state.currentPatient.AddedDate} />
                                </div>
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Patient Name</label>
                                <div className="col-sm-4">
                                    <TextBox className="" disabled={true} id="Name" defaultValue={this.state.currentPatient.Name} placeholder="" showClearButton={true} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Gender</label>
                                <div className="col-sm-4">
                                    <SelectBox dataSource={this.state.lookupGender}
                                        displayExpr="Name"
                                        searchEnabled={true}
                                        valueExpr="Id"
                                        disabled={true} defaultValue={this.state.currentPatient.Gender}
                                        id="Gender"
                                        placeholder=''
                                        searchMode={'contains'}

                                        searchExpr={'Name'} />
                                </div>
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Age</label>
                                <div className="col-sm-4">
                                    <NumberBox id="Age" disabled={true} defaultValue={this.state.currentPatient.Age} showSpinButtons={true} showClearButton={true} placeholder="" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">CNIC</label>
                                <div className="col-sm-4">
                                    <TextBox className="" id="Cnic" disabled={true} defaultValue={this.state.currentPatient.Cnic} placeholder="" showClearButton={true} />
                                </div>
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Address</label>
                                <div className="col-sm-4">
                                    <TextBox className="" id="Address" disabled={true} defaultValue={this.state.currentPatient.Address} placeholder="" showClearButton={true} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Contact #</label>
                                <div className="col-sm-4">
                                    <TextBox className="" disabled={true} id="MobileNumber" defaultValue={this.state.currentPatient.MobileNumber} placeholder="" showClearButton={true} />
                                </div>
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Treatment Start Date</label>
                                <div className="col-sm-4">
                                    <DateBox id="TreatmentStartDate" disabled={true} defaultValue={this.state.currentPatient.TreatmentStartDate} type="date" />
                                </div>
                            </div>
                        </form>
                        <div id="myModal" className="modal-local">
                            <span className="close" onClick={this.hideModel}>&times;</span>

                            <img className="modal-content-local" id="img01" />

                            <div id="caption"></div>
                        </div>
                    </ScrollView>
                </Popup>

            </Fragment>
        );
    }
}

export default index;