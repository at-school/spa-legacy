import { Icon } from "antd";
import { css, StyleSheet } from "aphrodite";
import React from "react";

const MailList = ({ mailData, activeMail, date, handleClick }: any) => {
  return (
    <React.Fragment>
      {mailData.map((item: any) => (
        <div
          key={item.Id}
          className={css(
            styles.mailItem,
            activeMail === item.Id && styles.active
          )}
          onClick={handleClick(item.Id, "mail")}
        >
          <div>{item.timeDate}</div>
          <div>
            <span>
              <strong>{item.From ? item.From : (item["From-email"] ? item["From-email"] : "")}</strong>
            </span>
            <span style={{ float: "right" }} className={css(styles.date)}>
              {date(item.dateTime)}
            </span>
            {item.type && (
              <span style={{ float: "right" }}>
                <Icon type={item.type} />
              </span>
            )}
          </div>
          <div>
            <div className={css(styles.subject)}>
              <div className={css(styles.subjectSpan)}>{item.Subject ? item.Subject : "No Subject"}</div>
            </div>
          </div>
          <span>{item.plain}</span>
        </div>
      ))}
    </React.Fragment>
  );
};

const gray = "rgb(240,242,245)";
const blue = "rgba(3, 131, 220, 1)";
const lightBlue = "rgba(187, 219, 244, 0.5)";

const styles = StyleSheet.create({
  active: {
    color: blue,
    backgroundColor: lightBlue
  },
  mailItem: {
    height: "65px",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "10px 20px",
    lineHeight: "1.2",
    borderBottom: `1px solid ${gray}`,
    transition: "all linear .1s"
  },
  date: {
    color: "rgb(100,100,100)",
    fontSize: "14px"
  },
  subject: {
    overflow: "hidden",
    maxHeight: "16px",
    position: "relative"
  },
  subjectSpan: {
    width: "100%",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap"
  }
});

export default MailList;
