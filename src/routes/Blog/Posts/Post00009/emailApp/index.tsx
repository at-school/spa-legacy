import React from "react";
import createSection from "../../HOC/createSection";

const EmailApp = () => {
  return (
	<div>
		<div>
			We have created an Email route in the main application, with
			a UI using mock data collected from the PyMail API.
		</div>
		<div className="image" style={{height: "450px"}}>
			<img src="/betamail.png" alt=""/>
		</div>
		<div>
			We still need to integrate Google OAuth2.0 via the web application
			in order to get the token, to acceess a user mailbox. Once this is achieved
			we can pass it the the server that will use it to run a rest api
			and save the data into our database.
		</div>
	</div>
  );
};

export default createSection("Email application", EmailApp);
