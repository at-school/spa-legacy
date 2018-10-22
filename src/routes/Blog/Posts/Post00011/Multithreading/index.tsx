import React from "react";
import createSection from "../../HOC/createSection";

const Multithreading = () => {
  return (
    <div>
		 We integrated Graphql with webscokets and gevent to improve
		 the efficiency of the email application and allow for asyncrounous
		 loading.
    </div>
  );
};

export default createSection("Multithreading", Multithreading);
