import { Card, Col, List, Row } from "antd";
import React from "react";
import RealTimeMarkingCard from "./components/RealTimeMarkingCard";
import StudentOnTimeCard from "./components/StudentOnTimeCard";
import "./styles/styles.css";

export default class RollCall extends React.Component {
  public render() {
    return (
      <div className="rollcall">
        <OverviewCard />
        <ActivityCard />
        <Row gutter={16}>
          <Col xs={24} md={12} lg={24} xl={12}>
            <RealTimeMarkingCard />
          </Col>
          <Col xs={24} md={12} lg={24} xl={12}>
            <StudentOnTimeCard />
          </Col>
        </Row>
      </div>
    );
  }
}

const ActivityCard: React.SFC<{}> = () => (
  <Card
    bordered={false}
    className="activity-card"
    title={
      <div className="activity-card-header">
        <div className="activity-card-header-text">Activities</div>
        <div className="activity-card-header-update">
          <i className="fas fa-sync" /> Updated a few seconds ago
        </div>
      </div>
    }
  >
    <ActivityList />
  </Card>
);

const ActivityList = () => {
  const data = [
    {
      title: (
        <div>
          Student <a>Ben Berneet</a> just got in the class
        </div>
      ),
    },
    {
      title: (
        <div>
          Student <a>James Cant</a> just got in the class
        </div>
      ),
    },
  ];
  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={ActivityListItem}
    />
  );
};

const ActivityListItem = (item: any) => (
  <List.Item>
    <List.Item.Meta title={item.title} description="2 minutes ago" />
  </List.Item>
);

const OverviewCard: React.SFC<{}> = () => (
  <Row gutter={16} className="overview-info-card-container">
    <Col className="overview-info-column-container" xs={24} md={8} lg={8}>
      <Card
        title={
          <div className="head-container">
            <div className="icon-container file">
              <div>
                <i className="far fa-file" />
              </div>
            </div>
            <div className="overview-info-card-text-container">
              <p className="overview-info-card-text-title">Current Line</p>
              <h3 className="overview-info-card-text-description">A</h3>
            </div>
          </div>
        }
        bordered={false}
      >
        <div className="content">
          <div className="description">Discover schedule</div>
          <div className="icon file">
            <i className="fas fa-info" />
          </div>
        </div>
      </Card>
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
