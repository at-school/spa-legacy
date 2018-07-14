import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
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
          <React.Fragment>
            <Route exact={true} path="/" component={Landing} />
            <Route path="/teacher" component={Teacher} />
            <Route path="/authentication" component={Authentication} />
          </React.Fragment>
        </BrowserRouter>
      </AppContext.Provider>
    );
  }
}
