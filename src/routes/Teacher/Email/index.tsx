import { css, StyleSheet } from "aphrodite";
import React from "react";
import { withRouter } from "react-router-dom";
import AppContext from "../../../contexts/AppContext";
import MainMail from "./MainMail";
import SplashLoadingEmail from "./SplashScreens/SplashLoadingEmail";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

class Email extends React.Component<any> {
  public state = {
    setup: false,
    addMailbox: false,
    loading: true,
    activeInbox: 1,
    activeMail: 0,
    mailData: [],
    selectedMail: "",
    auth: false
  };

  public componentDidMount() {
    this.checkAuth();
  }

  public checkAuth() {
    fetch(process.env.REACT_APP_LOCAL_URI + "hasauth", {
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + this.props.accessToken
      },
      body: JSON.stringify({ userId: this.props.userId }),
      method: "POST"
    })
      .then(res => res.json())
      .then(res => {
        if (!res.auth) {
          window.location.replace(
            "http://localhost:8080/" + "authorize?id=" + this.props.userId
          );
        }
        if (res.auth) {
          this.setState({ setup: res.setup, auth: res.auth, loading: false });
        }
      });
  }

  public getMailData = async (visited = false) => {
    const mailAuth = await fetch(process.env.REACT_APP_LOCAL_URI + "getmail", {
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + this.props.accessToken
      },
      body: JSON.stringify({
        studentId: this.props.userId,
        visited
      }),
      method: "POST"
    }).then(res => res.json());
    if (mailAuth.response === "first-time") {
      this.setState({ setup: true, addMailbox: false });
      this.getMailData((visited = true));
    } else if (mailAuth.response === "auth") {
      this.setState({ addMailbox: true });
    } else {
      if (!this.state.selectedMail) {
        this.setState({
          mailData: mailAuth,
          setup: false,
          selectedMail: mailAuth.length ? mailAuth[0].Id : ""
        });
      }
      this.setState({
        mailData: mailAuth
      });
    }
    this.setState({ loading: false });
  };

  public getToken = () => {
    window.location.replace(
      "http://localhost:8080/authorize" + "authorize?id=" + this.props.userId
    );
  };

  public handleClick = (index: any, key: any) => () => {
    if (key === "inbox") {
      if (index === 0) {
        this.props.history.push("/teacher/email/new");
      } else if (index === 1) {
        this.props.history.push("/teacher/email/all");
      }
      this.setState({ activeInbox: index });
    } else {
      this.setState({ selectedMail: index });
    }
  };

  public getDate = (oldDate: string) => {
    const date = new Date(oldDate);
    return months[date.getMonth()].toString() + " " + date.getDate();
  };

  public render() {
    return (
      <div className={css(styles.mainContainer)}>
        {(() => {
          if (this.state.loading === true) {
            return <SplashLoadingEmail tipText="Checking identity" />;
          }
          return (
            <MainMail
              userSocket={this.props.userSocket}
              getDate={this.getDate}
              mailData={this.state.mailData}
              activeMail={this.state.selectedMail}
              activeInbox={this.state.activeInbox}
              handleClick={this.handleClick}
              accessToken={this.props.accessToken}
              setup={this.state.setup}
              userId={this.props.userId}
            />
          );
        })()}
      </div>
    );
  }
}

export default withRouter((props: any) => (
  <AppContext.Consumer>
    {value => (
      <Email
        userSocket={value.socket}
        userId={value.userId}
        {...props}
        accessToken={value.token}
      />
    )}
  </AppContext.Consumer>
));

const styles = StyleSheet.create({
  mainContainer: {
    margin: "-48px -24px",
    height: "calc(100vh - 64px)"
  }
});
