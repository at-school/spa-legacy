import { Icon } from "antd";
import { css, StyleSheet } from "aphrodite";
import React from "react";

const ChatroomOptions = () => {
  return (
    <div className={css(styles.mainContainer)}>
      <div className={css(styles.editChatroomContainer)}>
        <Icon
          className={css(styles.editChatroomIcon)}
          type="edit"
          theme="outlined"
        />
        <span>Edit name of the room</span>
      </div>
    </div>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    padding: 10
  },
  editChatroomContainer: {
    display: "flex",
    alignItems: "center"
  },
  editChatroomIcon: {
    marginRight: 10
  }
});

export default ChatroomOptions;
