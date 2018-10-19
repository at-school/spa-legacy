import { Icon, Spin } from "antd";
import React from "react";
import { Redirect } from "react-router-dom";
import { withTeacherMessageSocket } from "../../../contexts/Teacher/TeacherMessageSocket";

const antIcon = <Icon type="loading" style={{ fontSize: 40 }} spin={true} />;

const Spinner = () => (
  <Spin
    style={{ display: "block", position: "relative", top: "40%" }}
    indicator={antIcon}
    tip="Loading messages"
  />
);

const MessageRedirect = (props: any) => {
  if (props.teacherMessageSocket.chatrooms[0]) {
    return (
      <Redirect
        to={"/teacher/messages/" + props.teacherMessageSocket.chatrooms[0].Id}
      />
    );
  } else {
    return <Spinner />;
  }
};

export default withTeacherMessageSocket(MessageRedirect);
