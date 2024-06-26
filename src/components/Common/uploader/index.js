import React, { Fragment, Component } from 'react';
import FileUploader from 'devextreme-react/file-uploader';
import $ from 'jquery';
import config from '../../../config.json';
class index extends Component {
    constructor(props) {
        super(props);
    }
    onValueChanged = (e) => {
        var files = e.value;
        if (files.length > 0) {
            $("#selected-files .selected-item").remove();
            $.each(files, function (i, file) {
                var $selectedItem = $("<div />").addClass("selected-item");
                $selectedItem.append(
                    $("<span />").html("Name: " + file.name + "<br/>"),
                    $("<span />").html("Size " + file.size + " bytes" + "<br/>"),
                    $("<span />").html("Type " + file.type + "<br/>"),
                    $("<span />").html("Last Modified Date: " + file.lastModifiedDate)
                );
                $selectedItem.appendTo($("#selected-files"));
            });
            $("#selected-files").show();
        }
        // else
        //     $("#selected-files").hide();
    }
    render() {
        return (
            <Fragment>
                <FileUploader
                    abortUpload={null}
                    accept=".xlsx"
                    accessKey={null}
                    activeStateEnabled={false}
                    allowCanceling={true}
                    chunkSize={0}
                    disabled={false}
                    elementAttr={{}}
                    focusStateEnabled={true}
                    height={undefined}
                    hint={undefined}
                    hoverStateEnabled={false}
                    invalidFileExtensionMessage="File type is not allowed"
                    invalidMaxFileSizeMessage="File is too large"
                    invalidMinFileSizeMessage="File is too small"
                    isValid={true}
                    labelText="or Drop file here"
                    multiple={false}
                    name="file"
                    onContentReady={null}
                    onDisposing={null}
                    onInitialized={null}
                    onOptionChanged={null}
                    onProgress={null}
                    onUploadAborted={null}
                    onUploaded={e => this.props.AfterUploadCallback(e)}
                    onValueChanged={e => this.onValueChanged(e)}
                    uploadUrl={config.api + 'Uploader/SaveFile'}
                    onUploadError={null}
                    onUploadStarted={null}
                    progress={0}
                    readOnly={false}
                    readyToUploadMessage="Ready to upload"
                    rtlEnabled={false}
                    selectButtonText="Select File"
                    showFileList={true}
                    tabIndex={0}
                    uploadButtonText="Upload"
                    uploadChunk={null}
                    uploadedMessage="Processing Completed"
                    uploadFailedMessage="Upload failed"
                    uploadFile={null}
                    uploadHeaders={{}}
                    uploadMethod="POST"
                    uploadMode="useButtons"
                    validationError={null}
                    validationErrors={null}
                    validationStatus="valid"
                    //value={[]}
                    visible={true}
                    width={undefined} />
                <div className="content" id="selected-files">
                    <div>
                        <h4>Selected Files</h4>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default index; 