import { Card, Modal } from "antd";
import { css, StyleSheet } from "aphrodite";
import React from "react";

export default class OverviewCardStudents extends React.Component<any> {
  public studentsInfoModal = () => {
    const schedule = this.props.students.map((student: any) => {
      const className = css(styles.flexRow);
      return (
        <div className={className} key={student.Id}>
          <div>
            {student.firstname} {student.lastname}
          </div>
        </div>
      );
    });
    Modal.info({
      title: "Students",
      content: schedule
    });
  };

  public render() {
    console.log(this.props.classroomContext)
    return (
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
                {this.props.students.length === 0 && "N/A"}

                {this.props.students.length !== 0 &&
                  this.props.students.filter((student: any) => student.in)
                    .length + "/"}

                {this.props.students.length !== 0 && this.props.students.length}
                {this.props.students.length !== 0 && <small>in class</small>}
              </h3>
            </div>
          </div>
        }
        bordered={false}
      >
        <div className="content">
          <div className="description">View more students</div>
          <div onClick={this.studentsInfoModal} className="icon users">
            <i className="fas fa-info" />
          </div>
        </div>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  flexRow: {
    display: "flex",
    flexDirection: "row"
  },
  alignRight: {
    marginLeft: "auto"
  },
  bold: {
    fontWeight: "bold"
  }
});
