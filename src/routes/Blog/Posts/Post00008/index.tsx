import React from "react";
import createPost from "../HOC/createPost";
import ChangeMember from "./ChangeMember";
import UserSession from "./UserSession";

const Content = () => {
  return (
    <React.Fragment>
      <ChangeMember />
      <UserSession />
    </React.Fragment>
  );
};

const postOverview = `This week, we have a major change in team member. Since Charl broke his arms and Bill were away for the whole week (he gave a talk at Web Directions WDYK), little work had been done.`;

export default createPost(
  Content,
  "Week 7 Update",
  "29 September 2018",
  postOverview,
  [
    { name: "Charl Kruger", twitter: "https://twitter.com/Charl84583706" },
    { name: "Anh Pham", twitter: "https://twitter.com/anhphamduy" }
  ]
);
