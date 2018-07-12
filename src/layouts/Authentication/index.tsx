import React from "react";
import Particles from "react-particles-js";
import "./styles/styles.css";

export default class AuthenticationLayout extends React.Component {
  public render() {
    return (
      <div className="authentication-form">
        <div>
          <Particles
            params={{
              particles: {
                line_linked: {
                  shadow: {
                    blur: 5,
                    color: "#3CA9D1",
                    enable: true
                  }
                }
              }
            }}
            className="authentication-background"
          />
        </div>
        <div>{this.props.children}</div>
      </div>
    );
  }
}
