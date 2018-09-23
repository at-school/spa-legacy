import { Col, Row } from "antd";
import React from "react";
import AppContext from "../../../contexts/AppContext";
import { withClassroomContext } from "../../../contexts/Teacher/ClassroomContext";
import ActivityCard from "./ActivityCard";
import RealTimeMarkingCard from "./components/RealTimeMarkingCard";
import StudentOnTimeCard from "./components/StudentOnTimeCard";
import OverviewCard from "./OverviewCard";
import "./styles/styles.css";

class RollCall extends React.Component<any, any> {
  public render() {
    console.log(this.props.getRollMarkingActivitiesQuery);

    const students = this.props.classroomContext.students.map(
      (student: any) => ({
        ...student.studentDetails,
        inClass: student.inClass
      })
    );
    return (
      <div className="rollcall">
        <OverviewCard students={students} />
        <ActivityCard userId={this.props.userId} />
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

export default withClassroomContext((props: any) => (
  <AppContext.Consumer>
    {value => <RollCall {...props} userId={value.userId} />}
  </AppContext.Consumer>
));
