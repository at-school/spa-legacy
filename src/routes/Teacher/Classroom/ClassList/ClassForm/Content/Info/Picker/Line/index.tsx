import { Select } from "antd";
import React from "react";
import "../styles/styles.css";

/**
 * A list of selections for lines: 1, 2, 3,...
 */
const LinePicker: React.SFC<{
  onChange?: (value: string) => void;
  className?: string;
  style?: object;
}> = ({ onChange, className = "", style }) => (
  <div className={"picker" + className} style={style}>
    <p>Line:</p>
    <Select onChange={onChange} defaultValue="1">
      <Select.Option value="1">1</Select.Option>
      <Select.Option value="2">2</Select.Option>
      <Select.Option value="3">3</Select.Option>
      <Select.Option value="4">4</Select.Option>
      <Select.Option value="5">5</Select.Option>
      <Select.Option value="6">6</Select.Option>
      <Select.Option value="7">7</Select.Option>
      <Select.Option value="8">8</Select.Option>
      <Select.Option value="9">9</Select.Option>
    </Select>
  </div>
);

export default LinePicker;
