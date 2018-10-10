import React from "react";
import { Redirect } from "react-router-dom";
import Spinner from "../../../components/Spinner";
import { withTeacherMessageSocket } from "../../../contexts/Teacher/TeacherMessageSocket";

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
