import React from "react";
import createPost from "../HOC/createPost";
import Bugs from "./Bugs"
import EmailApp from "./emailApp";
import Plan from "./Plan"
import ProfilePage from "./profilePage";

const Content = () => {
  return (
    <React.Fragment>
      <Bugs />
      <ProfilePage />
      <EmailApp />
	  <Plan />
    </React.Fragment>
  );
};

const postOverview = `This week, we changed the location of images to
						speed up the computer vision, created a profile
						page and finally created an email route and UI
						from mock data.`;

export default createPost(
  Content,
  "Week 8 Update",
  "7 October 2018",
  postOverview,
  [
    { name: "Charl Kruger", twitter: "https://twitter.com/Charl84583706" },
    { name: "Anh Pham", twitter: "https://twitter.com/anhphamduy" }
  ]
);
