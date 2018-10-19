import { Icon, Spin } from "antd";
import React from "react";
import { CSSTransition } from "react-transition-group";

const Spinner: React.SFC<{}> = () => (
  <CSSTransition in={true} timeout={300} unmountOnExit={true} classNames="fade">
    <Spin
      indicator={
        <Icon
          type="loading"
          style={{
            fontSize: 50,
            left: "50%",
            position: "absolute",
            top: "50%"
          }}
          spin={true}
        />
      }
    />
  </CSSTransition>
);

export default Spinner;
