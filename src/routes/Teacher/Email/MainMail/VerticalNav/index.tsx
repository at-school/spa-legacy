import { Icon } from "antd";
import { css, StyleSheet } from "aphrodite";
import React from "react";

const VerticalNav = ({
  activeInbox,
  navigateToOtherMenu
}: {
  activeInbox: number;
  navigateToOtherMenu: (menu: string) => () => void;
}) => {
  return (
    <div className={css(styles.mainContainer)}>
      <div
        className={css(styles.inboxItem, activeInbox === 0 && styles.active)}
        onClick={navigateToOtherMenu("new")}
      >
        <div className={css(styles.item)}>
          <Icon type="plus" style={{ fontSize: "17.5px" }} />

          <span
            style={{
              paddingLeft: "10px"
            }}
          >
            New Message
          </span>
        </div>
      </div>
      <div
        className={css(styles.inboxItem, activeInbox === 1 && styles.active)}
        onClick={navigateToOtherMenu("all")}
      >
        <div className={css(styles.item)}>
          <Icon type="inbox" style={{ fontSize: "17.5px" }} />

          <span
            style={{
              paddingLeft: "10px"
            }}
          >
            Inbox
          </span>
        </div>
      </div>
    </div>
  );
};

const lightBlue = "rgba(187, 219, 244, 0.5)";
const blue = "rgba(3, 131, 220, 1)";
const gray = "rgb(240,242,245)";
const grayBorder = "solid 1px rgb(230,230,230)";

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    maxHeight: "100%",
    backgroundColor: gray,
    borderRight: grayBorder,
    flex: 0.2,
    minWidth: "150px"
  },

  inboxItem: {
    height: "54px",
    display: "flex",
    alignItems: "center",
    ":hover": {
      backgroundColor: "rgba(187, 219, 244, 0.1)",
      cursor: "pointer"
    },
    transition: "all ease-in-out .2s"
  },
  item: {
    display: "flex",
    alignItems: "center",
    paddingLeft: "20px",
    ":hover": {
      cursor: "pointer"
    }
  },
  active: {
    color: blue,
    backgroundColor: lightBlue,
    ":hover": {
      backgroundColor: lightBlue,
      cursor: "pointer"
    }
  }
});

export default VerticalNav;
