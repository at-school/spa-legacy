import React from "react";
import createSection from "../../HOC/createSection";

const RollMarking = () => {
  return (
    <div>
      We have connected the front end and the back end of the computer vision.
      By using setInterval for every 0.5 second, the front end will send image
      to the server for processing. Why 0.5 second? Since the ML is
      computational expensive, we don't have a good enough computer so that the
      ML can process the image less than 0.4 secs. Then, we have to set it in
      0.5 sec. In addition, if we set in too lower, it would block the
      Javascript thread, which will make the app slower.
    </div>
  );
};

export default createSection("The integration of computer vision", RollMarking);
