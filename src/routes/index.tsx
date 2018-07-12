import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Authentication from "./Authentication";

import AppContext from "../contexts/AppContext";

export default class AppNavigator extends React.Component {
  public render() {
    return (
      <AppContext.Provider value={{}}>
        <BrowserRouter>
          <Route path="/authentication" component={Authentication} />
        </BrowserRouter>
      </AppContext.Provider>
    );
  }
}
