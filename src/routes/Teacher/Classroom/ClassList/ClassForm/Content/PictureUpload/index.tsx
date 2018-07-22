import { Icon, Modal, Upload } from "antd";
import { UploadFile } from "antd/lib/upload/interface";
import React from "react";

interface IPictureUploadProps {
  handleImageDataChange: (imageFile: UploadFile) => void;
  removeImage: () => void;
  imageFile: UploadFile[] | undefined;
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
    // get base64 from the image file then update the parent's state
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // convert the file into UploadFile interface
      const imageFile = {
        uid: -1,
        name: file.name,
        status: "done" as any,
        url: reader.result,
        size: file.size,
        type: file.type
      };

      // add it to the form state
      this.props.handleImageDataChange(imageFile);
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
          fileList={this.props.imageFile as any}
          onRemove={this.props.removeImage}
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
            src={this.props.imageFile ? this.props.imageFile[0].url : undefined}
          />
        </Modal>
      </div>
    );
  }
}
