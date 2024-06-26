import React, { Component } from 'react';
import { getEmployee, addEmployee, updateEmployee, deleteEmployee } from './actions/index';
import common from '../../utils/common';
import { getLookupDesignation, getLookupGender, getLookupLocality } from '../Common/actions/index';
import Button from 'devextreme-react/button';
import DataGrid, {
    Sorting,
    Editing,
    Export,
    LoadPanel,
    FilterRow,
    Pager,
    Paging,
    HeaderFilter,
    Column,
    FormItem,
    Popup,
    Scrolling,
    EmailRule,
    RequiredRule,
    PatternRule,
    StringLengthRule,
    Position,
    Lookup,
    ValidationRule
} from 'devextreme-react/data-grid';
import { jsPDF } from 'jspdf';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import './style.css';
const gridRef = React.createRef();
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hidexPopup: false,
            hideLocality: false,
            desginationId: 0,
            gridColumn: [],
            gridData: [],
            lookupDesignation: [],
            lookupGender: [],
            lookupLocality: [],
            lookupDistrict: [],
            lookupAllLocality: [],
            CRUDstate: false
        };
        this.onRowUpdated = this.onRowUpdated.bind(this);
        this.onRowInserted = this.onRowInserted.bind(this);
        this.onRowRemoved = this.onRowRemoved.bind(this);
    }
    onRowInserted(e) {
        e.cancel = true;
        e.data.Id = 0;
        e.data.DesignationId = Number(e.data.DesignationId);
        e.data.LocalityId = Number(e.data.LocalityId);
        e.data.GenderId = Number(e.data.GenderId);
        e.data.JoiningDate = common.ConverDateToSQLFormat(e.data.JoiningDate, '-');
        e.data.ResignedDate = common.ConverDateToSQLFormat(e.data.ResignedDate, '-');
        addEmployee(e.data, (res) => {
            e.component.navigateToRow(e.key);
            e.component.cancelEditData();
            this.setState({ CRUDstate: true });

        })

    }
    onRowRemoved(e) {
        e.cancel = true;
        deleteEmployee(e.key, (res) => {
            e.component.navigateToRow(e.key);
            e.component.cancelEditData();
            this.setState({ CRUDstate: true });

        })
    }
    onRowUpdated(e) {
        e.cancel = true;
        var data = Object.assign(e.oldData, e.newData);
        data.DesignationId = Number(data.DesignationId);
        data.LocalityId = (Number(e.value) === 1 || Number(e.value) === 2 || Number(e.value) === 3 || Number(e.value) === 7) ? 0 : Number(data.LocalityId);
        data.GenderId = Number(data.GenderId);
        data.JoiningDate = common.ConverDateToSQLFormat(data.JoiningDate, '-');
        data.ResignedDate = common.ConverDateToSQLFormat(data.ResignedDate, '-');
        updateEmployee(e.key, data, (res) => {
            e.component.navigateToRow(e.key);
            e.component.cancelEditData();
            this.setState({ CRUDstate: true });

        });
    }
    // showhideLocality(e) {
    //     var locality = (Number(e.value) === 1 || Number(e.value) === 2|| Number(e.value) === 2|| Number(e.value) === 2) ? false : true;
    //     this.setState({ hideLocality: locality, desginationId: Number(e.value) });
    // }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.CRUDstate !== this.state.CRUDstate) {
            this.setState({ CRUDstate: false });
            getEmployee((res) => {
                this.setState({
                    gridData: res,
                });
            })
        }
    }
    componentDidMount() {
        this.setState({ CRUDstate: false });
        getLookupDesignation((data) => {
            this.setState({ lookupDesignation: data });
            getLookupGender((data) => {
                this.setState({ lookupGender: data });
                getLookupLocality((data) => {

                    const result = [];
                    const map = new Map();
                    for (const item of data) {
                        if (!map.has(item.LocalityId)) {
                            map.set(item.LocalityId, true);    // set any value to Map
                            result.push({
                                Id: item.LocalityId,
                                Name: item.LocalityName
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
                    this.setState({ lookupLocality: result, lookupDistrict: district });
                    getEmployee((res) => {
                        this.setState({
                            gridData: res,
                        });
                    })
                })
            })
        })

    }

    onEditorPreparing = (e) => {
        if (e.parentType == "dataRow") {
            var grid = e.component;
            var index = e.row.rowIndex;
            var oldValueChanged = e.editorOptions.onValueChanged;
            if (e.dataField === "Password" && e.row.inserted === undefined) {
                if (!e.row.isEditing) {
                    e.editorOptions.mode = 'password';
                    e.editorOptions.disabled = true;
                    e.editorOptions.value = '12345678';
                }
            }
            if ((e.dataField === "ReferenceId" || e.dataField === "Email" || e.dataField === "DesignationId" || e.dataField === "LocalityId") && e.row.inserted === undefined) {
                if (!e.row.isEditing) {
                    e.editorOptions.disabled = true;
                }
            }
            if (e.dataField === "DesignationId") {
                if (e.row.inserted === undefined) {
                    if (!e.row.isEditing) {
                        var locality = (Number(e.value) === 4 || Number(e.value) === 5) ? this.state.lookupDistrict : (Number(e.value) === 6) ? this.state.lookupLocality : [];
                        this.setState({ lookupAllLocality: locality });
                    }
                }
                e.editorOptions.onValueChanged = (args) => {
                    oldValueChanged.call(this, args);
                    //var aa = grid.getCellElement(index, "LocalityId");
                    // var locality = (Number(e.value) === 1 || Number(e.value) === 2) ? false : true;
                    // this.setState({ hideLocality: locality, desginationId: Number(e.value) });

                    var locality = (Number(args.value) === 4 || Number(args.value) === 5) ? this.state.lookupDistrict : (Number(args.value) === 6) ? this.state.lookupLocality : [];
                    this.setState({ lookupAllLocality: locality, desginationId: Number(args.value) });
                }
            }
        }
    }
    exportGrid = () => {
        const unit = "pt";
        const size = "A1"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape
        debugger
        const doc = new jsPDF(orientation, unit, size);
        const dataGrid = gridRef.current.instance;
        doc.setFontSize(2);

        exportDataGridToPdf({
            jsPDFDocument: doc,
            component: dataGrid
        }).then(() => {
            doc.save('Users.pdf');
        });
    }
    render() {
        return (
            <div className="container-fluid">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">User List</h1>
                </div>
                <div className="row">
                    <div className="form-group col-md-3" style={{ marginTop: '35px' }}>
                        <button className="btn btn-sm btn-light" onClick={this.exportGrid} >
                            <span className="fas fa-file-pdf"></span>
                            &nbsp; Export to PDF
                        </button>
                    </div>
                </div>
                <div className="row">
                    <DataGrid
                        // id="userGrid"
                        ref={gridRef}
                        width='100%'
                        height='440px'
                        allowColumnReordering={true}
                        allowColumnResizing={true}
                        columnAutoWidth={true}
                        onEditorPreparing={this.onEditorPreparing}
                        keyExpr="Id"
                        //columns={this.state.gridColumn}
                        dataSource={this.state.gridData}
                        onRowInserting={this.onRowInserted}
                        onRowUpdating={this.onRowUpdated}
                        onRowRemoving={this.onRowRemoved}
                        showBorders={true}>
                        <Column
                            dataField="Id"
                            caption="Id"
                            visible={false}
                            allowAdding={false}
                            allowUpdating={false}>
                            <FormItem visible={false} disabled={false} />
                        </Column>
                        {/* <Column
                            dataField="ReferenceId"
                            caption="Employee Code"

                            visible={false}
                            allowAdding={false}
                            allowUpdating={false}>
                            <RequiredRule />
                            <PatternRule
                                message={'Do not use alphabets in the Name.'}
                                pattern={/^[0-9]*$/}
                            />
                        </Column> */}
                        <Column
                            dataField="Fullname"

                            caption="Employee Name">
                            <RequiredRule />
                        </Column>
                        <Column
                            dataField="Email"

                            caption="Email">
                            <RequiredRule />
                            <EmailRule />
                        </Column>
                        <Column
                            dataField="Password"
                            caption="Password"
                            mode="password"
                            dataType="password"
                            visible={false}
                            allowAdding={true}
                            allowUpdating={false}>
                            <FormItem visible={true} />
                            <RequiredRule />
                        </Column>
                        <Column

                            dataField="DesignationId"
                            caption="Designation">
                            <Lookup dataSource={this.state.lookupDesignation} valueExpr="Id" displayExpr="Name" />
                            <ValidationRule />
                        </Column>
                        <Column
                            dataField="LocalityId"
                            visible={false}
                            caption="Locality">
                            <Lookup dataSource={this.state.lookupAllLocality} valueExpr="Id" displayExpr="Name" />
                        </Column>
                        <Column
                            dataField="GenderId"

                            caption="Gender">
                            <Lookup dataSource={this.state.lookupGender} valueExpr="Id" displayExpr="Name" />
                            <RequiredRule />
                        </Column>
                        <Column
                            dataField="MobileNumber"

                            caption="Mobile Number">
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
                        </Column>
                        <Column
                            dataField="MobileNumber2"

                            caption="Mobile Number 2">
                        </Column>
                        <Column
                            dataField="JoiningDate"

                            dataType="date"
                            format="yyyy-MM-dd">
                        </Column>
                        {/* <Column
                            dataField="ResignedDate"
                            dataType="date"
                            format="yyyy-MM-dd">
                        </Column> */}
                        <Column
                            dataField="Remarks"
                            caption="Remarks"
                            colSpan={2}>
                        </Column>
                        <FilterRow visible={true} applyFilter={true} />
                        <HeaderFilter visible={true} />
                        <Sorting mode="multiple" />
                        <Editing
                            mode="popup"
                            allowUpdating={true}
                            allowDeleting={true}
                            allowAdding={true}>
                            <Popup title="Fill User Info" showTitle={true} >
                                <Position my="top" at="top" of={window} />
                            </Popup>
                        </Editing>
                        <Scrolling columnRenderingMode="virtual" />
                        <Pager allowedPageSizes={[10, 20, 50, 100]} showPageSizeSelector={true} showInfo={true} />
                        <LoadPanel enabled />  <Paging defaultPageSize={15} />
                        <Export enabled={true} />
                    </DataGrid>
                </div>
            </div>
        );
    }
}


export default index;