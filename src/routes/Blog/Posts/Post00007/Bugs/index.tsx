import React from "react";
import createSection from "../../HOC/createSection";

const Bugs = () => {
  return (
    <ul>
      <li>
        Getting students time when going into the /rollcall has decreased
        dramatically. The reason is mainly because last time, we fetched the
        student list twice.
      </li>
      <li>
        Now if you open a new route instantly after signing in, there will be no
        error as before, the app needed a bit of time for fetching schedule.
      </li>
      <li>
        When adding students and adding new classes, the /rollcall is also
        updated.
      </li>
    </ul>
  );
};

export default createSection("Bugs fixed", Bugs);
