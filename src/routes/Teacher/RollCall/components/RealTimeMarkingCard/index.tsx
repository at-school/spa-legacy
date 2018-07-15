import { Card } from "antd";
import React from "react";
// import Camera from "./Camera";
import Spinner from "./Spinner";
import StatusText from "./StatusText";

export default class RealTimeMarkingCard extends React.Component {
  public render() {
    return (
      <Card
        title="Real-time marking"
        className="real-time-marking-card"
        style={{ width: "100%" }}
      >
        {/* <Camera /> */}
        <Spinner />
        <StatusText />
      </Card>
    );
  }
}
