import { gql } from "apollo-boost";

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

export const removeStudentMutation = gql`
  mutation($classId: ID!, $studentId: ID!) {
    removeStudentFromClassroom(
      arguments: { classId: $classId, studentId: $studentId }
    ) {
      Id
    }
  }
`;

export const addStudentMutation = gql`
  mutation($classId: ID!, $studentId: ID!) {
    addStudentToClassroom(
      arguments: { classId: $classId, studentId: $studentId }
    ) {
      Id
      avatar
      firstname
      lastname
    }
  }
`;
