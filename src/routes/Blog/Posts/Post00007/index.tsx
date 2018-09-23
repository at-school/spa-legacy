import React from "react";
import createPost from "../HOC/createPost";
import ActivitiesMarking from "./ActivitiesMarking";
import Bugs from "./Bugs";
import Plan from "./Plan";
import TimeSeries from "./TimeSeries";

const Content = () => {
  return (
    <React.Fragment>
      <Bugs />
      <TimeSeries />
      <ActivitiesMarking />
      <Plan />
    </React.Fragment>
  );
};

const postOverview = `This week we have fixed lots of lots of bugs in our web app. We also added the activity notifcation when user got in class.`;

export default createPost(
  Content,
  "Week 6 Update",
  "22 September 2018",
  postOverview,
  [
    { name: "Charl Kruger", twitter: "https://twitter.com/Charl84583706" },
    { name: "Anh Pham", twitter: "https://twitter.com/anhphamduy" }
  ]
);
