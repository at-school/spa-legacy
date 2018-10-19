import { css, StyleSheet } from "aphrodite";
import React from "react";
import { withRouter } from "react-router-dom";
import ClassDetailsContentContainer from "./ClassDetailsContentContainer";
import ClassDetailsTopHeader from "./ClassDetailsTopHeader";

const ClassDetails = (props: any) => {
  const classDetails = props.location.state;
  let activeItem = 0;
  const currentRoute = props.match.params.item;
  const itemList = ["Students", "Reports", "Assignment", "Statistics"];
  switch (currentRoute) {
    case "students":
      activeItem = itemList.indexOf("Students");
      break;
    case "reports":
      activeItem = itemList.indexOf("Reports");
      break;
    case "assignment":
      activeItem = itemList.indexOf("Assignment");
      break;
    case "statistics":
      activeItem = itemList.indexOf("Statistics");
      break;
  }
  return (
    <div className={css(styles.mainStyle)}>
      <ClassDetailsTopHeader
        avatar={classDetails.avatar}
        name={classDetails.name}
        description={classDetails.description}
      />
      <ClassDetailsContentContainer activeItem={activeItem} />
    </div>
  );
};

const styles = StyleSheet.create({
  mainStyle: {
    height: "100%",
    backgroundColor: "rgb(255, 255, 255)",
    padding: "12px",
    display: "flex",
    flexDirection: "column"
  }
});

export default withRouter(ClassDetails);
