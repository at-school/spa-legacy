import React from "react";
import createPost from "../HOC/createPost";
import Deployment from "./Deployment";
import Overview from "./Overview";
import Plan from "./Plan";
import Problem from "./Problem";
import Solution from "./Solution";
import "./styles/styles.css";

const Content = () => (
  <div className="post-00002">
    <Overview />
    <Problem />
    <Solution />
    <Plan />
    <Deployment />
  </div>
);

const postOverview =
  "This week, we have had major changes in our app: moving from using RestAPIs to using GraphQl. Read more on why we decided to have that major changes.";

export default createPost(
  Content,
  "Week 1 Update",
  "17 August 2018",
  postOverview,
  [{ name: "Anh Pham", twitter: "https://twitter.com/anhphamduy" }]
);
