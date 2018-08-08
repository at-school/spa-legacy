import { Avatar, Icon, Input } from "antd";
import React from "react";

const MessageList = ({
  toggleAddChatRoom,
  roomList,
  changeSelectedRoom,
  selectedRoom
}: any) => (
  <div className="message-list-container">
    <div className="message-list-search-container">
      <Input.Search
        placeholder="Search for a message"
        className="message-list-search"
      />
      <Icon type="plus-square-o" onClick={toggleAddChatRoom} />
    </div>
    <div className="message-list">
      {roomList.map((room: any) => (
        <MessageItem
          changeSelectedRoom={changeSelectedRoom(room)}
          key={room.id}
          avatarData={room.avatarData}
          name={room.name}
          lastMessage={
            room.messages.slice(-1)[0]
              ? room.messages.slice(-1)[0].content
              : null
          }
          active={JSON.stringify(selectedRoom) === JSON.stringify(room)}
        />
      ))}
    </div>
  </div>
);

const MessageItem = ({
  avatarData,
  name,
  changeSelectedRoom,
  lastMessage,
  active
}: any) => (
  <div
    onClick={changeSelectedRoom}
    className={"message-item " + (active ? "active" : "")}
  >
    <div className="message-item-avatar">
      <Avatar src={avatarData} size="large" icon="user" />
    </div>
    <div className="message-item-content">
      <div className="message-item-name">{name}</div>
      <div className="message-item-details">{lastMessage}</div>
    </div>
  </div>
);

export default MessageList;
