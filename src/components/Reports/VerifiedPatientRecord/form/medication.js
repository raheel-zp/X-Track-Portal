import React, { Component, Fragment, useState, useEffect, useCallback } from 'react';
import { Popup as Popup1, ToolbarItem } from 'devextreme-react/popup';
import ScrollView from 'devextreme-react/scroll-view';
import { Item } from 'devextreme-react/form';
import Button from 'devextreme-react/button';
import FileUploader from 'devextreme-react/file-uploader';
import { GetPatientPrescriptionsMedication, getProduct, updateTransaction, deleteTransaction, updatePImage, deletePImage } from '../actions/index';
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
    Form, Popup,
    Scrolling,
    RequiredRule,
    Lookup
} from 'devextreme-react/data-grid';


let fileUploaderRef = React.createRef();
let imgRef = React.createRef();

const cellRender = data => {
    return <img src={data.value} alt="patient pic" width={50} height={50} />;
}



const onValueChanged = (e, cellInfo) => {
    const reader = new FileReader();
    reader.onload = function (args) {
        imgRef.current.setAttribute('src', args.target.result);
        cellInfo.setValue(args.target.result);
    }
    reader.readAsDataURL(e.value[0]); // convert to base64 string
};

function Medication(props) {
    const [currentPatient, setCurrentPatient] = useState(props.currentPatient);
    const [popupVisible, setPopupVisible] = useState(props.popupVisible);
    const [disableButton, setDisableButton] = useState(false);
    const [image, setImage] = useState([]);
    const [medication, setMedication] = useState([]);
    const [product, setProduct] = useState([]);

    function editCellRender(cellInfo) {
        return (
            <>
                <img ref={imgRef} className="uploadedImage" src={cellInfo.value} alt="patient pic" />
                <FileUploader ref={fileUploaderRef} multiple={false} accept="image/*" uploadMode="useForm"
                    onValueChanged={e => onValueChanged(e, cellInfo)}
                />
            </>
        );
    }

    // const onSaved = useCallback(e => {
    //     debugger
    // }, [])


    const buttonOptions = {
        text: 'Submit',
        onClick: () => {
            setDisableButton(true);
            props.hidePopup();
            setPopupVisible(false);
            setDisableButton(false);
        }
    }

    useEffect(() => {
        GetPatientPrescriptionsMedication(currentPatient.Id, (data) => {
            setImage(data.image);
            setMedication(data.medication);
            getProduct((data) => {
                setProduct(data);
            })
        })
    }, []);
    const onRowRemoved = (e) => {
        e.cancel = true;
        deleteTransaction(e.key, (res) => {
            debugger
            e.component.navigateToRow(e.key);
            e.component.cancelEditData();
        })
    }
    const onRowUpdated = (e) => {
        e.cancel = true;
        var data = Object.assign(e.oldData, e.newData);
        var obj = {
            Id: e.key,
            ProductId:Number(data.ProductId),
            Quantity:Number(data.Quantity),
        }
        updateTransaction(e.key, obj, (res) => {
            debugger
            e.component.navigateToRow(e.key);
            e.component.cancelEditData();
        })
    }
    const onRowRemovedImage = (e) => {
        debugger
        e.cancel = true;
        deletePImage(e.key, (res) => {
            debugger
            e.component.navigateToRow(e.key);
            e.component.cancelEditData();
        })
    }
    const onRowUpdatedImage = (e) => {
        e.cancel = true;
        var data = Object.assign(e.oldData, e.newData);
        var obj = {
            Id: e.key,
            Image: data.Image.split(',')[1]
        }
        updatePImage(e.key, obj, (res) => {
            debugger
            e.component.navigateToRow(e.key);
            e.component.cancelEditData();
        })
    }
    return (
        <Fragment>
            <Popup1
                visible={popupVisible}
                onHiding={props.hidePopup}
                dragEnabled={false}
                closeOnOutsideClick={true}
                showTitle={true}
                title="Update Patient Information"
                width='90%'
                height='90%'>
                <ToolbarItem
                    options={buttonOptions}
                    widget="dxButton"
                    location="after"
                    toolbar="bottom"
                />
                <ScrollView width='100%' height='100%'>
                    <div className='row'>
                        <div className='col-md-8'>
                            <DataGrid
                                width='100%'
                                allowColumnReordering={true}
                                allowColumnResizing={true}
                                columnAutoWidth={true}
                                keyExpr="Id"
                                dataSource={medication}
                                onRowUpdating={onRowUpdated}
                                onRowRemoving={onRowRemoved}
                                showBorders={true}>
                                <Column
                                    dataField="Id"
                                    caption="Id"
                                    visible={false}
                                    allowUpdating={false}>
                                </Column>
                                <Column
                                    dataField="ProductId"
                                    allowUpdating={false}
                                    caption="Product Name">
                                    <RequiredRule />
                                    <Lookup dataSource={product} valueExpr="Id" displayExpr="Name" />
                                </Column>
                                <Column
                                    dataType="number"
                                    dataField="Quantity"
                                    caption="Quantity">
                                    <RequiredRule />
                                </Column>
                                <Column
                                    dataField="AddedDate"
                                    dataType="date"
                                    allowEditing={false}
                                    caption="Date">
                                    <RequiredRule />
                                </Column>


                                <FilterRow visible={false} applyFilter={false} />
                                <HeaderFilter visible={false} />
                                <Sorting mode="multiple" />
                                <Editing
                                    mode="row"
                                    allowUpdating={true}
                                    allowDeleting={true}
                                    allowAdding={false}>
                                </Editing>
                                <Scrolling columnRenderingMode="virtual" />
                                <Pager allowedPageSizes={[10, 20, 50, 100]} showPageSizeSelector={true} showInfo={true} />
                                <LoadPanel enabled />
                                <Paging defaultPageSize={15} />
                            </DataGrid>
                        </div>
                        <div className='col-md-4'>
                            <DataGrid id="gridContainer"
                                dataSource={image}
                                keyExpr={"Id"}
                                showBorders={true}
                                onRowUpdating={onRowUpdatedImage}
                                onRowRemoving={onRowRemovedImage}
                            >
                                <Editing
                                    mode="popup"
                                    allowDeleting={true}
                                    allowUpdating={true}>
                                    <Popup title="Prescription" showTitle={true} width={700} />
                                    <Form>
                                        <Item itemType="group" colCount={2} colSpan={2}>
                                            <Item dataField="Date" disabled={true} />
                                        </Item>
                                        <Item itemType="group" caption="Photo" colCount={2} colSpan={2}>
                                            <Item dataField="Image" colSpan={2} />
                                        </Item>
                                    </Form>
                                </Editing>
                                <Column dataField="Image"
                                    width={70}
                                    allowSorting={false}
                                    cellRender={cellRender}
                                    editCellRender={editCellRender}
                                />

                                <Column dataField="Date" dataType="date" />
                            </DataGrid>
                        </div>
                    </div>
                </ScrollView>
            </Popup1>
        </Fragment>
    );
}



export default Medication;


