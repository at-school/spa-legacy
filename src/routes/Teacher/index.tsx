import moment from "moment";
import React from "react";
import { graphql, withApollo } from "react-apollo";
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
import Messages from "./Messages";
import { getChatRoomIdQuery } from "./Messages/queries/queries";
import { getClassQuery, getScheduleQuery, getStudentsQuery } from "./queries";
import RollCall from "./RollCall";

class Content extends React.Component<any, any> {
  public messageSocket: any;

  public state = {
    selectedRoom: null,
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

  private scheduleInterval: any;

  public componentWillUnmount() {
    clearInterval(this.scheduleInterval);
  }

  public componentDidMount() {
    this.scheduleInterval = setInterval(this.updateSchedule, 1000);

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

  public shouldComponentUpdate() {
    return true;
  }

  public render() {
    return (
      <TeacherMessageSocket.Provider value={{ socket: this.messageSocket }}>
        <ClassroomContext.Provider
          value={{
            Id: this.state.classroomId,
            avatar: this.state.classroomAvatar,
            name: this.state.classroomName,
            description: this.state.classroomDescription,
            line: this.state.currentMoment.line as any,
            students: this.state.classroomStudents,
            schedule: this.state.schedule,
            classId: this.state.currentClassId
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
          <Route exact={true} path={"/teacher/messages"} component={Messages} />
          {!this.props.history.location.pathname.includes("messages") && (
            <ChatWindow />
          )}
        </ClassroomContext.Provider>
      </TeacherMessageSocket.Provider>
    );
  }

  public updateSchedule = () => {
    const getClassInfo = (lineId: string) => {
      this.props.client
        .query({
          query: getClassQuery,
          variables: {
            teacherUsername: this.props.username,
            lineId
          },
          refetchQueries: [
            {
              query: getStudentsQuery,
              variables: {
                Id: lineId
              }
            }
          ]
        })
        .then((res: any) => {
          if (res.data && res.data.classroom && res.data.classroom.length > 0) {
            this.setState({
              currentClassId: res.data.classroom[0].Id
            });
          }
        });
    };
    // get next day schedule
    const getNextSchedule = () => {
      if (!this.state.loading) {
        this.setState(
          (prevState: any) => ({
            currentMoment: {
              ...prevState.currentMoment,
              day: moment(new Date()).add(prevState.numAddDays + 1, "days")
            },
            numAddDays: prevState.numAddDays + 1,
            loading: true
          }),
          () => {
            this.props.getScheduleQuery
              .refetch({
                day: moment(new Date())
                  .add(this.state.numAddDays, "days")
                  .format("dddd")
              })
              .then((res: any) => {
                this.setState({
                  schedule: res.data.schedule.map((schedule: any) => ({
                    line: schedule.line,
                    startTime: schedule.startTime,
                    endTime: schedule.endTime
                  })),
                  loading: false
                });
              });
          }
        );
      }
    };

    // get schedule of today, if there is no schedule, get the schedule of the next day
    const getSchedule: any = () => {
      const { schedule } = this.state;
      if (schedule && schedule.length > 0) {
        return schedule;
      }
      return [];
    };

    // check if finishing every classes of the day
    const isTheEnd = () => {
      const currentSchedule = getSchedule();
      // check if it is the end of the day right now
      if (currentSchedule && currentSchedule.length > 0) {
        const lastLine = currentSchedule[currentSchedule.length - 1];
        const lastLineTime = moment(
          new Date(
            this.state.currentMoment.day.format("LL") + " " + lastLine.endTime
          )
        );
        return moment().isAfter(lastLineTime);
      }
      return false;
    };

    // check if current is at the start of the day
    const isTheStart = () => {
      const currentSchedule = getSchedule();
      // check if it is the end of the day right now
      if (currentSchedule && currentSchedule.length > 0) {
        const firstLine = currentSchedule[0];
        const firstLineTime = moment(
          new Date(
            this.state.currentMoment.day.format("LL") +
              " " +
              firstLine.startTime
          )
        );
        return moment().isBefore(firstLineTime);
      }
      return false;
    };

    if (!this.props.getScheduleQuery.loading) {
      if (this.state.schedule.length === 0) {
        if (
          this.props.getScheduleQuery.schedule &&
          this.props.getScheduleQuery.schedule.length >= 0
        ) {
          this.setState({ schedule: this.props.getScheduleQuery.schedule });
        } else {
          getNextSchedule();
        }
        return;
      } else if (isTheEnd()) {
        getNextSchedule();
        return;
      } else if (isTheStart()) {
        if (
          this.state.schedule.length > 0 &&
          (this.state.schedule[0] as any).line !==
            String(this.state.currentMoment.line)
        ) {
          this.setState(
            (prevState: any) => ({
              currentMoment: {
                ...prevState.currentMoment,
                line: (this.state.schedule[0] as any).line
              }
            }),
            () => getClassInfo(String((this.state.schedule[0] as any).line))
          );
          return;
        }
      } else {
        for (const scheduleItem of this.props.getScheduleQuery.schedule) {
          if (
            scheduleItem.hasOwnProperty("startTime") &&
            scheduleItem.hasOwnProperty("endTime")
          ) {
            const startTime = moment(scheduleItem.startTime, "HH:mm:ss");
            const endTime = moment(scheduleItem.endTime, "HH:mm:ss");
            const isBetween = moment().isBetween(startTime, endTime);

            if (
              isBetween &&
              this.state.currentMoment.line !== scheduleItem.line
            ) {
              this.setState((prevState: any) => ({
                currentMoment: {
                  ...prevState.currentMoment,
                  line: scheduleItem.line
                }
              }));
              getClassInfo(String(scheduleItem.line));
              return;
            } else if (isBetween) {
              return;
            }
          }
        }
        if (this.state.currentMoment.line) {
          this.setState((prevState: any) => ({
            currentMoment: { ...prevState.currentMoment, line: undefined }
          }));
        }
      }
    }
  };
}
// day: moment().format("dddd")
const ContentWithApollo = graphql(getScheduleQuery, {
  options: () => {
    return {
      variables: { day: moment().format("dddd") }
    };
  },
  name: "getScheduleQuery"
})(withApollo(Content)) as any;

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
