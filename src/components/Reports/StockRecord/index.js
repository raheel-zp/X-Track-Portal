import React, { useState, useEffect, useRef } from 'react';
import { getChemistStock } from './actions/index';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { exportDataGrid } from 'devextreme/excel_exporter';
import DataGrid, { Selection, Scrolling, LoadPanel, Sorting, FilterRow, Pager, Paging, HeaderFilter, Column, Export } from 'devextreme-react/data-grid';
import common from '../../../utils/common';
import DateBox from 'devextreme-react/date-box';
import notify from 'devextreme/ui/notify';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import DropDownBox from 'devextreme-react/drop-down-box';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { getLookupLocality } from '../../Common/actions/index';
import session from '../../../utils/session';
import './style.css';
const gridRef = React.createRef();

// import PivotGrid, {
//     FieldChooser,
//     Export
// } from 'devextreme-react/pivot-grid';
// import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';

function Index(props) {
    const inputRef = useRef();
    const [Data, setData] = useState([]);
    const [allDistrict, setDistrict] = useState([]);
    const [gridBoxValue, setGridBoxValue] = useState([]);
    const [Date_f, setDate_f] = useState(common.ConverDateToSQLFormat(new Date(), '-'));

    useEffect(() => {
        getLookupLocality((data) => {
            const district = [];
            const map1 = new Map();
            let DesignationId = session.get('user').DesignationId;
            let LocalityId = session.get('user').LocalityId;
            if (Number(DesignationId) == 6)
                data = data.filter(x => x.LocalityId == LocalityId);
            if (Number(DesignationId) == 4 || Number(DesignationId) == 5)
                data = data.filter(x => x.DistrictId == LocalityId);

            for (const item of data) {
                if (!map1.has(item.DistrictId)) {
                    map1.set(item.DistrictId, true);    // set any value to Map
                    district.push({
                        Id: item.DistrictId,
                        Name: item.DistrictName
                    });
                }
            }
            setDistrict(district);
        })
    }, []);

    const loadReport = () => {
        const grid = gridRef.current.instance;
        grid.getScrollable().scrollTo(0);
        if (common.empty(Date_f))
            return notify('select date first', 'error', 600);
        if (common.empty(gridBoxValue))
            return notify('select District', 'error', 600);
        inputRef.current.setAttribute("disabled", "");
        var localitites = gridBoxValue.map(x => x.Id);
        gridRef.current.instance.beginCustomLoading();
        getChemistStock(Date_f, localitites.toString(), function (data) {
            inputRef.current.removeAttribute("disabled");
            gridRef.current.instance.endCustomLoading();
            setData(data);
        });
    }
    const onCellPrepared = (e) => {

        if (e.rowType !== "data" || (e.columnIndex != 0 && e.columnIndex != 1 && e.columnIndex != 2 && e.columnIndex != 3 && e.columnIndex != 4)) {
            return;
        }
        if (e.rowIndex % 20 === 0) {
            e.cellElement.rowSpan = 20;
            e.cellElement.innerHTML = "<div>" + e.value + "</div>";
        }
        else {
            e.cellElement.style.display = "none";
        }
    }
    const onExporting = (e) => {
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet('Main sheet');
        exportDataGrid({

            component: e.component,
            worksheet: worksheet,
            customizeCell: function (options) {
                const excelCell = options;
                excelCell.font = { name: 'Arial', size: 12 };
                excelCell.alignment = { horizontal: 'left' };
            }
        }).then(function () {
            //if in future product will be increase change totalProduct=totalNumberOfProducts?
            var totalProduct = 20;
            var pharmacyCount = Data.length / totalProduct;
            for (let index = 1; index <= pharmacyCount; index++) {

                var start = (index == 1) ? 2 : ((index - 1) * totalProduct) + 2;
                var end = (index * totalProduct) + 1;
                worksheet.mergeCells(`A${start}`, `A${end}`);
                worksheet.mergeCells(`B${start}`, `B${end}`);
                worksheet.mergeCells(`C${start}`, `C${end}`);
                worksheet.mergeCells(`D${start}`, `D${end}`);
                worksheet.mergeCells(`E${start}`, `E${end}`);


            }
            workbook.xlsx.writeBuffer()
                .then(function (buffer) {
                    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'DataGrid.xlsx');
                });
        });
        e.cancel = true;
    }
    const exportGrid = () => {
        const unit = "pt";
        const size = "A1"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape
        const doc = new jsPDF(orientation, unit, size);
        const dataGrid = gridRef.current.instance;
        doc.setFontSize(2);

        exportDataGridToPdf({
            jsPDFDocument: doc,
            component: dataGrid
        }).then(() => {
            doc.save('Patients.pdf');
        });
    }
    const cellTemplate = (e) => {
        return e.rowIndex + 1;
    }
    const dataGridRender = () => {
        return (
            <DataGrid
                dataSource={allDistrict}
                columns={[{ dataField: 'Name', width: '180' }]}
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
    const dataGrid_onSelectionChanged = (e) => {
        setGridBoxValue(
            e.selectedRowKeys.length && e.selectedRowKeys || []
        );
    }
    return (
        <div className="container-fluid">
            <div className="row d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Stock Record of Pharmacies</h1>
            </div>
            <div className="row">
                <div className="col-md-3">
                    <label htmlFor="inputEmail4">Date:</label>
                    <DateBox max={new Date()} value={Date_f} placeholder='Date' onValueChanged={e => setDate_f(common.ConverDateToSQLFormat(e.value, '-'))} />

                </div>
                <div className="col-md-3">
                    <label htmlFor="inputEmail4">District:</label>
                    <DropDownBox
                        value={gridBoxValue.map(x => x.Name)}
                        valueExpr="ID"
                        width='250'
                        deferRendering={false}
                        displayExpr="CompanyName"
                        placeholder="Select a value..."
                        showClearButton={true}
                        dataSource={allDistrict.map(x => x.Name)}
                        contentRender={dataGridRender}
                    />
                </div>
                <div className=" col-md-3" style={{ marginTop: '35px' }}>
                    <button ref={inputRef} className="btn btn-sm btn-primary" onClick={loadReport} >
                        <span className="fas fa-sm fa-file"></span>
                        &nbsp; Load Report
                    </button>
                </div>
                {/* <div className="col-md-3" style={{ marginTop: '35px' }}>
                    <button className="btn btn-sm btn-light" onClick={exportGrid} >
                        <span className="fas fa-file-pdf"></span>
                        &nbsp; Export to PDF
                    </button>
                </div> */}
            </div>
            <div className="row">
                <DataGrid
                    ref={gridRef}
                    onExporting={onExporting}
                    // columns={Column}
                    allowColumnReordering={true}
                    allowColumnResizing={true}
                    columnAutoWidth={true}
                    onCellPrepared={onCellPrepared}
                    width='100%'
                    height='440px'
                    dataSource={Data}
                    showBorders={true}>
                    <Column
                        dataField="Serial"
                        caption="Sr.#"
                        allowSorting={false}
                        allowFiltering={false}
                        cssClass="text-center font-weight-bold"
                        calculateCellValue={(e) => {
                            var mod = e.Serial % 20;
                            if (mod == 0)
                                return e.Serial;
                            return Math.floor(e.Serial / 20) + 1;
                        }}
                    >
                    </Column>
                    <Column
                        dataField="ChemistName"
                        caption="Pharmacy Name"
                        cssClass="text-center font-weight-bold"
                        allowFiltering={false}>
                    </Column>
                    <Column
                        dataField="Register"
                        allowFiltering={false}
                        dataType='string'
                        cssClass="text-center"
                        caption="Register">
                    </Column>
                    <Column
                        allowFiltering={false}
                        dataField="TotalRegisteredPatient"
                        cssClass="text-center"
                        caption="Patients Registered"
                    >
                    </Column>
                    <Column
                        allowFiltering={false}
                        dataField="TotalNotifiedPatient"
                        cssClass="text-center"
                        caption="Patients Notified"
                    >
                    </Column>
                    <Column
                        dataField="Name"
                        allowFiltering={false}
                        cssClass="text-center"
                        caption="Product Name"
                    >
                    </Column>
                    <Column
                        dataField="StockQuantity"
                        allowFiltering={false}
                        cssClass="text-center"
                        caption="Stock Quantity"
                    >
                    </Column>
                    <Column
                        dataField="MonthSaleUnit"
                        allowFiltering={false}
                        cssClass="text-center"
                        caption="Monthly Sales"
                    >
                    </Column>
                    <Column
                        dataField="TodaySaleUnit"
                        allowFiltering={false}
                        cssClass="text-center"
                        caption="Today Sales"
                    >
                    </Column>

                    <FilterRow visible={true} applyFilter={true} />
                    {/* <HeaderFilter visible={true} /> */}
                    <Sorting mode="multiple" />
                    <LoadPanel enabled />
                    <Pager allowedPageSizes={[10, 20, 50, 100]} showPageSizeSelector={true} showInfo={true} />
                    <Paging defaultPageSize={20} />
                    <Export enabled={true} />
                </DataGrid>
            </div>
        </div>
    );
}

export default Index;