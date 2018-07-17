import { Input } from "antd";
import React from "react";
import FalcutyPicker from "./Picker/Falcuty";
import LinePicker from "./Picker/Line";

/**
 * This will render a form letting the users fill in some basic information of class: name, description, etc.
 */
const FormInfo: React.SFC<{
  handleInputChange: (fieldChange:string) => (e:React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handlePickerChange: (fieldChagne: string) => (value: string) => void;
}> = ({ handleInputChange, handlePickerChange }) => (
  <React.Fragment>
    <div className="ClassFormInfo">
      <div>
        <p>Class name</p>
        <Input
          onChange={handleInputChange("className")}
          placeholder="Classroom name"
        />
      </div>
      <div>
        <p>Description</p>
        <Input.TextArea
          onChange={handleInputChange("classDescription")}
          placeholder="The class is about..."
        />
      </div>
      <LinePicker onChange={handlePickerChange("classLine")} />
      <FalcutyPicker onChange={handlePickerChange("classFalcuty")} />
    </div>
  </React.Fragment>
);

export default FormInfo;
