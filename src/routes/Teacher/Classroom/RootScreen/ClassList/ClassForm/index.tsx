import { Modal } from "antd";
import { UploadFile } from "antd/lib/upload/interface";
import React from "react";
import AppContext from "../../../../../../contexts/AppContext";
import { getClassQuery } from "../../../queries";
import { IClassData } from "../../interfaces";
import FormContent from "../ClassForm/Content";
import FormHeader from "../ClassForm/Header";

interface IClassFormProps {
  visible: boolean;
  toggleClassForm: () => void;
  // add class could be a function be either modifying the class or adding a new class
  addClass: any;
  // if the class data is not null, then it means the component
  // will be acting as the edit class form
  classData?: IClassData | null;
  userId?: string;
}

interface IClassFormPropsWithContext extends IClassFormProps {
  token: string;
  userId?: string;
}

interface IClassFormState {
  className: string;
  classDescription: string;
  classFalcuty: string;
  classLine: string;
  imageFile: UploadFile[] | undefined;
  // on sending data is for animation when user click on submiting the form
  onSendingData: boolean;
  // the current position of the user in the form
  current: number;
  // if user pass down class data, then it is edit class form
  // use this class data to check for if the user is still in the form
  // in edit class form
  classData: IClassData | null;
}

// get new states when passing down new props
// only applicable for edit classform
const getStatesFromProps = (props: IClassFormProps) => {
  // get image format from the base64 data of the avatar
  if (props.classData && props.classData.avatar) {
    let imageFormat = props.classData.avatar[5];
    for (let i = 1; i < 12; i++) {
      const currentLetter = props.classData.avatar[5 + i];
      if (currentLetter === ";") {
        break;
      }
      imageFormat += currentLetter;
    }
    // make a fake image file for preview image
    const imageFile = {
      uid: -1,
      name: "avatar",
      status: "done",
      url: props.classData.avatar,
      size: 10000,
      type: imageFormat
    };
    // update the state
    const data = {
      id: props.classData.Id,
      className: props.classData.name,
      classDescription: props.classData.description,
      classLine: props.classData.lineId,
      classFalcuty: props.classData.falcutyId,
      imageFile: [imageFile],
      classData: props.classData,
      onSendingData: false,
      current: 0
    };
    console.log(data);
    return data;
  }
  return {};
};

/**
 * This is the class form. Can be used for: add class form, edit class form
 * If the user does pass down class information: edit class form
 * If class information is not in props: add class form
 */
class ClassForm extends React.Component<
  IClassFormPropsWithContext,
  IClassFormState
> {
  public static getDerivedStateFromProps(
    props: IClassFormProps,
    state: IClassFormState
  ) {
    // check if class data exists, if not, dont' update the state
    if (props.classData) {
      // if the previous data is the same as the current data,
      // which means the user still in that form
      // then the form is the same so don't update
      if (JSON.stringify(props.classData) === JSON.stringify(state.classData)) {
        return null;
      } else {
        return getStatesFromProps(props);
      }
    }
    return null;
  }

  public steps = ["Basic Info", "Set Avatar", "Confirm"];

  public state = {
    className: "",
    classDescription: "",
    classFalcuty: "0",
    classLine: "1",
    imageFile: undefined,
    onSendingData: false,
    current: 0,
    classData: null
  };

  // once component mounted, if there is a classData as props, then set it to
  // state because it is likely be the edit class form
  public componentDidMount() {
    if (this.props.classData) {
      this.setState({ classData: this.props.classData });
    }
  }

  // handle all change of input: name, description, etc.
  public handleInputChange = (fieldChange: keyof IClassFormState) => (
    e: React.FormEvent<HTMLInputElement>
  ) => {
    // have to set as any because this is a bug in TypeScript: refer to here https://github.com/Microsoft/TypeScript/issues/15534
    this.setState({ [fieldChange]: e.currentTarget.value } as any);
  };

  // handle all changes of the pickers: falcuty, line, etc.
  public handlePickerChange = (fieldChange: keyof IClassFormState) => (
    value: string
  ) => {
    // have to set as any because this is a bug in TypeScript: refer to here https://github.com/Microsoft/TypeScript/issues/15534
    this.setState({ [fieldChange]: value } as any);
  };

  // set new image
  public handleImageDataChange = (imageFile: UploadFile) =>
    this.setState({ imageFile: [imageFile] });

  // remove image from the form
  public removeImage = () => this.setState({ imageFile: undefined });

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
          afterClose={this.resetFormData}
          destroyOnClose={false}
        >
          <FormHeader steps={this.steps} current={this.state.current} />
          <FormContent
            handlePickerChange={this.handlePickerChange}
            handleInputChange={this.handleInputChange}
            handleImageDataChange={this.handleImageDataChange}
            current={this.state.current}
            formData={{
              className: this.state.className,
              classDescription: this.state.classDescription,
              classFalcuty: this.state.classFalcuty,
              classLine: this.state.classLine,
              imageFile: this.state.imageFile
            }}
            removeImage={this.removeImage}
          />
        </Modal>
      </div>
    );
  }

  // callback when clicks ok button in the form
  private onClickOk = () => {
    if (this.state.current === this.steps.length - 1) {
      // set onsending data to true to get the uploading animation
      if (this.state.imageFile) {
        this.setState({ onSendingData: true });
        // get image data
        const imageFile = this.state.imageFile as any;
        const avatarData = imageFile[0].url;

        // get class data
        const classData = this.state.classData as any;
        // if class data exists then it means it's on the modifying state
        if (classData) {
          this.props.addClass(
            {
              id: classData.Id,
              name: this.state.className,
              description: this.state.classDescription,
              line: this.state.classLine,
              falcuty: this.state.classFalcuty,
              avatarData
            },
            this.props.toggleClassForm
          );
        } else {
          // add class to the server
          // get back the id of the class of the server
          // append the class to the original class array
          // close the form
          this.props.addClass({
            variables: {
              name: this.state.className,
              description: this.state.classDescription,
              avatar: avatarData,
              falcutyId: this.state.classFalcuty,
              lineId: this.state.classLine
            },
            update: (store: any, { data: { createClassroom } }: any) => {
              // Read the data from our cache for this query.
              const data = store.readQuery({
                query: getClassQuery,
                variables: { Id: this.props.userId }
              });
              console.log(createClassroom);
              console.log(data);
              try {
                data.user[0].classrooms.push(createClassroom);
                console.log(data);

                store.writeQuery({
                  query: getClassQuery,
                  variables: { Id: this.props.userId },
                  data
                });
              } catch (err) {
                console.log(err);
              }
              this.props.toggleClassForm();
            }
          });
        }
      } else {
        // do something when the form is not valid
      }
    } else {
      this.setState({ current: this.state.current + 1 });
    }
  };

  // this function will get invoked if you want to close the class form
  // it will check if the event is from the right button to close
  // it also acts as a function to move between the current position on the form
  // by checking the current position
  private onClickCancel = (e: React.MouseEvent<any>) => {
    if (this.state.current === 0 || e.currentTarget.type !== "button") {
      this.props.toggleClassForm();
    } else {
      this.setState({ current: this.state.current - 1 });
    }
  };

  // reset all the states once close the form
  private resetFormData = () => {
    // if not class data, it means it is in the adding class state
    // reset the form normally
    if (!this.state.classData) {
      this.setState({
        className: "",
        classDescription: "",
        classFalcuty: "0",
        classLine: "1",
        imageFile: undefined,
        current: 0,
        onSendingData: false
      });
    }
    // it is in the modifying class state
    // it will get the oringal class data and set it as state
    else {
      if (this.props.classData) {
        const originalStates = getStatesFromProps(this.props);
        this.setState(originalStates as any);
      }
    }
  };
}

export default (props: IClassFormProps) => (
  <AppContext.Consumer>
    {value =>
      value.token && (
        <ClassForm
          userId={value.userId as any}
          {...props}
          token={value.token}
        />
      )
    }
  </AppContext.Consumer>
);
