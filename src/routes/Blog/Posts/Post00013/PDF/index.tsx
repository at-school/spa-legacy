import React from "react";
import createSection from "../../HOC/createSection";

const PDF = () => {
  return (
    <div>
      We have also updated all README.md's with the current usage of each
	  aspect of the application. They contain all appropriate documentation,
	  steps in order to run and test the application, future plans, ect.
    </div>
  );
};

export default createSection("Documentation", PDF);
