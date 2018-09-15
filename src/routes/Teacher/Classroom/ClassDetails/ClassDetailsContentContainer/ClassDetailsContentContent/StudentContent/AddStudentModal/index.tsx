import { Modal } from "antd";
import Lodash from "lodash";
import React from "react";
import { graphql, withApollo } from "react-apollo";
import { withRouter } from "react-router-dom";
import { searchStudents } from "../../../../../../../../api/classroom";
import AppContext from "../../../../../../../../contexts/AppContext";
import { getStudentsQuery } from "../../../../../../queries";
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
      for (const value of values) {
        console.log(value);
        const { addStudentToClassroom } = value as any;
        data.classroom[0].students.push(addStudentToClassroom);
      }
      this.props.client.writeQuery({
        query: getStudentsQuery,
        variables: { Id: classId },
        data
      });
      this.handleCancel()
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

const AddStudentModalWithContext = (props: any) => (
  <AppContext.Consumer>
    {value => <AddStudentModal token={value.token} {...props} />}
  </AppContext.Consumer>
);

export default graphql(addStudentMutation)(
  withRouter(withApollo(AddStudentModalWithContext))
) as any;
