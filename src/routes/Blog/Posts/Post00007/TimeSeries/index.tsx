import React from "react";
import createSection from "../../HOC/createSection";

const TimeSeries = () => {
  return (
    <div>
      Last week, when marking a student, that student was not being added to the
      database, or in other words, we had no database capability for saving a
      specific schedule of a class. We spent quite a large amount of time this
      week just for designing a time series database for schedule. Now, when
      student getting in, he/she will get added to the database, so when the
      user exits, everything will be recovered when the user is back on again.
    </div>
  );
};

export default createSection("Time Series Schedule", TimeSeries);
