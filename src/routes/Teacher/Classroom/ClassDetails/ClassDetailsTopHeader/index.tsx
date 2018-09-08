import { css, StyleSheet } from "aphrodite";
import React from "react";

const ClassDetailsTopHeader = ({ avatar, description, name }: any) => {
  return (
    <div>
      <div className={css(styles.rowDirectionFlex)}>
        <div className={css(styles.smallSpacing)}>
          <img className={css(styles.imageRound)} src={avatar} />
        </div>
        <div>
          <h4>{name}</h4>
          <div>{description}</div>
        </div>
      </div>
      <div className={css(styles.containerSpace, styles.rowDirectionFlex)}>
        <div>Line 4</div>
        <div>Next session: Tomorrow something</div>
        <div>Teachers: something here</div>
      </div>
    </div>
  );
};

const styles = StyleSheet.create({
  rowDirectionFlex: {
    display: "flex",
    flexDirection: "row"
  },
  imageRound: {
    borderRadius: "50%",
    width: "64px",
    height: "64px"
  },
  smallSpacing: {
    marginRight: "16px"
  },
  containerSpace: {
    marginTop: "20px",
    paddingTop: "12px",
    paddingBottom: "12px",
    marginBottom: "20px",
    borderBottom: "2px solid #f1f1f1",
    borderTop: "2px solid #f1f1f1"
  }
});

export default ClassDetailsTopHeader;
