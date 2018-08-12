import React from "react";
import createPost from "../createPost";
import Issues from "./Issues";
import PartiesInvolved from "./PartiesInvolved";
import ProjectOutcome from "./ProjectOutcome";
import Risks from './Risks/index';
import "./styles/styles.css";
import SuccessProbability from "./SuccessProbability";

const Content = () => (
  <div className="post-00001">
    <ProjectOutcome />
    <PartiesInvolved />
    <Issues />
    <SuccessProbability />
	<Risks />
  </div>
);

export default createPost(
  Content,
  "Atschool what it is, and why we built it.",
  "12 August 2018",
  ["Charl Kruger", "Anh Pham"]
);
