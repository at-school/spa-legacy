import { css, StyleSheet } from "aphrodite";
import React from "react";
import { compose, graphql } from "react-apollo";
import { withRouter } from "react-router-dom";
import Spinner from "../../../components/Spinner";
import AppContext from "../../../contexts/AppContext";
import BasicUserInfo from "./BasicUserInfo";
import DetailsUserInfo from "./DetailsUserInfo";
import {
  IUser,
  IUserProps,
  IUserWithContextProps,
  IUserWithGraphQlProps
} from "./interfaces";
import { getUserInfoQuery } from "./queries";

class User extends React.Component<IUserProps, { self: boolean; bio: string }> {
  public state = {
    self: false,
    bio: ""
  };
  public componentDidMount() {
    if (
      this.props.match.params.id === this.props.currentUserId ||
      !this.props.match.params.id
    ) {
      this.setState({ self: true });
    }
  }

  public render() {
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
                self={this.state.self}
              />
            </div>
            <div className={css(styles.detailsUserInfo)}>
              <DetailsUserInfo
                userId={this.props.currentUserId}
                token={this.props.token}
                self={this.state.self}
                bio={user.bio}
                currentUserAccessLevel={this.props.accessLevel}
                userSearchAccessLevel={user.accessLevel}
                name={user.firstname + " " + user.lastname}
              />
            </div>
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
    padding: "12px",
    display: "flex",
    flexDirection: "row",
    minHeight: "100%"
  },
  basicUserInfo: {
    flex: 0.3,
    maxWidth: "300px",
    marginRight: "48px",
    backgroundColor: "white",
    padding: 24,
  },
  detailsUserInfo: {
    backgroundColor: "white",
    flexGrow: 1,
    padding: 24
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
      {value => (
        <UserWithGraphQl
          {...props}
          token={value.token}
          currentUserId={value.userId}
          accessLevel={value.accessLevel}
        />
      )}
    </AppContext.Consumer>
  );
};

export default withRouter(UserWithContext as any);
