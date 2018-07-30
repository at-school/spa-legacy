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
  { token: string; userAvatar: string },
  {
    messageData: IMessageItem[];
    addChatRoom: any;
    roomList: any;
    selectedRoom: any;
  }
> {
  public state = {
    messageData: [],
    usersData: [],
    roomList: [],
    addChatRoom: {
      formVisible: false,
      selectedAddChatRoomUser: null
    },
    selectedRoom: null
  };

  public socket: any;

  public componentDidMount() {
    this.socket = io.connect("http://127.0.0.1:5000/message");
    this.socket.on("connect", () => {
      this.socket.send("User has connected");

      this.socket.on("status", (message: any) => {
        this.updateSelectedRoom();
      });
    });

    this.updateRoomList().then(() => {
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
    });
  }

  public componentWillUnmount() {
    this.socket.disconnect();
  }

  public changeSelectedRoom = (room: any) => () => {
    this.setState({
      selectedRoom: room
    });
  };

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
      console.log(rooms);
      rooms.forEach((r: any) => {
        if (r.id === room.id) {
          this.setState({ selectedRoom: r });
        }
      });
    });
  };

  public sendMessage = () => {
    const room = this.state.selectedRoom as any;
    this.socket.emit(
      "join",
      {
        room: room.id,
        token: this.props.token,
        message: "Hello i am here"
      },
      () => this.updateSelectedRoom()
      // () => {
      //   this.setState({
      //     roomList: this.state.roomList.map((r: any) => {
      //       if (room.id === r.id) {
      //         r.messages = [
      //           ...r.messages,
      //           {
      //             self: true,
      //             content: "Hello i am here",
      //             senderAvatar: this.props.userAvatar
      //           }
      //         ];
      //       }
      //       return r;
      //     }),
      //     selectedRoom: {
      //       ...room,
      //       messages: [
      //         ...room.messages,
      //         {
      //           self: true,
      //           content: "Hello i am here",
      //           senderAvatar: this.props.userAvatar
      //         }
      //       ]
      //     }
      //   });
      // }
    );
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
    return (
      <div className="messages">
        <MessageList
          toggleAddChatRoom={this.toggleAddChatRoom}
          roomList={this.state.roomList}
          changeSelectedRoom={this.changeSelectedRoom}
        />
        <MessageContent
          addChatRoomVisible={this.state.addChatRoom.formVisible}
          messageData={selectedRoom ? selectedRoom.messages : []}
          selectAddChatRoomUser={this.selectAddChatRoomUser}
          addNewRoom={this.addNewRoom}
          sendMessage={this.sendMessage}
        />
        <MessageInfo />
      </div>
    );
  }
}

export default (props: any) => (
  <AppContext.Consumer>
    {value => <Messages token={value.token!} userAvatar={value.avatarUrl!} />}
  </AppContext.Consumer>
);
