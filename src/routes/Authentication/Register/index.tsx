import { Col, Icon, Row } from "antd";
import React from "react";
import AuthenticationLayout from "../../../layouts/Authentication";
import RegisterForm from "./Form";
import "./styles/styles.css";

/**
 * Main layout that contains the registration form and the marketing stuff
 */
const MainLayout = () => (
  <div className="main-container">
    <h1>@ SCHOOl</h1>
    <Row>
      <Col xs={0} sm={0} md={0} lg={2} xl={2} />
      <Col xs={24} sm={24} md={12} lg={10} xl={10}>
        <h1>Some marketing here</h1>
      </Col>
      <Col xs={24} sm={24} md={12} lg={10} xl={10}>
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
      <Col xs={0} sm={0} md={0} lg={2} xl={2} />
    </Row>
  </div>
);

export default () => (
  <AuthenticationLayout>
    <Row id="RegisterForm">
      <Col xs={1} sm={3} md={4} lg={5} xl={5} />
      <Col xs={22} sm={18} md={16} lg={14} xl={14}>
        <MainLayout />
      </Col>
      <Col xs={1} sm={3} md={4} lg={5} xl={5} />
    </Row>
  </AuthenticationLayout>
);
