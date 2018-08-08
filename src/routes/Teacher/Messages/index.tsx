import React from "react";
import io from "socket.io-client";
import { createRoom, getRooms } from "../../../api/message";
import AppContext from "../../../contexts/AppContext";
import MessageContent from "./MessageContent";
import MessageInfo from "./MessageInfo";
import MessageList from "./MessageList";
import "./styles/styles.css";

interface IMessageItem {
  self: boolean;
  senderAvatar: null;
  content: string;
}

class Messages extends React.Component<
  { token: string; userAvatar: string; userName: string },
  {
    messageData: IMessageItem[];
    addChatRoom: any;
    roomList: any;
    selectedRoom: any;
    message: string;
  }
> {
  public state = {
    messageData: [],
    roomList: [],
    addChatRoom: {
      formVisible: false,
      selectedAddChatRoomUser: null
    },
    selectedRoom: null,
    message: ""
  };

  public scrollToBottomDiv: any;

  public socket: any;

  public componentDidMount() {
    this.socket = io.connect("http://127.0.0.1:5000/message");

    this.socket.on("newMessage", () => {
      console.log("Hello");
      this.updateSelectedRoom();
    });

    this.updateRoomList()
      .then(() => {
        if (this.state.roomList.length > 0) {
          const firstRoom = this.state.roomList[0] as any;
          this.setState(
            {
              selectedRoom: {
                ...firstRoom
              }
            },
            () => {
              this.socket.emit("join", {
                room: firstRoom.id,
                token: this.props.token
              });
            }
          );
        }
      })
      .then(() => this.scrollToBottomDiv.scrollIntoView());
  }

  public setScrollToBottomDiv = (ref: any) => {
    this.scrollToBottomDiv = ref;
  };

  public scrollToBottom = () => {
    if (this.scrollToBottomDiv) {
      this.scrollToBottomDiv.scrollIntoView({ behavior: "smooth" });
    }
  };

  public componentWillUnmount() {
    this.socket.disconnect();
  }

  public changeSelectedRoom = (room: any) => () => {
    this.setState(
      {
        selectedRoom: room
      },
      () => this.scrollToBottomDiv.scrollIntoView()
    );
  };

  public updateMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    this.setState({ message: e.target.value });

  public updateRoomList = async () => {
    try {
      const rooms = await getRooms(this.props.token);
      this.setState({ roomList: await rooms.results });
      return rooms.results;
    } catch (err) {
      console.log(err);
    }
  };

  public toggleAddChatRoom = () => {
    this.setState(prevState => ({
      addChatRoom: {
        ...prevState.addChatRoom,
        formVisible: !prevState.addChatRoom.formVisible
      }
    }));
  };

  public updateSelectedRoom = () => {
    const room = this.state.selectedRoom as any;
    this.updateRoomList().then((rooms: any) => {
      rooms.forEach((r: any) => {
        if (r.id === room.id) {
          this.setState({ selectedRoom: r });
        }
      });
      this.scrollToBottom();
    });
  };

  public sendMessage = () => {
    const room = this.state.selectedRoom as any;
    if (this.state.message.length !== 0) {
      this.socket.emit(
        "join",
        {
          room: room.id,
          token: this.props.token,
          message: this.state.message
        },
        () => {
          this.updateSelectedRoom();
          this.setState({ message: "" });
        }
      );
    }
  };

  public addNewRoom = () => {
    createRoom(
      this.props.token,
      this.state.addChatRoom.selectedAddChatRoomUser!
    )
      .then(() => {
        this.updateRoomList().then(() => this.toggleAddChatRoom());
      })
      .catch(() => {
        console.log("There is an error");
      });
  };

  public selectAddChatRoomUser = (id: string) => {
    this.setState(prevState => ({
      addChatRoom: {
        ...prevState.addChatRoom,
        selectedAddChatRoomUser: id
      }
    }));
  };

  public render() {
    const selectedRoom = this.state.selectedRoom as any;
    console.log(this.state.roomList);
    return (
      <div className="messages">
        <MessageList
          toggleAddChatRoom={this.toggleAddChatRoom}
          roomList={this.state.roomList}
          changeSelectedRoom={this.changeSelectedRoom}
          selectedRoom={this.state.selectedRoom}
        />
        <MessageContent
          addChatRoomVisible={this.state.addChatRoom.formVisible}
          messageData={selectedRoom ? selectedRoom.messages : []}
          selectAddChatRoomUser={this.selectAddChatRoomUser}
          addNewRoom={this.addNewRoom}
          sendMessage={this.sendMessage}
          updateMessage={this.updateMessage}
          currentMessage={this.state.message}
          setScrollToBottomDiv={this.setScrollToBottomDiv}
        />
        <MessageInfo
          userName={this.props.userName}
          addChatRoom={this.state.addChatRoom.formVisible}
          userAvatar={this.props.userAvatar}
        />
      </div>
    );
  }
}

export default (props: any) => (
  <AppContext.Consumer>
    {value => (
      <Messages
        token={value.token!}
        userName={value.fullname!}
        userAvatar={value.avatarUrl!}
      />
    )}
  </AppContext.Consumer>
);
