import React from "react";
import createSection from "../../HOC/createSection";

const Server = () => {
  return (
	<div>
	  We are currently able to deploy the server although need a SSL Certificate to
	  route the server through https as a pose to a http. It has proven quite
	  difficult to integrate the SSL Certificate with our Docker Container.
	  Currently none of our team members have much experience with Docker therefore
	  we have decided to prioritise our time on other features. We could use an
	  insecure protocol although this could ruin the integrity of the web application
	  so therefore have chosen simply delay the deploying of our SPA.
	</div>
  );
};

export default createSection("Deploying The Sever", Server);
