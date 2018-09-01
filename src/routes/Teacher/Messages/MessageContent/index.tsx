import { Icon, Input } from "antd";
import React from "react";
import AppContent from "../../../../contexts/AppContext";
import AddChatRoom from "./AddChatRoom";
import MessageContentDetailsContainer from "./MessageContentDetailsContainer";

class MessageContent extends React.Component<any, any> {
  public shouldComponentUpdate(nextProps: any) {
    if (nextProps === this.props) {
      return false;
    }
    return true;
  }

  public render() {
    const {
      addChatRoomVisible,
      sendMessage,
      updateMessage,
      currentMessage,
      setScrollToBottomDiv,
      toggleAddChatRoom,
      selectedRoomId,
    } = this.props;
    return (
      <AppContent.Consumer>
        {value => (
          <div className="message-content-container">
            {addChatRoomVisible ? (
              <AddChatRoom
                token={value.token!}
                toggleAddChatRoom={toggleAddChatRoom}
              />
            ) : (
              <div className="message-content">
                <div className="message-content-details">
                  <MessageContentDetailsContainer
                    userAvatar={value.avatarUrl}
                    messageData={this.props.messageData}
                    setScrollToBottomDiv={setScrollToBottomDiv}
                    selectedRoomId={selectedRoomId}
                  />
                </div>
                <div className="message-content-input">
                  <Input.TextArea
                    value={currentMessage}
                    onChange={updateMessage}
                    autosize={{ minRows: 1, maxRows: 3 }}
                  />
                  <div className="message-content-input-icons">
                    <Icon style={{ fontSize: "18px" }} type="smile-o" />
                    <Icon
                      onClick={sendMessage}
                      style={{ fontSize: "18px" }}
                      type="up-circle"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </AppContent.Consumer>
    );
  }
}


export default MessageContent;
