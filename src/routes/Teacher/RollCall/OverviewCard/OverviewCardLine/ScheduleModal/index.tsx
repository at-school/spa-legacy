import { Modal } from "antd";
import React from "react";

const ScheduleModal = ({ visible, toggleModal, title }: any) => {
  return (
    <Modal
      title={title}
      onOk={toggleModal}
      onCancel={toggleModal}
      visible={visible}
    />
  );
};

export default ScheduleModal;
