import React, { useEffect, useState } from 'react';
import { Tooltip,Chart, ZoomAndPan, Size, ScrollBar, Series, CommonSeriesSettings, Label, Format, Legend, Export, Font } from 'devextreme-react/chart';
const chartRef = React.createRef();
function Index(props) {
    const [dataReg, setDataReg] = useState([]);
    useEffect(() => {
        setDataReg(props.graphPharmacies);
        const chart = chartRef.current.instance;
        chart.refresh();
    })
    const onPointClick = (e) => {
        e.target.select();
    }
    return (
        <div className="card shadow-inner">
            <div className="card-heading">
                <h5>Estimated Vs. Registered Pharmacies</h5>
            </div>
            <div className="card-body">
                <div className="graph-wrapper">
                    <Chart
                        //title="ESTIMATED Vs. REGISTERED PHARMACIES"
                        ref={chartRef}
                        width='100%'
                        dataSource={dataReg}
                        onPointClick={onPointClick}>
                        {/* <Size width={1000}/> */}
                        <ScrollBar visible={true} />
                        <ZoomAndPan argumentAxis="both" />
                        <CommonSeriesSettings
                            argumentField="DistrictName"
                            type="bar"
                            hoverMode="allArgumentPoints"
                            selectionMode="allArgumentPoints"
                        >

                            <Label visible={true}>
                                <Format type="fixedPoint" precision={0} />
                            </Label>
                        </CommonSeriesSettings>
                        <Series
                            argumentField="DistrictName"
                            valueField="Estimated"
                            color="#000000"
                            name="Estimated Pharmacies"
                        />
                        <Series
                            argumentField="DistrictName"
                            valueField="Achieved"
                            color="#c41f25"
                            name="Registered Pharmacies"
                        />
                        <Tooltip enabled={true}/>
                        <Legend verticalAlignment="bottom" horizontalAlignment="center"></Legend>
                    </Chart>
                </div>
            </div>
        </div>

    );
}


export default Index;
