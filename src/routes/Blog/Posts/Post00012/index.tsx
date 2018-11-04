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

const postOverview = `Alot has been done this week, despite the
					  relatively short Blog, although much of it was
					  refactoring and stylling. No new feautres have
					  been implemented. `;

export default createPost(
  Content,
  "Week 11 Update",
  "21 October 2018",
  postOverview,
  [
    { name: "Charl Kruger", twitter: "https://twitter.com/Charl84583706" },
    { name: "Anh Pham", twitter: "https://twitter.com/anhphamduy" }
  ]
)
