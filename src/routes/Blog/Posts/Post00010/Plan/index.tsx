import React from "react";
import createSection from "../../HOC/createSection";

const Plan = () => {
  return (
    <div>
      Upcoming week, we will fix those bugs we already have as well as improving
      the performance of the app, and try to finish the PDF by YICTEE.
    </div>
  );
};

export default createSection("The plan for the upcoming week", Plan);
