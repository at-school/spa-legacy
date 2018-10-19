import { Spin } from "antd";
import { css, StyleSheet } from "aphrodite";
import React from "react";
import AppContext from "../../../contexts/AppContext";
import GeneralSettingsAvatar from "./GeneralSettingsAvatar";
import GeneralSettingsForm from "./GeneralSettingsForm";

const getUserInfo = async (token: string) => {
  const response = await fetch(process.env.REACT_APP_LOCAL_URI  + "user/info", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + token
    }
  });
  if (response.ok) {
    return response.json();
  }

  const errMessage = await response.text();
  throw new Error(errMessage);
};

class GeneralSettings extends React.Component<
  { token: string },
  {
    loading: boolean;
    email: string;
    phone: string;
    firstname: string;
    lastname: string;
    avatar: string;
  }
> {
  public state = {
    loading: true,
    email: "",
    phone: "",
    firstname: "",
    lastname: "",
    avatar: ""
  };
  public componentDidMount() {
    getUserInfo(this.props.token)
      .then(data => {
        console.log(data.email);
        this.setState({ loading: false, ...data });
      })
      .catch(err => console.log(err));
  }

  public render() {
    return (
      <div className={css(styles.mainContainer)}>
        {this.state.loading ? (
          <Spin tip="Getting user data" className={css(styles.spinner)} />
        ) : (
          <React.Fragment>
            <div className={css(styles.form)}>
              <GeneralSettingsForm
                phone={this.state.phone}
                email={this.state.email}
                firstname={this.state.firstname}
                lastname={this.state.lastname}
              />
            </div>
            <div className={css(styles.avatar)}>
              <GeneralSettingsAvatar avatar={this.state.avatar} />
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    paddingRight: 16
  },
  spinner: {
    alignSelf: "center",
    margin: "auto"
  },
  form: {
    flex: 0.8
  },
  avatar: {
    flex: 0.2,
    marginLeft: 50
  }
});

export default (props: any) => (
  <AppContext.Consumer>
    {value => <GeneralSettings token={value.token!} />}
  </AppContext.Consumer>
);
