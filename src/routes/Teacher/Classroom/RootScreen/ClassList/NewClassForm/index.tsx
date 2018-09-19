import { Card, Icon } from "antd";
import React from "react";
import { graphql } from "react-apollo";
import { compose, withHandlers, withState } from "recompose";
import { withClassroomContext } from "../../../../../../contexts/Teacher/ClassroomContext";
import { addClassroomMutation } from "../../../queries";
import ClassForm from "../ClassForm";

const NewClassForm = (props: any) => {
  console.log(props);
  const { formVisible, toggleForm, mutate, classroomContext } = props;
  return (
    <React.Fragment>
      <div>
        <Card onClick={toggleForm} className="add-class-card">
          <Icon type="plus" /> Add new class
        </Card>
      </div>
      <ClassForm
        addClass={mutate}
        visible={formVisible}
        toggleClassForm={toggleForm}
        getClassInfo={classroomContext.getClassInfo}
      />
    </React.Fragment>
  );
};

export default compose(
  withState("formVisible", "toggleForm", false),
  withHandlers({
    toggleClassForm: ({ toggleForm }: any) =>
      toggleForm((formVisible: boolean) => !formVisible)
  }),
  graphql(addClassroomMutation)
)(withClassroomContext(NewClassForm));
