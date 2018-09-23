import { gql } from "apollo-boost";

export const getRollMarkingActivitiesQuery = gql`
  query GetRollMarkingActivities($userId: ID) {
    rollMarkingActivites(arguments: { userId: $userId }) {
      activityType
      Id
      timestamp
      students {
        Id
        firstname
        lastname
      }
    }
  }
`;
