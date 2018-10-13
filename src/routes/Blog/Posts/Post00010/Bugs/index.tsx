import React from "react";
import createSection from "../../HOC/createSection";

const Bugs = () => {
  return (
    <React.Fragment>
      As this week we've focused on the performance of the messaging, we have to
      change the structure of the database. Before, we often query
      classroom/message by the username. Now, we are querying them by their ID
      which is four times faster. This introduces the following bugs:
      <ul>
        <li>
          Adding students to classroom doesn't reflect updates on /rollcall
          anymore.
        </li>
      </ul>
    </React.Fragment>
  );
};

export default createSection("Bugs fixed", Bugs);
