import React from "react";
import createSection from "../../HOC/createSection";

const Plan = () => {
  return (
    <div>
      In the upcoming week, we will mainly working on better documentation
	  of the exsting code of the application, as it is well in excess of
	  50k SLOC, and as such it is difficut to understand the code. We
	  will also refactor some older code to fit with our new convetions.
    </div>
  );
};

export default createSection("The plan for the upcoming week", Plan);
