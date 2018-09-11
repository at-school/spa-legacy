import React from "react";
import { withRouter } from "react-router-dom";
import StudentContent from "./StudentContent";

const ClassDetailsContentContent = (props: any) => {
  const classId = props.match.params.id
  return <StudentContent classId={classId}/>;
};

export default withRouter(ClassDetailsContentContent);
