import React from "react";
import createSection from "../../HOC/createSection";

const PDF = () => {
  return (
    <div>
      Inside the email route we have added the capability to download a
	  PDF of all the statistics related to an assesment piece. In oder
	  to achieve this we have incorporated pdfkit module into our server.
	  Our app uses the Aphrodite framework for css in javascript which
	  is not supported by Pdfkit, as such we had to create a recursive
	  function in our python backend in order to convert the json formatted
	  Aphrodite css object to css format. Furtheremore, pdfkit uses wkhtmltopdf
	  which doesnt support the latest versions of css. This was an issue
	  as be were unable to use out contemporary css techniques.
    </div>
  );
};

export default createSection("Added PDF download option", PDF);
