import React from "react";

export default class Overview extends React.Component {
  public render() {
    return (
      <div>
        <div className="title">Overview</div>
        <div className="description">
          This week, we’ve started to move from using Rest APIs to using
          GraphQl. Even though it is time-consuming to move everything to
          GraphQl, but it is worth it for the development later on.
        </div>
      </div>
    );
  }
}
