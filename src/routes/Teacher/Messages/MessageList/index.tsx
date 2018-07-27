import { Input } from "antd";
import React from "react";

const MessageList = () => (
  <div className="message-list">
    <div className="message-list-search-container">
      <Input.Search
        placeholder="Search for a message"
        className="message-list-search"
      />
    </div>
  </div>
);

export default MessageList;
