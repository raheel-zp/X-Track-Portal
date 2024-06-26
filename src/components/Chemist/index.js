import React from 'react'
import Form, {
    ButtonItem,
    GroupItem,
    SimpleItem,
    Label,
    CompareRule,
    EmailRule,
    PatternRule,
    RangeRule,
    RequiredRule,
    StringLengthRule,
    AsyncRule
} from 'devextreme-react/form';
import notify from 'devextreme/ui/notify';
import { getLookupLocality } from '../Common/actions/index';
import { addChemist } from './actions/index';
const formref = React.createRef();

class index extends React.Component {
    constructor() {
        super();
        this.buttonOptions = {
            text: 'Register',
            type: 'success',
            useSubmitBehavior: true
        };
        this.typeEditorOptions = {
            items: [{ Id: 1, Text: 'Pharmacy' }, { Id: 2, Text: 'Doctor' }],
            displayExpr: 'Text',
            valueExpr: 'Id',
            searchEnabled: true
        };
        this.state = {
            locality: [],
            // formData: {
            //     "LicenseNumber": "ads",
            //     "ChemistName": "asd",
            //     "LocalityId": "3",
            //     "Address": "asd",
            //     "Type": 1
            // },
            formDisable: false,
            formData: {
                "LicenseNumber": "",
                "ChemistName": "",
                "LocalityId": "",
                "Address": "",
                "Type": 1
            }
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        var obj = this.state.formData;
        obj.LocalityId = obj.LocalityId.toString();
        this.setState({ formDisable: true });
        addChemist(obj, (resp) => {
            this.setState({ formDisable: false });
            debugger
            if (resp.data.successFlag) {
                notify('You have submitted the form', 'success', 3000);
            }
            else {
                notify(resp.data.activityInfo, 'error', 600);
            }
        })
    }
    componentDidMount() {
        getLookupLocality((x) => {
            this.setState({ locality: x });
        })
    }
    render() {
        return (
            <div className="container-fluid">
                <div className="row d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Add Pharmacy and/or Doctor</h1>
                </div>
                <div className="row">
                    <form action="your-action" onSubmit={this.handleSubmit}>
                        <Form
                            ref={formref}
                            formData={this.state.formData}
                            readOnly={false}
                            showColonAfterLabel={true}
                            showValidationSummary={true}
                            validationGroup="customerData"
                        >
                            <GroupItem caption="Credentials">
                                <SimpleItem dataField="LicenseNumber" editorType="dxTextBox">
                                    <RequiredRule message="License Number is required" />
                                </SimpleItem>
                                <SimpleItem dataField="ChemistName" editorType="dxTextBox">
                                    <RequiredRule message="Name is required" />
                                </SimpleItem>
                                <SimpleItem dataField="LocalityId" editorType="dxSelectBox"
                                    editorOptions={{
                                        items: this.state.locality,
                                        displayExpr: 'LocalityName',
                                        valueExpr: 'LocalityId',
                                        searchEnabled: true
                                    }}>
                                    <RequiredRule message="Area is required" />
                                </SimpleItem>
                                <SimpleItem dataField="Address" editorType="dxTextArea">
                                    <RequiredRule message="Address is required" />
                                </SimpleItem>
                                <SimpleItem dataField="Type" editorType="dxSelectBox"
                                    editorOptions={this.typeEditorOptions}>
                                    <RequiredRule message="Type is required" />
                                </SimpleItem>
                            </GroupItem>
                            <ButtonItem horizontalAlignment="left" disabled={this.state.formDisable}
                                buttonOptions={this.buttonOptions}
                            />
                        </Form>
                    </form>
                </div>
            </div>
        )
    }
}
export default index;