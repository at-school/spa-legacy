import React from "react";
import createPost from "../createPost";

const Content = () => <div className="post-00001" />;

export default createPost(
  Content,
  "Project Planning",
  "This is about the project planning",
  "24 February 2018",
  ["Charl Kruger", "Anh PHam"]
);
