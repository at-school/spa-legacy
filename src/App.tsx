import "antd/dist/antd.css";
import * as React from "react";
import "./App.css";
import AppNavigator from "./routes";

class App extends React.Component {
  public render() {
    return <AppNavigator />;
  }
}

export default App;
