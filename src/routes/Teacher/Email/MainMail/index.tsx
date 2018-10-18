import { Icon } from "antd";
import { css, StyleSheet } from "aphrodite";
import React from "react";
import EmailView from "./EmailView";
import MailList from "./MailList";
import VerticalNav from "./VerticalNav";
import WriteEmailView from "./WriteEmailView";

const MainMail = ({
  mailData,
  activeMail,
  activeInbox,
  handleClick,
  getDate,
  accessToken
}: any) => {
  const selectedMail = mailData.find((mail: any) => mail.Id === activeMail);
  return (
    <React.Fragment>
      <div className={css(styles.contentContainer)}>
        <VerticalNav handleClick={handleClick} activeInbox={activeInbox} />
        {activeInbox === 0 && (
          <WriteEmailView handleClick={handleClick} accessToken={accessToken} />
        )}
        {activeInbox === 1 && (
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
                  handleClick={handleClick}
                  activeMail={activeMail}
                  date={getDate}
                  mailData={mailData}
                />
              </div>
            </div>
            <div className={css(styles.emailViewContainer)}>
            <EmailView mailContent={selectedMail} />
            </div>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
};

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

export default MainMail;
