import React from "react";
import { withApollo } from "react-apollo";
import { Route, withRouter } from "react-router-dom";
import io from "socket.io-client";
import ChatWindow from "../../components/ChatWindow";
import AppContext from "../../contexts/AppContext";
import TeacherMessageSocket from "../../contexts/Teacher/TeacherMessageSocket";
import createTeacherLayout from "../../layouts/AppLayout/TeacherLayout";
import ClassDetails from "./Classroom/ClassDetails";
import ClassroomScreenRoot from "./Classroom/RootScreen";
import Dashboard from "./Dashboard";
import Messages from "./Messages";
import { getChatRoomIdQuery } from "./Messages/queries/queries";
import RollCall from "./RollCall";

class Content extends React.Component<any, { selectedRoom: any }> {
  public messageSocket: any;

  public state = {
    selectedRoom: null
  };

  public componentDidMount() {
    this.messageSocket = io.connect(
      "http://127.0.0.1:5000/message",
      {
        transportOptions: {
          polling: {
            extraHeaders: {
              Authorization: `Bearer ${this.props.token}`
            }
          }
        }
      }
    );
    this.messageSocket.on("connect", () => {
      // subscribe listener to all chatrooms
      this.props.client
        .query({
          query: getChatRoomIdQuery,
          variables: { username: this.props.username }
        })
        .then((res: any) => {
          try {
            return res.data.user[0].chatrooms;
          } catch (err) {
            console.log(err);
            return [];
          }
        })
        .then((chatrooms: any) => {
          console.log(chatrooms);
          if (chatrooms) {
            for (const chatroom of chatrooms) {
              this.messageSocket.emit("sendMessage", {
                chatroomId: chatroom.Id
              });
            }
          }
        });
    });
  }

  public componentDidUpdate() {
    if (!this.props.token) {
      this.props.history.push("/authentication/signin");
    }
  }

  public render() {
    return (
      <TeacherMessageSocket.Provider value={{ socket: this.messageSocket }}>
        <Route exact={true} path={"/teacher/dashboard"} component={Dashboard} />
        <Route
          exact={true}
          path={"/teacher/classroom"}
          component={ClassroomScreenRoot}
        />
        <Route
          exact={true}
          path="/teacher/classroom/:id/:item"
          component={ClassDetails}
        />
        <Route exact={true} path={"/teacher/rollcall"} component={RollCall} />
        <Route exact={true} path={"/teacher/messages"} component={Messages} />
        {!this.props.history.location.pathname.includes("messages") && (
          <ChatWindow />
        )}
      </TeacherMessageSocket.Provider>
    );
  }
}

const ContentWithApollo = withApollo(Content);

const ContentWithContext = ({ history }: any) => (
  <AppContext.Consumer>
    {value => (
      <ContentWithApollo
        username={value.username}
        token={value.token}
        history={history}
      />
    )}
  </AppContext.Consumer>
);

const ContentWithRouter = withRouter(ContentWithContext);

const Teacher = createTeacherLayout(ContentWithRouter as any);

export default Teacher;
