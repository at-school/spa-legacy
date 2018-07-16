import React from "react";
import { Route, Switch } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Register from "./Register";
import SignIn from "./SignIn";

const Authentication = () => (
  <React.Fragment>
    <Route render={AuthenticationRoutes} />
  </React.Fragment>
);

const AuthenticationRoutes = ({ location }: any) => (
  <TransitionGroup>
    <CSSTransition key={location.key} classNames="fade" timeout={300}>
      <Switch location={location}>
        <Route
          exact={true}
          path={"/authentication/signin"}
          component={SignIn}
        />
        <Route
          exact={true}
          path={"/authentication/register"}
          component={Register}
        />
      </Switch>
    </CSSTransition>
  </TransitionGroup>
);

export default Authentication;
