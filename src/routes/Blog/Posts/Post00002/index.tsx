import React from "react";
import createPost from "../createPost";
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

export default createPost(Content, "Week 1 Update", "17 August 2018", [
  "Charl Kruger",
  "Anh Pham"
]);
