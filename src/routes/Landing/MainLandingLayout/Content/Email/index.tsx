import { Input } from "antd";
import React from "react";

const Email = () => (
  <div className="intro-email">
    <div className="intro-email-content">
      <div className="intro-email-content-title">
        Our product is still in development stage
      </div>
      <div className="intro-email-content-subtitle">
        Put your email down below to get a demo.
      </div>
    </div>
    <div className="intro-email-form">
      <Input.Search
        placeholder="Enter an email..."
        enterButton="Request a demo"
        size="large"
      />
    </div>
  </div>
);

export default Email;
