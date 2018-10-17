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
    $teacherId: String
    $line: String
    $classId: String
  ) {
    scheduleDetails(
      arguments: { teacherId: $teacherId, classId: $classId, line: $line }
    ) {
      Id
      startTime
      endTime
      students {
        inClass
        minsLate
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
  query GetClassQuery($teacherId: String!, $lineId: String!) {
    classroom(arguments: { teacherId: $teacherId, lineId: $lineId }) {
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
