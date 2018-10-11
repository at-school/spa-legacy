import { List } from "antd";
import { css, StyleSheet } from "aphrodite";
import moment from "moment";
import React from "react";

const ActivityList = (props: any) => {
  const data = props.activities.map((activity: any) => {
    if (activity.activityType === 1) {
      return {
        title: (
          <div key={activity.Id}>
            {activity.students.map((student: any, index: number) => {
              if (index === activity.students.length - 1) {
                return (
                  <a onClick={props.goToUserProfile(student.Id)} key={student.Id}>
                    {student.firstname + " " + student.lastname}
                  </a>
                );
              }
              return (
                <a onClick={props.goToUserProfile(student.Id)} key={student.Id}>
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
      className={css(styles.mainContainer)}
    />
  );
};

const ActivityListItem = (item: any) => (
  <List.Item>
    <List.Item.Meta title={item.title} description={item.description} />
  </List.Item>
);

const styles = StyleSheet.create({
  mainContainer: {
    maxHeight: 300,
    overflow: "auto"
  }
});

export default ActivityList;
