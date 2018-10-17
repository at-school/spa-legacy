import { Col, Row } from "antd";
import React from "react";
import ClassroomContext from "../../../../contexts/Teacher/ClassroomContext";
import OverviewCardLine from "./OverviewCardLine";
import OverviewCardStudents from "./OverviewCardStudents";
import OverviewCardTimer from "./OverviewCardTimer";

const OverviewCard: React.SFC<any> = (props: any) => (
  <Row gutter={16} className="overview-info-card-container">
    <Col className="overview-info-column-container" xs={24} md={8} lg={8}>
      <OverviewCardLine
        line={props.line}
        startTime={props.startTime}
        schedule={props.schedule}
      />
    </Col>
    <Col className="overview-info-column-container" xs={24} md={8} lg={8}>
      <OverviewCardStudents students={props.students} />
    </Col>
    <Col className="overview-info-column-container" xs={24} md={8} lg={8}>
      <OverviewCardTimer
        line={props.line}
        schedule={props.schedule}
        endTime={props.endTime}
        startTime={props.startTime}
      />
    </Col>
  </Row>
);

const OverviewCardWithClassroomContext = (props: any) => {
  return (
    <ClassroomContext.Consumer>
      {value => (
        <OverviewCard
          {...props}
          schedule={value.schedule}
          startTime={value.startTime}
          line={value.line}
          endTime={value.endTime}
        />
      )}
    </ClassroomContext.Consumer>
  );
};

export default OverviewCardWithClassroomContext;
