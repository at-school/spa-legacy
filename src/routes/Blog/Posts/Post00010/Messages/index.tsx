import React from "react";
import createSection from "../../HOC/createSection";
import ChatroomManage from "./ChatroomManage";
import ExternalWindow from "./ExternalWindow";
import NormalChat from "./NormatChat";
import UserActive from "./UserActive";

const Messages = () => {
  return (
    <React.Fragment>
      <NormalChat />
      <ChatroomManage />
      <ExternalWindow />
      <UserActive />
    </React.Fragment>
  );
};

export default createSection("Messaging", Messages);
