import React from "react";
import { Route } from "react-router-dom";
import Register from "./Register";
import SignIn from "./SignIn";


const Authentication = () => (
  <React.Fragment>
    <Route exact={true} path={"/authentication/signin"} component={SignIn} />
    <Route exact={true} path={"/authentication/register"} component={Register} />
  </React.Fragment>
);

export default Authentication;
