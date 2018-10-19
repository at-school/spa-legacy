import { Spin } from "antd";
import "antd/dist/antd.css";
import { css, StyleSheet } from "aphrodite";
import React from "react";
import { compose, graphql } from "react-apollo";
import { getClassQuery } from "../../Classroom/queries";
import { getEverydayScheduleQuery } from "../queries";
import CalendarBody from "./CalendarBody";
import CalendarHeader from "./CalendarHeader";

class CalendarDashboard extends React.Component<{
  everydaySchedule: any;
  getClassQuery: any;
}> {
  public render() {
    const everydaySchedule = this.props.everydaySchedule.schedule;
    const schedule = [
      new Array(8).fill(false),
      new Array(8).fill(false),
      new Array(8).fill(false),
      new Array(8).fill(false),
      new Array(8).fill(false)
    ] as any;
    if (
      this.props.everydaySchedule.schedule &&
      this.props.getClassQuery.user &&
      this.props.getClassQuery.user.length === 1 &&
      this.props.getClassQuery.user[0].classrooms
    ) {
      everydaySchedule.forEach((scheduleItem: any) => {
        if (scheduleItem.day) {
          let classItem = this.props.getClassQuery.user[0].classrooms.find(
            (classroom: any) => classroom.lineId === scheduleItem.line
          );
          if (!classItem) {
            classItem = {};
          }

          const scheduleWithClass = { ...scheduleItem, ...classItem };

          if (scheduleItem.day === "Monday") {
            schedule[0][schedule[0].indexOf(false)] = scheduleWithClass;
          } else if (scheduleItem.day === "Tuesday") {
            schedule[1][schedule[1].indexOf(false)] = scheduleWithClass;
          } else if (scheduleItem.day === "Wednesday") {
            schedule[2][schedule[2].indexOf(false)] = scheduleWithClass;
          } else if (scheduleItem.day === "Thursday") {
            schedule[3][schedule[3].indexOf(false)] = scheduleWithClass;
          } else if (scheduleItem.day === "Friday") {
            schedule[4][schedule[4].indexOf(false)] = scheduleWithClass;
          }
        }
      });
    }
    console.log(schedule);
    return (
      <div className={css(styles.mainContainer)}>
        <h2 className={css(styles.heading)}>This week calendar</h2>
        {this.props.everydaySchedule.loading && (
          <Spin tip="Getting calendar">
            <table className={css(styles.table)}>
              <CalendarHeader />
              <CalendarBody schedule={[]} />
            </table>
          </Spin>
        )}
        {!this.props.everydaySchedule.loading && (
          <table className={css(styles.table)}>
            <CalendarHeader />
            <CalendarBody schedule={schedule} />
          </table>
        )}
      </div>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "white",
    padding: 20
  },
  heading: {
    textAlign: "center"
  },
  table: {
    width: "100%"
  }
});

export default compose(
  graphql(getEverydayScheduleQuery, { name: "everydaySchedule" }),
  graphql(getClassQuery, {
    options: (props: any) => {
      return {
        variables: {
          Id: props.userId
        }
      };
    },
    name: "getClassQuery"
  })
)(CalendarDashboard);
