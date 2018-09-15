import { gql } from "apollo-boost";

export const getScheduleQuery = gql`
  query GetSchedule($day: String) {
    schedule(arguments: { day: $day }) {
      line
      startTime
      endTime
    }
  }
`;

export const getClassQuery = gql`
  query GetClassQuery($teacherUsername: String!, $lineId: String!) {
    classroom(
      arguments: { teacherUsername: $teacherUsername, lineId: $lineId }
    ) {
      Id
    }
  }
`;

export const getStudentsQuery = gql`
  query GetClassroomById($Id: ID) {
    classroom(arguments: { Id: $Id }) {
      students {
        Id
        avatar
        firstname
        lastname
      }
    }
  }
`;
