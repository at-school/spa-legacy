import React from "react";
import createSection from "../../HOC/createSection";

const ActivitiesMarking = () => {
  return (
    <div>
      Once the student got in, the notification in /rollcall will pop up. The
      timestamp is also updated dynamically (it is updated every single second).
    </div>
  );
};

export default createSection("Marking Activities", ActivitiesMarking);
