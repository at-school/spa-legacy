import { Spin } from "antd";
import { css, StyleSheet } from "aphrodite";
import React from "react";
import { graphql } from "react-apollo";
import { getEmailDetails } from "../../queries";

function utoa(str: string) {
  return window.btoa(unescape(encodeURIComponent(str)));
}

const EmailView = ({ data }: any) => {
  if (!data || data.loading || !data.email || !data.email.length) {
    return (
      <div style={{ position: "relative", height: "100%" }}>
        <Spin className={css(styles.spinner)} tip="Loading Email Content" />
      </div>
    );
  }
  const mailContent = data.email[0];
  if (mailContent) {
    return (
      <div className={css(styles.bodies)}>
        <div className={css(styles.bodyHead)}>
          {mailContent.subject ? mailContent.subject : "No Subject"}
        </div>

        <iframe
          className={css(styles.body)}
          frameBorder="0"
          src={"data:text/html;base64," + utoa(mailContent.html)}
        />
      </div>
    );
  }
  return (
    <div style={{ position: "relative", height: "100%" }}>
      <Spin className={css(styles.spinner)} tip="Loading Email Content" />
    </div>
  );
};

const gray = "rgb(240,242,245)";

const styles = StyleSheet.create({
  bodies: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: gray,
    overflow: "scroll"
  },
  bodyHead: {
    display: "flex",
    alignItems: "center",
    backgroundColor: gray,
    fontWeight: "bold",
    fontSize: "18px",
    height: "54px"
  },
  body: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    overflow: "scroll"
  },
  spinner: {
    top: "40%",
    display: "block",
    margin: "auto",
    position: "relative"
  }
});

export default graphql(getEmailDetails, {
  options: (props: any) => ({
    variables: { userId: props.userId, Id: props.mailId }
  }),
  skip: props => !Boolean(props.mailId)
})(EmailView);
