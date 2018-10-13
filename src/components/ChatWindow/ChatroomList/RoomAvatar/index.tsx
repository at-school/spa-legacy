import { css, StyleSheet } from "aphrodite/no-important";
import React from "react";

const RoomAvatar: React.SFC<{
  avatar: string;
  active: boolean;
  changeSelectedRoomId: () => void;
}> = ({ avatar, active, changeSelectedRoomId }) => {
  return (
    <div
      className={css(
        styles.mainContainer,
        active && styles.mainContainerActive
      )}
      onClick={changeSelectedRoomId}
    >
      <img
        src={avatar}
        className={css(styles.center, active && styles.centerActive)}
      />
    </div>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    padding: 2,
    paddingTop: 12,
    paddingBottom: 12,
    transition: "all linear .1s"
  },
  center: {
    margin: "auto",
    display: "block",
    width: 50,
    borderRadius: "50%",
    boxShadow: "0px 0px 27px 0px rgba(117,117,117,0.81)",
    transition: "all linear .1s"
  },
  mainContainerActive: {
    backgroundColor: "white"
  },
  centerActive: {
    boxShadow: "none"
  }
});

export default RoomAvatar;
