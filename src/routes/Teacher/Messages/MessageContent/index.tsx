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
      messageData,
      addChatRoomVisible,
      selectAddChatRoomUser,
      addNewRoom,
      sendMessage,
      updateMessage,
      currentMessage,
      setScrollToBottomDiv
    } = this.props;
    return (
      <AppContent.Consumer>
        {value => (
          <div className="message-content-container">
            {addChatRoomVisible ? (
              <AddChatRoom
                addNewRoom={addNewRoom}
                token={value.token!}
                selectAddChatRoomUser={selectAddChatRoomUser}
              />
            ) : (
              <div className="message-content">
                <div className="message-content-details">
                  <MessageContentDetailsContainer
                    userAvatar={value.avatarUrl}
                    messageData={messageData}
                    setScrollToBottomDiv={setScrollToBottomDiv}
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
