import React, { useEffect, useState } from 'react';
import DropDownBox from 'devextreme-react/drop-down-box';
import DataGrid, { Selection, Paging, FilterRow, Scrolling } from 'devextreme-react/data-grid';

import PieChart, {
    Legend,
    Series,
    Tooltip,
    ScrollBar,
    ZoomAndPan,
    Format,
    Size,
    Label,
    Connector,
    Export
} from 'devextreme-react/pie-chart';
import CenterTemplate from './DongutCenter';
const customPalette = ['#c41f25', '#8b0204', '#767676', '#000000'];
const ReturnOutcomeArray = (data) => {
    if (data != null) {
        var map = data.reduce(function (map, invoice) {
            var name = invoice.district
            var value = +invoice.val
            map[name] = (map[name] || 0) + value
            return map
        }, {})
        return Object.keys(map).map(function (name) {
            return {
                district: name,
                val: map[name]
            }
        })
    }
}
function Index(props) {
    const [dataReg, setDataReg] = useState([]);
    const [title, setTitle] = useState('');
    const [lookup, setLookup] = useState([]);
    const [center, setCenter] = useState('');
    const [gridBoxValue, setGridBoxValue] = useState([]);

    useEffect(() => {

        setDataReg(ReturnOutcomeArray(props.PatientNotif));
        setTitle(props.Title);
        setLookup(props.Lookup);
    }, [props.PatientNotif])
    const customizeLabel = (e) => {
        return e.argumentText;
    }
    const customizeTooltip = (arg) => {
        return {
            text: `${arg.argumentText}\n${arg.valueText}`
        };
    }
    const dataGrid_onSelectionChanged = (e) => {
        var filter = e.selectedRowKeys.length && e.selectedRowKeys || [];
        var filterData = props.PatientNotif.filter((elem) => filter.find(({ Id }) => elem.OutcomeId === Id));

        setGridBoxValue(filter);
        setDataReg((filter.length == 0 && filterData.length == 0) ? ReturnOutcomeArray(props.PatientNotif) : ReturnOutcomeArray(filterData));

    }
    const dataGridRender = () => {
        return (
            <DataGrid
                dataSource={lookup}
                columns={['Name']}
                hoverStateEnabled={true}
                selectedRowKeys={gridBoxValue}
                onSelectionChanged={dataGrid_onSelectionChanged}>
                <Selection mode="single" />
                <Scrolling mode="virtual" />
                <Paging enabled={true} pageSize={10} />
                <FilterRow visible={true} />
            </DataGrid>
        );
    }
    return (
        <div className="card shadow-inner">
            <div className="card-heading">
                <h5><i className="bi bi-sunrise-fill"></i>{title}</h5>
            </div>
            <div className="card-body overflow-auto">
                <div className="form-group row">
                    <label className="col-md-2 col-form-label">Choose Outcome:</label>
                    <div className="col-sm-10">
                        <DropDownBox
                            value={gridBoxValue.map(x => x.Name)}
                            valueExpr="Id"
                            deferRendering={false}
                            displayExpr="Name"
                            placeholder="Select a value..."
                            showClearButton={true}
                            contentRender={dataGridRender}
                        />
                    </div>
                </div>
                <div id="chartContainer" style={{ width: '100%' }}>
                    <PieChart
                        id="pie"
                        type="doughnut"
                        width='100%'
                        palette={customPalette}
                        resolveLabelOverlapping="shift"
                        centerRender={CenterTemplate}
                        // paletteExtensionMode="extrapolate"
                        dataSource={dataReg}
                    >
                        <Series argumentField="district">
                            <Label visible={false}
                                position="outside"//outside//columns//outside
                                customizeText={customizeLabel}
                                backgroundColor="none">
                                <Connector visible={false}></Connector>
                            </Label>
                        </Series>

                        {/* <Export enabled={true} /> */}
                        <Legend
                            visible={false}
                            margin={0}
                            horizontalAlignment="center"
                            verticalAlignment="bottom"
                        />
                        <Tooltip enabled={true} customizeTooltip={customizeTooltip}>
                        </Tooltip>
                    </PieChart>
                </div>
            </div>
        </div>
    );
}


export default Index;
