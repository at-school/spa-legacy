import Lodash from "lodash";
import React from "react";
import { ApolloConsumer, graphql } from "react-apollo";
import { withRouter } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { branch, compose, renderComponent } from "recompose";
import Spinner from "../../../../../components/Spinner";
import AppContext from "../../../../../contexts/AppContext";
import { withClassroomContext } from "../../../../../contexts/Teacher/ClassroomContext";
import { getClassQueryByLine } from "../../../queries";
import {
  editClassroomMutation,
  getClassQuery,
  getClassQueryById,
  removeClassMutation
} from "../../queries";
import { IClassData } from "../interfaces";
import ClassCard from "./ClassCard";
import EditClassForm from "./ClassForm/EditClassForm";
import AddClassForm from "./NewClassForm";

interface IClassListState {
  classes: IClassData[];
  editClassFormVisible: boolean;
  // current selection of the class for edit class form
  currentSelectClass: number;
  classData: object;
}

class ClassList extends React.Component<
  {
    token: string;
    data: any;
    removeClassMutation: any;
    client: any;
    editClassMutation: any;
    history: any;
    userId: string;
    classroomContext: any;
    username: string;
  },
  IClassListState
> {
  public state = {
    editClassFormVisible: false,
    classes: [],
    currentSelectClass: 0,
    classData: {}
  };

  // toggle close and open the edit class form
  public toggleEditClassForm = () => {
    this.setState(prevState => ({
      editClassFormVisible: !prevState.editClassFormVisible
    }));
  };

  // toggle open the edit class form. need the update the state
  // so classData props pass down would change
  public openEditClassForm = (classId: string) => () => {
    this.props.client
      .query({
        query: getClassQueryById,
        variables: { Id: classId },
        fetchPolicy: "no-cache"
      })
      .then((res: any) => {
        this.setState(
          { classData: res.data.classroom[0] },
          this.toggleEditClassForm
        );
      });
  };

  // edit class but locally, modfiy the current class list
  public editClass = (classData: IClassData, callback: any) => {
    const completeClassData = { ...classData, Id: classData.id };
    const updatedData = {
      Id: completeClassData.Id,
      name: completeClassData.name,
      description: completeClassData.description,
      avatar: completeClassData.avatarData,
      falcutyId: completeClassData.falcuty,
      lineId: completeClassData.line
    };
    this.props
      .editClassMutation({
        variables: updatedData,
        refetchQueries: [{ query: getClassQuery }],
        awaitRefetchQueries: true
      })
      .then(callback)
      .catch((err: any) => console.log(err));
  };

  public goToClassDetails = (Id: string) => () => {
    try {
      const classDetails = Lodash.find(this.props.data.user[0].classrooms, {
        Id
      });
      this.props.history.push(
        "/teacher/classroom/" + String(Id) + "/students",
        classDetails
      );
    } catch (err) {
      console.log(err);
    }
  };

  public removeClass = (id: string) => () => {
    this.props.removeClassMutation({
      variables: {
        Id: id
      },
      update: (store: any, { data: { removeClassroom } }: any) => {
        this.props.classroomContext.getClassInfo("");
        const data = store.readQuery({
          query: getClassQuery,
          variables: { Id: this.props.userId }
        });

        const data1 = store.readQuery({
          query: getClassQueryByLine,
          variables: {
            lineId: this.props.classroomContext.line,
            teacherId: this.props.userId
          }
        });

        try {
          data.user[0].classrooms = data.user[0].classrooms.filter(
            (classroom: any) => classroom.Id !== removeClassroom.Id
          );
          data1.classroom = [];
          store.writeQuery({
            query: getClassQuery,
            variables: { Id: this.props.userId },
            data
          });

          store.writeQuery({
            query: getClassQueryByLine,
            variables: {
              lineId: this.props.classroomContext.line,
              teacherId: this.props.userId
            },
            data: data1
          });
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  public render() {
    let classList = [];
    try {
      const classrooms = this.props.data.user[0].classrooms;
      if (classrooms) {
        classList = classrooms;
      }
    } catch {
      classList = [];
    }
    return (
      <div className="class-list-container">
        <TransitionGroup className="class-list">
          <CSSTransition key={"-1"} timeout={500} classNames="fade">
            <div>
              <AddClassForm
                getClassInfo={this.props.classroomContext.getClassInfo}
              />
            </div>
          </CSSTransition>
          {classList.map((c: any, index: number) => (
            <CSSTransition key={c.Id} timeout={500} classNames="fade">
              <div>
                <ClassCard
                  name={c.name}
                  description={c.description}
                  avatar={c.avatar}
                  removeClass={this.removeClass(c.Id)}
                  toggleEditClassForm={this.openEditClassForm(c.Id)}
                  goToClassDetails={this.goToClassDetails(c.Id)}
                />
              </div>
            </CSSTransition>
          ))}
        </TransitionGroup>
        {classList.length !== 0 && (
          <EditClassForm
            addClass={this.editClass}
            visible={this.state.editClassFormVisible}
            toggleClassForm={this.toggleEditClassForm}
            classData={this.state.classData}
          />
        )}
      </div>
    );
  }
}

const ClassListGraphQl = compose(
  // with compose, order matters -- we want our apollo HOC up top
  // so that the HOCs below it will have access to the data prop
  graphql(getClassQuery, {
    options: (props: any) => ({ variables: { Id: props.userId } })
  }),
  graphql(removeClassMutation, { name: "removeClassMutation" }),
  graphql(editClassroomMutation, { name: "editClassMutation" }),
  branch(({ data }) => {
    return !data.user && data.loading;
  }, renderComponent(Spinner))
)(withClassroomContext(withRouter(ClassList as any)));

export default (props: any) => (
  <ApolloConsumer>
    {client => (
      <AppContext.Consumer>
        {value => (
          <ClassListGraphQl
            username={value.username}
            {...props}
            token={value.token}
            client={client}
            userId={value.userId}
          />
        )}
      </AppContext.Consumer>
    )}
  </ApolloConsumer>
);
