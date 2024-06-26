import React, { useState, useEffect } from 'react';
import { getKpi, getPharmaciesTargetAchieved } from './actions/index';
import DropDownBox from 'devextreme-react/drop-down-box';
import DataGrid, { Selection, Paging, FilterRow, Scrolling } from 'devextreme-react/data-grid';
import './style.css';
import session from '../../utils/session';
import { getAllLookupPatients } from '../Common/actions/index';
import common from '../../utils/common';
import Dongut from './Dongut';
import Chart1 from './Chart1';
import Chart2 from './Chart2';
import Chart3 from './Chart3';
import Chart4 from './Chart4';
function ReturnEstimatedArray(data) {
    return data.map(x => {
        return {
            district: x.DistrictName,
            val: x.Estimated
        }
    })
}
function ReturnAchievedArray(data) {
    return data.map(x => {
        return {
            district: x.DistrictName,
            val: x.Achieved
        }
    })
}

function Index(props) {
    let permission = session.get('role');
    const [outcome, setOutcome] = useState([]);
    const [lookupOutcome, setLookupOutcome] = useState([]);
    const [filterOutcome, setFilterOutcome] = useState([]);
    const [graphPharmacies, setGraphPharmacies] = useState([]);
    const [graphALLRegistered, setGraphALLRegistered] = useState([]);
    const [graphRegistered, setGraphRegistered] = useState([]);
    const [graphNotified, setGraphNotified] = useState([]);
    const [graphRegisteredNotified, setGraphRegisteredNotified] = useState([]);
    const [gridBoxValue, setGridBoxValue] = useState([]);

    const [patientInfo, setPatientInfo] = useState([]);
    const [patientInfoNotified, setPatientInfoNotified] = useState([]);
    const [patientInfoRegistered, setPatientInfoRegistered] = useState([]);
    const [pharmaciesInfoRegistered, setPharmaciesInfoRegistered] = useState([]);

    const [fourPatientInfoNotified, setFourPatientInfoNotified] = useState([]);
    const [fourPatientInfoRegistered, setFourPatientInfoRegistered] = useState([]);
    const [fourPharmaciesInfoRegistered, setFourPharmaciesInfoRegistered] = useState([]);
    const ReturnOutcomeArray = (data, lookup) => {
        var arr = [];
        data.map(x => {
            var find = lookup.filter(d => d.LookupCategoryId === "13").find(e => e.Id == x.Estimated);
            if (find != null)
                arr.push({
                    OutcomeId: x.Estimated,
                    //district: `${x.DistrictName}\n${common.empty(find) ? '' : find.Name}`,
                    district: `${x.DistrictName}`,
                    val: x.Achieved
                })

        })
        if (arr.length == 0) {
            data.filter(({ DistrictId }) => [8, 17, 22, 30].includes(DistrictId)).map(x => {
                var find = lookup.filter(d => d.LookupCategoryId === "13").find(e => e.Id == x.Estimated);
                if (find != null)
                    arr.push({
                        OutcomeId: x.Estimated,
                        district: x.DistrictName,
                        val: x.Achieved
                    })
            })
        }
      return arr;  
        // return (arr.length !== 0) ? arr :
        //     [{ OutcomeId: 38, district: "FAISALABAD", val: 0 },
        //     { OutcomeId: 38, district: "LAHORE", val: 0 },
        //     { OutcomeId: 38, district: "MULTAN", val: 0 },
        //     { OutcomeId: 38, district: "RAWALPINDI", val: 0 }];
    }

    useEffect(() => {

        getAllLookupPatients((dataLookup) => {
            setLookupOutcome(dataLookup.filter(x => x.LookupCategoryId === "13"))
            getKpi((data) => {
                setOutcome(data.outcome);
                setPatientInfo(data.patientInfo);
                setFilterOutcome(ReturnOutcomeArray(data.outcome, dataLookup.filter(x => x.LookupCategoryId === "13")));
                //#region All Patient
                // setPatientInfoNotified(ReturnAchievedArray(data.patientInfo))
                // setPatientInfoRegistered(ReturnEstimatedArray(data.patientInfo))
                setPatientInfoNotified(ReturnAchievedArray(data.patientInfo.filter(({ DistrictId }) => [8, 17, 22, 30].includes(DistrictId))))
                setPatientInfoRegistered(ReturnEstimatedArray(data.patientInfo.filter(({ DistrictId }) => [8, 17, 22, 30].includes(DistrictId))))
                //#endregion
                //#region Four Patien
                // setFourPatientInfoNotified(ReturnAchievedArray(data.patientInfo.filter(({ DistrictId }) => [8, 17, 22, 30].includes(DistrictId))))
                // setFourPatientInfoRegistered(ReturnEstimatedArray(data.patientInfo.filter(({ DistrictId }) => [8, 17, 22, 30].includes(DistrictId))))
                //#endregion
                setGraphRegistered(data.quarterDataRegistered);
                setGraphNotified(data.quarterDataNotified);
                setGraphRegisteredNotified(data.quarterDataRegisteredVsNotified);

            });
        })
        getPharmaciesTargetAchieved((data) => {
            setGraphPharmacies(data);
            setGraphALLRegistered(data);
            setGridBoxValue(data.filter(({ DistrictId }) => [8, 17, 22, 30].includes(DistrictId)))
            //setPharmaciesInfoRegistered(ReturnAchievedArray(data))
            setPharmaciesInfoRegistered(ReturnAchievedArray(data.filter(({ DistrictId }) => [8, 17, 22, 30].includes(DistrictId))))
            // setFourPharmaciesInfoRegistered(ReturnAchievedArray(data.filter(({ DistrictId }) => [8, 17, 22, 30].includes(DistrictId))))
        })

    }, []);

    const dataGrid_onSelectionChanged = (e) => {

        var filter = e.selectedRowKeys.length && e.selectedRowKeys || [];
        var filterData = graphALLRegistered.filter((elem) => filter.find(({ DistrictId }) => elem.DistrictId === DistrictId));
        setGridBoxValue(filter);
        setGraphPharmacies(filterData);
        
        var filterDataOutcome = outcome.filter((elem) => filter.find(({ DistrictId }) => elem.DistrictId === DistrictId));



        setFilterOutcome(ReturnOutcomeArray(filterDataOutcome, lookupOutcome));

        var filterDataPatient = patientInfo.filter((elem) => filter.find(({ DistrictId }) => elem.DistrictId === DistrictId));
        setPatientInfoNotified(ReturnAchievedArray(filterDataPatient))
        setPatientInfoRegistered(ReturnEstimatedArray(filterDataPatient))
        setPharmaciesInfoRegistered(ReturnAchievedArray(filterData))

    }
    const dataGridRender = () => {
        return (
            <DataGrid
                dataSource={graphALLRegistered}
                columns={['DistrictName']}
                hoverStateEnabled={true}
                selectedRowKeys={gridBoxValue}
                onSelectionChanged={dataGrid_onSelectionChanged}>
                <Selection mode="multiple" />
                <Scrolling mode="virtual" />
                <Paging enabled={true} pageSize={10} />
                <FilterRow visible={true} />
            </DataGrid>
        );
    }
    return (

        <div className="container-fluid">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
            </div>
            {permission.DASHBOARD_FOUR &&
                <div className='row '>
                    <div className='col-md-4'>
                        <Dongut PatientNotif={fourPatientInfoRegistered} Title={'Patients Registered'} />
                    </div>
                    <div className='col-md-4'>
                        <Dongut PatientNotif={fourPatientInfoNotified} Title={'Patients Notified'} />
                    </div>
                    <div className='col-md-4'>
                        <Dongut PatientNotif={fourPharmaciesInfoRegistered} Title={'Pharmacies Registered'} />
                    </div>
                </div>
            }
            <div className="form-group row">
                <label className="col-md-2 col-form-label">Choose District:</label>
                <div className="col-sm-10">
                    <DropDownBox
                        value={gridBoxValue.map(x => x.DistrictName)}
                        valueExpr="ID"
                        deferRendering={false}
                        displayExpr="CompanyName"
                        placeholder="Select a value..."
                        showClearButton={true}
                        dataSource={graphALLRegistered.map(x => x.DistrictName)}
                        contentRender={dataGridRender}
                    />
                </div>
            </div>
            <div className='row '>
                {permission.DASHBOARD_PATIENT_REGISTERED &&
                    <div className='col-md-4'>
                        <Dongut PatientNotif={patientInfoRegistered} Title={'Patients Registered'} />
                    </div>
                }
                {permission.DASHBOARD_PATIENT_NOTIFIED &&
                    <div className='col-md-4'>
                        <Dongut PatientNotif={patientInfoNotified} Title={'Patients Notified'} />
                    </div>
                }
                {permission.DASHBOARD_PHARMACIES &&
                    <div className='col-md-4'>
                        <Dongut PatientNotif={pharmaciesInfoRegistered} Title={'Pharmacies Registered'} />
                    </div>
                }
            </div>
           
            {permission.DASHBOARD_SO &&
                <div className="row ">
                    <div className='col-md-12'>
                        <Chart3 data={graphRegisteredNotified} />
                    </div>
                </div>
            }
            <div className="row ">
                {permission.DASHBOARD_EAR_PATIENT &&
                    <div className="col-md-6">
                        <Chart2 data={graphRegistered}
                            Title={'Estimated Vs. Achieved Patient Registration'} Estimated={'Estimated Patient Registration'} Achieved={'Achieved Patient Registration'} />
                    </div>
                }
                {permission.DASHBOARD_EAN_PATIENT &&
                    <div className="col-md-6">
                        <Chart2 data={graphNotified}
                            Title={'Estimated Vs. Achieved Patient Notification'}
                            Estimated={'Estimated Patient Notification'} Achieved={'Achieved Patient Notification'} />
                    </div>
                }
            </div>

        </div>

    );
}

export default Index;