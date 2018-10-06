import React from "react";
import createSection from "../../HOC/createSection";

const ChangeMember = () => {
  return (
    <div>
      Stephan who was our former backend developer has decided to leave the
      group, mainly because there was not enough work for him.
    </div>
  );
};

export default createSection("Changes in team members", ChangeMember);
