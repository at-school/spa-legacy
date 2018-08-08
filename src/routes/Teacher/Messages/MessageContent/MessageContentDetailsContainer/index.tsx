import { Avatar } from "antd";
import React from "react";

export default class MessageContentDetailsContainer extends React.Component<
  any,
  any
> {
  public shouldComponentUpdate(prevProps: any) {
    if (prevProps.messageData === this.props.messageData) {
      return false;
    }
    return true;
  }

  public render() {
    const { messageData, userAvatar, setScrollToBottomDiv } = this.props;
    return (
      <div className="message-content-details-container">
        {messageData.map((message: any) => (
          <MessageContentItem
            key={message.id}
            className={message.self ? " self" : ""}
            content={message.content}
            avatar={message.self ? userAvatar : message.senderAvatar}
          />
        ))}
        <div ref={setScrollToBottomDiv} />
      </div>
    );
  }
}

const MessageContentItem = ({ content, className, avatar }: any) => (
  <div className={"message-item" + className}>
    <div className="message-item-avatar">
      <Avatar size="small" src={avatar} icon="user" />
    </div>
    <div className="message-item-content">{content}</div>
  </div>
);
