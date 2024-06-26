import React, { useEffect, useState } from 'react';
import { Chart, ZoomAndPan, Size, ScrollBar, Series, CommonSeriesSettings, Label, Format, Legend, Export } from 'devextreme-react/chart';
const chartRef = React.createRef();

function Index(props) {
    const [dataReg, setDataReg] = useState([]);
    const [title, setTitle] = useState('');

    useEffect(() => {
        setDataReg(props.data);
        setTitle(props.Title);
        const chart = chartRef.current.instance;
        chart.refresh();
    })
    return (
        <div className="card shadow-inner">
            <div className="card-heading">
                <h5>{title}</h5>
            </div>
            <div className="card-body">
                <div className="graph-wrapper">
                    <Chart
                        ref={chartRef}
                        width='100%'
                        dataSource={dataReg}
                        resolveLabelOverlapping="stack"
                    >
                        <Size
                            width='100%'
                        />
                        <ScrollBar visible={true} />
                        <ZoomAndPan argumentAxis="both" />
                        <CommonSeriesSettings
                            argumentField="QuarterName"
                            type="bar"
                            hoverMode="allArgumentPoints"
                            selectionMode="allArgumentPoints"
                        >
                            <Label visible={true}>
                                <Format type="fixedPoint" precision={0} />
                            </Label>
                        </CommonSeriesSettings>
                        <Series
                            argumentField="QuarterName"
                            valueField="Estimated"
                            name={props.Estimated}
                            color="#000000"
                        />
                        <Series
                            valueField="Achieved"
                            name={props.Achieved}
                            color="#c41f25"

                        />
                        <Legend verticalAlignment="bottom" horizontalAlignment="center"></Legend>
                        {/* <Export enabled={true} /> */}
                    </Chart>

                </div>
            </div>
        </div>

    );
}


export default Index;
