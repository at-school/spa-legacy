import { css, StyleSheet } from "aphrodite";
import React from "react";

const ChatroomHeader: React.SFC<{roomName: string; roomAvatar: string}> = ({roomName, roomAvatar}) => {
  return (
    <div className="chat-window-content-header">
      <img className={css(styles.img)} src={roomAvatar} />
      <div className={css(styles.name)}>{roomName}</div>
    </div>
  );
};

const styles = StyleSheet.create({
  img: {
    borderRadius: "50%",
    marginRight: 8,
    width: 34,
    alignSelf: "center",
    marginLeft: 10
  },
  name: {
    alignSelf: "center",
    padding: 10,
    flex: 1,
    userSelect: "none",
    cursor: "pointer",
    borderRadius: 5,
    fontFamily: "helvetica",
    fontSize: 17,
    ":hover": {
      background: "#4882ed"
    }
  }
});

export default ChatroomHeader;
