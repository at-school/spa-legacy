import {UploadFile} from "antd/lib/upload/interface"

export interface IFormData {
  className: string;
  classDescription: string;
  classFalcuty: string;
  classLine: string;
  imageFile: UploadFile[] | undefined;
}
