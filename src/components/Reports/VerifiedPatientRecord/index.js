import React, { useState, useEffect, useRef } from "react";
import { getPatient, deletePatient } from "./actions/index";
//import $ from "jquery";
import Button from "devextreme-react/button";
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
import { getLookupGender } from "../../Common/actions/index";
import common from "../../../utils/common";
import DateBox from "devextreme-react/date-box";
import PatientEditPopup from "./form/index";
import PatientViewPopup from "./form/view";
import { confirm } from "devextreme/ui/dialog";
import session from "../../../utils/session";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { exportDataGrid as exportDataGridToPdf } from "devextreme/pdf_exporter";
import "./style.css";
const gridRef = React.createRef();
// const permission = session.get("role");
// debugger

function Index(props) {
  const permission = session.get("role");
  //debugger;
  const inputRef = useRef();
  const [Data, setData] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupVisible2, setPopupVisible2] = useState(false);
  const [accountDetailPopupVisible, setAaccountDetailPopupVisible] = useState(false);
  const [currentPatient, setCurrentPatient] = useState({});
  const [lookupGender, setLookupGender] = useState([]);
  const [currentPropsData, setCurrentPropsData] = useState({});
  // const [Column, setColumn] = useState([]);
  const [StartDate, setStartDate] = useState("");
  const [EndDate, setEndDate] = useState("");
  const hidePopup = () => {
    setPopupVisible(false);
    setCurrentPatient({});
  };
  const hidePopup2 = () => {
    setPopupVisible2(false);
    loadReport();
    
  };

  const DeletePatient = (patient) => {
    deletePatient(patient.Id, () => {
      loadReport();
    });
  };
  const exportGrid = () => {
    const unit = "pt";
    const size = "A1"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape
    const doc = new jsPDF(orientation, unit, size);
    const dataGrid = gridRef.current.instance;
    doc.setFontSize(2);
    //#region jspdf
    // debugger
    // var dataStore = dataGrid.getDataSource();
    // var data = dataStore._store._array;
    // var keys = Object.keys(dataStore._items[0]);

    // doc.setFontSize(15);

    // const title = "My Awesome Report";
    // const headers = [keys];

    // const enddata = data.map(elt => [elt.Serial, elt.Name]);

    // let content = {
    //     startY: 50,
    //     head: headers,
    //     body: data
    // };

    // doc.text(title, marginLeft, 40);
    // doc.autoTable(content);
    // doc.save("report.pdf")
    //#endregion
    exportDataGridToPdf({
      jsPDFDocument: doc,
      component: dataGrid,
    }).then(() => {
      doc.save("Patients.pdf");
    });
  };
  useEffect(() => {
    getLookupGender((data) => {
      setLookupGender(data);
    });
  }, []);
  const loadReport = () => {
    const grid = gridRef.current.instance;
    grid.getScrollable().scrollTo(0);
    let obj = {
      StartDate: StartDate,
      EndDate: EndDate,
      IsVerified: 1
    };
    inputRef.current.setAttribute("disabled", "");
    gridRef.current.instance.beginCustomLoading();
    getPatient(obj, function (data) {
      inputRef.current.removeAttribute("disabled");
      gridRef.current.instance.endCustomLoading();
      data.map((x) => {
        if (x.ReferedToDcDtc === null) x.ReferedToDcDtc = false;
        if (x.Notified === null) x.Notified = false;
        if (x.ReferBackTo === null) x.ReferBackTo = false;
      });
      setData(data);
    });
  };
  const cellTemplate = (e) => {
    return e.rowIndex + 1;
  };
  // const customizeExcelCell=(options)=> {
  //     if (options.gridCell.rowType === "data") {
  //       if (options.gridCell.column.dataField === "Serial1") {
  //         options.value = options.gridCell.data.Serial1;
  //         options.wrapTextEnabled = true;
  //       }
  //     }
  //   }
  let num = 1;
  const calculateCellValue = (e) => {
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
        <h1 className="h3 mb-0 text-gray-800">Report of Patients Registered</h1>
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
          allowColumnReordering={true}
          allowColumnResizing={true}
          columnAutoWidth={true}
          showBorders={true}
        >
          <Column
            dataField="Serial"
            allowSorting={false}
            allowFiltering={false}
            caption="Sr.#"
            cssClass="text-center font-weight-bold"
            // cellRender={cellTemplate}
            calculateCellValue={calculateCellValue}
          ></Column>
          <Column
            dataField="Name"
            cssClass="text-center"
            caption="Patient Name"
          ></Column>
          <Column
            dataField="MobileNumber"
            cssClass="text-center"
            caption="Patient Mobile Number"
          ></Column>
          <Column dataField="Age" cssClass="text-center" caption="Age"></Column>
          <Column dataField="Gender" cssClass="text-center" caption="Gender">
            <Lookup
              dataSource={lookupGender}
              displayExpr="Name"
              valueExpr="Id"
            ></Lookup>
          </Column>
          <Column
            dataField="Cnic"
            cssClass="text-center"
            caption="CNIC"
          ></Column>
          <Column
            cssClass="text-center"
            dataField="DistrictName"
            caption="District"
          ></Column>
          <Column
            dataField="LocalityText"
            cssClass="text-center"
            caption="Tehsil"
          ></Column>
         
          <Column
            dataField="ChemistName"
            cssClass="text-center"
            caption="Pharmacy Name"
          ></Column>
          <Column
            dataField="ChemistAddress"
            cssClass="text-center"
            caption="Pharmacy Address"
          ></Column>
          <Column
            dataField="LicenseNumber"
            cssClass="text-center"
            caption="License #"
          ></Column>
          <Column
            dataField="ChemistDistrict"
            cssClass="text-center"
            caption="Pharmacy District"
          ></Column>


          <Column
            dataField="AccountTitle"
            cssClass="text-center"
            caption="Account Title"
          ></Column>

          
          <Column
            dataField="AccountNumber"
            cssClass="text-center"
            caption="Account Number"
          ></Column>

          
          <Column
            dataField="BankName"
            cssClass="text-center"
            caption="Bank Name"
          ></Column>
          
          <Column
            type="buttons"
            caption="Control"
            fixed={true}
            fixedPosition="right"
          >
            <ButtonGrid
              text="delete"
              visible={permission.PATIENT_DELETE}
              onClick={(e) => {
                var find = e.row.data;
                let result = confirm("<i>Are you sure?</i>", "Confirm changes");
                result.then((dialogResult) => {
                  if (dialogResult) DeletePatient(find);
                });
              }}
            />
            <ButtonGrid
              text="view"
              onClick={(e) => {
                var find = e.row.data;
                setCurrentPatient(find);
                setPopupVisible2(true);
              }}
            />
            <ButtonGrid
              text="edit"
              visible={permission.FORM_PATIENT}
              onClick={(e) => {
                var find = e.row.data;
                setCurrentPatient(find);
                setPopupVisible(true);
              }}
            />
            
          </Column>
          <FilterRow visible={true} applyFilter={true} />
          <HeaderFilter visible={true} />
          <Sorting mode="multiple" />
          <Scrolling columnRenderingMode="virtual" />
          <Pager
            allowedPageSizes={[10, 20, 50, 100]}
            showPageSizeSelector={true}
            showInfo={true}
          />
          <LoadPanel enabled />
          <Paging defaultPageSize={15} />
          <Export enabled={true} />
        </DataGrid>
      </div>
      {popupVisible && (
        <PatientEditPopup
          hidePopup={hidePopup}
          currentPatient={currentPatient}
          popupVisible={popupVisible}
        />
      )}
      {popupVisible2 && (
        <PatientViewPopup
          hidePopup2={hidePopup2}
          currentPatient={currentPatient}
          popupVisible2={popupVisible2}
        />
      )}
    </div>
  );
}

export default Index;
