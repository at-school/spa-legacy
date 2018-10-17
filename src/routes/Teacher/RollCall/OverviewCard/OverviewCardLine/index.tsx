import { Card, Modal } from "antd";
import { css, StyleSheet } from "aphrodite";
import { default as moment } from "moment";
import React from "react";

class OverviewCardLine extends React.Component<any, any> {
  public state = {
    day: moment().format("dddd"),
    currentLine: "N/A"
  };

  public scheduleInfoModal = () => {
    if (this.props.schedule) {
      // get title based on days difference
      let title = "";
      const now = moment();
      const startClass = moment(this.props.startTime);
      const daysDiff = now.diff(startClass, "days");
      if (daysDiff === 0) {
        title = "Today Schedule";
        // two cases: on the same day and on the previous day (since day is calculated as 24 hours)
        if (startClass.format("dddd") === now.format("dddd")) {
          title = "Today schedule";
        } else {
          title = "Tomorrow Schedule";
        }
      } else if (daysDiff === 1) {
        title = "Tomorrow Schedule";
      } else {
        title = `Schedule in next ${daysDiff} days`;
      }

      const schedule = this.props.schedule.map((item: any) => {
        const className = css(
          item.line === this.props.line && styles.bold,
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
        title,
        content: schedule
      });
    }
  };

  public render() {

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
                  {this.props.line
                    ? this.props.line
                    : "N/A"}
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

export default OverviewCardLine;
