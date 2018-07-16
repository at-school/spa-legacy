import React from "react";

const Spinner = () => (
  <div className="real-time-marking-container">
    <div className="camera-loading">
      <div className="camera-loading-space flip">&#8756;</div>
      <div className="circle ani-spin" />
    </div>
  </div>
);

export default Spinner;
