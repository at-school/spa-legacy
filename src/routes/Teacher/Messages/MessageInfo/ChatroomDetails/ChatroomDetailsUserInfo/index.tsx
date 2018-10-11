import { css, StyleSheet } from "aphrodite";
import React from "react";

interface IChatroomDetailsUserInfoProps {
  avatar: string;
  name: string;
  accessLevel: number;
}

const ChatroomDetailsUserInfo: React.SFC<IChatroomDetailsUserInfoProps> = ({
  avatar,
  name,
  accessLevel
}) => {
  return (
    <div className={css(styles.mainContainer)}>
      <img className={css(styles.avatar)} src={avatar} />
      <div>
        <div className={css(styles.name)}>{name}</div>
        <div className={css(styles.accessLevel)}>
          {accessLevel === 1 ? "Student" : "Teacher"}
        </div>
      </div>
    </div>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginTop: 10,
    marginBottom: -10
  },
  avatar: {
    width: 52,
    borderRadius: "50%",
    marginRight: 16
  },
  name: {
    fontSize: 18,
    fontWeight: 600
  },
  accessLevel: {
    fontSize: 12,
    fontWeight: 400
  }
});

export default ChatroomDetailsUserInfo;
