import { css, StyleSheet } from "aphrodite";
import React from "react";
import { graphql } from "react-apollo";
import { CSSTransition } from "react-transition-group";
import { withAppContext } from "../../contexts/AppContext";
import { sendMessage } from "../../routes/Teacher/Messages";
import { addMessageMutation } from "../../routes/Teacher/Messages/queries/queries";
import ChatroomList from "./ChatroomList";
import MessageContainer from "./MessageContainer";
import "./styles.css";

class ChatWindow extends React.Component<
  {
    selectedRoomId: string;
    chatrooms: any;
    changeSelectedRoomId: (selectedRoomId: string) => () => void;
    appContext: {
      userId: string;
      fullname: string;
      avatarUrl: string;
    };
    addMessageMutation: any;
    socket: any;
  },
  { windowVisible: boolean; inputFocus: boolean; currentInputValue: string }
> {
  public state = {
    windowVisible: false,
    inputFocus: false,
    currentInputValue: ""
  };

  private windowRef: any;

  public componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  public componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  public updateCurrentInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ currentInputValue: e.target.value });
  };

  public handleSendMessage = () => {
    sendMessage(
      this.state.currentInputValue,
      this.props.selectedRoomId,
      this.props.appContext.avatarUrl,
      this.props.appContext.userId,
      this.props.addMessageMutation,
      this.props.socket,
      () => this.setState({ currentInputValue: "" })
    );
  };

  public render() {
    // get chat room name and avatar
    let roomName = "";
    let roomAvatar = "";

    const currentRoom = this.props.chatrooms.find(
      (chatroom: any) => chatroom.Id === this.props.selectedRoomId
    );
    if (currentRoom) {
      for (const user of currentRoom.users) {
        if (user.Id !== this.props.appContext.userId) {
          roomName = user.firstname + " " + user.lastname;
          roomAvatar = user.avatar;
          break;
        }
      }

      if (!(roomName && roomAvatar) && currentRoom.users.length === 1) {
        roomAvatar = currentRoom.users[0].avatar;
        roomName =
          currentRoom.users[0].firstname + " " + currentRoom.users[0].lastname;
      }
    }
    return (
      <div
        className={css(styles.chatWindow) + " chat-window"}
        ref={this.setWindowRef}
      >
        <div
          className="chat-window-main-icon"
          onClick={this.handleWindowVisible}
        >
          <i className="fas fa-comment" />
        </div>
        <CSSTransition
          timeout={300}
          classNames="chatwindow-visible"
          unmountOnExit={true}
          in={this.state.windowVisible}
        >
          <div
            className={`chat-window-main-content ${
              this.state.windowVisible ? null : "hide-window"
            }`}
          >
            <div className="chat-window-main-content-container">
              <ChatroomList
                selectedRoomId={this.props.selectedRoomId}
                chatrooms={this.props.chatrooms}
                changeSelectedRoomId={this.props.changeSelectedRoomId}
              />
              <MessageContainer
                toggleInputFocus={this.toggleInputFocus}
                inputFocus={this.state.inputFocus}
                selectedRoomId={this.props.selectedRoomId}
                userId={this.props.appContext.userId}
                roomName={roomName}
                roomAvatar={roomAvatar}
                updateCurrentInputValue={this.updateCurrentInputValue}
                handleSendMessage={this.handleSendMessage}
                currentInputValue={this.state.currentInputValue}
              />
            </div>
          </div>
        </CSSTransition>
      </div>
    );
  }

  private handleClickOutside = (e: any) => {
    if (
      this.windowRef &&
      !this.windowRef.contains(e.target) &&
      this.state.windowVisible
    ) {
      this.handleWindowVisible();
    }
  };

  private setWindowRef = (ref: any) => {
    this.windowRef = ref;
  };

  private toggleInputFocus = () => {
    this.setState(prevState => ({ inputFocus: !prevState.inputFocus }));
  };

  private handleWindowVisible = () => {
    this.setState(prevState => ({ windowVisible: !prevState.windowVisible }));
  };
}

const styles = StyleSheet.create({
  chatWindow: {
    position: "fixed",
    bottom: "10px",
    right: "10px"
  }
});

export default graphql(addMessageMutation, { name: "addMessageMutation" })(
  withAppContext(ChatWindow)
) as any;
