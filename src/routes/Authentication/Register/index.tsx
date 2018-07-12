import { Col, Icon, Row } from "antd";
import React from "react";
import AuthenticationLayout from "../../../layouts/Authentication";
import RegisterForm from "./Form";
import "./styles/styles.css";

export default () => (
  <AuthenticationLayout>
    <Row id="RegisterForm">
      <Col xs={1} sm={3} md={4} lg={5} xl={5} />
      <Col xs={22} sm={18} md={16} lg={14} xl={14}>
        <div className="main-container">
          <h1>@ SCHOOl</h1>
          <Row>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <h1>Some marketing here</h1>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <div className="form">
                <div>
                  <Icon type="facebook" />
                  <Icon type="twitter" />
                  <Icon type="google" />
                </div>
                <h4>or be classical</h4>
                <RegisterForm />
              </div>
            </Col>
          </Row>
        </div>
      </Col>
      <Col xs={1} sm={3} md={4} lg={5} xl={5} />
    </Row>
  </AuthenticationLayout>
);
