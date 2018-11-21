import React from "react";
import createPost from "../HOC/createPost";
import Issues from "./Issues";
import PartiesInvolved from "./PartiesInvolved";
import ProjectOutcome from "./ProjectOutcome";
import Risks from "./Risks/index";
import "./styles/styles.css";
import SuccessProbability from "./SuccessProbability";

const Content = () => (
  <div className="post-00001">
    <ProjectOutcome />
    <PartiesInvolved />
    <Issues />
    <SuccessProbability />
    <Risks />
	<div>
		<div>Timeline:</div>
		<img width="50%" src="/timeline.png" />
		Up-to-date timeline can be seeen in here: https://atschool.live/about/company
	</div>
  </div>
);

const postOverview = `What is @ School? How does it help teachers empower their students? When is it available? This post will answer all of your questions related to the project.`;

export default createPost(
  Content,
  "Project Planning",
  "12 August 2018",
  postOverview,
  [
    { name: "Charl Kruger", twitter: "https://twitter.com/Charl84583706" },
    { name: "Anh Pham", twitter: "https://twitter.com/anhphamduy" }
  ]
);
