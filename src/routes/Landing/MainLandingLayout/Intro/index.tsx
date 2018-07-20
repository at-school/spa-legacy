import { Button } from "antd";
import React from "react";

const Intro: React.SFC<{ scrollIntoIntro: () => void }> = ({
  scrollIntoIntro
}) => (
  <div id="clouds">
    <div className="main-intro">
      <div className="main-intro-title">The school that is on the cloud</div>
      <Button size="large" onClick={scrollIntoIntro}>
        Discover more
      </Button>
    </div>
    {Array.from(Array(198).keys()).map(index => (
      <div key={index} className={`cloud c${index + 1}`} />
    ))}
  </div>
);

export default Intro;
