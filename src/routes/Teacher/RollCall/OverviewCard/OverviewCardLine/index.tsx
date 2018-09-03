import { Card } from "antd";
import { gql } from "apollo-boost";
import moment from "moment";
import React from "react";
import { graphql } from "react-apollo";

const getScheduleQuery = gql`
  query GetSchedule($day: String) {
    schedule(arguments: { day: $day }) {
      line
      startTime
      endTime
    }
  }
`;

const OverviewCardLine = ({ data }: any) => {
  let currentLine = "N/A";
  if (!data.loading && data.schedule.length > 0) {
    const { schedule }: any = data;
    const currentTime = moment();
    for (const scheduleItem of schedule) {
      if (
        scheduleItem.hasOwnProperty("startTime") &&
        scheduleItem.hasOwnProperty("endTime")
      ) {
        const startTime = moment(scheduleItem.startTime, "HH:mm:ss");
        const endTime = moment(scheduleItem.endTime, "HH:mm:ss");
        if (currentTime.isBetween(startTime, endTime)) {
          currentLine = scheduleItem.line;
          break;
        }
      }
    }
  }
  return (
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
              {currentLine}
            </h3>
          </div>
        </div>
      }
      bordered={false}
    >
      <div className="content">
        <div className="description">Discover schedule</div>
        <div className="icon file">
          <i className="fas fa-info" />
        </div>
      </div>
    </Card>
  );
};

export default graphql(getScheduleQuery, {
  options: () => {
    return {
      variables: { day: moment().format("dddd") }
    };
  }
})(OverviewCardLine);
