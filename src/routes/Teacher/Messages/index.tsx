import React from "react";
import MessageContent from "./MessageContent";
import MessageInfo from "./MessageInfo";
import MessageList from "./MessageList";
import "./styles/styles.css";

const Messages = () => (
  <div className="messages">
    <MessageList />
    <MessageContent />
    <MessageInfo />
  </div>
);

export default Messages;
