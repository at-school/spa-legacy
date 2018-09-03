import { Card, Col, List, Row } from "antd";
import React from "react";
import RealTimeMarkingCard from "./components/RealTimeMarkingCard";
import StudentOnTimeCard from "./components/StudentOnTimeCard";
import OverviewCard from "./OverviewCard";
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


