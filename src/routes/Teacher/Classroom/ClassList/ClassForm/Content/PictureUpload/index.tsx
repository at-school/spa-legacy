import { Icon, Modal, Upload } from "antd";
import { UploadFile } from "antd/lib/upload/interface";
import React from "react";

interface IPictureUploadProps {
  handleImageDataChange: (imageData: string) => void;
}

/**
 * This lets the users upload picture of the classroom in the class form.
 */
export default class PictureUpload extends React.Component<
  IPictureUploadProps
> {
  public state = {
    previewVisible: false,
    previewImage: "",
    imageFile: null,
    name: "classroom-picture",
    onPreview: (file: UploadFile) => {
      this.setState({
        previewImage: file.url || file.thumbUrl,
        previewVisible: true
      });
    }
  };

  /** stop the default value of action in the Upload.Dragger */
  public beforeUploadToServer = (file: File) => {
    this.setState({ imageFile: file }, () => {
      const formData = new FormData();
      formData.append("file", file);
    });

    // get base64 from the image file then update the parent's state
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.props.handleImageDataChange(reader.result);
    };

    return false;
  };

  public handleCancel = () => this.setState({ previewVisible: false });

  public render() {
    return (
      <div className="class-form-picture-upload">
        <Upload.Dragger
          action={""}
          beforeUpload={this.beforeUploadToServer}
          name={this.state.name}
          multiple={false}
          listType="picture-card"
          onPreview={this.state.onPreview}
          className="upload-section"
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
