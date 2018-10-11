import moment from "moment";
import React from "react";
import { compose, graphql, withApollo } from "react-apollo";
import { Route, withRouter } from "react-router-dom";
import io from "socket.io-client";
import ChatWindow from "../../components/ChatWindow";
import AppContext from "../../contexts/AppContext";
import ClassroomContext from "../../contexts/Teacher/ClassroomContext";
import TeacherMessageSocket from "../../contexts/Teacher/TeacherMessageSocket";
import createTeacherLayout from "../../layouts/AppLayout/TeacherLayout";
import ClassDetails from "./Classroom/ClassDetails";
import ClassroomScreenRoot from "./Classroom/RootScreen";
import Dashboard from "./Dashboard";
import Email from "./Email";
import Messages from "./Messages";
import MessageRedirect from "./Messages/MessageRedirect";
import { getChatRoomQuery } from "./Messages/queries/queries";
import {
  getAllScheduleQuery,
  getClassQueryByLine,
  getScheduleDetailsQuery,
  getScheduleQuery
} from "./queries";
import RollCall from "./RollCall";
import User from "./User";

class Content extends React.Component<any, any> {
  public messageSocket: any;

  public state = {
    selectedRoomId: "",
    classroomId: "",
    classroomName: "",
    classroomDescription: "string",
    classroomAvatar: "",
    classroomLine: "",
    classroomStudents: [],
    currentMoment: {
      day: moment(),
      line: undefined
    },
    schedule: [],
    currentClassId: "",
    numAddDays: 0,
    loading: false
  };

  public componentWillMount() {
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

  public componentDidUpdate(prevProps: any) {
    if (!this.props.token) {
      this.props.history.push("/authentication/signin");
    }
    if (
      prevProps.getChatroomQuery.loading &&
      !this.props.getChatroomQuery.loading
    ) {
      const { user } = this.props.getChatroomQuery;
      if (
        user &&
        user.length > 0 &&
        user[0].chatrooms &&
        user[0].chatrooms.length > 0
      ) {
        this.changeSelectedRoomId(user[0].chatrooms[0].Id)();
        for (const chatroom of user[0].chatrooms) {
          this.messageSocket.emit("sendMessage", {
            chatroomId: chatroom.Id
          });
        }
      }
    }
  }

  public changeSelectedRoomId = (selectedRoomId: string) => () => {
    this.props.history.push("/teacher/messages/" + selectedRoomId);
  };

  public renderMessages = () => (
    <Messages
      chatrooms={(() => {
        const { user } = this.props.getChatroomQuery;
        if (user && user.length > 0 && user[0].chatrooms) {
          return user[0].chatrooms;
        }
        return [];
      })()}
    />
  );

  public render() {
    let studentList = [];
    let scheduleId = "";
    let classId = "";
    if (this.props.getScheduleDetailsQuery) {
      const {
        getScheduleDetailsQuery: { scheduleDetails }
      } = this.props;
      if (scheduleDetails && scheduleDetails.students) {
        studentList = scheduleDetails.students;
        scheduleId = scheduleDetails.Id;
      }
    }
    if (
      this.props.getClassQuery &&
      this.props.getClassQuery.classroom &&
      this.props.getClassQuery.classroom.length === 1
    ) {
      classId = this.props.getClassQuery.classroom[0].Id;
    }

    let chatrooms = [];
    const { user } = this.props.getChatroomQuery;
    if (user && user.length > 0 && user[0].chatrooms) {
      chatrooms = user[0].chatrooms;
    }

    let line = "";
    if (
      !this.props.getScheduleQuery.loading &&
      this.props.getScheduleQuery.latestLine
    ) {
      line = this.props.getScheduleQuery.latestLine.line;
    }

    return (
      <TeacherMessageSocket.Provider
        value={{
          socket: this.messageSocket,
          chatrooms,
          changeSelectedRoomId: this.changeSelectedRoomId
        }}
      >
        <ClassroomContext.Provider
          value={{
            Id: this.state.classroomId,
            scheduleId,
            avatar: this.state.classroomAvatar,
            name: this.state.classroomName,
            description: this.state.classroomDescription,
            line,
            students: studentList,
            schedule: this.props.getAllScheduleQuery.loading
              ? []
              : this.props.getAllScheduleQuery.schedule,
            classId,
            getClassInfo: this.saveClassId
          }}
        >
          <Route
            exact={true}
            path={"/teacher/dashboard"}
            component={Dashboard}
          />
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
          <Route
            exact={true}
            path={"/teacher/messages"}
            component={MessageRedirect}
          />
          <Route
            exact={true}
            path={"/teacher/messages/:id"}
            component={this.renderMessages}
          />
          <Route exact={true} path="/teacher/user" component={User} />
          <Route exact={true} path="/teacher/user/:id" component={User} />
          <Route exact={true} path="/teacher/email" component={Email} />
          {!this.props.history.location.pathname.includes("messages") && (
            <ChatWindow />
          )}
        </ClassroomContext.Provider>
      </TeacherMessageSocket.Provider>
    );
  }

  public saveClassId = (currentClassId: string) => {
    this.setState({ currentClassId });
  };
}
// day: moment().format("dddd")
const ContentWithApollo = compose(
  graphql(getScheduleQuery, {
    name: "getScheduleQuery"
  }),
  graphql(getAllScheduleQuery, {
    name: "getAllScheduleQuery",
    options: (props: any) => {
      const scheduleData =
        !props.getScheduleQuery.loading && props.getScheduleQuery.latestLine;
      if (scheduleData) {
        const current = moment();
        const startTime = moment(scheduleData.startTime);
        const endTime = moment(scheduleData.endTime);
        if (current.isBefore(startTime)) {
          console.log(current.diff(startTime, "milliseconds"));
          props.getScheduleQuery.startPolling(
            Math.abs(current.diff(startTime, "milliseconds"))
          );
        } else {
          props.getScheduleQuery.startPolling(
            Math.abs(current.diff(endTime, "milliseconds"))
          );
        }
      }
      return {
        variables: {
          day: scheduleData && moment(scheduleData.startTime).format("dddd")
        },
        skip: props.getScheduleQuery.loading
      };
    }
  }),
  graphql(getClassQueryByLine, {
    name: "getClassQuery",
    options: (props: any) => {
      return {
        variables: {
          teacherUsername: props.username,
          lineId:
            props.getScheduleQuery.latestLine &&
            props.getScheduleQuery.latestLine.line
        },
        skip: props.getScheduleQuery.loading
      };
    }
  }),
  graphql(getScheduleDetailsQuery, {
    name: "getScheduleDetailsQuery",
    options: (props: any) => {
      let classId = "";
      if (
        props.getClassQuery &&
        props.getClassQuery.classroom &&
        props.getClassQuery.classroom.length === 1
      ) {
        classId = props.getClassQuery.classroom[0].Id;
      }
      return {
        variables: {
          teacherUsername: props.username,
          line:
            props.getScheduleQuery.latestLine &&
            props.getScheduleQuery.latestLine.line,
          classId
        }
      };
    },
    skip: props =>
      !props.getClassQuery ||
      !props.getClassQuery.classroom ||
      props.getClassQuery.classroom.length === 0
  }),
  graphql(getChatRoomQuery, {
    name: "getChatroomQuery",
    options: (props: any) => {
      return {
        variables: {
          Id: props.userId
        }
      };
    }
  })
)(withApollo(Content)) as any;

const ContentWithContext = ({ history }: any) => (
  <AppContext.Consumer>
    {value => (
      <ContentWithApollo
        username={value.username}
        token={value.token}
        history={history}
        userId={value.userId}
      />
    )}
  </AppContext.Consumer>
);

const ContentWithRouter = withRouter(ContentWithContext);

const Teacher = createTeacherLayout(ContentWithRouter as any);

export default Teacher;
