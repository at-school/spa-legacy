import Lodash from "lodash";
import React from "react";
import { compose, graphql, Query, withApollo } from "react-apollo";
import { branch, renderComponent } from "recompose";
import Spinner from "../../../components/Spinner";
import AppContext from "../../../contexts/AppContext";
import MessageSocket from "../../../contexts/Teacher/TeacherMessageSocket";
import MessageContent from "./MessageContent";
import MessageInfo from "./MessageInfo";
import MessageList from "./MessageList";
import {
  addMessageMutation,
  getChatRoomMessageQuery,
  getChatRoomQuery,
  getLatestChatroom
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
    username: string;
    chatRoomList: any;
    addMessageMutation: any;
    messageList: any;
    socket: any;
    selectedRoomId: string;
    client: any;
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
  }

  public onNewMessage = (res: any) => {
    console.log(this.props.messageList);
    if (res.senderUsername !== this.props.username) {
      if (res.chatroomId === this.state.selectedRoomId) {
        // Read the data from our cache for this query.
        const data = this.props.client.readQuery({
          query: getChatRoomMessageQuery,
          variables: { chatroomId: res.chatroomId }
        });
        // Add the new message from the mutation to the end.
        console.log(data);
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
        variables: { username: this.props.username }
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
        variables: { username: this.props.username },
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
              variables: { username: this.props.username }
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
              variables: { username: this.props.username },
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

  public changeSelectedRoomId = (selectedRoomId: any) => () => {
    this.setState({ selectedRoomId });
    this.props.messageList
      .refetch({ chatroomId: selectedRoomId })
      .then(() => this.scrollToBottom(false));
  };

  public render() {
    const chatrooms = this.props.chatRoomList.user[0].chatrooms;
    console.log(chatrooms)
    return (
      <div className="messages">
        <MessageList
          toggleAddChatRoom={this.toggleAddChatRoom}
          roomList={chatrooms ? chatrooms : []}
          changeSelectedRoomId={this.changeSelectedRoomId}
          // selectedRoom={this.state.selectedRoom}
        />

        <MessageContent
          addChatRoomVisible={this.state.addChatRoom.formVisible}
          messageData={
            this.props.messageList.message ? this.props.messageList.message : []
          }
          toggleAddChatRoom={this.toggleAddChatRoom}
          selectedRoomId={this.state.selectedRoomId}
          // selectAddChatRoomUser={this.selectAddChatRoomUser}
          // addNewRoom={this.addNewRoom}
          sendMessage={this.sendMessage}
          updateMessage={this.updateMessage}
          currentMessage={this.state.message}
          setScrollToBottomDiv={this.setScrollToBottomDiv}
        />

        <MessageInfo
          userName={this.props.username}
          addChatRoom={this.state.addChatRoom.formVisible}
          userAvatar={this.props.avatar}
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
          chatroomId: props.selectedRoomId
        }
      };
    },
    name: "messageList"
  }),
  graphql(getChatRoomQuery, {
    options: (props: any) => {
      return {
        variables: {
          username: props.username
        }
      };
    },
    name: "chatRoomList"
  }),
  branch(({ chatRoomList }) => {
    return !chatRoomList.user && chatRoomList.loading;
  }, renderComponent(Spinner))
)(withApollo(Messages as any));

export default (props: any) => (
  <AppContext.Consumer>
    {value => (
      <MessageSocket.Consumer>
        {socket => (
          <Query
            query={getLatestChatroom}
            variables={{ username: value.username }}
          >
            {({ loading, data }) => {
              if (loading) {
                return <Spinner />;
              }
              const { user } = data;

              const { latestChatroom } = user[0];
              const { Id } =
                latestChatroom && latestChatroom.length > 0
                  ? latestChatroom[0]
                  : "";
              console.log(data)

              return (
                <MessagesWithChatRoom
                  socket={socket.socket}
                  {...props}
                  token={value.token!}
                  username={value.username!}
                  avatar={value.avatarUrl!}
                  selectedRoomId={Id}
                />
              );
            }}
          </Query>
        )}
      </MessageSocket.Consumer>
    )}
  </AppContext.Consumer>
);
