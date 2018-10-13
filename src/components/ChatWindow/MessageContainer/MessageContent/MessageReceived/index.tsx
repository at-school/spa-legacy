import React from "react";

const MessageReceived: React.SFC<{ avatar: string; content: string }> = ({
  avatar,
  content
}) => {
  return (
    <div className="message-item-container">
      <div className="message-item-received">
        <img src={avatar} />
        <div className="message-item-content">{content}</div>
      </div>
    </div>
  );
};

export default MessageReceived;
