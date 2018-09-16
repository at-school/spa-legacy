import React from "react";
import createPost from "../HOC/createPost";
import Classroom from "./Classroom";
import Plan from "./Plan";
import RollMarking from "./RollMarking";

const Content = () => {
  return (
    <div>
      <Classroom />
      <RollMarking />
      <Plan />
    </div>
  );
};

const postOverview = `This week we have mostly focused on the integration of the 
    automatic marking system between the front end and back end. Read more on details.`;

export default createPost(
  Content,
  "Week 5 Update",
  "16 September 2018",
  postOverview,
  [
    { name: "Charl Kruger", twitter: "https://twitter.com/Charl84583706" },
    { name: "Anh Pham", twitter: "https://twitter.com/anhphamduy" }
  ]
);
