import React from "react";
import { Route } from "react-router-dom";

const ClassDetails = () => (
  <React.Fragment>
    <h1>Fuck me</h1>
    <Route
      path="/teacher/classroom/:id/students"
      exact={true}
      component={Test}
    />
    <Route
      path="/teacher/classroom/:id/statistics"
      exact={true}
      component={Test1}
    />
  </React.Fragment>
);

const Test = () => <h1>Test</h1>;

const Test1 = () => <h1>Test1</h1>;

export default ClassDetails;
