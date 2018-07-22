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
    <div id="background-wrap">
      <div className="x1">
        <div className="cloud" />
      </div>

      <div className="x2">
        <div className="cloud" />
      </div>

      <div className="x3">
        <div className="cloud" />
      </div>

      <div className="x4">
        <div className="cloud" />
      </div>

      <div className="x5">
        <div className="cloud" />
      </div>
    </div>
  </div>
);

export default Intro;
