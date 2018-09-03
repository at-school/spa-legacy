import React from "react";
import createSection from "../../HOC/createSection";

const Plan = () => {
  return (
    <div>
      There wasn't anything much in this week. For next week, hopefully we will
      get these tasks done:
      <ul>
        <li>Finish the transition before 31/8</li>
        <li>
          When we finish the transition, we could be able to try out some of the
          fundamental functionalities of the apps (We will push an update of
          what functionalities are available later on)
        </li>
      </ul>
    </div>
  );
};

export default createSection("The plan for the upcoming week", Plan);
