import React from "react";
import { Route, withRouter } from "react-router-dom";
import AppContext from "../../contexts/AppContext";
import createTeacherLayout from "../../layouts/AppLayout/TeacherLayout";
import Classroom from "./Classroom";
import Dashboard from "./Dashboard";
import Messages from "./Messages";
import RollCall from "./RollCall";

class Content extends React.Component<any> {
  public componentDidUpdate() {
    if (!this.props.token) {
      this.props.history.push("/authentication/signin");
    }
  }

  public render() {
    return (
      <React.Fragment>
        <Route exact={true} path={"/teacher/dashboard"} component={Dashboard} />
        <Route exact={true} path={"/teacher/classroom"} component={Classroom} />
        <Route exact={true} path={"/teacher/rollcall"} component={RollCall} />
        <Route exact={true} path={"/teacher/messages"} component={Messages} />
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
