import { Icon } from "antd";
import { css, StyleSheet } from "aphrodite";
import React from "react";

const DetailsUserInfoTools = () => {
  return (
    <div className={css(styles.mainContainer)}>
      <div className={css(styles.messageContainer)}>
        <Icon
          className={css(styles.messageIcon)}
          type="message"
          theme="filled"
        />
        <div className={css(styles.messageText)}>Send Message</div>
      </div>
      <div className={css(styles.reportText)}>Report User</div>
    </div>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 20,
    marginBottom: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  messageContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
    cursor: "pointer",
    transition: "linear .1s",
    padding: 10,
    marginLeft: -10,
    borderRadius: 2,
    ":hover": {
      backgroundColor: "#1890ff",
      color: "#fff"
    }
  },
  messageIcon: {
    fontSize: 25,
    marginRight: 4
  },
  messageText: {
    fontWeight: 600,
    fontSize: 15
  },
  reportText: {
    opacity: 0.7,
    cursor: "pointer"
  }
});
export default DetailsUserInfoTools;
