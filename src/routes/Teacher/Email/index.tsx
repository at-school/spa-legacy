import { css, StyleSheet } from "aphrodite";
import React from "react";
import AppContext from "../../../contexts/AppContext";
import EmailAuth from "./EmailAuth";
import MainMail from "./MainMail";
import SplashLoadingEmail from "./SplashScreens/SplashLoadingEmail";
import SplashSetup from "./SplashScreens/SplashSetup";

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
    selectedMail: ""
  };

  public componentDidMount() {
    this.getMailData();
    this.props.userSocket.on("email", (data: any) => {
      this.getMailData();
    });
  }

  public getMailData = async (visited = false) => {
    const mailAuth = await fetch("http://localhost:5000/getmail", {
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
      "http://localhost:5000/authorize?id=" + this.props.userId
    );
  };

  public handleClick = (index: any, key: any) => () => {
    if (key === "inbox") {
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
            return <SplashLoadingEmail />;
          } else if (this.state.setup === true) {
            return <SplashSetup />;
          } else if (this.state.addMailbox) {
            return <EmailAuth getToken={this.getToken} />;
          } else {
            return (
              <MainMail
                getDate={this.getDate}
                mailData={this.state.mailData}
                activeMail={this.state.selectedMail}
                activeInbox={this.state.activeInbox}
                handleClick={this.handleClick}
                accessToken={this.props.accessToken}
              />
            );
          }
        })()}
      </div>
    );
  }
}

export default (props: any) => (
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
);

const styles = StyleSheet.create({
  mainContainer: {
    margin: "-48px -24px",
    height: "calc(100vh - 64px)"
  }
});
