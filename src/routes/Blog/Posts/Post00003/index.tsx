import React from "react";
import createPost from "../HOC/createPost";
import Plan from "./Plan";
import Problem from "./Problem";

const Content = () => {
  return (
    <div>
      <Problem />
      <Plan />
    </div>
  );
};

const postOverview =
  "We’re still in the transition phase of moving the app to GraphQl, which has proven to be a lot harder than initially anticipated.";

export default createPost(
  Content,
  "Week 2 Update",
  "24 August 2018",
  postOverview,
  [
    { name: "Charl Kruger", twitter: "https://twitter.com/Charl84583706" },
    { name: "Anh Pham", twitter: "https://twitter.com/anhphamduy" }
  ]
);
