import React from "react";
import createSection from "../../HOC/createSection";

const Refactoring = () => {
  return (
    <div>
		 Throughout the development proccess of the application we have
		 changed many of the technologies, as such much of our older code
		 is incosistent with the newer code. All styling was changes to
		 Aphrodite from css, all server routes altered to use blueprint.
		 The server was altered to meet pythons PEP8 style guide, and
		 comments were added in all necessary place. Debugging lines
		 were also taken out of the tscofig.json to ensure that the code
		 meets all the tslint requirements.
    </div>
  );
};

export default createSection("Refactoring & Styling", Refactoring);
