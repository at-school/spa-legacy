import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { setContext } from "apollo-link-context";
import { onError } from "apollo-link-error";
import { createHttpLink } from "apollo-link-http";
import React from "react";
import { ApolloProvider } from "react-apollo";
import Loadable from "react-loadable";
import { Route, withRouter } from "react-router-dom";
import io from "socket.io-client";
import { signout } from "../api/auth";
import AppContext from "../contexts/AppContext";
import "./styles.css";
import { getChatRoomQuery } from "./Teacher/Messages/queries/queries";

const isJSON = (sequence: string) => {
  try {
    JSON.parse(sequence);
    return true;
  } catch {
    return false;
  }
};

class AppNavigator extends React.Component<any> {
  public state = {
    token: null,
    avatarUrl: null,
    accessLevel: null,
    fullname: null,
    username: null,
    userId: null,
    loaded: false
  };

  public client: any;

  public userSocket: any;

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
  public errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    }

    if (networkError) {
      this.singoutUser();
    }
  });

  public httpLink = createHttpLink({
    uri: "http://127.0.0.1:5000/graphql"
  });

  public signinUser = (userInfo: any) => {
    this.setState({ ...userInfo });
    localStorage.atschool = JSON.stringify(userInfo);
    this.client.resetStore();
    this.userSocketConnect(userInfo);
  };

  public userSocketConnect = (userInfo: any) => {
    if (this.userSocket) {
      this.userSocket.close();
    }
    this.userSocket = io.connect(
      "http://127.0.0.1:5000/",
      {
        transportOptions: {
          polling: {
            extraHeaders: {
              Authorization: `Bearer ${userInfo.token}`
            }
          }
        }
      }
    );

    this.userSocket.on("connect_failed", () => {
      window.location.pathname = "/authentication/signin";
      console.log("User socket connection failed");
      this.userSocket.disconect();
    });

    this.userSocket.on("connect", () => {
      this.userSocket.emit("user", {
        activityType: "join",
        userIdentity: userInfo.userId
      });
      this.userSocket.on("userOnline", (data: { newUserId: string }) => {
        const data1 = this.client.readQuery({
          query: getChatRoomQuery,
          variables: { Id: userInfo.userId }
        });
        if (data1 && data1.user && data1.user.length === 1) {
          data1.user[0].chatrooms = data1.user[0].chatrooms.map(
            (chatroom: any) => {
              chatroom.users = chatroom.users.map((user: any) => {
                if (user.Id === data.newUserId) {
                  return { ...user, active: true };
                }
                return user;
              });
              return chatroom;
            }
          );
          this.client.writeQuery({
            query: getChatRoomQuery,
            variables: { Id: userInfo.userId },
            data: data1
          });
        }
      });
      this.userSocket.on("userOffline", (data: { leaveUserId: string }) => {
        const data1 = this.client.readQuery({
          query: getChatRoomQuery,
          variables: { Id: userInfo.userId }
        });
        if (data1 && data1.user && data1.user.length === 1) {
          data1.user[0].chatrooms = data1.user[0].chatrooms.map(
            (chatroom: any) => {
              chatroom.users = chatroom.users.map((user: any) => {
                if (user.Id === data.leaveUserId) {
                  return { ...user, active: false };
                }
                return user;
              });
              return chatroom;
            }
          );
          this.client.writeQuery({
            query: getChatRoomQuery,
            variables: { Id: userInfo.userId },
            data: data1
          });
        }
      });
      this.userSocket.on("deleteChatroom", (data: { chatroomId: string }) => {
        const data1 = this.client.readQuery({
          query: getChatRoomQuery,
          variables: { Id: userInfo.userId }
        });
        if (data1 && data1.user && data1.user.length === 1) {
          if (
            window.location.pathname.includes("/messages") &&
            window.location.pathname.includes(data.chatroomId)
          ) {
            // change the cache
            const { chatrooms } = data1.user[0];
            const currentRoomIndex = chatrooms.findIndex(
              (room: any) => room.Id === data.chatroomId
            );
            let roomToRedirect = "";
            if (currentRoomIndex === 0) {
              roomToRedirect = chatrooms[1].Id;
            } else {
              roomToRedirect = chatrooms[currentRoomIndex - 1].Id;
            }

            this.props.history.push("/teacher/messages/" + roomToRedirect);
          }
          data1.user[0].chatrooms = data1.user[0].chatrooms.filter(
            (chatroom: any) => chatroom.Id !== data.chatroomId
          );
          this.client.writeQuery({
            query: getChatRoomQuery,
            variables: { Id: userInfo.userId },
            data: data1
          });
        }
      });

      this.userSocket.on("createChatroom", (dataReceived: any) => {
        const { createChatroom } = dataReceived;
        const data = this.client.readQuery({
          query: getChatRoomQuery,
          variables: { Id: userInfo.userId }
        });
        if (
          data &&
          data.user &&
          data.user.length === 1 &&
          data.user[0].chatrooms
        ) {
          data.user[0].chatrooms.unshift(createChatroom);
          console.log("Here in write query");
          this.client.writeQuery({
            query: getChatRoomQuery,
            variables: { Id: userInfo.userId },
            data
          });
        }
      });
    });
  };

  public componentWillMount() {
    // check if the token exists in the local storage
    if (
      typeof Storage !== "undefined" &&
      localStorage.atschool &&
      isJSON(localStorage.atschool)
    ) {
      const userInfo = JSON.parse(localStorage.atschool);
      this.setState({ ...userInfo });
      this.userSocketConnect(userInfo);
    }
  }

  public async componentDidMount() {
    const link = ApolloLink.from([
      this.errorLink,
      this.authLink,
      this.httpLink
    ]);

    const cache = new InMemoryCache();
    const client = new ApolloClient({
      link,
      cache
    });

    try {
      // See above for additional options, including other storage providers.
      await persistCache({
        cache,
        storage: window.sessionStorage
      });
    } catch (error) {
      console.error("Error restoring Apollo cache", error);
    }
    this.client = client;
    this.setState({ loaded: true });
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
      localStorage.removeItem("atschool");
    }

    if (this.userSocket) {
      this.userSocket.close();
    }
  };

  public render() {
    if (!this.state.loaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <AppContext.Provider
          value={{
            ...(this.state as any),
            signinUser: this.signinUser,
            signoutUser: this.singoutUser,
            socket: this.userSocket
          }}
        >
          <ApolloProvider client={this.client}>
            <React.Fragment>
              <Route exact={true} path="/" component={Landing} />
              <Route path="/teacher" component={Teacher} />
              <Route path="/authentication" component={Authentication} />
              <Route path="/blog" component={Blog} />
              <Route path="/about" component={About} />
            </React.Fragment>
          </ApolloProvider>
        </AppContext.Provider>
      );
    }
  }
}

const Teacher = Loadable({
  loader: () => import("./Teacher"),
  loading: () => null
});

const Authentication = Loadable({
  loader: () => import("./Authentication"),
  loading: () => null
});

const Blog = Loadable({
  loader: () => import("./Blog"),
  loading: () => null
});

const Landing = Loadable({
  loader: () => import("./Landing"),
  loading: () => null
});

const About = Loadable({
  loader: () => import("./About"),
  loading: () => null
});

export default withRouter(AppNavigator);
