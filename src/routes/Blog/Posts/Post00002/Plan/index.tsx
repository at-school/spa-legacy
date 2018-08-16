import React from "react";

export default class Plan extends React.Component {
  public render() {
    return (
      <div>
        <div className="title">The plan for the upcoming week </div>
        <div className="description">
          As we’ve mention, we are migrating our Rest APIs to GraphQL, so for
          the upcoming week, we still focus on doing that. One of the good news
          we have is we will be deploying the server by next week if everything
          goes on plan. So, users could test out some basic features of the app.
        </div>
      </div>
    );
  }
}
