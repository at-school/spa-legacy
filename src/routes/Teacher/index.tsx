import Lodash from "lodash";
import moment from "moment";
import React from "react";
import { compose, graphql, withApollo } from "react-apollo";
import { Route, withRouter } from "react-router-dom";
import io from "socket.io-client";
import ChatWindow from "../../components/ChatWindow";
import SettingsPage from "../../components/SettingsPage";
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
import {
  getChatRoomMessageQuery,
  getChatRoomQuery
} from "./Messages/queries/queries";
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
    this.messageSocket.on("connect", () => {
      this.messageSocket.on("newMessage", this.onNewMessage);
    });
  }

  public componentWillUnmount() {
    this.messageSocket.removeEventListener("newMessage", this.onNewMessage);
  }

  public componentDidMount() {
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
          chatroomId: chatroom.Id,
          activityType: "join"
        });
      }
    }
  }

  public componentDidUpdate(prevProps: any) {
    if (!this.props.token) {
      this.props.history.push("/authentication/signin");
    }

    const { user } = this.props.getChatroomQuery;
    if (
      JSON.stringify(prevProps.getChatroomQuery) !==
      JSON.stringify(this.props.getChatroomQuery)
    ) {
      if (this.props.getChatroomQuery.user) {
        if (!this.state.selectedRoomId && user && user.length > 0) {
          this.setState({ selectedRoomId: user[0].chatrooms[0].Id });
        }
        for (const chatroom of user[0].chatrooms) {
          console.log("Subscribing to all channels");
          this.messageSocket.emit("sendMessage", {
            chatroomId: chatroom.Id,
            activityType: "join"
          });
        }
      }
    }
  }

  public changeSelectedRoomId = (selectedRoomId: string) => () => {
    this.setState({ selectedRoomId });
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
    let startTime = "";
    let endTime = "";
    console.log(this.props.getScheduleDetailsQuery);
    if (this.props.getScheduleDetailsQuery) {
      const {
        getScheduleDetailsQuery: { scheduleDetails }
      } = this.props;
      if (scheduleDetails && scheduleDetails.students) {
        studentList = scheduleDetails.students;
        scheduleId = scheduleDetails.Id;
        (startTime = scheduleDetails.startTime),
          (endTime = scheduleDetails.endTime);
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
          changeSelectedRoomId: this.changeSelectedRoomId,
          selectedRoomId: this.state.selectedRoomId
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
            getClassInfo: this.saveClassId,
            startTime,
            endTime
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
          <Route path="/teacher/settings" component={SettingsPage} />
          {!this.props.history.location.pathname.includes("messages") &&
            chatrooms.length > 0 && (
              <ChatWindow
                chatrooms={chatrooms}
                selectedRoomId={this.state.selectedRoomId}
                changeSelectedRoomId={this.changeSelectedRoomId}
                socket={this.messageSocket}
              />
            )}
        </ClassroomContext.Provider>
      </TeacherMessageSocket.Provider>
    );
  }

  public saveClassId = (currentClassId: string) => {
    this.setState({ currentClassId });
  };

  private onNewMessage = (res: any) => {
    if (res.createMessage.senderId !== this.props.userId) {
      // Read the data from our cache for this query.
      try {
        const data = this.props.client.readQuery({
          query: getChatRoomMessageQuery,
          variables: { chatroomId: res.chatroomId }
        });
        // Add the new message from the mutation to the end.
        data.message.push(res.createMessage);
        // Write our data back to the cache.
        this.props.client.writeQuery({
          query: getChatRoomMessageQuery,
          variables: { chatroomId: res.chatroomId },
          data
        });
      } catch (err) {
        console.log(err);
      }
    }

    const roomData = this.props.client.readQuery({
      query: getChatRoomQuery,
      variables: { Id: this.props.userId }
    });
    roomData.user[0].chatrooms = Lodash.sortBy(
      roomData.user[0].chatrooms,
      item => {
        return item.Id === res.chatroomId ? 0 : 1;
      }
    );
    if (roomData.user[0].chatrooms[0].latestMessage) {
      if (roomData.user[0].chatrooms[0].latestMessage.length === 0) {
        roomData.user[0].chatrooms[0].latestMessage.push({
          messageContent: res.createMessage.messageContent,
          __typename: "MessageSchema"
        });
      } else {
        roomData.user[0].chatrooms[0].latestMessage[0].messageContent =
          res.createMessage.messageContent;
      }
    }
    this.props.client.writeQuery({
      query: getChatRoomQuery,
      variables: { Id: this.props.userId },
      data: roomData
    });
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
          teacherId: props.userId,
          lineId: props.getScheduleQuery.latestLine.line
        }
      };
    },
    skip: (props: any) =>
      !(
        props.getScheduleQuery.latestLine &&
        props.getScheduleQuery.latestLine.line
      )
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
          teacherId: props.userId,
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
