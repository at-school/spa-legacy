import { Divider } from "antd";
import React from "react";
import ChatroomDetailsUserInfo from "./ChatroomDetailsUserInfo";
import ChatroomOptions from "./ChatroomOptions";

const ChatroomDetails = ({ otherUser }: any) => {
  const name = otherUser.firstname + " " + otherUser.lastname;

  return (
    <div>
      <ChatroomDetailsUserInfo
        avatar={otherUser.avatar}
        name={name}
        accessLevel={otherUser.accessLevel}
      />
      <Divider>Room Options</Divider>
      <ChatroomOptions />
    </div>
  );
};

export default ChatroomDetails;
