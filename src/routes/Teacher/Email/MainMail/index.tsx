import { Icon } from "antd";
import { css, StyleSheet } from "aphrodite";
import React from "react";
import { compose, graphql } from "react-apollo";
import { getEmailListQuery } from "../queries";
import SplashScreens from "../SplashScreens/SplashLoadingEmail";
import EmailView from "./EmailView";
import MailList from "./MailList";
import VerticalNav from "./VerticalNav";
import WriteEmailView from "./WriteEmailView";

class MainMail extends React.Component<{
  mailData;
  activeMail;
  activeInbox;
  handleClick;
  getDate;
  accessToken;
  getEmailList;
  userId;
  userSocket;
  setup;
}> {
  public state = {
    mounted: false
  };

  public componentDidMount() {
    if (this.props.getEmailList.email && this.props.getEmailList.email.length) {
      this.setState({ mounted: true });
      this.props.handleClick(this.props.getEmailList.email[0].Id, "")();
    }
    this.props.userSocket.on("email", (data: any) => {
      console.log("new email");
      this.props.getEmailList.refetch();
    });
  }

  public componentDidUpdate(prevProps: any) {
    console.log("Hello");
    if (!prevProps.activeMail.length && !this.props.getEmailList.loading) {
      if (
        this.props.getEmailList.email &&
        this.props.getEmailList.email.length
      ) {
        this.setState({ mounted: true });
        this.props.handleClick(this.props.getEmailList.email[0].Id, "")();
      }
    }
  }

  public render() {
    console.log(this.props.getEmailList);
    if (this.props.getEmailList.loading && !this.state.mounted) {
      if (this.props.setup) {
        return <SplashScreens tipText="Setting up mail box" />;
      }
      return <SplashScreens tipText="Loading email" />;
    }

    return (
      <React.Fragment>
        <div className={css(styles.contentContainer)}>
          <VerticalNav
            handleClick={this.props.handleClick}
            activeInbox={this.props.activeInbox}
          />
          {this.props.activeInbox === 0 && (
            <WriteEmailView
              handleClick={this.props.handleClick}
              accessToken={this.props.accessToken}
            />
          )}
          {this.props.activeInbox === 1 && (
            <React.Fragment>
              <div className={css(styles.messageWrapper)}>
                <div className={css(styles.mailHeader)}>
                  <div>
                    <span>Sort</span>
                    <Icon type="sort-ascending" />
                  </div>
                  <div className={css(styles.filter)}>
                    <span>Filter</span>
                    <Icon type="filter" />
                  </div>
                </div>
                <div className={css(styles.messagesContainer)}>
                  <MailList
                    handleClick={this.props.handleClick}
                    activeMail={this.props.activeMail}
                    date={this.props.getDate}
                    mailData={this.props.getEmailList.email}
                  />
                </div>
              </div>
              <div className={css(styles.emailViewContainer)}>
                <EmailView
                  userId={this.props.userId}
                  mailId={this.props.activeMail}
                />
              </div>
            </React.Fragment>
          )}
        </div>
      </React.Fragment>
    );
  }
}

const blue = "rgba(3, 131, 220, 1)";
const grayBorder = "solid 1px rgb(230,230,230)";

const styles = StyleSheet.create({
  contentContainer: {
    display: "flex",
    flexDirection: "row",
    height: "100%",
    width: "100%"
  },
  messageWrapper: {
    height: "100%",
    width: "25%",
    minWidth: "225px",
    backgroundColor: "white",
    borderBottom: grayBorder,
    borderRight: grayBorder,
    overflow: "hidden",
    postition: "absolute",
    flex: 0.3
  },
  filter: {
    marginLeft: "50px"
  },
  mailHeader: {
    height: "54px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: blue,
    borderBottom: grayBorder
  },
  messagesContainer: {
    height: "100%",
    marginBottom: "50px",
    overflowY: "scroll"
  },
  emailViewContainer: {
    flex: 0.5
  }
});

export default compose(
  graphql(getEmailListQuery, {
    options: (props: any) => ({ variables: { userId: props.userId }, pollInterval: 10000 }),
    name: "getEmailList"
  })
)(MainMail);
