import { Modal } from "antd";
import React from "react";

interface IPreviewModalProps {
  // if true then open the modal, otherwist close
  previewVisible: boolean;
  // function will be invoked once the modal is closed
  closePreviewModal: () => void;
  // an url for the image of the modal
  imageFileData: string | undefined;
}

const PreviewModal: React.SFC<IPreviewModalProps> = ({
  previewVisible,
  closePreviewModal,
  imageFileData
}) => (
  <Modal visible={previewVisible} footer={null} onCancel={closePreviewModal}>
    <img alt="Uploaded Image" style={{ width: "100%" }} src={imageFileData} />
  </Modal>
);

export default PreviewModal;
