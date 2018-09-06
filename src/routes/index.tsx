import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { setContext } from "apollo-link-context";
import { createHttpLink } from "apollo-link-http";
import React from "react";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter, Route } from "react-router-dom";
import { signout } from "../api/auth";
import AppContext from "../contexts/AppContext";
import About from "./About";
import Authentication from "./Authentication";
import Blog from "./Blog/index";
import Landing from "./Landing";
import "./styles.css";
import Teacher from "./Teacher";

const httpLink = createHttpLink({
  uri: "http://127.0.0.1:5000/graphql"
});

export default class AppNavigator extends React.Component {
  public state = {
    token: null,
    avatarUrl: null,
    accessLevel: null,
    fullname: null,
    username: null,
    userId: null
  };

  public client: any;

  public authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const { token } = this.state;
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ""
      }
    };
  });

  public signinUser = (userInfo: any) => {
    this.setState({ ...userInfo });
  };

  public componentWillMount() {
    this.client = new ApolloClient({
      link: this.authLink.concat(httpLink),
      cache: new InMemoryCache()
    });
  }

  public singoutUser = () => {
    if (this.state.token) {
      signout(this.state.token).then(() =>
        this.setState({
          token: null,
          avatarUrl: null,
          accessLevel: null,
          fullname: null
        })
      );
    }
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
        <ApolloProvider client={this.client}>
          <BrowserRouter basename={process.env.PUBLIC_URL}>
            <React.Fragment>
              <Route exact={true} path="/" component={Landing} />
              <Route path="/teacher" component={Teacher} />
              <Route path="/authentication" component={Authentication} />
              <Route path="/blog" component={Blog} />
              <Route path="/about" component={About} />
            </React.Fragment>
          </BrowserRouter>
        </ApolloProvider>
      </AppContext.Provider>
    );
  }
}
