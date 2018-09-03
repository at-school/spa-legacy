import { Card, Modal } from "antd";
import { css, StyleSheet } from "aphrodite";
import { gql } from "apollo-boost";
import moment from "moment";
import React from "react";
import { graphql } from "react-apollo";
import { branch, compose, renderComponent } from "recompose";
import ScheduleModal from "./ScheduleModal";

const getScheduleQuery = gql`
  query GetSchedule($day: String) {
    schedule(arguments: { day: $day }) {
      line
      startTime
      endTime
    }
  }
`;

class OverviewCardLine extends React.Component<any, any> {
  public state = {
    day: moment().format("dddd"),
    modalVisible: false,
    currentLine: "N/A"
  };

  private interval: any;

  public componentDidMount() {
    this.interval = setInterval(this.updateTime, 60000);
  }

  public componentWillUnmount() {
    clearInterval(this.interval);
  }

  public toggleModal = () =>
    this.setState((prevState: any) => ({
      modalVisible: !prevState.modalVisible
    }));

  public scheduleInfoModal = () => {
    if (this.props.data) {
      const schedule = this.props.data.schedule.map((item: any) => {
        return (
          <div className={css(styles.flexRow)} key={item.line}>
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
    return (
      <React.Fragment>
        <ScheduleModal
          toggleModal={this.toggleModal}
          visible={this.state.modalVisible}
          title="Schedule"
        />
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
                  {this.state.currentLine}
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

  private updateTime = () => {
    const { data } = this.props;
    if (!data.loading) {
      const updateLine = () => {
        if (data.schedule.length > 0) {
          const { schedule }: any = data;
          const currentTime = moment();
          for (const scheduleItem of schedule) {
            if (
              scheduleItem.hasOwnProperty("startTime") &&
              scheduleItem.hasOwnProperty("endTime")
            ) {
              const startTime = moment(scheduleItem.startTime, "HH:mm:ss");
              const endTime = moment(scheduleItem.endTime, "HH:mm:ss");
              if (
                currentTime.isBetween(startTime, endTime) &&
                this.state.currentLine !== scheduleItem.line
              ) {
                this.setState({ currentLine: schedule.line });
                break;
              }
            }
          }
          this.setState({ currentLine: "N/A" });
        } else {
          this.setState({ currentLine: "N/A" });
        }
      };

      const currentDay = moment().format("dddd");
      if (currentDay !== this.state.day) {
        this.props.data.refetch({ day: moment().format("dddd") }).then(() => {
          this.setState({ day: currentDay }, updateLine);
        });
      } else {
        updateLine();
      }
    }
  };
}

const styles = StyleSheet.create({
  flexRow: {
    display: "flex",
    flexDirection: "row"
  },
  alignRight: {
    marginLeft: "auto"
  }
});

const LoadingComponent = () => <Card loading={true} />;

export default compose(
  graphql(getScheduleQuery, {
    options: () => {
      return {
        variables: { day: moment().format("dddd") }
      };
    }
  }),
  branch(({ data }) => {
    return !data.user && data.loading;
  }, renderComponent(LoadingComponent))
)(OverviewCardLine);
