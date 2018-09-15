import { Card, Modal } from "antd";
import { css, StyleSheet } from "aphrodite";
import moment from "moment";
import React from "react";
import { withClassroomContext } from "../../../../../contexts/Teacher/ClassroomContext";

class OverviewCardLine extends React.Component<any, any> {
  public state = {
    day: moment().format("dddd"),
    currentLine: "N/A"
  };

  public scheduleInfoModal = () => {
    if (this.props.classroomContext.schedule) {
      const schedule = this.props.classroomContext.schedule.map((item: any) => {
        const className = css(
          item.line === this.props.classroomContext.line && styles.bold,
          styles.flexRow
        );
        return (
          <div className={className} key={item.line}>
            <div>Line {item.line}</div>
            <div className={css(styles.alignRight)}>
              {item.startTime} - {item.endTime}
            </div>
          </div>
        );
      });
      Modal.info({
        title: "Today Schedule",
        content: schedule
      });
    }
  };

  public render() {
    console.log(this.props);


    return (
      <React.Fragment>
        <Card
          title={
            <div className="head-container">
              <div className="icon-container file">
                <div>
                  <i className="far fa-file" />
                </div>
              </div>
              <div className="overview-info-card-text-container">
                <p className="overview-info-card-text-title">Line</p>
                <h3 className="overview-info-card-text-description">
                  {this.props.classroomContext.line ? this.props.classroomContext.line : "N/A"}
                </h3>
              </div>
            </div>
          }
          bordered={false}
        >
          <div className="content">
            <div className="description">Discover schedule</div>
            <div onClick={this.scheduleInfoModal} className="icon file">
              <i className="fas fa-info" />
            </div>
          </div>
        </Card>
      </React.Fragment>
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

export default withClassroomContext(OverviewCardLine);
