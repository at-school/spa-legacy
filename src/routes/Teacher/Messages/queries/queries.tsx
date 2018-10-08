import { gql } from "apollo-boost";

const addChatRoomMutation = gql`
  mutation($firstId: ID, $secondId: ID, $name: String!) {
    createChatroom(
      arguments: { firstId: $firstId, secondId: $secondId, name: $name }
    ) {
      Id
      name
      users {
        Id
        firstname
        lastname
        avatar
        accessLevel
      }
      latestMessage {
        messageContent
        senderAvatar
      }
    }
  }
`;

const addMessageMutation = gql`
  mutation($chatroomId: ID, $messageContent: String) {
    createMessage(
      arguments: { chatroomId: $chatroomId, messageContent: $messageContent }
    ) {
      Id
      messageContent
      senderAvatar
      senderId
    }
  }
`;

const getChatRoomQuery = gql`
  query GetChatroom($Id: ID) {
    user(arguments: { Id: $Id }) {
      chatrooms {
        Id
        name
        users {
          Id
          firstname
          lastname
          avatar
          accessLevel
        }
        latestMessage {
          messageContent
          senderAvatar
        }
      }
    }
  }
`;

const getChatRoomMessageQuery = gql`
  query GetChatRoomMessage($chatroomId: ID) {
    message(arguments: { chatroomId: $chatroomId }) {
      Id
      messageContent
      senderAvatar
      senderId
    }
  }
`;

export {
  addChatRoomMutation,
  getChatRoomQuery,
  addMessageMutation,
  getChatRoomMessageQuery
};
