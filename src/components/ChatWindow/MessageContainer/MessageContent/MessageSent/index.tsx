import React from "react";

const MessageSent: React.SFC<{ content: string }> = ({ content }) => {
  return (
    <div className="message-item-container">
      <div className="message-item-sent">
        <div className="message-item-content">{content}</div>
      </div>
    </div>
  );
};

export default MessageSent;
