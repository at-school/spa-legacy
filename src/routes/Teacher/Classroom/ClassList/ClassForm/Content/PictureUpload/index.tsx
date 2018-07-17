import { Icon, message, Modal, Upload } from "antd";
import React from "react";

/**
 * This lets the users upload picture of the classroom in the class form.
 */
export default class PictureUpload extends React.Component {
  public state = {
    previewVisible: false,
    previewImage: "",
    name: "classroom-picture",
    action: "//jsonplaceholder.typicode.com/posts/",
    onChange(info: any) {
      const status = info.file.status;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onPreview: (file: any) => {
      console.log(this.state.previewImage);
      this.setState({
        previewImage: file.url || file.thumbUrl,
        previewVisible: true
      });
    }
  };

  public handleCancel = () => this.setState({ previewVisible: false });

  public render() {
    return (
      <div className="ClassFormPictureUpload">
        <Upload.Dragger
          name={this.state.name}
          multiple={false}
          action={this.state.action}
          onChange={this.state.onChange}
          listType="picture-card"
          onPreview={this.state.onPreview}
        >
          <p className="ant-upload-drag-icon">
            <Icon type="inbox" />
          </p>
          <p className="ant-upload-text">
            Click or drag image to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from
            uploading company data or other band files
          </p>
        </Upload.Dragger>
        <Modal
          visible={this.state.previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img
            alt="Uploaded Image"
            style={{ width: "100%" }}
            src={this.state.previewImage}
          />
        </Modal>
      </div>
    );
  }
}
