import { css, StyleSheet } from "aphrodite";
import React from "react";

const Divider = (props: { name: string }) => {
  return (
    <div className={css(styles.divider)}>
      <div>{props.name}</div>
      <div className={css(styles.dividerLine)}>
        <hr style={{ border: "0.5px solid #eaecef" }} />
      </div>
    </div>
  );
};

const styles = StyleSheet.create({
  divider: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    fontWeight: 600,
    fontSize: "12px",
    margin: "16px 0"
  },
  dividerLine: {
    flexGrow: 1,
    marginLeft: "6px"
  }
});

export default Divider;
