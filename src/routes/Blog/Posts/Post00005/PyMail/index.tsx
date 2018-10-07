import React from "react";
import createSection from "../../HOC/createSection";

const PyMail = () => {
  return (
	<div>
		<div>
			In order to integrate email functionality into our web application we have
			taken advantage of the Gmail Api and in so created a module for easy use
			of the api, <a href="https://github.com/Charlkie/PyMail">PyMail</a>.
			The PyMail module (available through PyPi) condenses the Gmail api into a few
			single line commands documented <a href="https://github.com/Charlkie/PyMail">here</a>.
		</div>
		<br/>
		<div>
			With the module we have been able to create a small demo that can display the main headers: From, Subject and Time.
			We are also able to get the html or plain text format of the message and display it.
		</div>
		<div className="image" style={{height: "360px"}}>
			<img src="/mail-api.gif" alt=""/>
	  	</div>
	 	<div>
			Although this module has not proven an effective solution to real time email
			loading due to the slow running time. Running time of specs are available here.
			For 50 emails the module can take up to  <b>37</b> seconds to simply get the data from
			google servers. Due to this we have had to create 2 servers to manage mail data.
			We have a server than in conjunction with websockets is uploading information to
			a graphQL database. Our front end uses a separate server to then receive
			information from this database.
		 </div>
	</div>
  );
};

export default createSection("PyMail", PyMail);
