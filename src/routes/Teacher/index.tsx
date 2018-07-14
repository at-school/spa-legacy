import React from "react";
import { Route } from "react-router-dom";
import createTeacherLayout from "../../layouts/AppLayout/TeacherLayout";
import Dashboard from "./Dashboard";
import Message from "./Message";

const Content = () => (
  <React.Fragment>
    <Route exact={true} path={"/teacher/dashboard"} component={Dashboard} />
    <Route exact={true} path={"/teacher/message"} component={Message} />
  </React.Fragment>
);

const Teacher = createTeacherLayout(Content);

export default Teacher;
