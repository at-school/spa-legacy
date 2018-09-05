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

  public componentWillMount() {
    this.updateLine();
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
        const className = css(
          item.line === this.state.currentLine && styles.bold,
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

  private updateLine = () => {
    const { data } = this.props;
    if (data.schedule.length > 0) {
      const { schedule }: any = data;
      const currentTime = moment();

      let isInSchedule = false;
      for (const scheduleItem of schedule) {
        if (
          scheduleItem.hasOwnProperty("startTime") &&
          scheduleItem.hasOwnProperty("endTime")
        ) {
          const startTime = moment(scheduleItem.startTime, "HH:mm:ss");
          const endTime = moment(scheduleItem.endTime, "HH:mm:ss");
          const isBetween = currentTime.isBetween(startTime, endTime);

          if (isBetween && this.state.currentLine !== scheduleItem.line) {
            this.setState({ currentLine: scheduleItem.line });
            return;
          } else if (isBetween) {
            isInSchedule = true;
            break;
          }
        }
      }

      if (!isInSchedule) {
        this.setState({ currentLine: "N/A" });
      }
    } else {
      this.setState({ currentLine: "N/A" });
    }
  };

  private updateTime = () => {
    const { data } = this.props;
    if (!data.loading) {
      const currentDay = moment().format("dddd");
      if (currentDay !== this.state.day) {
        this.props.data.refetch({ day: moment().format("dddd") }).then(() => {
          this.setState({ day: currentDay }, this.updateLine);
        });
      } else {
        this.updateLine();
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
  },
  bold: {
    fontWeight: "bold"
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
