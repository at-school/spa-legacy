import { Icon, Spin } from "antd";
import { css, StyleSheet } from "aphrodite";
import React from "react";

const Loading = () => (
  <div
    className={css(styles.mainContainer)}
    style={{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center"
    }}
  >
    <span style={{ fontSize: "30px" }}>Loading</span>
    <br />
    <Spin
      indicator={<Icon type="loading" style={{ fontSize: 50 }} spin={true} />}
    />
  </div>
);

const styles = StyleSheet.create({
  mainContainer: {
    margin: "-48px -24px",
    height: "calc(100vh - 64px)"
  }
});

export default Loading;
