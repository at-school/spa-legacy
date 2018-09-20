import { gql } from "apollo-boost";

export const getScheduleQuery = gql`
  {
    latestLine {
      line
      startTime
      endTime
    }
  }
`;

export const getAllScheduleQuery = gql`
  query GetSchedule($day: String) {
    schedule(arguments: { day: $day }) {
      line
      startTime
      endTime
    }
  }
`;

export const getScheduleDetailsQuery = gql`
  query GetScheduleDetails(
    $teacherUsername: String
    $line: String
    $classId: String
  ) {
    scheduleDetails(
      arguments: {
        teacherUsername: $teacherUsername
        classId: $classId
        line: $line
      }
    ) {
      Id
      students {
        inClass
        studentDetails {
          Id
          firstname
          lastname
        }
      }
    }
  }
`;

export const getClassQueryByLine = gql`
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
