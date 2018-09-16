import React from "react";
import createSection from "../../HOC/createSection";

const Plan = () => {
  return (
    <div>
      Since we're fast tracking this week for a prototype, there are a lot of
      bugs in our app. The plan for the upcoming week will just be fixing bugs
      as well as reorganizing our codebase (5000 lines just in this week).
    </div>
  );
};

export default createSection("The plan for the upcoming week", Plan);
