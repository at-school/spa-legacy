import { Card } from "antd";
import moment from "moment";
import React from "react";

// if current time is not the class start time yet, display a certain amount of time before starting
// if the current time is indeed a class, display the amount of time before finishing
class OverviewCardTimer extends React.Component<any> {
  public state = {
    current: moment()
  };

  private timeInterval: any;

  public componentDidMount() {
    this.timeInterval = setInterval(
      () => this.setState({ current: moment() }),
      60000
    );
  }

  public componentWillUnmount() {
    clearInterval(this.timeInterval);
  }

  public render() {
    const startTime = moment(this.props.startTime);
    let displayDescription = "";
    let timer = "";
    if (this.state.current.isBefore(startTime)) {
      displayDescription = "to start";
      const diffHours = startTime.diff(this.state.current, "hours", true);
      const hours = parseInt(String(diffHours), 10);
      timer = String(hours) + ":" + Math.floor((diffHours - hours) * 60);
    } else {
      displayDescription = "to finish";
      const endTime = moment(this.props.endTime);
      const diffHours = endTime.diff(this.state.current, "hours", true);
      const hours = parseInt(String(diffHours), 10);
      timer = String(hours) + ":" + Math.floor((diffHours - hours) * 60);
    }

    return (
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
                {timer} <small>{displayDescription}</small>
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
    );
  }
}

export default OverviewCardTimer;
