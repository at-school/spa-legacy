import Lodash from "lodash";
import React from "react";
import { compose, graphql, withApollo } from "react-apollo";
import { withRouter } from "react-router-dom";
import AppContext from "../../../contexts/AppContext";
import MessageSocket from "../../../contexts/Teacher/TeacherMessageSocket";
import MessageContent from "./MessageContent";
import MessageInfo from "./MessageInfo";
import MessageList from "./MessageList";
import {
  addMessageMutation,
  getChatRoomMessageQuery,
  getChatRoomQuery
} from "./queries/queries";
import "./styles/styles.css";

interface IMessageItem {
  self: boolean;
  avatar: null;
  content: string;
}

class Messages extends React.Component<
  {
    token: string;
    avatar: string;
    userId: string;
    chatrooms: any;
    addMessageMutation: any;
    messageList: any;
    socket: any;
    selectedRoomId: string;
    client: any;
    username: string;
    changeSelectedRoomId: (selectedRoomId: string) => () => void;
    match: any;
    userSocket: any;
    history: any;
  },
  {
    messageData: IMessageItem[];
    addChatRoom: any;
    roomList: any;
    selectedRoomId: any;
    message: string;
    chatrooms: any;
  }
> {
  public scrollToBottomDiv: any;
  public state = {
    messageData: [],
    roomList: [],
    addChatRoom: {
      formVisible: false,
      selectedAddChatRoomUser: null
    },
    selectedRoomId: "",
    message: "",
    chatrooms: []
  };

  public toggleAddChatRoom = () => {
    this.setState(prevState => ({
      addChatRoom: {
        ...prevState.addChatRoom,
        formVisible: !prevState.addChatRoom.formVisible
      }
    }));
  };

  public changeRoom = (roomId: string) => () => {
    this.props.history.push("/teacher/messages/" + roomId);
  };

  public componentDidMount() {
    this.setState({ selectedRoomId: this.props.selectedRoomId });
    this.scrollToBottom(false);

    // subsribe to all user offline and online socket
    const { chatrooms } = this.props;
    const users = Array.from(
      new Set(
        chatrooms
          .map((chatroom: any) =>
            chatroom.users
              .filter((user: any) => user.Id !== this.props.userId)
              .map((user: any) => user.Id)
          )
          .flat(2)
      )
    );
    this.props.userSocket.emit("user", {
      activityType: "joinUserStatus",
      users
    });
  }

  public setScrollToBottomDiv = (ref: any) => {
    this.scrollToBottomDiv = ref;
  };

  public scrollToBottom = (smooth = true) => {
    if (this.scrollToBottomDiv) {
      this.scrollToBottomDiv.scrollIntoView({
        behavior: smooth ? "smooth" : "instant"
      });
    }
  };

  public updateMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ message: e.target.value });
  };

  public sendMessage = () => {
    sendMessage(
      this.state.message,
      this.props.match.params.id,
      this.props.avatar,
      this.props.userId,
      this.props.addMessageMutation,
      this.props.socket,
      () => this.setState({ message: "" })
    );
  };

  public componentDidUpdate(prevProps: any, prevState: any) {
    if (prevState.selectedRoomId !== this.state.selectedRoomId) {
      this.scrollToBottom(false);
    } else if (
      JSON.stringify(prevProps.messageList.message) !==
      JSON.stringify(this.props.messageList.message)
    ) {
      this.scrollToBottom();
    }
  }

  public render() {
    const roomId = this.props.match.params.id;
    const { chatrooms } = this.props;
    const currentRoom = chatrooms.find(
      (chatroom: any) => chatroom.Id === roomId
    );
    let otherUser = null;
    if (currentRoom) {
      otherUser = currentRoom.users.find(
        (user: any) => this.props.userId !== user.Id
      );
      if (!otherUser && currentRoom.users) {
        otherUser = currentRoom.users[0];
      }
    }
    return (
      <div className="messages">
        <MessageList
          toggleAddChatRoom={this.toggleAddChatRoom}
          roomList={chatrooms}
          changeSelectedRoomId={this.changeRoom}
          userId={this.props.userId}
          selectedRoom={this.props.match.params.id}
          addChatroom={this.state.addChatRoom.formVisible}
        />

        <MessageContent
          addChatRoomVisible={this.state.addChatRoom.formVisible}
          messageData={
            this.props.messageList.message ? this.props.messageList.message : []
          }
          toggleAddChatRoom={this.toggleAddChatRoom}
          selectedRoomId={this.state.selectedRoomId}
          sendMessage={this.sendMessage}
          updateMessage={this.updateMessage}
          currentMessage={this.state.message}
          setScrollToBottomDiv={this.setScrollToBottomDiv}
        />

        <MessageInfo
          username={this.props.username}
          addChatRoom={this.state.addChatRoom.formVisible}
          userAvatar={this.props.avatar}
          currentRoom={currentRoom}
          otherUser={otherUser}
        />
      </div>
    );
  }
}

const MessagesWithChatRoom = compose(
  graphql(addMessageMutation, { name: "addMessageMutation" }),
  graphql(getChatRoomMessageQuery, {
    options: (props: any) => {
      return {
        variables: {
          chatroomId: props.match.params.id
        }
      };
    },
    name: "messageList"
  })
)(withApollo(Messages as any));

export default withRouter((props: any) => (
  <AppContext.Consumer>
    {value => (
      <MessageSocket.Consumer>
        {socket => (
          <MessagesWithChatRoom
            socket={socket.socket}
            {...props}
            token={value.token!}
            userId={value.userId!}
            username={value.username}
            avatar={value.avatarUrl!}
            changeSelectedRoomId={socket.changeSelectedRoomId}
            userSocket={value.socket}
          />
        )}
      </MessageSocket.Consumer>
    )}
  </AppContext.Consumer>
));

export const sendMessage = (
  messageContent: string,
  chatroomId: string,
  avatar: string,
  userId: string,
  addMessageHandler: any,
  socket: any,
  callback: any
) => {
  if (messageContent.length > 0) {
    addMessageHandler({
      variables: {
        chatroomId,
        messageContent,
        avatar
      },
      update: (store: any, { data: { createMessage } }: any) => {
        socket.emit("sendMessage", {
          createMessage,
          activityType: "newMessage",
          chatroomId
        });
        // Read the data from our cache for this query.
        const data = store.readQuery({
          query: getChatRoomMessageQuery,
          variables: { chatroomId }
        });
        const roomData = store.readQuery({
          query: getChatRoomQuery,
          variables: { Id: userId }
        });
        roomData.user[0].chatrooms = Lodash.sortBy(
          roomData.user[0].chatrooms,
          item => {
            return item.Id === chatroomId ? 0 : 1;
          }
        );
        if (roomData.user[0].chatrooms[0].latestMessage) {
          if (roomData.user[0].chatrooms[0].latestMessage.length === 0) {
            roomData.user[0].chatrooms[0].latestMessage.push({
              messageContent,
              __typename: "MessageSchema"
            });
          } else {
            roomData.user[0].chatrooms[0].latestMessage[0].messageContent = messageContent;
          }
        }
        // Add the new message from the mutation to the end.
        data.message.push(createMessage);
        // Write our data back to the cache.
        store.writeQuery({
          query: getChatRoomMessageQuery,
          variables: { chatroomId },
          data
        });
        store.writeQuery({
          query: getChatRoomQuery,
          variables: { Id: userId },
          data: roomData
        });
        callback();
      }
    }).catch((err: any) => console.log(err));
  }
};
