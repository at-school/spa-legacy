import React from "react";

const Spinner = (props: any) => (
  <div className="real-time-marking-container">
    <div className="camera-loading">
      <div
        className={"camera-loading-space flip" + (props.spin ? "" : "paused")}
        id="camera-loading-space-flip"
      >
        &#8756;
      </div>
      <div
        className={"circle ani-spin" + (props.spin ? "" : "paused")}
        id="circle-ani-spin"
      />
    </div>
  </div>
);

export default Spinner;
