import { Avatar } from "antd";
import React from "react";

export default class MessageInfo extends React.Component<any, any> {
  public render() {
    const { addChatRoom, userName, userAvatar } = this.props;
    return (
      <div className="message-info">
        {addChatRoom ? (
          <div className="add-chat-room">
            <Avatar src={userAvatar} />

            <div className="userName">{userName}</div>
          </div>
        ) : null}
      </div>
    );
  }
}
