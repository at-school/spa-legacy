import { gql } from "apollo-boost";

export const getUserInfoQuery = gql`
  query GetUserInfo($Id: ID) {
    user(arguments: { Id: $Id }) {
      Id
      avatar
      firstname
      lastname
      username
      bio
      accessLevel
      classrooms {
        Id
        name
        description
      }
      studentClassroom {
        Id
        name
        description
      }
      skills {
        Id
        name
        color
        userId
      }
    }
  }
`;

export const createSkillMutation = gql`
  mutation CreateSkillMutation(
    $userId: String!
    $color: String!
    $name: String!
  ) {
    createSkill(arguments: { userId: $userId, color: $color, name: $name }) {
      Id
      color
      name
      userId
    }
  }
`;

export const removeSkillMutation = gql`
  mutation RemoveSkillMutation($Id: ID!) {
    removeSkill(arguments: { Id: $Id }) {
      Id
    }
  }
`;
