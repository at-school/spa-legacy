import { Progress } from "antd";
import { css, StyleSheet } from "aphrodite";
import React from "react";

const DetailsUserInfoTabsAcademicClasses = () => {
  return (
    <div className={css(styles.mainContainer)}>
      <div className={css(styles.progressContainer)}>
        <div className={css(styles.progress)}>
          <div className={css(styles.progressText)}>Class name here</div>
          <Progress showInfo={false} percent={50} status="active" />
        </div>
        <div className={css(styles.progress)}>
          <div className={css(styles.progressText)}>Class name here</div>
          <Progress showInfo={false} percent={50} status="active" />
        </div>
      </div>
      <div className={css(styles.progressContainer)}>
        <div className={css(styles.progress)}>
          <div className={css(styles.progressText)}>Class Name here</div>
          <Progress showInfo={false} percent={50} status="active" />
        </div>

        <div className={css(styles.progress)}>
          <div className={css(styles.progressText)}>Class Name here</div>
          <Progress showInfo={false} percent={50} status="active" />
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
    marginBottom: 24
  },
  progressContainer: {
    flex: 0.5,
    padding: 32,
  },
  progress: {
    display: "flex",
    flexDirection: "row",
    whiteSpace: "nowrap",
    marginBottom: 16
  },
  progressText: {
    marginRight: 12,
    textAlign: "right"
  }
});

export default DetailsUserInfoTabsAcademicClasses;
