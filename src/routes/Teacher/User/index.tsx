import { css, StyleSheet } from "aphrodite";
import React from "react";
import { compose, graphql } from "react-apollo";
import { withRouter } from "react-router-dom";
import Spinner from "../../../components/Spinner";
import AppContext from "../../../contexts/AppContext";
import BasicUserInfo from "./BasicUserInfo";
import {
  IUser,
  IUserProps,
  IUserWithContextProps,
  IUserWithGraphQlProps
} from "./interfaces";
import { getUserInfoQuery } from "./queries";

class User extends React.Component<IUserProps> {
  public componentDidMount() {
    console.log(this.props.match.params.id);
  }

  public render() {
    console.log(this.props);
    let user = {
      firstname: "undefined",
      lastname: "undefined",
      avatar: "undefiend",
      username: "undefined",
      classrooms: [] as any,
      studentClassroom: [] as any,
      skills: [] as any
    } as IUser;
    if (
      this.props.getUserInfoQuery.user &&
      this.props.getUserInfoQuery.user.length === 1
    ) {
      user = this.props.getUserInfoQuery.user[0];
    }
    return (
      <React.Fragment>
        {this.props.getUserInfoQuery.user &&
        this.props.getUserInfoQuery.user.length === 1 ? (
          <div className={css(styles.mainContainer)}>
            <div className={css(styles.basicUserInfo)}>
              <BasicUserInfo
                avatar={user.avatar}
                name={user.firstname + " " + user.lastname}
                username={user.username}
                classrooms={user.classrooms}
                studentClassrooms={user.studentClassroom}
                skills={user.skills}
              />
            </div>
            <div>Hello</div>
          </div>
        ) : (
          <Spinner />
        )}
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "white",
    padding: "12px",
    display: "flex",
    flexDirection: "row"
  },
  basicUserInfo: {
    flex: 0.3
  }
});

const UserWithGraphQl = compose(
  graphql(getUserInfoQuery, {
    options: (props: IUserWithGraphQlProps) => {
      return {
        variables: {
          Id: props.match.params.id
            ? props.match.params.id
            : props.currentUserId
        }
      };
    },
    name: "getUserInfoQuery"
  })
)(User);

const UserWithContext = (props: IUserWithContextProps) => {
  return (
    <AppContext.Consumer>
      {value => <UserWithGraphQl {...props} currentUserId={value.userId} />}
    </AppContext.Consumer>
  );
};

export default withRouter(UserWithContext as any);
