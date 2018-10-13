import { css, StyleSheet } from "aphrodite";
import React from "react";
import { withAppContext } from "../../../contexts/AppContext";
import RoomAvatar from "./RoomAvatar";

const PeopleList: React.SFC<{
  chatrooms: any;
  selectedRoomId: string;
  changeSelectedRoomId: (selectedRoomId: string) => () => void;
  appContext: { userId: string };
}> = ({ chatrooms, appContext, changeSelectedRoomId, selectedRoomId }) => {

  return (
    <div className={css(styles.overflow) + " people-list"}>
      {chatrooms.map((chatroom: any) => {
        let avatar = "";
        const users = chatroom.users;
        for (const user of users) {
          if (user.Id !== appContext.userId) {
            avatar = user.avatar;
            break;
          }
        }
        if (!avatar) {
          avatar = "/logo1.png";
        }
        return (
          <RoomAvatar
            active={chatroom.Id === selectedRoomId}
            changeSelectedRoomId={changeSelectedRoomId(chatroom.Id)}
            key={chatroom.Id}
            avatar={avatar}
          />
        );
      })}
    </div>
  );
};

const styles = StyleSheet.create({
  overflow: {
    overflow: "auto"
  }
});

export default withAppContext(PeopleList);
