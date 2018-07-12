import { Icon } from "antd";
import React from "react";
import { CSSTransition } from "react-transition-group";

const Spinner: React.SFC<{ loading: boolean }> = ({ loading }) => (
  <CSSTransition
    in={loading}
    transitionAppear={true}
    transitionLeave={true}
    timeout={300}
    unmountOnExit={true}
    classNames="fade"
  >
    <Icon
      type="loading"
      style={{
        fontSize: 50,
        left: "50%",
        margin: "-25px 0px 0px -25px",
        position: "absolute",
        top: "50%"
      }}
      spin={true}
    />
  </CSSTransition>
);

export default Spinner;
