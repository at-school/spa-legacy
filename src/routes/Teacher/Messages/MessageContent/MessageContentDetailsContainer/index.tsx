import { Avatar } from "antd";
import React from "react";
import AppContext from "../../../../../contexts/AppContext";

class MessageContentDetailsContainer extends React.Component<any, any> {
  public shouldComponentUpdate(prevProps: any) {
    if (prevProps.messageData === this.props.messageData) {
      return false;
    }
    return true;
  }

  public render() {
    const { setScrollToBottomDiv, messageData, userId } = this.props;

    return (
      <div className="message-content-details-container">
        {messageData.map((message: any) => (
          <MessageContentItem
            key={message.Id}
            className={message.senderId === userId ? " self" : ""}
            content={message.messageContent}
            avatar={message.senderAvatar}
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

export default (props: any) => (
  <AppContext.Consumer>
    {value => (
      <MessageContentDetailsContainer {...props} userId={value.userId} />
    )}
  </AppContext.Consumer>
);
