import { gql } from "apollo-boost";

export const getEverydayScheduleQuery = gql`
  query GetEverydaySchedule {
    schedule(arguments: {}) {
      line
      startTime
      endTime
      day
    }
  }
`;

