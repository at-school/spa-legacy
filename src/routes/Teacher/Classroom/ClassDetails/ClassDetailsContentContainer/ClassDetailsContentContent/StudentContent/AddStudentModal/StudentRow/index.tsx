import { Avatar, Icon } from "antd";
import { css, StyleSheet } from "aphrodite";
import React from "react";

interface IStudentRowProps {
  avatar: string;
  name: string;
  removeSelectedStudent: () => void;
}

const StudentRow = (props: IStudentRowProps) => {
  return (
    <div className={css(styles.mainTop)}>
      <div className={css(styles.rowDirectionFlex)}>
        <Avatar className={css(styles.avatar)} src={props.avatar} />
        <div className={css(styles.flexGrowFull)}>{props.name}</div>
        <Icon type="close" onClick={props.removeSelectedStudent} />
      </div>
    </div>
  );
};

const styles = StyleSheet.create({
  mainTop: {
    border: "1px solid #dfdfdf",
    width: "100%",
    padding: "12px"
  },
  rowDirectionFlex: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  flexGrowFull: {
    flexGrow: 1
  },
  avatar: {
    marginRight: "12px"
  }
});

export default StudentRow;
