import { Card, Icon } from "antd";
import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import {
  teacherGetClasses,
  teacherRemoveClass
} from "../../../../api/classroom";
import AppContext from "../../../../contexts/AppContext";
import { IClassData } from "../interfaces";
import ClassCard from "./ClassCard";
import EditClassForm from "./ClassForm/EditClassForm";
import AddClassForm from "./NewClassForm";

interface IClassListState {
  classes: IClassData[];
  newClassFormVisible: boolean;
  editClassFormVisible: boolean;
  // current selection of the class for edit class form
  currentSelectClass: number;
}

class ClassList extends React.Component<{ token: string }, IClassListState> {
  public state = {
    newClassFormVisible: false,
    editClassFormVisible: false,
    classes: [],
    currentSelectClass: 0
  };

  public componentDidMount() {
    // get all the classes of the user
    teacherGetClasses(this.props.token).then(res =>
      this.setState({ classes: res.results })
    );
  }

  // toggle close and open the add class form
  public toggleAddClassForm = () => {
    this.setState({ newClassFormVisible: !this.state.newClassFormVisible });
  };

  // toggle close and open the edit class form
  public toggleEditClassForm = () => {
    this.setState(prevState => ({
      editClassFormVisible: !prevState.editClassFormVisible
    }));
  };

  // toggle open the edit class form. need the update the state
  // so classData props pass down would change
  public openEditClassForm = (classId: number) => () => {
    this.setState({ currentSelectClass: classId }, this.toggleEditClassForm);
  };

  // add new class but locally, append the class to the current list of class
  public addNewClass = (classData: IClassData) => {
    this.setState(prevState => ({ classes: [...prevState.classes, classData] }));
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
  public removeClass = (id: string, token: string) => () => {
    teacherRemoveClass(id, token).then(() =>
      this.setState(prevState => {
        return {
          classes: prevState.classes.filter(c => c.id.toString() !== id)
        };
      })
    );
  };

  public render() {
    return (
      <div className="class-list-container">
        <TransitionGroup className="class-list">
          <CSSTransition key={"-1"} timeout={500} classNames="fade">
            <div>
              <Card
                onClick={this.toggleAddClassForm}
                className="add-class-card"
              >
                <Icon type="plus" /> Add new class
              </Card>
            </div>
          </CSSTransition>
          {this.state.classes.map((c: any, index: number) => (
            <CSSTransition
              key={c.id.toString()}
              timeout={500}
              classNames="fade"
            >
              <div>
                <ClassCard
                  name={c.name}
                  description={c.description}
                  avatarData={c.avatarData}
                  removeClass={this.removeClass(
                    c.id.toString(),
                    this.props.token
                  )}
                  toggleEditClassForm={this.openEditClassForm(index)}
                />
              </div>
            </CSSTransition>
          ))}
        </TransitionGroup>
        <AddClassForm
          addClass={this.addNewClass}
          visible={this.state.newClassFormVisible}
          toggleClassForm={this.toggleAddClassForm}
        />
        {this.state.classes.length !== 0 && (
          <EditClassForm
          addClass={this.editClass}
            visible={this.state.editClassFormVisible}
            toggleClassForm={this.toggleEditClassForm}
            classData={this.state.classes[this.state.currentSelectClass]}
          />
        )}
      </div>
    );
  }
}

export default (props: any) => (
  <AppContext.Consumer>
    {value => <ClassList {...props} token={value.token} />}
  </AppContext.Consumer>
);
