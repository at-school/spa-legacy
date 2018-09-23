import React from "react";
import createSection from "../../HOC/createSection";

const Plan = () => {
  return (
    <div>
      Upcoming week, we will add more notification types. We will complete the
      chat functionality. We are also working on the downloadable PDF reports,
      and hopefully it will be available by the end of next week.
    </div>
  );
};

export default createSection("The plan for the upcoming week", Plan);
