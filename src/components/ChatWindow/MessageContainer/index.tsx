import React from "react";
import ChatroomHeader from "./ChatroomHeader";
import MessageContent from "./MessageContent";
import MessageInput from "./MessageInput";

const MessageContainer: React.SFC<{
  toggleInputFocus: () => void;
  inputFocus: boolean;
  selectedRoomId: string;
  userId: string;
  roomName: string;
  roomAvatar: string;
  updateCurrentInputValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSendMessage: () => void;
  currentInputValue: string;
}> = ({
  toggleInputFocus,
  inputFocus,
  selectedRoomId,
  userId,
  roomName,
  roomAvatar,
  updateCurrentInputValue,
  handleSendMessage,
  currentInputValue
}) => {
  return (
    <div className="chat-window-message">
      <ChatroomHeader roomName={roomName} roomAvatar={roomAvatar} />
      <MessageContent selectedRoomId={selectedRoomId} userId={userId} />
      <MessageInput
        updateCurrentInputValue={updateCurrentInputValue}
        toggleInputFocus={toggleInputFocus}
        inputFocus={inputFocus}
        handleSendMessage={handleSendMessage}
        currentInputValue={currentInputValue}
      />
    </div>
  );
};

export default MessageContainer;
