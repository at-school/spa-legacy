import { Icon, Input } from "antd";
import React from "react";
import PeopleRow from "./PeopleRow";

const MessageList = ({
  toggleAddChatRoom,
  roomList,
  changeSelectedRoomId,
  selectedRoom,
  userId,
  addChatroom
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
          let userActive = false;
          if (room.users.length > 1) {
            avatarData = room.users[0].avatar;
            const u = room.users.find((user: any) => userId !== user.Id);
            if (u) {
              chatname = u.firstname + " " + u.lastname;
              userActive = u.active;
            } else {
              chatname = room.users[0].firstname + " " + room.users[0].lastname;
            }
          } else {
            avatarData = room.latestMessage[0].senderAvatar;
            chatname = "Team @ School";
          }
          return (
            <PeopleRow
              changeSelectedRoom={changeSelectedRoomId(room.Id)}
              key={room.Id}
              avatarData={avatarData}
              name={chatname}
              lastMessage={
                room.latestMessage.length > 0
                  ? room.latestMessage[0].messageContent
                  : ""
              }
              userActive={userActive}
              active={selectedRoom === room.Id && !addChatroom}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MessageList;
