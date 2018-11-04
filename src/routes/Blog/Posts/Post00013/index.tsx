import React from "react";
import createPost from "../HOC/createPost";
import PDF from "./PDF";
import Plan from "./Plan";
import Refactoring from "./Refactoring";

const Content = () => {
  return (
    <React.Fragment>
      <Refactoring />
	  <PDF />
      <Plan />
    </React.Fragment>
  );
};

const postOverview = `This week once again has been dedicated to better
						documentation of code, all README.md's have been
						updated and server code has been fully refactored.`;

export default createPost(
  Content,
  "Week 12 Update",
  "4 November 2018",
  postOverview,
  [
    { name: "Charl Kruger", twitter: "https://twitter.com/Charl84583706" },
    { name: "Anh Pham", twitter: "https://twitter.com/anhphamduy" }
  ]
)
