import React from "react";
import createSection from "../../HOC/createSection";

const Plan = () => {
  return (
    <div>
      In the coming week we are looking to improve the running time of accessing
      users email alongside being able to access a users threads and delete
      email. This will render all the core functionality complete, and we will
      be able to work on the UX and UI design before integrating a beta into the
      application. Despite this we are in the process of migrating and are on
      track to have a beta of the whole application ready for release by
      10/9/2018.
    </div>
  );
};

export default createSection("The plan for the upcoming week", Plan);
