import { Card, List } from "antd";
import moment from "moment";
import React from "react";
import { graphql } from "react-apollo";
import { withClassroomContext } from "../../../../contexts/Teacher/ClassroomContext";
import { getRollMarkingActivitiesQuery } from "../queries";

class ActivityCard extends React.Component<any, any> {
  public state = {
    updatedTime: moment(),
    now: moment()
  };
  public timerInterval: any;
  public componentDidUpdate(prevProps: any) {
    console.log("Preparing to be updated");
    const prevGetRollMarkingActivities = prevProps.getRollMarkingActivities;
    const { getRollMarkingActivities } = this.props;
    console.log(prevGetRollMarkingActivities);
    console.log(getRollMarkingActivities);
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

  public render() {
    const { getRollMarkingActivities } = this.props;
    console.log(getRollMarkingActivities);
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
        />
      </Card>
    );
  }
}

const ActivityList = (props: any) => {
  console.log(props.activities);
  const data = props.activities.map((activity: any) => {
    if (activity.activityType === 1) {
      return {
        title: (
          <div key={activity.Id}>
            {activity.students.map((student: any, index: number) => {
              if (index === activity.students.length - 1) {
                return (
                  <a key={student.Id}>
                    {student.firstname + " " + student.lastname}
                  </a>
                );
              }
              return (
                <a key={student.Id}>
                  {student.firstname + " " + student.lastname + ", "}
                </a>
              );
            })}{" "}
            just got in class
          </div>
        ),
        description: moment(activity.timestamp).fromNow()
      };
    }
    return;
  });

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
    <List.Item.Meta title={item.title} description={item.description} />
  </List.Item>
);

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

export default withClassroomContext(ActivityCardWithGraphQl);
