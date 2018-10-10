import { Avatar } from "antd";
import React from "react";
import ChatroomDetails from "./ChatroomDetails";

export default class MessageInfo extends React.Component<any, any> {
  public shouldComponentUpdate(prevProps: any) {
    if (prevProps.addChatRoom !== this.props.addChatRoom) {
      return true;
    }

    if (
      JSON.stringify(prevProps.otherUser) ===
      JSON.stringify(this.props.otherUser)
    ) {
      return false;
    }
    return true;
  }

  public render() {
    const { addChatRoom, username, userAvatar, otherUser } = this.props;

    return (
      <div className="message-info">
        {(() => {
          if (addChatRoom) {
            return (
              <div className="add-chat-room">
                <Avatar src={userAvatar} />

                <div className="userName">{username}</div>
              </div>
            );
          } else if (otherUser) {
            return <ChatroomDetails otherUser={otherUser} />;
          }
          return null;
        })()}
      </div>
    );
  }
}
