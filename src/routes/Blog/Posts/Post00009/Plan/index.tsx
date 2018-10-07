import React from "react";
import createSection from "../../HOC/createSection";

const Plan = () => {
  return (
    <div>
      Upcoming week, we will work further on the UI and UX of the email
	  app and integrate the OAuth2.0 to recieve the users token and hence
	  emails. We will create an assesment route for teacher teacher and a
	  statistics page that will compute all relative results and information that can be
	  viewed on site or downloaded into either a PDF or Excel format.
	  We are also working on the downloadable PDF reports, and hopefully
	  it will be available by the end of next week.
    </div>
  );
};

export default createSection("The plan for the upcoming week", Plan);
