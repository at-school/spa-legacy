import { Avatar } from "antd";
import { css, StyleSheet } from "aphrodite";
import React from "react";

const PersonRow = ({
  avatarData,
  name,
  changeSelectedRoom,
  lastMessage,
  active,
  userActive
}: any) => (
  <div
    onClick={changeSelectedRoom}
    className={"message-item " + (active ? "active" : "")}
  >
    <div className="message-item-avatar">
      <Avatar src={avatarData} size="large" icon="user" />
    </div>
    <div className="message-item-content">
      <div className="message-item-name">
        {name} {userActive && <OnlineDot />}
      </div>
      <div className="message-item-details">{lastMessage}</div>
    </div>
  </div>
);

const OnlineDot = () => {
  return <span className={css(styles.dot)} />;
};

const styles = StyleSheet.create({
  dot: {
    height: 8,
    width: 8,
    backgroundColor: "rgb(66, 183, 42)",
    borderRadius: "50%",
    display: "inline-block",
    marginLeft: 3,
    marginBottom: 1
  }
});

export default PersonRow;
