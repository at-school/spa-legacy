import React from "react";
import { ApolloConsumer, graphql } from "react-apollo";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { branch, compose, renderComponent } from "recompose";
import AppContext from "../../../../contexts/AppContext";
import { IClassData } from "../interfaces";
import {
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
  { token: string; data: any; mutate: any; client: any },
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
        variables: { Id: classId }
      })
      .then((res: any) =>
        this.setState(
          { classData: res.data.classroom[0] },
          this.toggleEditClassForm
        )
      );
    // this.setState(
    //   { currentSelectClass: classId as any },
    //   this.toggleEditClassForm
    // );
  };

  // edit class but locally, modfiy the current class list
  public editClass = (classData: IClassData) => {
    this.setState(prevState => ({
      classes: prevState.classes.map(c => {
        if (c.id === classData.id) {
          return classData;
        }
        return c;
      })
    }));
  };

  // remove class of a user both locally and on the server
  // after removing class from the server
  // remove the class from the state by filtering the id
  public removeClass = (id: string) => () => {
    this.props.mutate({
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

const LoadingComponent = () => <p>Loading...</p>;

const ClassListGraphQl = compose(
  // with compose, order matters -- we want our apollo HOC up top
  // so that the HOCs below it will have access to the data prop
  graphql(getClassQuery),
  graphql(removeClassMutation),
  branch(({ data }) => {
    return !data.user && data.loading;
  }, renderComponent(LoadingComponent))
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
