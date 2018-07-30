import { Avatar, Icon, Input } from "antd";
import React from "react";

const MessageList = ({
  toggleAddChatRoom,
  roomList,
  changeSelectedRoom
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
        />
      ))}
    </div>
  </div>
);

const MessageItem = ({ avatarData, name, changeSelectedRoom }: any) => (
  <div onClick={changeSelectedRoom} className="message-item">
    <div className="message-item-avatar">
      <Avatar src={avatarData} size="large" icon="user" />
    </div>
    <div className="message-item-content">
      <div className="message-item-name">{name}</div>
      <div className="message-item-details">THis is the chat ocntent</div>
    </div>
  </div>
);

export default MessageList;
