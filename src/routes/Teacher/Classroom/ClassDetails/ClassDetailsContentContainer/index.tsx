import { css, StyleSheet } from "aphrodite";
import React from "react";
import ClassDetailsContentContent from "./ClassDetailsContentContent";
import ClassDetailsContentMenu from "./ClassDetailsContentMenu";

export default class ClassDetailsContentContainer extends React.Component<
  any,
  {}
> {
  public render() {
    return (
      <div className={css(styles.rowDirectionFlex)}>
        <ClassDetailsContentMenu activeItem={this.props.activeItem} />
        <ClassDetailsContentContent activeItem={this.props.activeItem} />
      </div>
    );
  }
}

const styles = StyleSheet.create({
  rowDirectionFlex: {
    display: "flex",
    flexDirection: "row"
  }
});
