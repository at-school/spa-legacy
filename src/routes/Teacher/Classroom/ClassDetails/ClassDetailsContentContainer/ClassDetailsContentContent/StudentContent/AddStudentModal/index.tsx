import { Modal } from "antd";
import Lodash from "lodash";
import React from "react";
import { graphql, withApollo } from "react-apollo";
import { withRouter } from "react-router-dom";
import { searchStudents } from "../../../../../../../../api/classroom";
import {
  getScheduleDetailsQuery,
  getStudentsQuery
} from "../../../../../../queries";
import { addStudentMutation } from "../queries";
import AddStudentInput from "./AddStudentInput";
import StudentRow from "./StudentRow";

interface IAddStudentModalState {
  dataSource: Array<{ Id: string; name: string; avatar: string }>;
  currentSelectedStudent:
    | { Id: string; name: string; avatar: string }
    | undefined;
  selectedStudentList: Array<{ Id: string; name: string; avatar: string }>;
  searchValue: string;
}

export const addStudentsToSchedule = async (
  studentList: string[],
  scheduleId: string,
  token: string
) => {
  const response = await fetch("http://127.0.0.1:5000/classroom/schedule/students", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ studentList, scheduleId })
  });

  if (response.ok) {
    return response.json();
  }

  const errMessage = await response.text();
  throw new Error(errMessage);
};

class AddStudentModal extends React.Component<any, IAddStudentModalState> {
  public state = {
    dataSource: [],
    selectedStudentList: [],
    currentSelectedStudent: undefined,
    searchValue: ""
  };

  public handleOk = () => {
    // get the class id from the url
    const classId = this.props.match.params.id;
    const studentsWithPromise = this.state.selectedStudentList.map(
      (student: any) =>
        new Promise((resolve, reject) => {
          this.props
            .mutate({ variables: { classId, studentId: student.Id } })
            .then((res: any) => resolve(res.data))
            .catch((err: any) => console.log(err));
        })
    );
    Promise.all(studentsWithPromise).then(values => {
      const data = this.props.client.readQuery({
        query: getStudentsQuery,
        variables: { Id: classId }
      });
      if (classId === this.props.classroomContext.classId) {
        if (
          this.props.classroomContext.scheduleId &&
          this.props.classroomContext.classId === classId
        ) {
          console.log("Yes");
          
          addStudentsToSchedule(
            values.map((value: any) => value.addStudentToClassroom.Id),
            this.props.classroomContext.scheduleId,
            this.props.token
          ).then((res: any) => {
            const data1 = this.props.client.readQuery({
              query: getScheduleDetailsQuery,
              variables: {
                teacherUsername: this.props.username,
                line: this.props.classroomContext.line,
                classId: this.props.classroomContext.classId
              }
            });
            const {studentList} = res
            data1.scheduleDetails.students.push(...studentList.map((studentId: string) => {
              const studentDetails = values.find((value: any) => value.addStudentToClassroom.Id === studentId) as any
              return {
                inClass: false,
                __typename: "StudentsScheduleDetailsSchema",
                studentDetails: {
                  Id: studentId,
                  firstname: studentDetails.addStudentToClassroom.firstname,
                  lastname: studentDetails.addStudentToClassroom.lastname,
                  __typename: "UserSchema"
                }
              }
            }))
            this.props.client.writeQuery({
              query: getScheduleDetailsQuery,
              variables: {
                teacherUsername: this.props.username,
                line: this.props.classroomContext.line,
                classId: this.props.classroomContext.classId
              },
              data: data1
            });
            console.log(values);
          console.log(data1);
          });
          
        }
      }
      for (const value of values) {
        const { addStudentToClassroom } = value as any;
        data.classroom[0].students.push(addStudentToClassroom);
      }
      this.props.client.writeQuery({
        query: getStudentsQuery,
        variables: { Id: classId },
        data
      });
      this.handleCancel();
    });
  };

  public handleCancel = () => {
    this.setState(
      {
        dataSource: [],
        selectedStudentList: [],
        currentSelectedStudent: undefined,
        searchValue: ""
      },
      this.props.toggleAddStudentForm
    );
  };

  public onAddStudentInputChange = (value: string) => {
    if (!value) {
      this.setState({ dataSource: [], currentSelectedStudent: undefined });
    } else {
      this.setState({
        currentSelectedStudent: this.state.dataSource.find(
          (data: any) => data.Id === value
        )
      });
    }
  };

  public handleAddNewStudent = () => {
    const currentSelectedStudent = this.state.currentSelectedStudent as any;
    if (
      currentSelectedStudent &&
      !Lodash.some(this.state.selectedStudentList, currentSelectedStudent)
    ) {
      this.setState(prevState => ({
        selectedStudentList: [
          ...prevState.selectedStudentList,
          currentSelectedStudent
        ],
        currentSelectedStudent: undefined,
        searchValue: "",
        dataSource: []
      }));
    }
  };

  // callback when clicking on an item in the dropdown
  public onSelectRowInput = (value: string, option: any) => {
    this.setState({ searchValue: option.props.title });
  };

  public updateSearchValue = (searchValue: string) => {
    this.setState({ searchValue });
    if (!searchValue) {
      this.setState({ dataSource: [] });
    } else {
      console.log(this.props.token);
      searchStudents(searchValue, this.props.token)
        .then(res => this.setState({ dataSource: res.data }))
        .catch(err => console.log(err));
    }
  };

  public removeSelectedStudent = (Id: string) => () => {
    this.setState(prevState => ({
      selectedStudentList: prevState.selectedStudentList.filter(
        student => student.Id !== Id
      )
    }));
  };

  public render() {
    const { visible } = this.props;
    return (
      <Modal
        title="Add new students"
        visible={visible}
        okText="Confirm"
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        okButtonProps={{
          disabled: this.state.selectedStudentList.length === 0
        }}
      >
        <AddStudentInput
          onChange={this.onAddStudentInputChange}
          canAddUser={
            this.state.currentSelectedStudent &&
            !Lodash.some(
              this.state.selectedStudentList,
              this.state.currentSelectedStudent
            )
          }
          dataSource={this.state.dataSource}
          handleAddNewStudent={this.handleAddNewStudent}
          updateSearchValue={this.updateSearchValue}
          value={this.state.searchValue}
          onSelect={this.onSelectRowInput}
        />
        {this.state.selectedStudentList.map((student: any) => (
          <StudentRow
            key={student.Id}
            name={student.name}
            avatar={student.avatar}
            removeSelectedStudent={this.removeSelectedStudent(student.Id)}
          />
        ))}
      </Modal>
    );
  }
}

export default graphql(addStudentMutation)(
  withRouter(withApollo(AddStudentModal))
) as any;
