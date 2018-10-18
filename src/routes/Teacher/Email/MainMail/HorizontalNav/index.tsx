import { Icon } from "antd";
import { css, StyleSheet } from "aphrodite";
import React from "react";

const HorizontalNav = () => {
  return (
    <div className={css(styles.mainContainer)}>
      <div className={css(styles.left)}>
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
      <div>
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
      <div>
        <div className={css(styles.item)}>
          <Icon type="stop" style={{ fontSize: "17.5px" }} />
          <span
            style={{
              paddingLeft: "10px"
            }}
          >
            Junk
          </span>
        </div>
      </div>
    </div>
  );
};

const blue = "rgba(3, 131, 220, 1)";
const gray = "rgb(240,242,245)";
const grayBorder = "solid 1px rgb(230,230,230)";
const styles = StyleSheet.create({
  left: {
    width: "20%",
    minWidth: "150px"
  },
  item: {
    display: "flex",
    alignItems: "center",
    paddingLeft: "20px",
    ":hover": {
      cursor: "pointer"
    },
    transition: "all ease-in-out .2s"
  },
  mainContainer: {
    width: "100%",
    backgroundColor: gray,
    borderBottom: grayBorder,
    height: "50px",
    display: "flex",
    alignItems: "center",
    color: blue
  }
});

export default HorizontalNav;
