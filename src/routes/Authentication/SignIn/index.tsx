import { Col, Row } from "antd";
import React from "react";
import AuthenticationLayout from "../../../layouts/Authentication";
import SignInForm from "./Form";
import "./styles/styles.css";

export default () => (
  <AuthenticationLayout>
    <Row id="SigninForm">
      <Col xs={2} sm={6} md={8} lg={9} xl={10} />
      <Col xs={20} sm={12} md={8} lg={5} xl={4}>
        <div className="form-container">
          <h1>@ SCHOOl</h1>
          <div className="form-input-container">
            <SignInForm />
          </div>
        </div>
      </Col>
      <Col xs={2} sm={6} md={8} lg={9} xl={10} />
    </Row>
  </AuthenticationLayout>
);
