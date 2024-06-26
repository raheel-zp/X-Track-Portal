import React, { Component } from 'react';
import { getEmployee } from './actions/index';
import common from '../../utils/common';
import { deleteEmployee } from './actions/index';
import { getLookupDesignation, getLookupGender, getLookupLocality } from '../Common/actions/index';
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
    ValidationRule,
    Button as ButtonGrid
} from 'devextreme-react/data-grid';
import { jsPDF } from 'jspdf';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import './style.css';

import UserForm from './form/UserForm'; // Import your custom form component


const gridRef = React.createRef();

const USER = {
    Fullname: "",
    Email: "",
    Password: "",
    DesignationId: "",
    GenderId: "",
    LocalityId: "",
    MobileNumber: "",
    MobileNumber2: "",
    JoiningDate: "",
    Remarks: "",
    UserId: ""
};

class index extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            hidexPopup: false,
            hideLocality: false,
            desginationId: 0,
            gridColumn: [],
            gridData: [],
            CRUDstate: false,
            selectedValue: null,
            popupVisible: false,
            currentUser: USER,
            lookupDesignation: [],
            lookupGender: [],
            lookupLocality: [],
            lookupDistrict: [],
            lookupAllLocality: [],
            lookupProvince: [],
            
        };
        this.showUserModel = this.showUserModel.bind(this);
        this.hidePopup = this.hidePopup.bind(this);
        this.updateSelectedUser = this.updateSelectedUser.bind(this);
        this.deleteSelectedUser = this.deleteSelectedUser.bind(this);
        
        
    }
    
    componentDidMount() {
        this._isMounted = true;

        this.setState({ CRUDstate: false });

        getLookupDesignation((data) => {
            this.setState({ lookupDesignation: data });
        });
        
        getLookupGender((data) => {
            this.setState({ lookupGender: data });
        });
    
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
    
          const province = [];
          const mapPrvoince = new Map();
          for (const item of data) {
              if (!mapPrvoince.has(item.ProvinceId)) {
                  mapPrvoince.set(item.ProvinceId, true);    // set any value to Map
                  province.push({
                      Id: item.ProvinceId,
                      Name: item.ProvinceName
                  });
              }
          }
    
          this.setState({ lookupLocality: result, lookupDistrict: district, lookupProvince: province });
          
        });

        getEmployee((res) => {
            if (this._isMounted) {
                this.setState({
                    gridData: res,
                });
            }
        });
    }

    showUserModel = () => {
        this.setState({ popupVisible: true });
        this.setState({currentUser: USER});
    }

    updateSelectedUser = (user) => {

       this.setState({currentUser: user});
       this.setState({ popupVisible: true });

    }

    deleteSelectedUser = (key) => {

        if (window.confirm('Are you sure, you want to delete that user')) {

            deleteEmployee(key, (res) => {
                getEmployee((res) => {
                    this.setState({
                        gridData: res,
                    });
                });
            });
        }

    }

    hidePopup = () => {
        this.setState({ popupVisible: false });

        getEmployee((res) => {
            this.setState({
                gridData: res,
            });
        });
    };

    handleChange = (selectedValue) => {
        this.setState({ selectedValue: selectedValue });
    };

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

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {


        return (
            <div className="container-fluid">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">User List</h1>
                </div>
                <div className="row">
                    <div className="form-group col-md-3" style={{ marginTop: '35px' }}>
                        <button className="btn btn-sm" onClick={this.showUserModel} >
                            <span className="fas fa-user"></span>
                            &nbsp; Add
                        </button>
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
                        keyExpr="Id"
                        dataSource={this.state.gridData}
                        showBorders={true}>
                        <Column
                            dataField="Id"
                            caption="Id"
                            visible={false}
                            allowAdding={false}
                            allowUpdating={false}>
                            <FormItem visible={false} disabled={false} />
                        </Column>

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
                            <Lookup dataSource={this.state.lookupAllLocality} multiSelect="true" valueExpr="Id" displayExpr="Name" />

                        </Column>
                        <Column
                            dataField="GenderId"
                            caption="Gender">
                            <Lookup dataSource={this.state.lookupGender} multiSelect="true" valueExpr="Id" displayExpr="Name" />
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
                       
                        <Column
                            dataField="Remarks"
                            caption="Remarks"
                            colSpan={2}>
                        </Column>
                        <Column
                            type="buttons"
                            caption="Control"
                            fixed={true}
                            fixedPosition="right"
                        >
                            <ButtonGrid
                            text="Edit"
                            onClick={(e) => {
                               var find = e.row.data;
                               this.updateSelectedUser(find);
                            }}
                            />

                            <ButtonGrid
                            text="Delete"
                            onClick={(e) => {
                               this.deleteSelectedUser(e.row.key);
                            }}
                            />
                            
                        </Column>
                        <FilterRow visible={true} applyFilter={true} />
                        <HeaderFilter visible={true} />
                        <Sorting mode="multiple" />
                        <Editing
                            mode="popup"
                            allowUpdating={false}
                            allowDeleting={true}
                            allowAdding={false}>
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
                {this.state.popupVisible && (
                    <UserForm
                    popupVisible={this.state.popupVisible}
                    currentUser={this.state.currentUser}
                    hidePopup={this.hidePopup}
                    lookupAllLocality={this.state.lookupAllLocality}
                    lookupLocality={this.state.lookupLocality}
                    lookupProvince={this.state.lookupProvince}
                    lookupGender={this.state.lookupGender}
                    lookupDistrict={this.state.lookupDistrict}
                    lookupDesignation={this.state.lookupDesignation}
                    />
                )}
            </div>
        );
    }
}


export default index;