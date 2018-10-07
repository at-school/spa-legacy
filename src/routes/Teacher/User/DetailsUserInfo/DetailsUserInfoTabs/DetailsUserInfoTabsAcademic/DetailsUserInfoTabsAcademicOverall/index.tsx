import { Progress } from "antd";
import { css, StyleSheet } from "aphrodite";
import React from "react";

const DetailsUserInfoTabsAcademicOverall = () => {
  return (
    <div className={css(styles.container)}>
      <div
        className={css(
          styles.progressContainer,
          styles.progressContainerBorder
        )}
      >
        <Progress
          className={css(styles.progressFigure)}
          width={160}
          type="circle"
          percent={30}
        />
        <div>Grade Average</div>
      </div>
      <div
        className={css(
          styles.progressContainer,
          styles.progressContainerBorder
        )}
      >
        <Progress
          className={css(styles.progressFigure)}
          width={160}
          type="circle"
          percent={70}
          status="exception"
        />
        <div>Class Attendances</div>
      </div>
      <div className={css(styles.progressContainer)}>
        <Progress
          className={css(styles.progressFigure)}
          width={160}
          type="circle"
          percent={100}
        />
        <div>Assignment Completed</div>
      </div>
    </div>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    textAlign: "center"
  },
  progressContainer: {
    flex: 1 / 3,
    display: "flex",
    justifyContent: "center",
    width: 140,
    flexDirection: "column"
  },
  progressContainerBorder: {
    borderRight: "0.8px solid #e8e8e8"
  },
  progressFigure: {
    display: "block",
    margin: "auto",
    marginBottom: 12
  }
});

export default DetailsUserInfoTabsAcademicOverall;
