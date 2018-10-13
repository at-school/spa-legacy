import React from "react";
import createPost from "../HOC/createPost";
import Bugs from "./Bugs";
import Messages from "./Messages";
import Plan from "./Plan";

const Content = () => {
  return (
    <React.Fragment>
      <Messages />
      <Bugs />
      <Plan />
    </React.Fragment>
  );
};

const postOverview = `This week, we have had some dramatical improvements in messaging and emailing parts of the app. Read more on details.`;

export default createPost(
  Content,
  "Week 9 Update",
  "13 October 2018",
  postOverview,
  [
    { name: "Charl Kruger", twitter: "https://twitter.com/Charl84583706" },
    { name: "Anh Pham", twitter: "https://twitter.com/anhphamduy" }
  ]
);
