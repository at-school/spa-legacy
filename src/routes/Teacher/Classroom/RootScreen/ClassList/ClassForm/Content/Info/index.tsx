import { Input } from "antd";
import React from "react";
import { IFormData } from "../../IFormData";
import FalcutyPicker from "./Picker/Falcuty";
import LinePicker from "./Picker/Line";

/**
 * This will render a form letting the users fill in some basic information of class: name, description, etc.
 */
const FormInfo: React.SFC<{
  handleInputChange: (
    fieldChange: string
  ) => (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handlePickerChange: (fieldChagne: string) => (value: string) => void;
  formData: IFormData;
}> = ({ handleInputChange, handlePickerChange, formData }) => (
  <React.Fragment>
    <div className="class-form-info">
      <div>
        <p>Class name</p>
        <Input
          onChange={handleInputChange("className")}
          placeholder="Classroom name"
          value={formData.className}
        />
      </div>
      <div>
        <p>Description</p>
        <Input.TextArea
          onChange={handleInputChange("classDescription")}
          placeholder="The class is about..."
          value={formData.classDescription}
        />
      </div>
      <LinePicker
        onChange={handlePickerChange("classLine")}
        value={formData.classLine}
      />
      <FalcutyPicker
        onChange={handlePickerChange("classFalcuty")}
        value={formData.classFalcuty}
      />
    </div>
  </React.Fragment>
);

export default FormInfo;
