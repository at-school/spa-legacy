import React from "react";
import createSubSection from "../../../HOC/createSubSection";

const ChatroomManage = () => {
  return (
    <div>
      <img width="100%" src="/blog/10/remove-add-chatroom.gif" />
      <div>
        Now the user could remove/add chatrooms. One point to note is when a
        user deletes/add a chatroom, all the other users that are in the
        chatrooms will be affected. Of course, we do use WebSocket for this so
        the timming is instant.
      </div>
    </div>
  );
};

export default createSubSection("Add and remove chatroom", ChatroomManage);
