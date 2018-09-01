import React from "react";
import { Route, withRouter } from "react-router-dom";
import ChatWindow from "../../components/ChatWindow";
import AppContext from "../../contexts/AppContext";
import TeacherMessageSocket from "../../contexts/Teacher/TeacherMessageSocket";
import createTeacherLayout from "../../layouts/AppLayout/TeacherLayout";
import Classroom from "./Classroom";
import Dashboard from "./Dashboard";
import Messages from "./Messages";
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
  }

  public componentDidUpdate() {
    if (!this.props.token) {
      this.props.history.push("/authentication/signin");
    }
  }

  public shouldComponentUpdate() {
    console.log(this.props);
    return true;
  }

  public render() {
    return (
      <TeacherMessageSocket.Provider value={{ socket: this.messageSocket }}>
        <Route exact={true} path={"/teacher/dashboard"} component={Dashboard} />
        <Route exact={true} path={"/teacher/classroom"} component={Classroom} />
        <Route exact={true} path={"/teacher/rollcall"} component={RollCall} />
        <Route exact={true} path={"/teacher/messages"} component={Messages} />
        {!this.props.history.location.pathname.includes("messages") && (
          <ChatWindow />
        )}
      </TeacherMessageSocket.Provider>
    );
  }
}

const ContentWithContext = ({ history }: any) => (
  <AppContext.Consumer>
    {value => <Content token={value.token} history={history} />}
  </AppContext.Consumer>
);
const ContentWithRouter = withRouter(ContentWithContext);

const Teacher = createTeacherLayout(ContentWithRouter as any);

export default Teacher;
