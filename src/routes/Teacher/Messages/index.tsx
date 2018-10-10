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

  public componentDidMount() {
    this.setState({ selectedRoomId: this.props.selectedRoomId });
    this.scrollToBottom(false);

    this.props.socket.on("newMessage", this.onNewMessage);

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

  public onNewMessage = (res: any) => {
    if (res.senderUsername !== this.props.username) {
      if (res.chatroomId === this.state.selectedRoomId) {
        // Read the data from our cache for this query.
        const data = this.props.client.readQuery({
          query: getChatRoomMessageQuery,
          variables: { chatroomId: res.chatroomId }
        });
        // Add the new message from the mutation to the end.
        data.message.push(res);
        // Write our data back to the cache.
        this.props.client.writeQuery({
          query: getChatRoomMessageQuery,
          variables: { chatroomId: res.chatroomId },
          data
        });
      }

      const roomData = this.props.client.readQuery({
        query: getChatRoomQuery,
        variables: { Id: this.props.userId }
      });
      roomData.user[0].chatrooms = Lodash.sortBy(
        roomData.user[0].chatrooms,
        item => {
          return item.Id === res.chatroomId ? 0 : 1;
        }
      );
      roomData.user[0].chatrooms[0].latestMessage[0].messageContent =
        res.messageContent;
      this.props.client.writeQuery({
        query: getChatRoomQuery,
        variables: { Id: this.props.userId },
        data: roomData
      });
    }
  };

  public componentWillUnmount() {
    this.props.socket.removeListener("newMessage", this.onNewMessage);
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
    const messageContent = this.state.message;
    if (messageContent.length > 0) {
      this.props
        .addMessageMutation({
          variables: {
            chatroomId: this.state.selectedRoomId,
            messageContent
          },
          update: (store: any, { data: { createMessage } }: any) => {
            this.props.socket.emit("sendMessage", {
              ...createMessage,
              chatroomId: this.state.selectedRoomId
            });
            // Read the data from our cache for this query.
            const data = store.readQuery({
              query: getChatRoomMessageQuery,
              variables: { chatroomId: this.state.selectedRoomId }
            });
            const roomData = store.readQuery({
              query: getChatRoomQuery,
              variables: { Id: this.props.userId }
            });
            roomData.user[0].chatrooms = Lodash.sortBy(
              roomData.user[0].chatrooms,
              item => {
                return item.Id === this.state.selectedRoomId ? 0 : 1;
              }
            );
            roomData.user[0].chatrooms[0].latestMessage[0].messageContent = this.state.message;
            // Add the new message from the mutation to the end.
            data.message.push(createMessage);
            // Write our data back to the cache.
            store.writeQuery({
              query: getChatRoomMessageQuery,
              variables: { chatroomId: this.state.selectedRoomId },
              data
            });
            store.writeQuery({
              query: getChatRoomQuery,
              variables: { Id: this.props.userId },
              data: roomData
            });
            this.setState({ message: "" });
          }
        })
        .then((res: any) => console.log(this.props))
        .catch((err: any) => console.log(err));
    }
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
          changeSelectedRoomId={this.props.changeSelectedRoomId}
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
      console.log(props);
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
