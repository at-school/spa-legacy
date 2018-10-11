import { Avatar, Icon, Input } from "antd";
import React from "react";

const MessageList = ({
  toggleAddChatRoom,
  roomList,
  changeSelectedRoomId,
  selectedRoom,
  userId
}: any) => {
  return (
    <div className="message-list-container">
      <div className="message-list-search-container">
        <Input.Search
          placeholder="Search for a message"
          className="message-list-search"
        />
        <Icon type="plus-square-o" onClick={toggleAddChatRoom} />
      </div>
      <div className="message-list">
        {roomList.map((room: any) => {
          let avatarData = "";
          let chatname = "";
          if (room.users.length > 1) {
            avatarData = room.users[0].avatar;
            const u = room.users.find((user: any) => userId !== user.Id);
            if (u) {
              chatname = u.firstname + " " + u.lastname;
            } else {
              chatname = room.users[0].firstname + " " + room.users[0].lastname;
            }
          } else {
            avatarData = room.latestMessage[0].senderAvatar;
            chatname = "Team @ School";
          }
          return (
            <MessageItem
              changeSelectedRoom={changeSelectedRoomId(room.Id)}
              key={room.Id}
              avatarData={avatarData}
              name={chatname}
              lastMessage={
                room.latestMessage.length > 0
                  ? room.latestMessage[0].messageContent
                  : ""
              }
              active={JSON.stringify(selectedRoom) === JSON.stringify(room)}
            />
          );
        })}
      </div>
    </div>
  );
};

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
