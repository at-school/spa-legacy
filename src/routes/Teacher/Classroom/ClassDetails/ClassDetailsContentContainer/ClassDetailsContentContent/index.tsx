import React from "react";
import { withRouter } from "react-router-dom";
import Reports from "./ClassReport";
import StudentContent from "./StudentContent";
const ClassDetailsContentContent = (props: any) => {
  const classId = props.match.params.id;
  console.log(props.activeItem);
  return (
    <React.Fragment>
      {props.activeItem === 0 && <StudentContent classId={classId} />}
      {props.activeItem === 1 && <Reports classId={classId} />}
    </React.Fragment>
  );
};

export default withRouter(ClassDetailsContentContent);
