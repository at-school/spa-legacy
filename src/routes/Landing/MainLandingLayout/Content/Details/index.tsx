import React from "react";

const Details: React.SFC<{ setIntroRef: (ref: HTMLDivElement) => void }> = ({
  setIntroRef
}) => (
  <div className="intro-details" ref={setIntroRef}>
    @ school is cloudbased management system designed for effective
    communication between teachers and students. It takes menial everyday task
    and automates them allowing with modern machine learning techniques for
    longer interactions between teachers and students.
    {/* @ school uses modern machine learning 
                techniques and ux design to make communication effortless, 
                maxmising effieciency  */}
    {/* @ school is not like
                other electronic classroom nor the real classroom. */}
  </div>
);

export default Details;
