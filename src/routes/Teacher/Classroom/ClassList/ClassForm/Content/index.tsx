import React from "react";
import ClassInfo from "./Info";
import PictureUpload from "./PictureUpload";

interface IFormContentProps {
  current: number;
  handleInputChange: (
    fieldChange: string
  ) => (e: React.FormEvent<HTMLInputElement>) => void;
  handlePickerChange: (fieldChange: string) => (value: string) => void;
  handleImageDataChange: (imageData: string) => void;
}

/**
 * Rendering form content based on the current position in the form: basic information, picture uploading, confirmation.
 */
const ClassFormContent: React.SFC<IFormContentProps> = ({
  current,
  handleInputChange,
  handlePickerChange,
  handleImageDataChange
}) => (
  <div className="steps-content">
    {current === 0 && (
      <ClassInfo
        handleInputChange={handleInputChange}
        handlePickerChange={handlePickerChange}
      />
    )}
    {current === 1 && (
      <PictureUpload handleImageDataChange={handleImageDataChange} />
    )}
  </div>
);

export default ClassFormContent;
