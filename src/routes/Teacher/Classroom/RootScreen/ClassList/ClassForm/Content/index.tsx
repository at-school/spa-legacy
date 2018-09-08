import { UploadFile } from "antd/lib/upload/interface";
import React from "react";
import { IFormData } from "../IFormData";
import ClassInfo from "./Info";
import PictureUpload from "./PictureUpload";


interface IFormContentProps {
  current: number;
  handleInputChange: (
    fieldChange: string
  ) => (e: React.FormEvent<HTMLInputElement>) => void;
  handlePickerChange: (fieldChange: string) => (value: string) => void;
  handleImageDataChange: (imageFile: UploadFile) => void;
  formData: IFormData;
  removeImage: () => void
}

/**
 * Rendering form content based on the current position in the form: basic information, picture uploading, confirmation.
 */
const ClassFormContent: React.SFC<IFormContentProps> = ({
  current,
  handleInputChange,
  handlePickerChange,
  handleImageDataChange,
  formData,
  removeImage
}) => (
  <div className="steps-content">
    {current === 0 && (
      <ClassInfo
        handleInputChange={handleInputChange}
        handlePickerChange={handlePickerChange}
        formData={formData}
      />
    )}
    {current === 1 && (
      <PictureUpload imageFile={formData.imageFile} removeImage={removeImage} handleImageDataChange={handleImageDataChange} />
    )}
  </div>
);

export default ClassFormContent;
