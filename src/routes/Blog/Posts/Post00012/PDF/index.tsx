import React from "react";
import createSection from "../../HOC/createSection";

const PDF = () => {
  return (
    <div>
      As the majority of time this week was spent refactoring and styling the code,
	  little features were added/updated in the application. The PDF
	  route saw some slight improvement in the ability to calculate STD, mean and variance from
	  scores.
    </div>
  );
};

export default createSection("PDF", PDF);
