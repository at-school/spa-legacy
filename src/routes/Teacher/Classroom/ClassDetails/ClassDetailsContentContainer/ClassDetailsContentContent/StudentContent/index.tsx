import { Button, Input, List } from "antd";
import { css, StyleSheet } from "aphrodite";
import React from "react";
import { graphql } from "react-apollo";
import { withRouter } from "react-router-dom";
import { branch, compose, renderComponent } from "recompose";
import Spinner from "../../../../../../../components/Spinner";
import AppContext from "../../../../../../../contexts/AppContext";
import { withClassroomContext } from "../../../../../../../contexts/Teacher/ClassroomContext";
import { getStudentsQuery } from "../../../../../queries";
import AddStudentModal from "./AddStudentModal";
import { removeStudentMutation } from "./queries";

class StudentContent extends React.Component<any, any> {
  public state = {
    visible: false
  };

  public toggleAddStudentForm = () => {
    this.setState((prevState: any) => ({ visible: !prevState.visible }));
  };

  public render() {
    let noStudent = false;
    console.log(this.props.data.classroom);
    let dataSource = [];
    try {
      const numOfClasses = this.props.data.classroom[0].students.length;
      dataSource = this.props.data.classroom[0].students;
      if (numOfClasses === 0) {
        noStudent = true;
      }
    } catch (err) {
      noStudent = true;
      dataSource = [];
    }
    const renderItem = (student: any) => (
      <List.Item key={student.Id}>
        <List.Item.Meta
          avatar={<img className={css(styles.avatar)} src={student.avatar} />}
          description={"Doing double ITs and something"}
          title={
            <a href="https://ant.design">
              {student.firstname + " " + student.lastname}
            </a>
          }
        />
        <Button onClick={this.removeStudent(student.Id)} type="danger">
          Remove student
        </Button>
      </List.Item>
    );
    return (
      <div className={css(styles.mainContainer)}>
        <div className={css(styles.topMain)}>
          <Input.Search
            className={css(styles.searchStudent)}
            placeholder="Search for students"
          />
          <Button
            onClick={this.toggleAddStudentForm}
            className={css(styles.rightAlign)}
            icon="plus"
            type="primary"
          >
            Add new student
          </Button>
        </div>
        {noStudent && (
          <div>
            <img
              className={css(styles.noStudentImage)}
              src="/nostudent.png"
              alt="No student image"
            />
            <div className={css(styles.noStudentText)}>
              Oops! You've got no student.
            </div>
          </div>
        )}
        {!noStudent && (
          <List
            className="demo-loadmore-list"
            itemLayout="horizontal"
            dataSource={dataSource}
            renderItem={renderItem}
          />
        )}
        <AddStudentModal
          toggleAddStudentForm={this.toggleAddStudentForm}
          username={this.props.username}
          token={this.props.token}
          classroomContext={this.props.classroomContext}
          visible={this.state.visible}
          handleOk={this.handleOk}
          handleCancel={this.handleCancel}
        />
      </div>
    );
  }

  private handleOk = () => {
    this.setState((prevState: any) => ({ visible: !prevState.visible }));
  };

  private handleCancel = () => {
    this.setState((prevState: any) => ({ visible: !prevState.visible }));
  };

  private removeStudent = (studentId: string) => () => {
    console.log(studentId);
    const classId = this.props.match.params.id;
    console.log(classId);
    this.props
      .mutate({
        variables: { classId, studentId },
        update: (store: any, { data: { removeStudentFromClassroom } }: any) => {
          // // Read the data from our cache for this query.
          // const data = store.readQuery({ query: queryAccountList });
          // // Filter the out just the account with the deleted id.
          // const nextData = data.GetAllAccounts.filter(({ id }) => id !== 2);
          // // Write our data back to the cache.
          // store.writeQuery({ query: queryAccountList, data: nextData });
          const data = store.readQuery({
            query: getStudentsQuery,
            variables: { Id: classId }
          });
          data.classroom[0].students = data.classroom[0].students.filter(
            (student: any) => student.Id !== removeStudentFromClassroom.Id
          );
          store.writeQuery({
            query: getStudentsQuery,
            variables: { Id: classId },
            data
          });
        }
      })
      .then((res: any) => console.log(res.data))
      .catch((err: any) => console.log(err));
  };
}

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%"
  },
  topMain: {
    display: "flex",
    flexDirection: "row"
  },
  rightAlign: {
    marginLeft: "auto"
  },
  searchStudent: {
    width: "200px"
  },
  noStudentImage: {
    width: "150px",
    display: "block",
    margin: "48px auto 48px auto"
  },
  noStudentText: {
    textAlign: "center"
  },
  avatar: {
    borderRadius: "50%",
    width: "48px"
  }
});

export default compose(
  // with compose, order matters -- we want our apollo HOC up top
  // so that the HOCs below it will have access to the data prop
  graphql(getStudentsQuery, {
    options: (props: any) => ({ variables: { Id: props.classId } })
  }),
  graphql(removeStudentMutation),
  branch(({ data }) => {
    return !data.classroom && data.loading;
  }, renderComponent(Spinner))
)(
  withRouter(
    withClassroomContext((props: any) => (
      <AppContext.Consumer>
        {value => (
          <StudentContent
            token={value.token}
            username={value.username}
            {...props}
          />
        )}
      </AppContext.Consumer>
    ))
  )
) as any;
