import React from "react";
import { ApolloConsumer, graphql } from "react-apollo";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { branch, compose, renderComponent } from "recompose";
import Spinner from "../../../../components/Spinner";
import AppContext from "../../../../contexts/AppContext";
import { IClassData } from "../interfaces";
import {
  editClassroomMutation,
  getClassQuery,
  getClassQueryById,
  removeClassMutation
} from "../queries/queries";
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

  public removeClass = (id: string) => () => {
    this.props.removeClassMutation({
      variables: {
        Id: id
      },
      refetchQueries: [{ query: getClassQuery }]
    });
  };

  public render() {
    return (
      <div className="class-list-container">
        <TransitionGroup className="class-list">
          <CSSTransition key={"-1"} timeout={500} classNames="fade">
            <AddClassForm />
          </CSSTransition>
          {this.props.data.user[0].classrooms.map((c: any, index: number) => (
            <CSSTransition key={c.Id} timeout={500} classNames="fade">
              <div>
                <ClassCard
                  name={c.name}
                  description={c.description}
                  avatar={c.avatar}
                  removeClass={this.removeClass(c.Id)}
                  toggleEditClassForm={this.openEditClassForm(c.Id)}
                />
              </div>
            </CSSTransition>
          ))}
        </TransitionGroup>
        {this.props.data.user[0].classrooms.length !== 0 && (
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
  graphql(getClassQuery),
  graphql(removeClassMutation, { name: "removeClassMutation" }),
  graphql(editClassroomMutation, { name: "editClassMutation" }),
  branch(({ data }) => {
    return !data.user && data.loading;
  }, renderComponent(Spinner))
)(ClassList);

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
          />
        )}
      </AppContext.Consumer>
    )}
  </ApolloConsumer>
);
