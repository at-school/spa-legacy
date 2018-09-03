import React from "react";
import createSubSection from "../../../HOC/createSubSection";

const Description = () => {
  return (
    <div>
      Our vision for atschool has always been to create a Learning Management
      System that would fundamentally change the way teachers and students
      communicate. We believe teachers should be free to spend the entirety of
      their time empowering students, not dealing with outdated school software.
      In effect, we decided it was time to create a system that is so intuitive
      and natural to use, that teachers wouldn't need time to learn it.
      Intelligent enough to mark the role, and automate the marking process.
      Compatible enough to be integrated with any school or government database.
      With @school we want this to be the new reality. Not the future of
      schooling but the present.
    </div>
  );
};

export default createSubSection("", Description);
