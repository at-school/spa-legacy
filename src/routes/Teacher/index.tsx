import React from "react";
import { Route } from "react-router-dom";
import createTeacherLayout from "../../layouts/AppLayout/TeacherLayout";
import Classroom from "./Classroom";
import Dashboard from "./Dashboard";
import RollCall from "./RollCall";

const Content = () => (
  <React.Fragment>
    <Route exact={true} path={"/teacher/dashboard"} component={Dashboard} />
    <Route exact={true} path={"/teacher/classroom"} component={Classroom} />
    <Route exact={true} path={"/teacher/rollcall"} component={RollCall} />
  </React.Fragment>
);

const Teacher = createTeacherLayout(Content);

export default Teacher;
