import React from "react";

const Details: React.SFC<{ setIntroRef: (ref: HTMLDivElement) => void }> = ({
  setIntroRef
}) => (
  <div className="intro-details" ref={setIntroRef}>
	@ school is cloudbased management system designed for effective
	communication between teachers and students. It takes menial everyday task
	and automates them with modern machine learning techniques allowing for
	longer interactions between teachers and students.
  </div>
);

export default Details;
