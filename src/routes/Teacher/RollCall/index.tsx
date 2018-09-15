import { Card, Col, List, Row } from "antd";
import React from "react";
import { graphql } from "react-apollo";
import { withClassroomContext } from "../../../contexts/Teacher/ClassroomContext";
import { getStudentsQuery } from "../queries";
import RealTimeMarkingCard from "./components/RealTimeMarkingCard";
import StudentOnTimeCard from "./components/StudentOnTimeCard";
import OverviewCard from "./OverviewCard";
import "./styles/styles.css";

class RollCall extends React.Component<any, any> {
  public static getDerivedStateFromProps(props: any, state: any) {
    let students = [];
    const { data } = props;
    if (
      data &&
      data.classroom &&
      data.classroom.length > 0 &&
      data.classroom[0].students
    ) {
      students = data.classroom[0].students;
    }

    const currentStudents = state.students;
    console.log(students);

    return {
      students: students.map((student: any) => {
        const currentStudent = currentStudents.find(
          (s: any) => s.Id === student.Id
        );
        if (currentStudent) {
          return {
            ...student,
            in: currentStudent.in
          };
        }
        return {
          ...student,
          in: false
        };
      })
    };
  }

  public state = {
    students: []
  };

  public markStudents = (studentList: Array<{ Id: string }>) => {
    const currentStudentId = this.state.students.map((student: any) => {
      if (!student.in) {
        return student.Id;
      }
    }) as any;

    const markStudentsList = studentList.map((student: any) => student.Id);

    const markStudents = currentStudentId.filter(
      (value: any) => -1 !== markStudentsList.indexOf(value)
    );

    if (markStudents.length > 0) {
      this.setState((prevState: any) => ({
        students: prevState.students.map(
          (student: any) =>
            markStudents.includes(student.Id)
              ? { ...student, in: true }
              : { ...student }
        )
      }));
    }
  };

  public render() {
    return (
      <div className="rollcall">
        <OverviewCard students={this.state.students} />
        <ActivityCard />
        <Row gutter={16}>
          <Col xs={24} md={12} lg={24} xl={12}>
            <RealTimeMarkingCard markStudents={this.markStudents} />
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
      )
    },
    {
      title: (
        <div>
          Student <a>James Cant</a> just got in the class
        </div>
      )
    }
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

const RollCallWithGraphql = graphql(getStudentsQuery, {
  options: (props: any) => {
    return {
      variables: {
        Id: props.classroomContext.classId
      }
    };
  },
  skip: props => !props.classroomContext.classId
})(RollCall);

export default withClassroomContext(RollCallWithGraphql);
