import { gql } from "apollo-boost";

export const getEmailListQuery = gql`
  query GetEmailList($userId: String!) {
    email(arguments: { userId: $userId }) {
      Id
      From
      FromEmail
      subject
      dateTime
    }
  }
`;

export const getEmailDetails = gql`
  query GetEmailDetails($userId: String!, $Id: ID!) {
    email(arguments: { userId: $userId, Id: $Id }) {
      html
      subject
    }
  }
`;
