import { Icon, Upload } from "antd";
import { UploadFile } from "antd/lib/upload/interface";
import React from "react";

interface IUploadDraggerProps {
  // it will stop the default action of the upload dragger
  beforeUploadToServer: (file: File) => boolean;
  // function will toggle the preview modal
  onPreview: () => void;
  // a list of available images
  imageFile: UploadFile[] | undefined;
  // function invoked when remove one imageƒ
  removeImage: () => void;
}

const UploadDragger: React.SFC<IUploadDraggerProps> = ({
  beforeUploadToServer,
  onPreview,
  imageFile,
  removeImage
}) => (
  <Upload.Dragger
    action={""}
    beforeUpload={beforeUploadToServer}
    multiple={false}
    listType="picture-card"
    onPreview={onPreview}
    className="upload-section"
    fileList={imageFile}
    onRemove={removeImage}
  >
    <p className="ant-upload-drag-icon">
      <Icon type="inbox" />
    </p>
    <p className="ant-upload-text">
      Click or drag image to this area to upload
    </p>
    <p className="ant-upload-hint">
      Support for a single or bulk upload. Strictly prohibit from uploading
      company data or other band files
    </p>
  </Upload.Dragger>
);

export default UploadDragger;
