import React, { Component } from 'react';
import { getContactUsInformation } from './actions/index';
import DataGrid, {
    Sorting,
    Export,
    LoadPanel,
    FilterRow,
    Pager,
    Paging,
    HeaderFilter,
    Column,
    FormItem,
    Scrolling,

} from 'devextreme-react/data-grid';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gridData: [],
        };
    }
    componentDidMount() {
        getContactUsInformation((data) => {
            this.setState({ gridData: data });
        });
    }
    render() {
        return (
            <div className="container-fluid">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Contact Us List</h1>
                </div>
                <div className="row">
                    <DataGrid
                        width='100%'
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
                            dataField="Serail"
                            caption="Sr.#"
                            cssClass="text-center font-weight-bold">
                        </Column>
                        <Column
                            dataField="Name"
                            caption="Name"
                            visible={true}>
                        </Column>
                        <Column
                            dataField="ContactNo"
                            caption="Contact No">
                        </Column>
                        <Column
                            dataField="Email"
                            caption="Email">
                        </Column>
                        <Column
                            dataField="Detail"
                            caption="Detail">
                        </Column>
                        <Column
                            dataField="AddedDate"
                            caption="Date"
                            dataType='date'
                            >
                        </Column>
                        <FilterRow visible={true} applyFilter={true} />
                        <HeaderFilter visible={true} />
                        <Sorting mode="multiple" />
                        <Scrolling columnRenderingMode="virtual" />
                        <Pager allowedPageSizes={[10, 20, 50, 100]} showPageSizeSelector={true} showInfo={true} />
                        <LoadPanel enabled />  <Paging defaultPageSize={15} />
                        <Export enabled={true} />
                    </DataGrid>
                </div>
            </div>
        );
    }
}

export default index;