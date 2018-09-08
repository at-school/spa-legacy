import { Steps } from "antd";
import React from "react";

const Header: React.SFC<{ current: number; steps: string[] }> = props => (
  <Steps current={props.current}>
    {props.steps.map((title, index) => (
      <Steps.Step key={index.toString()} title={title} />
    ))}
  </Steps>
);

export default Header;
