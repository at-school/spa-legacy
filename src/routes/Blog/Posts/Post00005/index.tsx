import React from "react";
import createPost from "../HOC/createPost";
import Plan from "./Plan";
import PyMail from "./PyMail";
import Server from "./Server";

const Content = () => {
  return (
	<div>
	  <Server />
	  <PyMail />
	  <Plan />
	</div>
  );
};

const postOverview = `We have decided to deplay the deployment of the Single Page Web Application.
					  We have also created a module in python 'PyMail' for managing email data.
					  Along with creating Chaches in graphQL to mimimise email loading time.  `;

export default createPost(
  Content,
  "Week 4 Update",
  "09 September 2018",
  postOverview,
  [
	{ name: "Charl Kruger", twitter: "https://twitter.com/Charl84583706" },
	{ name: "Anh Pham", twitter: "https://twitter.com/anhphamduy" }
  ]
);
