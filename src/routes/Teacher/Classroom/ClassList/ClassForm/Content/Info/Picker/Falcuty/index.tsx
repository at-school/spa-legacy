import { Select } from "antd";
import React from "react";
import "../styles/styles.css";

/**
 * A list of selections for falcuties: Arts, Languages,...
 */
const FalcutyPicker: React.SFC<{
  className?: string;
  onChange?: (value: string) => void;
  style?: object;
  value: string;
}> = ({ className = "", onChange, style, value }) => (
  <div className={"picker" + className} style={style}>
    <p>Falcuty: </p>
    <Select onChange={onChange} value={value}>
      <Select.Option value="0">Arts</Select.Option>
      <Select.Option value="1">English and Humanities</Select.Option>
      <Select.Option value="2">Languages</Select.Option>
      <Select.Option value="3">Mathematics</Select.Option>
      <Select.Option value="4">Physical and Outdoor Education</Select.Option>
      <Select.Option value="5">Social and Behavioural Sciences</Select.Option>
      <Select.Option value="6">Technology and Design</Select.Option>
    </Select>
  </div>
);

export default FalcutyPicker;
