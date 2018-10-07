import React from "react";
import createSection from "../../HOC/createSection";

const ProfilePage = () => {
  return (
    <div>
		<div>
			We have created a User Profile route where the user is able
			to view all account information. Current functionalities consist
			of creating and editing bio and skills.
		</div>
		<div className="image" style={{height: "450px"}}>
			<img src="/profileRoute.png" alt=""/>
		</div>
		<div>
			We are looking to add the ability to report incidents to the
			coordinators, councellors aswell as reporting users and
			a route to provide us feedback on the application. Also
			statistics about classes attended or missed. Finally a settings
			route where the user will be able to change various preferences
			about the app.
		</div>
	</div>
  );
};

export default createSection("Profile Page", ProfilePage);
