import { Modal } from "antd";
import React from "react";
import FormContent from "../ClassForm/Content";
import FormHeader from "../ClassForm/Header";

interface IClassFormProps {
  visible: boolean;
  toggleAddClassForm: () => void;
}

interface IClassFormState {
  className: string;
  classDescription: string;
  classFalcuty: string;
  classLine: string;
  imageData: string;
  onSendingData: boolean;
  current: number;
}

export default class NewClassForm extends React.Component<
  IClassFormProps,
  IClassFormState
> {
  public steps = ["Basic Info", "Set Avatar", "Confirm"];

  public state = {
    className: "",
    classDescription: "",
    classFalcuty: "0",
    classLine: "1",
    imageData: "",
    onSendingData: false,
    current: 0
  };

  public handleInputChange = (fieldChange: keyof IClassFormState) => (
    e: React.FormEvent<HTMLInputElement>
  ) => {
    // have to set as any because this is a bug in TypeScript: refer to here https://github.com/Microsoft/TypeScript/issues/15534
    this.setState({ [fieldChange]: e.currentTarget.value } as any);
    console.log(this.state);
  };

  public handlePickerChange = (fieldChange: keyof IClassFormState) => (
    value: string
  ) => {
    // have to set as any because this is a bug in TypeScript: refer to here https://github.com/Microsoft/TypeScript/issues/15534
    this.setState({ [fieldChange]: value } as any);
  };

  public handleImageDataChange = (imageData: string) =>
    this.setState({ imageData });

  public render() {
    return (
      <div>
        <Modal
          title="Title"
          visible={this.props.visible}
          onOk={this.onClickOk}
          okText={this.state.current === this.steps.length - 1 ? "Add" : "Next"}
          onCancel={this.onClickCancel}
          cancelText={this.state.current > 0 ? "Previous" : "Cancel"}
          confirmLoading={this.state.onSendingData}
          className="class-form"
        >
          <FormHeader steps={this.steps} current={this.state.current} />
          <FormContent
            handlePickerChange={this.handlePickerChange}
            handleInputChange={this.handleInputChange}
            handleImageDataChange={this.handleImageDataChange}
            current={this.state.current}
          />
        </Modal>
      </div>
    );
  }

  private onClickOk = () => {
    if (this.state.current === this.steps.length) {
      this.props.toggleAddClassForm();
    } else {
      this.setState({ current: this.state.current + 1 });
    }
  };

  private onClickCancel = (e: React.MouseEvent<any>) => {
    if (this.state.current === 0 || e.currentTarget.type !== "button") {
      this.props.toggleAddClassForm();
    } else {
      this.setState({ current: this.state.current - 1 });
    }
  };
}
