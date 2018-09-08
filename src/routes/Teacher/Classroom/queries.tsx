import { gql } from "apollo-boost";

const addClassroomMutation = gql`
  mutation(
    $name: String!
    $description: String!
    $avatar: String!
    $lineId: String!
    $falcutyId: String!
  ) {
    createClassroom(
      arguments: {
        name: $name
        description: $description
        avatar: $avatar
        lineId: $lineId
        falcutyId: $falcutyId
      }
    ) {
      name
      description
    }
  }
`;

const editClassroomMutation = gql`
  mutation(
    $Id: ID!
    $name: String!
    $description: String!
    $avatar: String!
    $lineId: String!
    $falcutyId: String!
  ) {
    editClassroom(
      arguments: {
        Id: $Id
        name: $name
        description: $description
        avatar: $avatar
        lineId: $lineId
        falcutyId: $falcutyId
      }
    ) {
      name
      description
    }
  }
`;

const removeClassMutation = gql`
  mutation($Id: ID) {
    removeClassroom(arguments: { Id: $Id }) {
      name
    }
  }
`;

const getClassQuery = gql`
  query GetClassroom($Id: ID) {
    user(arguments: { Id: $Id }) {
      classrooms {
        Id
        name
        description
        avatar
        falcutyId
        lineId
      }
    }
  }
`;

const getClassQueryById = gql`
  query GetClassroomById($Id: ID) {
    classroom(arguments: { Id: $Id }) {
      Id
      name
      avatar
      description
      falcutyId
      lineId
    }
  }
`;

export {
  getClassQuery,
  addClassroomMutation,
  removeClassMutation,
  getClassQueryById,
  editClassroomMutation
};
