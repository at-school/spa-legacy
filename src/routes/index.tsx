import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import AppContext from "../contexts/AppContext";
import Authentication from "./Authentication";
import Landing from "./Landing";
import "./styles.css";
import Teacher from "./Teacher";

export default class AppNavigator extends React.Component {
  public render() {
    return (
      <AppContext.Provider value={{}}>
        <BrowserRouter>
          <Route render={App} />
        </BrowserRouter>
      </AppContext.Provider>
    );
  }
}

const App = ({ location }: any) => (
  <TransitionGroup>
    <CSSTransition key={location.key} classNames="fade" timeout={300}>
      <Switch location={location}>
        <Route exact={true} path="/" component={Landing} />
        <Route path="/teacher" component={Teacher} />
        <Route path="/authentication" component={Authentication} />
      </Switch>
    </CSSTransition>
  </TransitionGroup>
);
