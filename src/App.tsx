import "antd/dist/antd.css";
import * as React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import AppNavigator from "./routes";

class App extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <Route path="/" component={AppNavigator} />
      </BrowserRouter>
    );
  }
}

export default App;
