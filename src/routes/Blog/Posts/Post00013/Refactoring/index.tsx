import React from "react";
import createSection from "../../HOC/createSection";

const Refactoring = () => {
  return (
    <div>
		 A large number of files in the server were in excess of 200 lines,
		 and as such it was often a problem when debugging or testing a
		 minor features. In response we have broken more of the server
		 code into smaller methods and classes that each have a single
		 responsibility. We are also looking to give some of the code
		 their own repositories and upload the modules to PyPi due to
		 it's multiple use application and ease of readability for the
		 current server repository.
    </div>
  );
};

export default createSection("Refactoring server code", Refactoring);
