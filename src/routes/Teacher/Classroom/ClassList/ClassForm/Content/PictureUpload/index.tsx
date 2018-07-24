import { UploadFile } from "antd/lib/upload/interface";
import React from "react";
import PreviewModal from "./PreviewModal";
import UploadDragger from "./UploadDragger";

interface IPictureUploadProps {
  // will be invoked once prevents image uploaded to the server
  handleImageDataChange: (imageFile: UploadFile) => void;
  // use when remove image from the upload
  removeImage: () => void;
  // imageFile for rendering image file in the upload
  imageFile: UploadFile[] | undefined;
}

interface IPictureUploadState {
  previewVisible: boolean;
}

/**
 * This lets the users upload picture of the classroom in the class form.
 * The file list is handled by the parent's component
 */
export default class PictureUpload extends React.Component<
  IPictureUploadProps,
  IPictureUploadState
> {
  public state = {
    // switch between preview the image
    previewVisible: false
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

  // cancel preview the image, which means close the image modal
  public togglePreviewModal = () =>
    this.setState(prevState => ({ previewVisible: !prevState.previewVisible }));

  public render() {
    return (
      <div className="class-form-picture-upload">
        <UploadDragger
          beforeUploadToServer={this.beforeUploadToServer}
          onPreview={this.togglePreviewModal}
          imageFile={this.props.imageFile}
          removeImage={this.props.removeImage}
        />
        <PreviewModal
          imageFileData={
            this.props.imageFile ? this.props.imageFile[0].url : undefined
          }
          closePreviewModal={this.togglePreviewModal}
          previewVisible={this.state.previewVisible}
        />
      </div>
    );
  }
}
