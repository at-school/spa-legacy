import React from "react";
import { Route } from "react-router-dom";
import Dashboard from "./Dashboard";

const Teacher = () => (
  <React.Fragment>
    <Route exact={true} path={"/teacher/dashboard"} component={Dashboard} />
  </React.Fragment>
);

export default Teacher;
