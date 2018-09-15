import { Card, Col, Row } from "antd";
import React from "react";
import OverviewCardLine from "./OverviewCardLine";
import OverviewCardStudents from "./OverviewCardStudents";

const OverviewCard: React.SFC<any> = (props: any) => (
  <Row gutter={16} className="overview-info-card-container">
    <Col className="overview-info-column-container" xs={24} md={8} lg={8}>
      <OverviewCardLine />
    </Col>
    <Col className="overview-info-column-container" xs={24} md={8} lg={8}>
      <OverviewCardStudents students={props.students} />
    </Col>
    <Col className="overview-info-column-container" xs={24} md={8} lg={8}>
      <Card
        title={
          <div className="head-container">
            <div className="icon-container clock">
              <div>
                <i className="far fa-clock" />
              </div>
            </div>
            <div className="overview-info-card-text-container">
              <p className="overview-info-card-text-title">Timer</p>
              <h3 className="overview-info-card-text-description">
                45:30 <small>to finish</small>
              </h3>
            </div>
          </div>
        }
        bordered={false}
      >
        <div className="content">
          <div className="description">See more timer</div>
          <div className="icon clock">
            <i className="fas fa-info" />
          </div>
        </div>
      </Card>
    </Col>
  </Row>
);

export default OverviewCard;
