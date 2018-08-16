import React from "react";

export default class Plan extends React.Component {
  public render() {
    return (
      <div>
        <div className="title">Why we suddenly want to deploy the server?</div>
        <div className="description">
          Since we now start using GraphQl, so we think it is a good idea to put
          our current database to the cloud so that later, we don’t have to
          worry about deployment anymore. Plus, at this time, we are working on
          the database and queries, taking advantage of that, it is perhaps the
          most ideal time to do the deployment.
        </div>
      </div>
    );
  }
}
