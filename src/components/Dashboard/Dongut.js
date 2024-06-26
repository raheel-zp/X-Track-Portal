import React, { useEffect, useState } from 'react';
import  './style.css';
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
    Font,
    Export
} from 'devextreme-react/pie-chart';
import CenterTemplate from './DongutCenter';
const customPalette = ['#c41f25', '#8b0204', '#767676', '#000000'];

function Index(props) {
    const [dataReg, setDataReg] = useState([]);
    const [title, setTitle] = useState('');
    const [center, setCenter] = useState('');
    useEffect(() => {
        setDataReg(props.PatientNotif);
        setTitle(props.Title);
    })
    const customizeLabel = (e) => {
        return e.argumentText;
        // return `${e.argumentText}\n${e.valueText}`;
    }
    const customizeTooltip = (arg) => {
        return {
            text: `${arg.argumentText}\n${arg.valueText}`
        };
    }
    return (
        <div className="card shadow-inner">
            <div className="card-heading">
                <h5><i className="bi bi-sunrise-fill"></i>{title}</h5>
            </div>
            <div className="card-body overflow-auto">
                <div id="chartContainer" style={{ width: '100%' }}>
                    <PieChart
                        id="pie"
                        type="doughnut"
                        width='100%'
                        // title={title}
                        palette={customPalette}
                        // innerRadius={0.65}
                        resolveLabelOverlapping="shift"
                        // paletteExtensionMode="Alternate"
                        centerRender={CenterTemplate}
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
                            visible={true}
                            margin={0}
                            horizontalAlignment="center"
                            verticalAlignment="bottom"
                        >
                            <Font color='#767676'></Font>
                        </Legend>
                        <Tooltip enabled={true} customizeTooltip={customizeTooltip}>
                        </Tooltip>
                    </PieChart>
                </div>
            </div>
        </div>
    );
}


export default Index;
