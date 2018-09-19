import { Card, message, Switch } from "antd";
import { css, StyleSheet } from "aphrodite";
import React from "react";
import { withClassroomContext } from "../../../../../contexts/Teacher/ClassroomContext";
import Camera from "./Camera";
import Spinner from "./Spinner";
import StatusText from "./StatusText";
class RealTimeMarkingCard extends React.Component<any, any> {
  public state = {
    cameraEnable: false
  };

  public pauseAnimation = () => {
    const cameraLoadingSpace = document.getElementById(
      "camera-loading-space-flip"
    ) as any;
    const circleSpin = document.getElementById("circle-ani-spin") as any;
    cameraLoadingSpace.style.animationPlayState = "paused";
    circleSpin.style.animationPlayState = "paused";
  };

  public toggleCamera = () => {
    if (
      (this.props.classroomContext.classId &&
        this.props.students.length > 0) ||
      this.state.cameraEnable
    ) {
      this.setState((prevState: any) => ({
        cameraEnable: !prevState.cameraEnable
      }));
    } else {
      message.warning('This is no students in class or class does not exist!')
    }
  };

  public render() {
    return (
      <React.Fragment>
        {this.state.cameraEnable && (
          <Camera markStudents={this.props.markStudents} />
        )}
        <Card
          title={
            <div className={css(styles.title)}>
              <div>Real time marking </div>{" "}
              <Switch
                onChange={this.toggleCamera}
                checkedChildren="Off"
                unCheckedChildren="On"
                checked={this.state.cameraEnable}
              />
            </div>
          }
          className="real-time-marking-card"
          style={{ width: "100%" }}
          bordered={false}
        >
          {/* <Camera /> */}
          <Spinner spin={this.state.cameraEnable} />
          <StatusText changing={this.state.cameraEnable} />
        </Card>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }
});

export default withClassroomContext(RealTimeMarkingCard);
