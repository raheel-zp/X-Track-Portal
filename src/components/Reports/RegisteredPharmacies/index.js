import React, { useState, useEffect, useRef, Fragment } from "react";
import { getChemist, deletePharmacy } from "./actions/index";
import session from "../../../utils/session";
import $ from "jquery";
import { TextBox, Button as TextBoxButton } from "devextreme-react/text-box";

import DataGrid, {
  Button as ButtonGrid,
  Column,
  Lookup,
  LoadPanel,
  Scrolling,
  Sorting,
  FilterRow,
  Pager,
  Paging,
  HeaderFilter,
  Export,
} from "devextreme-react/data-grid";

import common from "../../../utils/common";
import DateBox from "devextreme-react/date-box";
import "./style.css";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { exportDataGrid as exportDataGridToPdf } from "devextreme/pdf_exporter";
import Button from "devextreme-react/button";
import "./style.css";
import BankDetails from "../../Chemist/form/bankdetails";
const gridRef = React.createRef();

function Index(props) {
  const inputRef = useRef();
  const [Data, setData] = useState([]);
  const [StartDate, setStartDate] = useState("");
  const [EndDate, setEndDate] = useState("");
  const [passwordMode, setPasswordMode] = useState("password");
  const [accountDetailPopupVisible, setAccountDetailPopupVisible] = useState(false);
  const [currentPharmacy, setCurrentPharmacy] = useState({});

  const [currentPropsData, setCurrentPropsData] = useState({});

  const passwordButton = {
    icon: "fa fa-eye",
    type: "default",
    onClick: (e) => {
      debugger;
      // e.element.parentElement;
      setPasswordMode(passwordMode === "text" ? "password" : "text");
    },
  };

  const hideAccountDetailPopup = (props) => {
    setCurrentPropsData(props);
    setAccountDetailPopupVisible(false);
  };

  const updateCurrentPharmacy = ( data ) => {

    if (currentPropsData.Id == data.ChemistId) {

        data.AccountTitle = currentPropsData.AccountTitle;
        data.AccountNumber = currentPropsData.AccountNumber;
        data.BankName = currentPropsData.BankName;

        setCurrentPharmacy(data);
    }
    else{
      setCurrentPharmacy(data);
    }

  }

  const deleteSelectedPharmacy = (chemistId) => {
    if (window.confirm('Are you sure, you want to delete that pharmacy')) {
        deletePharmacy(chemistId, (res) => {
          loadReport();
        });
    }
  }

  const loadReport = () => {
    // if (common.empty(StartDate))
    //     return notify('The From Date is Incorrect', 'error', 600);
    // if (common.empty(EndDate))
    //     return notify('Data is Incorrect', 'error', 600);
    let obj = {
      StartDate: StartDate,
      EndDate: EndDate,
    };
    inputRef.current.setAttribute("disabled", "");
    gridRef.current.instance.beginCustomLoading();

    getChemist(obj, function (data) {
      gridRef.current.instance.endCustomLoading();

      inputRef.current.removeAttribute("disabled");
      setData(data);
    });
  };
  const exportGrid = () => {
    const unit = "pt";
    const size = "A1"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape
    const doc = new jsPDF(orientation, unit, size);
    const dataGrid = gridRef.current.instance;
    doc.setFontSize(2);
    exportDataGridToPdf({
      jsPDFDocument: doc,
      component: dataGrid,
    }).then(() => {
      doc.save("Pharmacies.pdf");
    });
  };
  const cellRender = (data) => {
    return (
      <Fragment>
        <TextBox
          placeholder="password"
          stylingMode="filled"
          defaultValue={data.value}
          mode={passwordMode}
        >
          <TextBoxButton
            name="password"
            location="after"
            options={passwordButton}
          />
        </TextBox>
      </Fragment>
    );
  };
  let num = 1;
  const calculateCellValue = (e) => {
    debugger;
    if (e.Serial <= num) {
      num = 1;
      return num;
    } else {
      var a = num + 1;
      num = a;
      return a;
    }
  };
  const optionChanged = (e) => {
    num = 0;
  };
  return (
    <div className="container-fluid">
      <div className="row d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">
          Report of Pharmacies Registered
        </h1>
        {/* <a href="#" onclick={loadReport} className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                    className="fas fa-file fa-sm text-white-50"></i> Load Report</a> */}
      </div>
      <div className="row">
        <form>
          <div className="form-row">
            <div className="form-group col-md-3">
              <label htmlFor="inputEmail4">From:</label>
              <DateBox
                max={new Date()}
                placeholder="From"
                onValueChanged={(e) =>
                  setStartDate(common.ConverDateToSQLFormat(e.value, "-"))
                }
              />
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="inputPassword4">To:</label>
              <DateBox
                max={new Date()}
                placeholder="To"
                onValueChanged={(e) =>
                  setEndDate(common.ConverDateToSQLFormat(e.value, "-"))
                }
              />
            </div>
            <div className="form-group col-md-3" style={{ marginTop: "35px" }}>
              <button
                ref={inputRef}
                className="btn btn-sm btn-primary"
                onClick={loadReport}
              >
                <span className="fas fa-sm fa-file"></span>
                &nbsp; Load Report
              </button>
            </div>
            <div className="form-group col-md-3" style={{ marginTop: "35px" }}>
              <button className="btn btn-sm btn-light" onClick={exportGrid}>
                <span className="fas fa-file-pdf"></span>
                &nbsp; Export to PDF
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="row">
        <DataGrid
          ref={gridRef}
          onOptionChanged={optionChanged}
          width="100%"
          height="440px"
          dataSource={Data}
          keyExpr="ChemistId"
          allowColumnReordering={true}
          allowColumnResizing={true}
          columnAutoWidth={true}
          showBorders={true}
        >
          <Column
            dataField="Serial"
            caption="Sr.#"
            allowSorting={false}
            allowFiltering={false}
            cssClass="text-center font-weight-bold"
            calculateCellValue={calculateCellValue}
          ></Column>
          <Column
            dataField="ChemistName"
            caption="Pharmacy Name"
            cssClass="text-center"
          ></Column>
          <Column
            dataField="License"
            cssClass="text-center"
            caption="License #"
          ></Column>
          <Column
            dataField="ChemistDistrict"
            cssClass="text-center"
            caption="Pharmacy District"
          ></Column>
          <Column
            dataField="ChemistLocality"
            cssClass="text-center"
            caption="Pharmacy Tehsil"
          ></Column>
          <Column
            dataField="ChemistAddress"
            cssClass="text-center"
            caption="Pharmacy Address"
          ></Column>
          <Column
            dataField="Username"
            cssClass="text-center"
            caption="Pharmacy User"
          ></Column>
          <Column
            dataField="Password"
            visible={
              Number(session.get("user").DesignationId) === 1 ||
              Number(session.get("user").DesignationId) == 7
                ? true
                : false
            }
            caption="User Password"
            cellRender={cellRender}
          ></Column>
          <Column
            dataField="MobileNumber"
            cssClass="text-center"
            caption="Mobile"
          ></Column>

          <Column
            type="buttons"
            caption="Control"
            fixed={true}
            fixedPosition="right"
          >

          <ButtonGrid
              text="Bank Details"
              visible="true"
              onClick={(e) => {
                var find = e.row.data;
                updateCurrentPharmacy(find)
                setAccountDetailPopupVisible(true);
              }}
          />

          <ButtonGrid
              text="Delete"
              onClick={(e) => {
                  deleteSelectedPharmacy(e.row.key);
              }}
              />
          </Column>

          <FilterRow visible={true} applyFilter={true} />
          <HeaderFilter visible={true} />
          <Sorting mode="multiple" />
          <LoadPanel enabled />
          <Pager
            allowedPageSizes={[10, 20, 50, 100]}
            showPageSizeSelector={true}
            showInfo={true}
          />
          <Paging defaultPageSize={15} />
          <Export enabled={true} />
        </DataGrid>
      </div>

      {accountDetailPopupVisible && (
        <BankDetails
          hideAccountDetailPopup={hideAccountDetailPopup}
          currentPharmacy={currentPharmacy}
          accountDetailPopupVisible={accountDetailPopupVisible}
        />
      )}

    </div>
  );
}

export default Index;
