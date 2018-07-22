import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import AppContext from "../contexts/AppContext";
import Authentication from "./Authentication";
import Landing from "./Landing";
import "./styles.css";
import Teacher from "./Teacher";

export default class AppNavigator extends React.Component {
  public state = {
    token: null,
    avatarUrl: null,
    accessLevel: null,
    fullname: null
  };

  public signinUser = (userInfo: any) => {
    this.setState({ ...userInfo });
  };

  public singoutUser = () => {
    this.setState({
      token: null,
      avatarUrl: null,
      accessLevel: null,
      fullname: null
    });
  };

  public render() {
    return (
      <AppContext.Provider
        value={{
          ...this.state,
          signinUser: this.signinUser,
          signoutUser: this.singoutUser
        }}
      >
        <BrowserRouter basename={process.env.PUBLIC_URL}>
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
