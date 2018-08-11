import React from "react";
import createPost from "../createPost";
import Issues from "./Issues";
import PartiesInvolved from "./PartiesInvolved";
import ProjectOutcome from "./ProjectOutcome";
import "./styles/styles.css";
import SuccessProbability from "./SuccessProbability";

const Content = () => (
  <div className="post-00001">
    <ProjectOutcome />
    <PartiesInvolved />
    <Issues />
    <SuccessProbability />
  </div>
);

export default createPost(
  Content,
  "@ School: Project Planning",
  "This is about the project planning",
  "24 February 2018",
  ["Charl Kruger", "Anh PHam"]
);
