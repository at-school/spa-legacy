import { css, StyleSheet } from "aphrodite";
import React from "react";

const ClassroomInfo = ({ name, description }: IClassroomInfoProps) => {
  return (
    <div className={css(styles.container)}>
      <div className={css(styles.name)}>{name}</div>
      <div className={css(styles.description)}>{description}</div>
    </div>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: "12px 0"
  },
  name: {
    fontSize: "18px",
    fontWeight: 800
  },
  description: {
    fontSize: "14px",
    fontWeight: "lighter"
  }
});

export default ClassroomInfo;

interface IClassroomInfoProps {
  name: string;
  description: string;
}
