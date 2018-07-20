import React from "react";
import Details from "./Details";
import Email from "./Email";
import RollCall from "./RollCall";

const Content: React.SFC<{ setIntroRef: (ref: HTMLDivElement) => void }> = ({
  setIntroRef
}) => (
  <div className="main-content">
    <Details setIntroRef={setIntroRef}/>
    <RollCall />
    <Email />
  </div>
);

export default Content;
