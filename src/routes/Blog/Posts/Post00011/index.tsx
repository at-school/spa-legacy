import React from "react";
import createPost from "../HOC/createPost";
import Multithreading from "./Multithreading";
import PDF from "./PDF";
import Plan from "./Plan";

const Content = () => {
  return (
    <React.Fragment>
      <Multithreading />
	  <PDF />
      <Plan />
    </React.Fragment>
  );
};

const postOverview = `This week, we have had some dramatical improvements
					on the server side with minor improvements to the email
					applications as well as the integration of a new assesment routes.`;

export default createPost(
  Content,
  "Week 10 Update",
  "21 October 2018",
  postOverview,
  [
    { name: "Charl Kruger", twitter: "https://twitter.com/Charl84583706" },
    { name: "Anh Pham", twitter: "https://twitter.com/anhphamduy" }
  ]
)
