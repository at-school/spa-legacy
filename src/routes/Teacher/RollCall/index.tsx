import { Card, Col, Row } from "antd";
import React from "react";
import RealTimeMarkingCard from "./components/RealTimeMarkingCard";
import StudentOnTimeCard from "./components/StudentOnTimeCard";
import "./styles/styles.css";

export default class RollCall extends React.Component {
  public render() {
    return (
      <Row>
        <Col xs={24} md={24} lg={17} xl={18}>
          <Card title="Activity" style={{width: "100%"}}>
            <div>Hello</div>
          </Card>
        </Col>
        <Col xs={24} md={24} lg={7} xl={6}>
          <Row>
            <Col xs={24} md={12} lg={24} xl={24}>
              <RealTimeMarkingCard />
            </Col>
            <Col xs={24} md={12} lg={24} xl={24}>
              <StudentOnTimeCard />
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}
