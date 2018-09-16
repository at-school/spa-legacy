import React from "react";
import createSection from "../../HOC/createSection";

const Classroom = () => {
  return (
    <div>
      To be able to mark the role, we have to have students in class first. We
      have added the ability to add students into a class with no duplication.
      Also, the user can remove students from class as well.
    </div>
  );
};

export default createSection("Adding students to classroom", Classroom);
