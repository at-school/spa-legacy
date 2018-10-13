import { Icon, Input } from "antd";
import React from "react";

const MessageInput: React.SFC<{
  toggleInputFocus: () => void;
  inputFocus: boolean;
  updateCurrentInputValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSendMessage: () => void;
  currentInputValue: string;
}> = ({ inputFocus, toggleInputFocus, updateCurrentInputValue, handleSendMessage, currentInputValue }) => {
  return (
    <div className={`chat-window-input ${inputFocus ? "active" : ""}`}>
      <Input
        onFocus={toggleInputFocus}
        onBlur={toggleInputFocus}
        placeholder="Type your message here"
        onChange={updateCurrentInputValue}
        value={currentInputValue}
      />
      <div className="ulities-container">
        <Icon type="smile-o" />
        <Icon type="up-circle-o" onClick={handleSendMessage}/>
      </div>
    </div>
  );
};

export default MessageInput;
