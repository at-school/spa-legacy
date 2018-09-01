import { gql } from "apollo-boost";

const addChatRoomMutation = gql`
  mutation($firstId: ID) {
    createChatroom(arguments: { firstId: $firstId }) {
      Id
    }
  }
`;

const addMessageMutation = gql`
  mutation($chatroomId: ID, $messageContent: String) {
    createMessage(
      arguments: { chatroomId: $chatroomId, messageContent: $messageContent }
    ) {
      Id
    }
  }
`;

const getChatRoomQuery = gql`
  query GetChatroom($username: String) {
    user(arguments: { username: $username }) {
      chatrooms {
        Id
        name
        users {
          Id
          avatar
        }
        latestMessage {
          messageContent
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
