import { Card } from "antd";
import moment from "moment";
import React from "react";
import { graphql } from "react-apollo";
import { withRouter } from "react-router-dom";
import { withClassroomContext } from "../../../../contexts/Teacher/ClassroomContext";
import { getRollMarkingActivitiesQuery } from "../queries";
import ActivityList from "./ActivityList";

class ActivityCard extends React.Component<any, any> {
  public state = {
    updatedTime: moment(),
    now: moment()
  };
  public timerInterval: any;
  public componentDidUpdate(prevProps: any) {
    const prevGetRollMarkingActivities = prevProps.getRollMarkingActivities;
    const { getRollMarkingActivities } = this.props;
    if (prevGetRollMarkingActivities && getRollMarkingActivities) {
      if (
        prevGetRollMarkingActivities.loading &&
        !getRollMarkingActivities.loading
      ) {
        this.setState({ updatedTime: moment() });
      } else if (
        prevGetRollMarkingActivities.rollMarkingActivites &&
        getRollMarkingActivities.rollMarkingActivites
      ) {
        if (
          prevGetRollMarkingActivities.rollMarkingActivites.length !==
          getRollMarkingActivities.rollMarkingActivites.length
        ) {
          this.setState({ updatedTime: moment() });
        }
      }
    }
  }

  public componentDidMount() {
    this.timerInterval = setInterval(
      () => this.setState({ now: moment() }),
      5000
    );
  }

  public componentWillUnmount() {
    clearInterval(this.timerInterval);
  }

  public goToUserProfile = (userId:string) => () => {
    this.props.history.push("/teacher/user/" + userId)
  }

  public render() {
    const { getRollMarkingActivities } = this.props;
    return (
      <Card
        bordered={false}
        className="activity-card"
        title={
          <div className="activity-card-header">
            <div className="activity-card-header-text">Activities</div>
            <div className="activity-card-header-update">
              <i
                className={
                  "fas fa-sync" +
                  (getRollMarkingActivities.loading ? " updating" : "")
                }
              />
              {getRollMarkingActivities.loading && <span> Updating...</span>}
              {!getRollMarkingActivities.loading &&
                this.state.updatedTime &&
                this.state.updatedTime.fromNow()}
            </div>
          </div>
        }
      >
        <ActivityList
          currentTime={this.state.now}
          activities={
            getRollMarkingActivities.loading
              ? []
              : getRollMarkingActivities.rollMarkingActivites
          }
          goToUserProfile={this.goToUserProfile}
        />
      </Card>
    );
  }
}

const ActivityCardWithGraphQl = graphql(getRollMarkingActivitiesQuery, {
  options: ({ userId }: any) => {
    return {
      variables: {
        userId
      }
    };
  },
  name: "getRollMarkingActivities"
})(ActivityCard) as any;

export default withRouter(withClassroomContext(ActivityCardWithGraphQl));
