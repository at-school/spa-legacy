import { Card, Col, Row } from "antd";
import React from "react";
import OverviewCardLine from "./OverviewCardLine";

const OverviewCard: React.SFC<{}> = () => (
  <Row gutter={16} className="overview-info-card-container">
    <Col className="overview-info-column-container" xs={24} md={8} lg={8}>
      <OverviewCardLine />
    </Col>
    <Col className="overview-info-column-container" xs={24} md={8} lg={8}>
      <Card
        title={
          <div className="head-container">
            <div className="icon-container users">
              <div>
                <i className="fas fa-users" />
              </div>
            </div>
            <div className="overview-info-card-text-container">
              <p className="overview-info-card-text-title">Students</p>
              <h3 className="overview-info-card-text-description">
                20/20 <small>in class</small>
              </h3>
            </div>
          </div>
        }
        bordered={false}
      >
        <div className="content">
          <div className="description">View more students</div>
          <div className="icon users">
            <i className="fas fa-info" />
          </div>
        </div>
      </Card>
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
