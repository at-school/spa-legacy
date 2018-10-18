import { css, StyleSheet } from "aphrodite";
import React from "react";

function utoa(str: string) {
  return window.btoa(unescape(encodeURIComponent(str)));
}

const EmailView = ({ mailContent }: any) => {
  if (mailContent) {
    return (
      <div className={css(styles.bodies)}>
        <div className={css(styles.bodyHead)}>
          {"Subject" in mailContent && mailContent.Subject}
        </div>

        <iframe
          className={css(styles.body)}
          frameBorder="0"
          src={"data:text/html;base64," + utoa(mailContent.html)}
        />
      </div>
    );
  }
  return <div>Loading....</div>;
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
  }
});

export default EmailView;
