import { Avatar, Icon, Input } from "antd";
import React from "react";

const MessageList = ({
  toggleAddChatRoom,
  roomList,
  changeSelectedRoomId,
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
          changeSelectedRoom={changeSelectedRoomId(room.Id)}
          key={room.Id}
          avatarData={room.users[0].avatar}
          name={room.name}
          lastMessage={
            room.latestMessage.length > 0 ? room.latestMessage[0].messageContent : ""
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
