import React, { useEffect, useState } from 'react';
import { Chart, ZoomAndPan, Size, ScrollBar,Tooltip, Series, CommonSeriesSettings, Label, Format, Legend, Export } from 'devextreme-react/chart';
const chartRef = React.createRef();

function Index(props) {
    const [dataReg, setDataReg] = useState([]);

    useEffect(() => {
        setDataReg(props.data);
        const chart = chartRef.current.instance;
        chart.refresh();
    })
    const onPointClick = (e) => {
        e.target.select();
    }
    return (
        <div className="card shadow-inner">
            <div className="card-heading">
                <h5>Statistics Overview</h5>
            </div>
            <div className="card-body">
                <div className="graph-wrapper">
                    <Chart
                        ref={chartRef}
                        //title="ESTIMATED Vs. REGISTERED PHARMACIES"
                        dataSource={dataReg}
                        width='100%'
                        resolveLabelOverlapping="shift"
                        onPointClick={onPointClick}>
                        <Size
                            width='100%'
                        />
                        <ScrollBar visible={true} />
                        <ZoomAndPan argumentAxis="both" />
                        <CommonSeriesSettings
                            argumentField="MonthName"
                            type="line"
                            hoverMode="allArgumentPoints"
                            selectionMode="allArgumentPoints"
                        >
                            <Label visible={false}>
                                <Format type="fixedPoint" precision={0} />
                            </Label>
                        </CommonSeriesSettings>
                        <Series
                            argumentField="MonthName"
                            valueField="RegisteredPharmacies"
                            name="Pharmacies Registered"
                            color="#000000"
                        />
                        <Series
                            valueField="RegisteredPatient"
                            name="Patients Registered"
                            color="#c41f25" />
                        <Series
                            valueField="NotifiedPatient"
                            name="Patients Notified"
                            color="#767676" />
                        <Tooltip enabled={true}/>
                        <Legend verticalAlignment="bottom" horizontalAlignment="center"></Legend>
                    </Chart>
                </div>
            </div>
        </div>

    );
}


export default Index;
