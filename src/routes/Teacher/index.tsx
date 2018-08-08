import React from "react";
import { Route, withRouter } from "react-router-dom";
import io from "socket.io-client";
import { getNewestMessage } from "../../api/message";
import ChatWindow from "../../components/ChatWindow";
import AppContext from "../../contexts/AppContext";
import createTeacherLayout from "../../layouts/AppLayout/TeacherLayout";
import Classroom from "./Classroom";
import Dashboard from "./Dashboard";
import Messages from "./Messages";
import RollCall from "./RollCall";

class Content extends React.Component<any, { selectedRoom: any }> {
  public socket: any;

  public state = {
    selectedRoom: null
  };

  public componentDidUpdate() {
    if (!this.props.token) {
      this.props.history.push("/authentication/signin");
    }
  }

  public componentDidMount() {
    this.socket = io.connect("http://127.0.0.1:5000/message");

    this.socket.on("newMessage", () => {
      if (this.props.history.location.pathname !== "/teacher/messages") {
        console.log("Recevied messages");
      }
    });

    this.updateNewestMessage().then(() => {
      const { selectedRoom } = this.state as any;
      if (selectedRoom) {
        this.socket.emit("join", {
          room: selectedRoom.id,
          token: this.props.token
        });
      }
    });
  }

  // add the newest message to the message list
  public updateNewestMessage = async () => {
    // do something message related here
    try {
      const messages = await getNewestMessage(this.props.token);
      this.setState({
        selectedRoom: messages.results.length === 0 ? null : messages.results[0]
      });
      return messages.results;
    } catch (err) {
      console.log(err);
    }
  };

  public render() {
    return (
      <React.Fragment>
        <Route exact={true} path={"/teacher/dashboard"} component={Dashboard} />
        <Route exact={true} path={"/teacher/classroom"} component={Classroom} />
        <Route exact={true} path={"/teacher/rollcall"} component={RollCall} />
        <Route exact={true} path={"/teacher/messages"} component={Messages} />
        <ChatWindow />
      </React.Fragment>
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
