import React from "react";
import { compose, graphql } from "react-apollo";
import { branch, renderComponent } from "recompose";
import Spinner from "../../../components/Spinner";
import AppContext from "../../../contexts/AppContext";
import MessageContent from "./MessageContent";
import MessageInfo from "./MessageInfo";
import MessageList from "./MessageList";
import { addMessageMutation, getChatRoomMessageQuery, getChatRoomQuery } from "./queries/queries";
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
  },
  {
    messageData: IMessageItem[];
    addChatRoom: any;
    roomList: any;
    selectedRoomId: any;
    message: string;
    chatrooms: any;
    onSendingMessage: boolean;
  }
> {
  public socket: any;
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
    chatrooms: [],
    onSendingMessage: false
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
    this.socket.on("connect", () => {
      // set selected room the the first index
      if (this.props.chatRoomList.user[0]) {
        const { chatrooms } = this.props.chatRoomList.user[0];
        for (const chatroom of chatrooms) {
          this.socket.emit("sendMessage", {
            room: chatroom.Id
          });
        }
      }
    });

    // set selected room the the first index
    if (this.props.chatRoomList.user[0]) {
      const { chatrooms } = this.props.chatRoomList.user[0];
      if (chatrooms.length > 0) {
        this.setState({ selectedRoomId: chatrooms[0].Id }, () =>
          this.scrollToBottomDiv.scrollIntoView()
        );
      }
    }

    this.socket.on("newMessage", (res: any) => {
      console.log("Receive Message");
      if (res.roomId === this.state.selectedRoomId) {
        this.props.messageList.refetch().then(() => {
          this.props.chatRoomList
            .refetch({ username: this.props.username })
            .then(() => {
              this.setState({ onSendingMessage: false }, () =>
                this.setState({ message: "" }, () => this.scrollToBottom())
              );
            });
        });
      } else {
        this.props.chatRoomList.refetch({ username: this.props.username });
      }
    });

    // this.props.data.refetch({ username: this.props.username }).then((res:any) => console.log(res));
  }

  public shouldComponentUpdate() {
    if (this.state.onSendingMessage) {
      return false;
    }
    return true;
  }

  public setScrollToBottomDiv = (ref: any) => {
    this.scrollToBottomDiv = ref;
  };

  public scrollToBottom = () => {
    if (this.scrollToBottomDiv) {
      this.scrollToBottomDiv.scrollIntoView({ behavior: "smooth" });
    }
  };

  public updateMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ message: e.target.value });
  };

  public componentWillUnmount() {
    this.socket.disconnect();
  }

  public sendMessage = () => {
    const messageContent = this.state.message;
    if (messageContent.length > 0) {
      // this.props
      //   .addMessageMutation({
      //     variables: {
      //       chatroomId,
      //       messageContent
      //     },
      //     refetchQueries: [
      //       {
      //         query: getChatRoomQuery,
      //         variables: { username: this.props.username }
      //       }
      //     ],
      //     awaitRefetchQueries: true
      //   })
      //   .then(() => console.log(this.props))
      //   .catch((err: any) => console.log(err));

      this.setState({ onSendingMessage: true }, () => {
        this.socket.emit("sendMessage", {
          room: this.state.selectedRoomId,
          message: messageContent
        });
      });
    }
  };

  public changeSelectedRoomId = (selectedRoomId: any) => () => {
    this.setState({ selectedRoomId });
    this.props.messageList
      .refetch({ chatroomId: selectedRoomId })
      .then(() => this.scrollToBottom());
  };

  public render() {
    const chatrooms = this.props.chatRoomList.user[0].chatrooms;

    return (
      <div className="messages">
        <MessageList
          toggleAddChatRoom={this.toggleAddChatRoom}
          roomList={chatrooms}
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

const MessagesWithContent = compose(
  graphql(getChatRoomMessageQuery, {
    options: (props: any) => {
      let selectedRoomId = "";
      if (props.chatRoomList.user && props.chatRoomList.user.length > 0) {
        const { chatrooms } = props.chatRoomList.user[0];
        if (chatrooms.length > 0) {
          selectedRoomId = chatrooms[0].Id;
        }
      }
      return {
        variables: {
          chatroomId: selectedRoomId
        }
      };
    },
    name: "messageList"
  }),
  branch(({ messageList }) => {
    return !messageList.message && messageList.loading;
  }, renderComponent(Spinner))
)(Messages);

const MessagesWithChatRoom = compose(
  graphql(addMessageMutation, { name: "addMessageMutation" }),
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
)(MessagesWithContent);

export default (props: any) => (
  <AppContext.Consumer>
    {value => (
      <MessagesWithChatRoom
        {...props}
        token={value.token!}
        username={value.username!}
        avatar={value.avatarUrl!}
      />
    )}
  </AppContext.Consumer>
);
